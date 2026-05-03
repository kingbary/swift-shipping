"use client";
import FAQ from '@/components/common/FAQ';
import TrackingInput from '@/components/common/TrackingInput';
import HomeLayout from '@/components/HomeLayout';
import { Clock, FileText, Info, List, Printer } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const STATUS_COLOR: Record<OrderStatus, string> = {
    "Label Created": "text-blue-500",
    "Shipped": "text-blue-600",
    "Custom Clearance": "text-yellow-600",
    "Attention Required": "text-orange-500",
    "Out For Delivery": "text-yellow-600",
    "Delivered": "text-[#67a31d]",
};

const STEP_MAPPING: Record<OrderStatus, number> = {
    "Label Created": 1,
    "Shipped": 2,
    "Custom Clearance": 3,
    "Attention Required": 3,
    "Out For Delivery": 4,
    "Delivered": 5,
};

const STEPS = [
    { key: 1, label: "Label Created" },
    { key: 2, label: "Shipped" },
    { key: 3, label: "Custom Clearance" },
    { key: 4, label: "Out for Delivery" },
    { key: 5, label: "Delivered" },
];

type Tab = "details" | "timeline" | "events";

function Page() {
    const [trackingError, setTrackingError] = useState(false);
    const [order, setOrder] = useState<Order | null>(null);
    const [trackingCode, setTrackingCode] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [isTracking, setIsTracking] = useState(false);
    const [activeTab, setActiveTab] = useState<Tab>("details");

    const router = useRouter();

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        const trackingCodeFromQuery = query.get("trackingCode");
        if (trackingCodeFromQuery) {
            setTrackingCode(trackingCodeFromQuery);
            const orderData = localStorage.getItem('orderData');
            if (orderData) {
                const parsed: Order = JSON.parse(orderData);
                if (parsed.trackingNumber === trackingCodeFromQuery) {
                    setOrder(parsed);
                } else {
                    fetchOrderData(trackingCodeFromQuery);
                }
            } else {
                fetchOrderData(trackingCodeFromQuery);
            }
        }
    }, []);

    const fetchOrderData = async (code: string) => {
        try {
            const response = await axios.get(`/api/fetch-order`, {
                params: { trackingNumber: code },
            });
            if (response.status === 200 && response.data?.data) {
                const fetchedOrder = response.data.data;
                setOrder(fetchedOrder);
                localStorage.setItem('orderData', JSON.stringify(fetchedOrder));
                setTrackingError(false);
            } else {
                setTrackingError(true);
            }
        } catch {
            localStorage.removeItem('orderData');
            setTrackingError(true);
        } finally {
            setIsTracking(false);
        }
    };

    const currentStep = order ? STEP_MAPPING[order.status as OrderStatus] : 0;
    const progressPct = ((currentStep - 1) / (STEPS.length - 1)) * 100;
    const isException = order?.status === "Attention Required";
    const isDelivered = order?.status === "Delivered";

    const checkpointColor = isException ? "bg-orange-400 border-orange-400" : "bg-[#67a31d] border-[#67a31d]";
    const lineColor = isException ? "bg-orange-400" : "bg-[#67a31d]";

    const timelineEvents = order
        ? STEPS.slice(0, currentStep)
            .reverse()
            .map((s, i) => ({
                label: s.label,
                location: i === 0 ? order.currentLocation : order.address,
                isLatest: i === 0,
            }))
        : [];

    return (
        <HomeLayout>
            <main className='flex flex-col items-center mb-10'>
                <div className='w-full bg-[#f0f0f0] px-4 py-8 print:hidden'>
                    <div className='max-w-4xl mx-auto'>
                        <TrackingInput
                            className="border border-gray-300 shadow-sm"
                            setTrackingError={setTrackingError}
                            setOrder={setOrder}
                            setTrackingCode={setTrackingCode}
                            inputValue={inputValue}
                            setInputValue={setInputValue}
                            setIsTracking={setIsTracking}
                            onSuccess={(code) => router.push(`/tracking?trackingCode=${code}`)}
                        />
                    </div>
                </div>

                <div className='w-full bg-[#f0f0f0] px-4 pb-12'>
                    <div className='max-w-4xl mx-auto space-y-3'>
                        {trackingError && (
                            <div className='bg-white border-l-4 border-red-600 rounded-sm shadow-sm p-5 flex gap-4 items-start'>
                                <Info size={18} className='text-red-600 mt-0.5 shrink-0' />
                                <div>
                                    <p className='font-bold'>{trackingCode}</p>
                                    <p className='text-sm text-gray-500 mt-1'>
                                        Sorry, your tracking attempt was not successful. Please check your tracking number and try again.
                                    </p>
                                </div>
                            </div>
                        )}

                        {order && (
                            <>
                                {/* Header card */}
                                <div className='bg-white rounded-sm shadow-sm p-5 flex items-start justify-between'>
                                    <div className='text-sm space-y-1'>
                                        <p>Tracking Number: <strong>{order.trackingNumber}</strong></p>
                                        <p className='text-gray-500'>Service: <strong className='text-gray-800'>Swift Express</strong></p>
                                    </div>
                                    <button
                                        onClick={() => window.print()}
                                        className='print:hidden flex items-center gap-2 text-sm border border-red-600 text-red-600 rounded-full px-4 py-1.5 hover:bg-red-50 transition-colors'
                                    >
                                        Print <Printer size={14} />
                                    </button>
                                </div>

                                {/* Status + progress card */}
                                <div className='bg-white rounded-sm shadow-sm p-5 space-y-4'>
                                    <h2 className={`text-2xl font-bold ${STATUS_COLOR[order.status as OrderStatus]}`}>
                                        {order.status}
                                    </h2>

                                    <div className='flex items-start gap-2 text-sm text-gray-600'>
                                        <Clock size={14} className='shrink-0 mt-0.5' />
                                        <span>
                                            <strong>Last Update:</strong> {order.arrivalDate} &nbsp;|&nbsp; {order.currentLocation}
                                        </span>
                                    </div>

                                    {/* Progress bar */}
                                    <div className='pt-3 pb-1'>
                                        <p className='text-xs text-gray-500 mb-3'>
                                            Origin: <strong className='text-gray-800 uppercase'>{order.address}</strong>
                                        </p>
                                        <div className='relative flex items-center h-6'>
                                            <div className='absolute inset-0 flex items-center'>
                                                <div className='w-full h-2.5 bg-gray-200' />
                                            </div>
                                            <div
                                                className={`absolute top-1/2 -translate-y-1/2 left-px h-2.5 ${lineColor} transition-all duration-500`}
                                                style={{ width: `${progressPct}%` }}
                                            />
                                            <div className='relative w-full flex justify-between items-center z-10'>
                                                {STEPS.map((step) => {
                                                    const done = currentStep >= step.key;
                                                    return (
                                                        <div
                                                            key={step.key}
                                                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center bg-white transition-colors ${done ? checkpointColor : 'border-gray-300 bg-white'}`}
                                                        >
                                                            {done && (
                                                                <svg className='w-3 h-3 text-white' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={3}>
                                                                    <path strokeLinecap='round' strokeLinejoin='round' d='M5 13l4 4L19 7' />
                                                                </svg>
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                        <p className='text-xs text-gray-500 mt-3 text-right'>
                                            Destination: <strong className='text-gray-800 uppercase'>{order.receiverAddress}</strong>
                                        </p>
                                    </div>
                                </div>

                                {/* Tabs card */}
                                <div className='bg-white rounded-sm shadow-sm overflow-hidden'>
                                    <div className='flex bg-gray-100 print:hidden'>
                                        {(
                                            [
                                                { id: "details", label: "Shipment Details", icon: FileText },
                                                { id: "timeline", label: "Shipment Timeline", icon: Clock },
                                                { id: "events", label: "Event Log", icon: List },
                                            ] as const
                                        ).map(({ id, label, icon: Icon }) => (
                                            <button
                                                key={id}
                                                onClick={() => setActiveTab(id)}
                                                className={`flex items-center gap-2 px-4 py-3.5 text-sm font-medium border-b-2 transition-colors ${activeTab === id
                                                        ? 'border-red-600 text-red-600 bg-white'
                                                        : 'border-transparent text-gray-500 hover:text-gray-700'
                                                    }`}
                                            >
                                                <Icon size={14} />
                                                <span className='hidden sm:inline'>{label}</span>
                                                <span className='sm:hidden'>{label.split(' ')[0]}</span>
                                            </button>
                                        ))}
                                    </div>

                                    <div className='p-5'>
                                        {(activeTab === "details") && (
                                            <div className='divide-y divide-gray-100 print:block'>
                                                {[
                                                    { label: "Service", value: " Swift Express" },
                                                    { label: "Status", value: order.status },
                                                    { label: "Waybill Number", value: order.trackingNumber },
                                                ].map(({ label, value }) => (
                                                    <div key={label} className='flex justify-between py-3 gap-4'>
                                                        <span className='text-sm text-gray-400 shrink-0'>{label}</span>
                                                        <span className='text-sm font-bold text-right'>{value}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {(activeTab === "timeline") && (
                                            <div className='space-y-0'>
                                                {timelineEvents.map((event, i) => (
                                                    <div key={i} className='flex gap-4'>
                                                        <div className='flex flex-col items-center pt-1'>
                                                            <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${event.isLatest && isDelivered
                                                                    ? 'bg-[#67a31d]'
                                                                    : event.isLatest && isException
                                                                        ? 'bg-orange-400'
                                                                        : 'bg-yellow-400'
                                                                }`}>
                                                                {event.isLatest && (isDelivered || !isException) ? (
                                                                    <svg className='w-3 h-3 text-white' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={3}>
                                                                        <path strokeLinecap='round' strokeLinejoin='round' d='M5 13l4 4L19 7' />
                                                                    </svg>
                                                                ) : (
                                                                    <div className='w-2 h-2 bg-white rotate-45' />
                                                                )}
                                                            </div>
                                                            {i < timelineEvents.length - 1 && (
                                                                <div className='w-[2px] flex-1 min-h-[24px] bg-gray-200 my-1' />
                                                            )}
                                                        </div>
                                                        <div className='pb-4 flex-1'>
                                                            <div className='bg-gray-50 border border-gray-200 rounded p-4'>
                                                                <p className='text-xs text-gray-400 mb-1'>{event.location}</p>
                                                                <p className='text-sm font-bold'>{event.label}</p>
                                                                <p className='text-xs text-gray-400 mt-1'>Tracking: {order.trackingNumber}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {(activeTab === "events") && (
                                            <div className='divide-y divide-gray-100'>
                                                {timelineEvents.map((event, i) => (
                                                    <div key={i} className='flex items-start gap-3 py-3'>
                                                        <div className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${event.isLatest ? 'bg-[#67a31d]' : 'bg-gray-300'}`} />
                                                        <div>
                                                            <p className='text-sm font-semibold'>{event.label}</p>
                                                            <p className='text-xs text-gray-400 mt-0.5'>{event.location}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <div className='print:hidden w-full'><FAQ /></div>
            </main>
        </HomeLayout>
    );
}

export default Page;
