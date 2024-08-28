import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Footer() {
    return (
        <footer className='max-w-[1280px] mx-auto'>
            <div className='flex flex-col md:flex-row justify-between px-4 lg:px-16 pb-10 mb-10'>
                <div>
                    <p className='text-red-600 font-bold mt-6 md:mt-0'>Quick Links</p>
                    <div className='flex flex-col gap-4 text-sm text-gray-600 mt-4'>
                        <Link href={"#"} className='hover:text-black hover:underline'>Customer&apos;s service</Link>
                        <Link href={"#"} className='hover:text-black hover:underline'>Digital partners and integration</Link>
                        <Link href={"#"} className='hover:text-black hover:underline'>Developer&apos;s Portal</Link>
                        <Link href={"#"} className='hover:text-black hover:underline'>Get a quote</Link>
                        <Link href={"#"} className='hover:text-black hover:underline'>SwiftShipping for business</Link>
                    </div>
                </div>
                <div>
                    <p className='font-bold mt-6 md:mt-0'>Our Divisions</p>
                    <div className='flex flex-col gap-4 text-sm text-gray-600 mt-4'>
                        <Link href={"#"} className='hover:text-black hover:underline'>SwiftShipping Express</Link>
                        <Link href={"#"} className='hover:text-black hover:underline'>SwiftShipping Global Forward</Link>
                        <Link href={"#"} className='hover:text-black hover:underline'>Other Global Division</Link>
                    </div>
                </div>
                <div>
                    <p className='font-bold mt-6 md:mt-0'>Company information</p>
                    <div className='flex flex-col gap-4 text-sm text-gray-600 mt-4'>
                        <Link href={"#"} className='hover:text-black hover:underline'>About SwiftShipping</Link>
                        <Link href={"#"} className='hover:text-black hover:underline'>Delivered</Link>
                        <Link href={"#"} className='hover:text-black hover:underline'>Career</Link>
                        <Link href={"#"} className='hover:text-black hover:underline'>Press Center</Link>
                        <Link href={"#"} className='hover:text-black hover:underline'>Investors</Link>
                        <Link href={"#"} className='hover:text-black hover:underline'>Brand partners </Link>
                    </div>
                </div>
            </div>
            <div className='bg-gray-100 pt-10 pb-8 px-4 lg:px-16'>
                <Image src={"/swift-logo-2.png"} width={120} height={70} alt='' />
                <div className='flex flex-col md:flex-row gap-4 text-sm text-gray-600 mt-4'>
                    <Link href={"#"} className='hover:text-black hover:underline'>Legal Notice</Link>
                    <Link href={"#"} className='hover:text-black hover:underline'>Terms of use</Link>
                    <Link href={"#"} className='hover:text-black hover:underline'>Privacy notice</Link>
                    <Link href={"#"} className='hover:text-black hover:underline'>Dispute resolution</Link>
                    <Link href={"#"} className='hover:text-black hover:underline'>Additional Information</Link>
                    <Link href={"#"} className='hover:text-black hover:underline'>Brand partners </Link>
                </div>
                <small className='flex justify-center mt-6 text-gray-600'>2024 © - all rights reserved</small>
            </div>
        </footer>
    )
}

export default Footer
