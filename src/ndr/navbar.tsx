import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Navbar() {
  return (
    <>
      {/* DESKTOP NAVBAR */}
      <div id="desktop-navbar" className="hidden md:block ">
        <div className="container mx-auto">
          <div className=" px-4 py-6 xl:px-45 flex justify-between items-center h-max">
            <Link href="/">
              <Image 
                src="/brand.svg" 
                alt="Nation One Debt Relief" 
                width={200} 
                height={60} 
                className="w-[220px] h-auto lg:w-[250px] lg:h-auto" 
              />
            </Link>
            <div className="flex items-center justify-center gap-2.5 cursor-pointer transition-all duration-300 ease-in-out">
              <a href="tel:+18664951543" className="no-underline text-gray-900 text-base lg:text-lg xl:text-xl font-semibold mb-0">
                Gives us a call <span className="font-semibold px-5 py-2.5 rounded border-2 border-transparent bg-[#F31B47] text-white transition-all duration-300 ease-in-out hover:border-[#F31B47] hover:bg-transparent hover:text-[#F31B47]">1-(866)-495-1543</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE / TABLET NAVBAR */}
      <div id="mobile-navbar" className='bg-white sm:hidden'>
        <div className="container">
          <div className="p-2.5 w-full flex flex-col-reverse justify-between items-center gap-4">
            <Link href="/">
              <Image src="/brand.svg" alt="Nation One Debt Relief" width={140} height={35} className="w-[140px] h-auto" />
            </Link>
                         <p className="text-base font-medium text-center mb-0">
               Gives us a call{" "}
               <a
                 href="tel:+18664951543"
                 className="font-semibold text-[#F31B47]"
               >
                 1-(866)-495-1543
               </a>
             </p>
          </div>
        </div>
      </div>
    </>
  )
}


