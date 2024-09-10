"use client";
import FAQ from '@/components/common/FAQ';
import TrackingInput from '@/components/common/TrackingInput';
import HomeLayout from '@/components/HomeLayout';
import { AlertTriangle, Box, CalendarCheck, Home, Info, Truck } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import TrackingInformation from './_TrackingInformation';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';

function Page() {
    const [trackingError, setTrackingError] = useState(false);
    const [order, setOrder] = useState<Order | null>(null);
    const [trackingCode, setTrackingCode] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [isTracking, setIsTracking] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const trackingCodeFromQuery = searchParams.get("trackingCode");
        console.log(trackingCodeFromQuery)

        if (trackingCodeFromQuery) {
            setTrackingCode(trackingCodeFromQuery);

            const orderData = localStorage.getItem('orderData');
            if (orderData) {
                setOrder(JSON.parse(orderData));
            } else {
                fetchOrderData(trackingCodeFromQuery);
            }
        }
    }, [searchParams]);

    const fetchOrderData = async (trackingCode: string) => {
        try {
            const response = await axios.get(`/api/fetch-order`, {
                params: { trackingNumber: trackingCode },
            });

            if (response.status === 200 && response.data && response.data.data) {
                const fetchedOrder = response.data.data;
                setOrder(fetchedOrder);
                localStorage.setItem('orderData', JSON.stringify(fetchedOrder));
                setTrackingError(false); // Clear any previous errors
            } else {
                setTrackingError(true); // Order not found or invalid response
            }
        } catch (error) {
            console.error("Error fetching order:", error);
            setTrackingError(true);
        } finally {
            setIsTracking(false);
        }
    };

    const getSteps = (status: OrderStatus) => {
        const stepMapping: { [key in OrderStatus]: number } = {
            "Label Created": 1,
            "Shipped": 2,
            "Attention Required": 3,
            "Out For Delivery": 4,
            "Delivered": 5,
        };

        const completedStep = stepMapping[status];

        return [
            { icon: CalendarCheck, label: "Label Created", completed: completedStep >= 1 },
            { icon: Box, label: "Shipped", completed: completedStep >= 2 },
            { icon: AlertTriangle, label: "Attention Required", completed: completedStep >= 3 },
            { icon: Truck, label: "Out for Delivery", completed: completedStep >= 4 },
            { icon: Home, label: "Delivered", completed: completedStep >= 5 },
        ];
    };

    const steps = order ? getSteps(order.status as OrderStatus) : [];

    return (
        <HomeLayout>
            <main className='flex flex-col items-center mb-10'>
                <div className='py-8 w-full flex justify-center'>
                    <h2 className='uppercase text-2xl font-light md:text-3xl'>Trace & Track</h2>
                </div>
                <div className='w-full bg-[#f2f2f2] py-7 flex flex-col items-center px-4 pt-4 pb-8'>
                    <div className='w-full max-w-[550px] md:w-4/5 p-6'>
                        <TrackingInput
                            className="border border-gray-400"
                            setTrackingError={setTrackingError}
                            setOrder={setOrder}
                            setTrackingCode={setTrackingCode}
                            inputValue={inputValue}
                            setInputValue={setInputValue}
                            setIsTracking={setIsTracking}
                            onSuccess={(trackingCode) => router.push(`/tracking?trackingCode=${trackingCode}`)}
                        />
                    </div>
                    {trackingError ? (
                        <div className='w-full lg:w-[70%]'>
                            <div className='bg-white border border-black rounded-sm p-4 md:p-8'>
                                <div className='flex flex-col sm:flex-row gap-5'>
                                    <div className='size-6 sm:size-8'>
                                        <Info size={22} className='size-full' />
                                    </div>
                                    <div className='mb-4'>
                                        <p className='text-xl font-extrabold'>{trackingCode}</p>
                                        <p className='text-sm mt-1 tracking-tighter'>Sorry, your tracking attempt was not successful. Please check your tracking number.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <>
                            {order ? (
                                <div className='w-full lg:w-[70%]'>
                                    <div className='bg-white border border-black rounded-sm p-4 md:p-8'>
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
                                    </div>
                                    <div className='flex justify-end w-full'>
                                        <TrackingInformation order={order} />
                                    </div>
                                </div>
                            ) : null}
                        </>
                    )}
                </div>
                <FAQ />
            </main>
        </HomeLayout>
    );
}

export default Page;
