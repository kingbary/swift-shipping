"use client";
import React, { useEffect, useMemo, useState } from 'react';
import { useReactTable, ColumnDef, flexRender, getCoreRowModel } from '@tanstack/react-table';
import axios from 'axios';
import EditOrderModal from '@/components/common/EditOrderModal';
import Link from 'next/link';
import DeleteOrderModal from '@/components/common/DeleteOrderModal';

const FETCH_ORDERS_API = '/api/fetch-all-orders';

const OrdersTable = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(FETCH_ORDERS_API);
                setOrders(response.data.data);
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch orders');
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const columns = useMemo<ColumnDef<Order>[]>(
        () => [
            {
                header: 'Name',
                accessorKey: 'name',
            },
            {
                header: 'Tracking No',
                accessorKey: 'trackingNumber',
            },
            {
                header: 'Email',
                accessorKey: 'email',
            },
            {
                header: 'Status',
                accessorKey: 'status',
            },
            {
                header: 'Actions',
                cell: ({ row }) => (
                    <div className="flex items-center gap-4">
                        <EditOrderModal
                            order={row.original}
                            onSave={(updatedOrder) => {
                                setOrders((prevOrders) =>
                                    prevOrders.map((order) =>
                                        order.id === updatedOrder.id ? updatedOrder : order
                                    )
                                );
                            }}
                        />
                        <DeleteOrderModal id={row.original.id} setOrders={setOrders} />
                    </div>
                ),
            },
        ],
        []
    );

    const table = useReactTable({
        data: orders,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    if (loading) return <p>Loading orders...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container mx-auto p-4 mt-10 max-w-[100vw] overflow-x-auto">
            <div className='flex justify-between items-center mb-10'>
                <h1 className="text-2xl font-bold mb-4 tracking-tighter">Orders</h1>
                <Link href={"/admin/create-order"} className='bg-red-600 inline-flex items-center justify-center h-10 px-2 font-bold text-white tracking-tighter rounded-md hover:bg-red-600/80'>Create Order</Link>
            </div>
            <table className="table-auto w-full border-collapse">
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id} className="border-b">
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    className="px-4 py-2 text-left font-semibold tracking-tighter"
                                >
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id} className="border-b">
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id} className="px-4 py-2 bg-gray-50 border tracking-tighter">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrdersTable;
