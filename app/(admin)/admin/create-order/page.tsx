"use client"
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import FormControl from '@/components/common/FormControl';
import Header from '@/components/Home/Header';
import axios from 'axios';
import { MoonLoader } from 'react-spinners';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Copy } from 'lucide-react';

function Page() {
    const selectOption = [
        { id: 0, value: "Label Created", label: "Label created" },
        { id: 1, value: "Shipped", label: "Shipped" },
        { id: 2, value: "Attention Required", label: "Attention required" },
        { id: 3, value: "Out For Delivery", label: "Out for delivery" },
        { id: 4, value: "Delivered", label: "Delivered" },
    ];

    const [isLoading, setIsLoading] = useState(false);
    const [trackingNumber, setTrackingNumber] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [copyStatus, setCopyStatus] = useState("");
    const { handleSubmit, control, formState: { errors } } = useForm();

    const onSubmit = async (data: any) => {
        setIsLoading(true)
        try {
            const response = await axios.post('/api/create-order', data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setTrackingNumber(response.data.data.trackingNumber)
            setTimeout(() => {
                setIsModalOpen(true);
                setIsLoading(false)
            }, 2000)
            console.log("Order created successfully:", response.data);
        } catch (error) {
            console.error("Error creating order:", error);
        }
    };

    const getErrorMessage = (error: any): string | undefined => {
        if (!error) return undefined;
        if (typeof error === 'string') return error;
        if (error.message) return error.message;
        return undefined;
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(trackingNumber);
        setCopyStatus("Copied!");
        setTimeout(() => setCopyStatus(""), 2000);
    };

    return (
        <>
            <Header />
            <main className='mx-6 pb-20'>
                <h2 className='text-black text-xl text-center md:text-3xl font-extrabold leading-[1.3] mb-4 mt-8 tracking-tighter'>
                    Create Shipping Order
                </h2>
                <form className='max-w-[450px] mx-auto' onSubmit={handleSubmit(onSubmit)}>
                    <h3 className='text-2xl font-light my-6 tracking-tighter'>Shipping Information</h3>
                    <div className='flex flex-col gap-3'>
                        <Controller
                            name="name"
                            control={control}
                            rules={{ required: "Name is required" }}
                            render={({ field }) => (
                                <FormControl
                                    as='input'
                                    labelText='Name'
                                    placeholder='Enter full name'
                                    {...field}
                                    error={getErrorMessage(errors.name)}
                                />
                            )}
                        />
                        <Controller
                            name="address"
                            control={control}
                            rules={{ required: "Address is required" }}
                            render={({ field }) => (
                                <FormControl
                                    as='input'
                                    labelText='Address'
                                    placeholder='Enter your address'
                                    {...field}
                                    error={getErrorMessage(errors.address)}
                                />
                            )}
                        />
                        <Controller
                            name="phoneNumber"
                            control={control}
                            rules={{ required: "Phone number is required" }}
                            render={({ field }) => (
                                <FormControl
                                    as='input'
                                    labelText='Phone Number'
                                    placeholder='Enter your phone number'
                                    {...field}
                                    error={getErrorMessage(errors.phoneNumber)}
                                />
                            )}
                        />
                        <Controller
                            name="email"
                            control={control}
                            rules={{ required: "Email is required" }}
                            render={({ field }) => (
                                <FormControl
                                    as='input'
                                    labelText='Email'
                                    placeholder='Enter your email address'
                                    type='email'
                                    {...field}
                                    error={getErrorMessage(errors.email)}
                                />
                            )}
                        />
                        <Controller
                            name="currentLocation"
                            control={control}
                            rules={{ required: "Current location is required" }}
                            render={({ field }) => (
                                <FormControl
                                    as='input'
                                    labelText='Current Location'
                                    placeholder='Enter location of the order'
                                    {...field}
                                    error={getErrorMessage(errors.currentLocation)}
                                />
                            )}
                        />
                        <Controller
                            name="status"
                            control={control}
                            render={({ field }) => (
                                <FormControl
                                    as='select'
                                    options={selectOption}
                                    labelText='Status'
                                    placeholder='Select order status'
                                    value={field.value}
                                    onChange={field.onChange}
                                    error={getErrorMessage(errors.status)}
                                />
                            )}
                        />


                        <Controller
                            name="arrivalDate"
                            control={control}
                            rules={{ required: "Arrival date is required" }}
                            render={({ field }) => (
                                <FormControl
                                    as='input'
                                    labelText='Arrival date'
                                    placeholder='example: 21st Sept., 2025'
                                    {...field}
                                    error={getErrorMessage(errors.arrivalDate)}
                                />
                            )}
                        />
                    </div>
                    <div className='flex flex-col gap-3 my-6'>
                        <h3 className='text-2xl font-light my-3 tracking-tighter'>Receiver&apos;s Information</h3>
                        <Controller
                            name="receiverName"
                            control={control}
                            rules={{ required: "Receiver's name is required" }}
                            render={({ field }) => (
                                <FormControl
                                    as='input'
                                    labelText='Receiver&apos;s Name'
                                    placeholder='Enter receiver&apos;s name'
                                    {...field}
                                    error={getErrorMessage(errors.receiverName)}
                                />
                            )}
                        />
                        <Controller
                            name="receiverAddress"
                            control={control}
                            rules={{ required: "Receiver's address is required" }}
                            render={({ field }) => (
                                <FormControl
                                    as='input'
                                    labelText='Receiver&apos;s Address'
                                    placeholder='Enter receiver&apos;s address'
                                    {...field}
                                    error={getErrorMessage(errors.receiverAddress)}
                                />
                            )}
                        />
                        <Controller
                            name="receiverPhoneNumber"
                            control={control}
                            rules={{ required: "Receiver's phone number is required" }}
                            render={({ field }) => (
                                <FormControl
                                    as='input'
                                    labelText='Receiver&apos;s Phone Number'
                                    placeholder='Enter receiver&apos;s phone number'
                                    {...field}
                                    error={getErrorMessage(errors.receiverPhoneNumber)}
                                />
                            )}
                        />
                        <Controller
                            name="receiverEmail"
                            control={control}
                            rules={{ required: "Receiver's email is required" }}
                            render={({ field }) => (
                                <FormControl
                                    as='input'
                                    labelText='Receiver&apos;s Email'
                                    placeholder='Enter receiver&apos;s email address'
                                    type='email'
                                    {...field}
                                    error={getErrorMessage(errors.receiverEmail)}
                                />
                            )}
                        />
                    </div>
                    <button type='submit' className='bg-red-600 w-full inline-flex justify-center p-3 rounded-sm text-white font-bold tracking-tighter hover:bg-red-600/80'>
                        {isLoading ? <MoonLoader color='white' size={20} /> : "Submit"}
                    </button>
                    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle className='tracking-tighter font-light mb-8 text-gray-500'>Your order has been created successfully!</DialogTitle>
                                <DialogDescription className='flex flex-col  gap-2 items-center mt-4'>
                                    <p className='text-2xl tracking-tighter font-light text-black'>Tracking Number: <span className='font-extrabold'>{trackingNumber}</span></p>
                                    <p onClick={copyToClipboard} className='text-gray-500 text-base px-4 font-light tracking-tighter cursor-pointer hover:text-red-600'>
                                        {copyStatus ? <span className='text-green-900'>Copied!</span> : <span className='flex items-center gap-1'>Copy tracking number <Copy size={16} /></span>}
                                    </p>
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </form>
            </main>
        </>
    );
}

export default Page;
