import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import React from 'react'
import { PuffLoader } from 'react-spinners'

function TrackingInformation({ order }: { order: Order | null}) {
    return (
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
                            <p>{order?.receiverName}</p>
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
    )
}

export default TrackingInformation
