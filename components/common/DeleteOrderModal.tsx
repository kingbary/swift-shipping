import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Trash2 } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';

const DELETE_ORDER_API = '/api/delete-order';

type Props = {
    id: string;
    setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
}

function DeleteOrderModal({ id, setOrders }: Props) {
    const [isOpen, setIsOpen] = useState(false);

    const deleteOrder = async (id: string) => {
        try {
            const response = await axios.delete(`${DELETE_ORDER_API}/${id}`);
            if (response.status === 200) {
                setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
                toast.success("Order has been deleted!");
                setIsOpen(false);
            } else {
                toast.error(`Failed to delete order. Status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error deleting order:', error);

            if (axios.isAxiosError(error) && error.response) {
                console.error('Response data:', error.response.data);
                toast.error(`Failed to delete order: ${error.response.data.message}`);
            } else {
                toast.error("An unknown error occurred while deleting the order.");
            }
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger className="text-red-600 hover:opacity-70" title='Delete Order' onClick={() => setIsOpen(true)}>
                <Trash2 size={20} />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className='text-center'>Confirm order delete</DialogTitle>
                    <DialogDescription className='flex justify-center items-center mt-10'>
                        <button
                            className='px-4 py-2 mt-10 inline-flex items-center justify-center text-white bg-red-600 rounded-md'
                            onClick={() => deleteOrder(id)}
                        >
                            Delete Order
                        </button>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}

export default DeleteOrderModal;
