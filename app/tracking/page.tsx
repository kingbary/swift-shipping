"use client";
import FAQ from '@/components/common/FAQ';
import TrackingInput from '@/components/common/TrackingInput';
import HomeLayout from '@/components/HomeLayout';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertTriangle, Box, CalendarCheck, Home, Info, Truck } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { PuffLoader } from 'react-spinners';

function Page() {
    const [trackingError, setTrackingError] = useState(false);
    const [order, setOrder] = useState<Order | null>(null);
    const [trackingCode, setTrackingCode] = useState("");
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        const orderData = localStorage.getItem('orderData');
        if (orderData) {
            setOrder(JSON.parse(orderData));
        }
    }, []);

    console.log(order);

    const steps = [
        { icon: CalendarCheck, label: "Label Created", completed: true },
        { icon: Box, label: "Shipped", completed: true },
        { icon: AlertTriangle, label: "Attention Required", completed: true },
        { icon: Truck, label: "Out for delivery", completed: true },
        { icon: Home, label: "Delivered", completed: true },
    ];

    return (
        <HomeLayout>
            <main className='flex flex-col items-center mb-10'>
                <div className='py-8 w-full flex justify-center'>
                    <h2 className='uppercase text-2xl font-light md:text-3xl'>Trace & Track</h2>
                </div>
                <div className='w-full bg-[#f2f2f2] py-7 flex flex-col items-center px-4 pt-4 pb-8'>
                    <div className='w-full max-w-[550px] md:w-4/5 p-6'>
                        <TrackingInput
                            setOrder={setOrder}
                            setTrackingError={setTrackingError}
                            setTrackingCode={setTrackingCode}
                            inputValue={inputValue}
                            setInputValue={setInputValue}
                            className='border border-gray-500'
                        />
                    </div>
                    <div className='w-full lg:w-[70%]'>
                        <div className='bg-white border border-black rounded-sm p-4 md:p-8'>
                            {trackingError ? (
                                <div className='flex flex-col sm:flex-row gap-5'>
                                    <div className='size-6 sm:size-8'>
                                        <Info size={22} className='size-full' />
                                    </div>
                                    <div className='mb-4'>
                                        <p className='text-xl font-extrabold'>{trackingCode}</p>
                                        <p className='text-sm mt-1 tracking-tighter'>Sorry, your tracking attempt was not successful. Please check your tracking number.</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-0 justify-center w-full">
                                    {steps.map((step, index) => {
                                        const Icon = step.icon;
                                        return (
                                            <div key={index} className="flex items-center justify-center md:w-[450px]">
                                                <div className={`flex flex-col items-center justify-center w-full ${step.completed ? 'text-red-600' : 'text-gray-400'}`}>
                                                    <div className='flex justify-center items-center w-full'>
                                                        <div className={`h-[2px] w-full hidden md:block ${index > 0 ? "bg-gray-300" : "bg-white"}`}></div>
                                                        <div
                                                            className={`rounded-full p-3 ${step.completed ? 'bg-red-600' : 'bg-gray-200'} text-white flex items-center justify-center`}
                                                        >
                                                            <Icon size={34} />
                                                        </div>
                                                        <div className={`h-[2px] w-full hidden md:block ${index < steps.length - 1 ? "bg-gray-300" : "bg-white"}`}></div>
                                                    </div>
                                                    <p className="text-center mt-2 text-sm tracking-tighter">{step.label}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                        <div className='flex justify-end w-full'>
                            <Dialog>
                                <DialogTrigger className='px-2 py-1 text-gray-500 text-sm tracking-tighter border border-gray-500 rounded-sm mt-4 hover:bg-gray-400/10'>View Order Details</DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle className='font-bold text-xl tracking-tighter'>Shipping Information</DialogTitle>
                                    </DialogHeader>
                                    <div className='flex flex-col gap-2 text-sm font-light'>
                                        <div className='flex justify-between'>
                                            <p>Name:</p>
                                            <p>{order?.name}</p>
                                        </div>
                                        <div className='flex justify-between'>
                                            <p>Address:</p>
                                            <p>{order?.address}</p>
                                        </div>
                                        <div className='flex justify-between'>
                                            <p>Phone Number:</p>
                                            <p>{order?.phoneNumber}</p>
                                        </div>
                                        <div className='flex justify-between'>
                                            <p>Email:</p>
                                            <p>{order?.email}</p>
                                        </div>
                                        <div className='flex justify-between'>
                                            <p>Tracking Number:</p>
                                            <p>{order?.trackingNumber}</p>
                                        </div>
                                        <div className='flex justify-between'>
                                            <p>Current Location:</p>
                                            <p className='flex items-center gap-1'>{order?.currentLocation}<span><PuffLoader size={15} color='red' /></span></p>
                                        </div>
                                        <div className='flex justify-between'>
                                            <p>Status:</p>
                                            <p>{order?.status}</p>
                                        </div>
                                        {/* <div className='flex justify-between'>
                                            <p>Description:</p>
                                            <p>{order?.status}</p>
                                        </div> */}
                                        <div className='flex justify-between'>
                                            <p>Estimated Arrival date:</p>
                                            <p>{order?.arrivalDate}</p>
                                        </div>
                                    </div>
                                    <div className='border-t border-gray-500 mt-4'>
                                        <h4 className='font-bold text-xl tracking-tighter mt-4'>Delivery Information</h4>
                                        <div className='flex flex-col gap-2 text-sm font-light'>
                                            <div className='flex justify-between'>
                                                <p>Name:</p>
                                                <p>{order?.receiverEmail}</p>
                                            </div>
                                            <div className='flex justify-between'>
                                                <p>Address:</p>
                                                <p>{order?.receiverAddress}</p>
                                            </div>
                                            <div className='flex justify-between'>
                                                <p>Phone Number:</p>
                                                <p>{order?.receiverPhoneNumber}</p>
                                            </div>
                                            <div className='flex justify-between'>
                                                <p>Email:</p>
                                                <p>{order?.receiverEmail}</p>
                                            </div>
                                        </div>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                </div>
                <FAQ />
            </main>
        </HomeLayout>
    )
}

export default Page;
