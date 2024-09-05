import { Menu } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '../ui/navigation-menu'

function Header() {
    return (
        <header>
            <nav className='backgroundGradient flex items-center justify-between py-4 px-[42px]'>
                <Image src={"/swift-logo-2.png"} width={120} height={70} alt='' />
                <div>
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>Track</NavigationMenuTrigger>
                                <NavigationMenuContent className='w-screen h-[60vh] border border-red-600'>
                                    <div>

                                    </div>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>Ship</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <NavigationMenuLink>Link</NavigationMenuLink>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>

                </div>
                <Menu strokeWidth={3} color='#D40511' size={32} />
            </nav>
            
        </header>
    )
}

export default Header
