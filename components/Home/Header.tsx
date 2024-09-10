import { ChevronRight, Menu } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'

function Header() {
    return (
        <header>
            <nav className='backgroundGradient flex items-center justify-between py-4 px-[42px]'>
                <Link href={"/"}>
                    <Image src={"/swift-logo-2.png"} width={120} height={70} alt='' />
                </Link>
                <div>
                    <Link href={"/tracking"} className='hidden md:flex items-center hover:text-red-600'>Track Order <ChevronRight /></Link>

                </div>
                <div className='md:hidden'>
                    <DropdownMenu>
                        <DropdownMenuTrigger><Menu strokeWidth={3} color='#D40511' size={32} /></DropdownMenuTrigger>
                        <DropdownMenuContent className='w-screen h-[40vh] mt-5'>
                            <DropdownMenuLabel>
                                <Link href={"/tracking"} className='flex items-center hover:text-red-600'>Track Order <ChevronRight /></Link>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </nav>

        </header>
    )
}

export default Header
