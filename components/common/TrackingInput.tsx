"use client";
import axios from 'axios';
import { useState } from 'react';
import { ClipLoader } from 'react-spinners';

function TrackingInput({
    className,
    setTrackingError,
    setOrder,
    setTrackingCode,
    inputValue,
    setInputValue,
}: TrackingInputProps) {
    const [isLoading, setIsLoading] = useState(false);

    const handleTrack = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const trackingCode = formData.get('tracking-code') as string;

        try {
            setTrackingCode(trackingCode);
            const res = await axios.get(`/api/fetch-order`, {
                params: { trackingNumber: trackingCode }
            });

            if (res.status === 200 && res.data && res.data.data) {
                setTrackingError(false);
                const order = res.data.data;
                localStorage.setItem('orderData', JSON.stringify(order));
                setOrder(order);
            } else {
                throw new Error('Invalid response structure');
            }
        } catch (err: any) {
            console.error('Error fetching order:', err);
            setTrackingError(true);
            setOrder(null);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleTrack}
            className={`flex flex-col md:flex-row bg-white rounded-md relative ${className}`}
        >
            <div className="relative w-full">
                <input
                    type="text"
                    id="tracking-code"
                    name="tracking-code"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder=" "
                    className="w-full outline-none border-none px-4 pt-4 h-14 md:h-full rounded-md md:rounded-l-md peer"
                    required
                />
                <label
                    htmlFor="tracking-code"
                    className="absolute left-4 top-4 tracking-tighter text-gray-400 text-base transition-all duration-200 ease-in-out cursor-text peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-xs peer-valid:top-1 peer-valid:text-xs"
                >
                    Enter your tracking code
                </label>
            </div>
            <button
                type="submit"
                className="m-[3px] bg-red-600 flex gap-1 tracking-tighter items-center justify-center h-full py-3 px- w-[108px] max-w-[108px] min-h-[48px] text-base text-white font-bold rounded-b-md sm:rounded-none md:rounded-r-md hover:opacity-90"
            >
                {isLoading ? <ClipLoader color="white" size={16} /> : "Track"}
            </button>
        </form>
    );
}

export default TrackingInput;
