import { Menu } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '../ui/navigation-menu'

function Header() {
    return (
        <header className='mb-10'>
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
            <div className='relative min-h-[40rem] md:min-h-[28rem] bg-[url(/assets/images/bg-1.jpg)] bg-[50%] bg-cover bg-no-repeat'>
                {/* <Image src={"/assets/images/bg-1.jpg"} width={1500} height={420} alt='' className='w-auto h-[110%]' /> */}
                <div className='linearGradient absolute flex flex-col gap-20 items-center justify-center top-0 right-0 w-full h-full px-4'>
                    <form className='w-full md:w-[33rem] md:mt-10 px-4'>
                        <h2 className='textShadow text-white text-xl md:text-3xl font-extrabold leading-[1.3] mb-4 tracking-tighter'>Track Your Shipment</h2>
                        <div className='flex flex-col md:flex-row bg-white rounded-md relative'>
                            <div className='relative w-full'>
                                <input
                                    type="text"
                                    id="tracking-code"
                                    placeholder=" "
                                    className='w-full outline-none border-none px-4 pt-4 h-14 md:h-full rounded-md md:rounded-l-md peer'
                                    required
                                />
                                <label
                                    htmlFor="tracking-code"
                                    className='absolute left-4 top-4 tracking-tighter text-gray-400 text-base transition-all duration-200 ease-in-out cursor-text peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-xs  peer-valid:top-1 peer-valid:text-xs'
                                >
                                    Enter your tracking code
                                </label>
                            </div>
                            <button className='m-[3px] bg-red-600 inline-flex tracking-tighter items-center justify-center h-full py-3 px-6 text-base text-white font-bold rounded-b-md sm:rounded-none md:rounded-r-md hover:opacity-90'>
                                Track
                            </button>
                        </div>
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
        </header>
    )
}

export default Header
