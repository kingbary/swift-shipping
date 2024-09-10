import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Edit } from 'lucide-react';
import axios from 'axios';
import FormControl from '@/components/common/FormControl';
import { toast } from 'sonner';

interface EditOrderProps {
    order: Order;
    onSave: (updatedOrder: Order) => void;
}

const orderStatusOptions: { id: number, value: OrderStatus, label: string }[] = [
    { id: 0, value: "Label Created", label: "Label Created" },
    { id: 1, value: "Shipped", label: "Shipped" },
    { id: 2, value: "Attention Required", label: "Attention Required" },
    { id: 3, value: "Out For Delivery", label: "Out For Delivery" },
    { id: 4, value: "Delivered", label: "Delivered" },
];

function EditOrderModal({ order, onSave }: EditOrderProps) {
    const [updatedOrder, setUpdatedOrder] = useState<Order>(order);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSaveOrder = async (res:any) => {
        setLoading(true);
        try {
            await axios.put(`/api/update-order/`, updatedOrder);
            console.log("Successfully updated order")
            onSave(updatedOrder);
            toast.success("Order updated successfully!")
        } catch (error) {
            console.error('Failed to edit orderss', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog>
            <DialogTrigger className="hover:opacity-70" title="Edit Order">
                <Edit size={20} />
            </DialogTrigger>
            <DialogContent className='max-h-[90vh] overflow-y-auto'>
                <DialogTitle>Edit Order</DialogTitle>
                <DialogDescription>
                    <div className="flex flex-col space-y-4">
                        <FormControl
                            as="input"
                            labelText="Order Name"
                            placeholder="Order Name"
                            value={updatedOrder.name}
                            onChange={(e) => setUpdatedOrder({ ...updatedOrder, name: e.target.value })}
                        />
                        <FormControl
                            as="input"
                            labelText="Tracking Number"
                            placeholder="Tracking Number"
                            value={updatedOrder.trackingNumber}
                            onChange={(e) => setUpdatedOrder({ ...updatedOrder, trackingNumber: e.target.value })}
                        />
                        <FormControl
                            as="input"
                            labelText="Current location"
                            placeholder="Current location"
                            value={updatedOrder.currentLocation}
                            onChange={(e) => setUpdatedOrder({ ...updatedOrder, currentLocation: e.target.value })}
                        />
                        <FormControl
                            as="input"
                            labelText="Phone Number"
                            placeholder="Phone Number"
                            value={updatedOrder.phoneNumber}
                            onChange={(e) => setUpdatedOrder({ ...updatedOrder, phoneNumber: e.target.value })}
                        />
                        <FormControl
                            as="input"
                            labelText="Email"
                            placeholder="Email"
                            value={updatedOrder.email}
                            onChange={(e) => setUpdatedOrder({ ...updatedOrder, email: e.target.value })}
                        />
                        <FormControl
                            as="select"
                            labelText="Status"
                            options={orderStatusOptions}
                            value={updatedOrder.status}
                            onChange={(val) => setUpdatedOrder({ ...updatedOrder, status: val as unknown as OrderStatus })}
                        />
                        <button
                            className="bg-red-600 text-white px-4 py-3 font-bold tracking-tighter rounded mt-4"
                            onClick={handleSaveOrder}
                            disabled={loading}
                        >
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </DialogDescription>
            </DialogContent>
        </Dialog>
    );
}

export default EditOrderModal;
