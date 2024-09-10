"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';  // Import useRouter for navigation
import CardContainer from '../common/CardContainer';
import { HandHelping, MapPinHouse, PackageOpen, PlaneTakeoff, Ship, TrainFrontTunnel, Truck } from 'lucide-react';
import ContentCard from '../common/ContentCard';
import Image from 'next/image';
import TrackingInput from '../common/TrackingInput';

function MainSection() {
    const [trackingError, setTrackingError] = useState<boolean>(false);
    const [order, setOrder] = useState<Order | null>(null);
    const [trackingCode, setTrackingCode] = useState<string>('');
    const [inputValue, setInputValue] = useState<string>('');
    const [isTracking, setIsTracking] = useState<boolean>(false);

    const parcelAndDocument = {
        heading: "Document and Parcel Shipping",
        subHeading1: "For All Shippers",
        subHeading2: "Learn about SwiftShipping Express – the undisputed global leader in international express shipping.",
        serviceAvailable: [
            { id: 0, text: "Next Possible Business Day", icon: PlaneTakeoff },
            { id: 1, text: "Tailored Business Solutions", icon: PackageOpen },
            { id: 2, text: "Flexible Import/Export Options", icon: MapPinHouse },
            { id: 3, text: "Wide Variety of Optional Services", icon: HandHelping }
        ]
    };

    const cargoShipping = {
        heading: "Cargo Shipping",
        subHeading1: "Business Only",
        subHeading2: "Discover shipping and logistics service options from DHL Global Forwarding.",
        serviceAvailable: [
            { id: 0, text: "Air Freight", icon: Ship },
            { id: 1, text: "Ocean Freight", icon: PackageOpen },
            { id: 2, text: "Road Freight", icon: Truck },
            { id: 3, text: "Rail Freight", icon: TrainFrontTunnel }
        ]
    };

    return (
        <section className='mb-10'>
            <div className='relative min-h-[40rem] md:min-h-[28rem] bg-[url(/assets/images/bg-2.png)] bg-[50%] bg-cover bg-no-repeat'>
                <div className='linearGradient absolute flex flex-col gap-20 items-center justify-center top-0 right-0 w-full h-full px-4'>
                    <form className='w-full md:w-[33rem] md:mt-10 px-4'>
                        <h2 className='textShadow text-white text-xl md:text-3xl font-extrabold leading-[1.3] mb-4 tracking-tighter'>Track Your Shipment</h2>
                        <TrackingInput
                            className=""
                            setTrackingError={setTrackingError}
                            setOrder={setOrder}
                            setTrackingCode={setTrackingCode}
                            inputValue={inputValue}
                            setInputValue={setInputValue}
                            setIsTracking={setIsTracking}
                        />
                    </form>

                    <div className="flex justify-center w-full -mb-[120px]">
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-0 mx-4 items-end w-full md:w-full lg:w-3/5 h-fit md:h-[173px] rounded-md shadow-md z-10'>
                            <div>
                                <div className='p-4 flex flex-col items-center gap-2 bg-white rounded-md md:rounded-r-none md:rounded-l-md cursor-pointer hover:text-red-600 hover:shadow-custom-shadow'>
                                    <Image src={"/assets/icons/glo-core-online.svg"} width={35} height={35} alt='' />
                                    <p className='font-bold text-sm tracking-tighter'>Shop Now</p>
                                    <p className='text-gray-600 text-xs text-center tracking-tighter'>Find the right service</p>
                                </div>
                            </div>
                            <div>
                                <div className='p-4 flex flex-col items-center gap-2 bg-white rounded-md md:rounded-none cursor-pointer hover:text-red-600 hover:shadow-custom-shadow'>
                                    <Image src={"/assets/icons/glo-core-getaquote.svg"} width={35} height={35} alt='' />
                                    <p className='font-bold text-sm tracking-tighter'> Get a Quote</p>
                                    <p className='text-gray-600 text-xs text-center tracking-tighter'>Estimate cost to share and compare</p>
                                </div>
                            </div>
                            <div className='relative p-4 flex flex-col items-center gap-2 bg-white rounded-md md:rounded-l-md cursor-pointer hover:text-red-600 hover:shadow-custom-shadow h-full rounded-r-md overflow-hidden'>
                                <Image src={"/assets/icons/glo-core-getaquote.svg"} width={35} height={35} alt='' />
                                <p className='font-bold text-sm tracking-tighter'>  SwiftShipping for Business</p>
                                <p className='text-gray-600 text-xs text- tracking-tighter'>Shipping regularly? Request a business account and profit from exclusive benefits</p>
                                <div className='absolute -right-40 -top-20 size-40 bg-yellow-500 rotate-45'></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <main className='max-w-[1280px] mx-auto px-4 py-20 md:px-8 mt-20 mb-10 md:mt-40 flex flex-col items-center border-b border-gray-300'>
                <div className='flex flex-col items-center gap-6 lg:flex-row-reverse w-full'>
                    <div className='h-full min-h-[250px] md:min-h-[540px] w-full bg-[url(/assets/images/image-001.jpeg)] bg-cover bg[50%]'>
                    </div>
                    <div className='w-full lg:-mr-10'>
                        <CardContainer content={parcelAndDocument} />
                    </div>
                </div>
                <div className='flex flex-col items-center gap-6 lg:flex-row w-full mt-10 md:mt-40'>
                    <div className='h-full min-h-[250px] md:min-h-[540px] w-full bg-[url(/assets/images/workers-at-port.jpeg)] bg-cover bg[50%]'>
                    </div>
                    <div className='w-full lg:-ml-10'>
                        <CardContainer content={cargoShipping} />
                    </div>
                </div>
                <div className='flex flex-col md:flex-row gap-6 mt-10 md:mt-40'>
                    <ContentCard heading='Green logistics' bgImg='core-global.jpeg' text='Sustainable business begins with sustainable supply chains. As the pioneer of green logistics, we have an unmatched portfolio of green logistics solutions. Find out what we have to offer, why we’re committed to sustainability, and how our industry is helping deliver an even better world.' />
                    <ContentCard heading='SwiftShipping Global Connectedness Report' bgImg='innovation.jpeg' text='The SwiftShipping Global Connectedness Report 2024 reveals that globalization is at a record high – despite the pandemic and geopolitical conflicts.' />
                </div>
            </main>
        </section>
    )
}

export default MainSection
