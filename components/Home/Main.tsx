import React from 'react'
import CardContainer from '../common/CardContainer'
import { HandHelping, MapPinHouse, PackageOpen, PlaneTakeoff, Ship, TrainFrontTunnel, Truck } from 'lucide-react'
import ContentCard from '../common/ContentCard'

function MainSection() {
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
    }
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
    }
    return (
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
                <ContentCard heading='Green logistics' text='Sustainable business begins with sustainable supply chains. As the pioneer of green logistics, we have an unmatched portfolio of green logistics solutions. Find out what we have to offer, why we’re committed to sustainability, and how our industry is helping deliver an even better world.' />
                <ContentCard heading='SwiftShipping Global Connectedness Report' text='The SwiftShipping Global Connectedness Report 2024 reveals that globalization is at a record high – despite the pandemic and geopolitical conflicts.' />
            </div>
        </main>
    )
}

export default MainSection
