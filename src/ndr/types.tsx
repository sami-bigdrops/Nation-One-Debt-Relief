import React from 'react'
import Image from 'next/image'

export default function Types() {
  return (
    <div className="p-4 md:px-20 md:py-8 mt-4">
      <div className="container mx-auto">
        <div className="content flex flex-col gap-5 md:gap-8">
          <div className="title-container flex flex-col items-center justify-center gap-2.5 md:gap-2.8">
            <div className="title md:max-w-[92%]">
              <h2 className="text-2xl font-semibold text-center mb-4 md:text-2xl md:text-3xl xl:text-4xl" style={{ color: '#002868' }}>Types of Debt, Nation One Debt Relief Helps With</h2>
            </div>
            <div className="description 2xl:mb-3 text-center text-sm md:text-base lg:text-lg 2xl:text-2xl 2xl:max-w-[90%] font-normal leading-relaxed" style={{ color: '#1E1E1E' }}>
              <p>We cover most unsecured debt and negotiate with major credit card issuers and banks every day to get you the best possible settlement.</p>
            </div>
          </div>

          <div className="types-grid w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-10 lg:gap-10 2xl:px-40 2xl:py-10">
            <div className="type-card w-full h-full bg-[#fdf5f7] rounded-[10px] p-4 md:p-[18px] flex flex-col items-center justify-center border-2 border-[#BF0A30] gap-2.5">
              <div className="type-card-img w-15 h-15 2xl:w-20 2xl:h-20 ">
                <Image src="/type-1.webp" alt="Credit Card Debt" width={60} height={60} className="w-full h-full object-cover" />
              </div>
              <div className="type-card-title w-full flex items-center justify-center">
                <h3 className="text-sm md:text-base 2xl:text-lg font-semibold text-[#F31B47] text-center">Credit Card Debt</h3>
              </div>
            </div>

            <div className="type-card w-full h-full bg-[#fdf5f7] rounded-[10px] p-4 md:p-[18px] flex flex-col items-center justify-center border-2 border-[#BF0A30] gap-2.5">
              <div className="type-card-img w-15 h-15 2xl:w-20 2xl:h-20 ">
                <Image src="/type-2.webp" alt="Personal Loans" width={60} height={60} className="w-full h-full object-cover" />
              </div>
              <div className="type-card-title w-full flex items-center justify-center">
                <h3 className="text-sm md:text-base 2xl:text-lg font-semibold text-[#F31B47] text-center">Personal Loans</h3>
              </div>
            </div>

            <div className="type-card w-full h-full bg-[#fdf5f7] rounded-[10px] p-4 md:p-[18px] flex flex-col items-center justify-center border-2 border-[#BF0A30] gap-2.5">
              <div className="type-card-img w-15 h-15 2xl:w-20 2xl:h-20 ">
                <Image src="/type-3.webp" alt="Medical Bills" width={60} height={60} className="w-full h-full object-cover" />
              </div>
              <div className="type-card-title w-full flex items-center justify-center">
                <h3 className="text-sm md:text-base 2xl:text-lg font-semibold text-[#F31B47] text-center">Medical Bills</h3>
              </div>
            </div>

            <div className="type-card w-full h-full bg-[#fdf5f7] rounded-[10px] p-4 md:p-[18px] flex flex-col items-center justify-center border-2 border-[#BF0A30] gap-2.5">
              <div className="type-card-img w-15 h-15 2xl:w-20 2xl:h-20 ">
                <Image src="/type-4.webp" alt="Payday Loans" width={60} height={60} className="w-full h-full object-cover" />
              </div>
              <div className="type-card-title w-full flex items-center justify-center">
                <h3 className="text-sm md:text-base 2xl:text-lg font-semibold text-[#F31B47] text-center">Payday Loans</h3>
              </div>
            </div>

            <div className="type-card w-full h-full bg-[#fdf5f7] rounded-[10px] p-4 md:p-[18px] flex flex-col items-center justify-center border-2 border-[#BF0A30] gap-2.5">
              <div className="type-card-img w-15 h-15 2xl:w-20 2xl:h-20 ">
                <Image src="/type-5.webp" alt="Private Student Loans" width={60} height={60} className="w-full h-full object-cover" />
              </div>
              <div className="type-card-title w-full flex items-center justify-center">
                <h3 className="text-sm md:text-base 2xl:text-lg font-semibold text-[#F31B47] text-center">Private Student Loans</h3>
              </div>
            </div>

            <div className="type-card w-full h-full bg-[#fdf5f7] rounded-[10px] p-4 md:p-[18px] flex flex-col items-center justify-center border-2 border-[#BF0A30] gap-2.5">
              <div className="type-card-img w-15 h-15 2xl:w-20 2xl:h-20 ">
                <Image src="/type-6.webp" alt="Business Debt" width={60} height={60} className="w-full h-full object-cover" />
              </div>
              <div className="type-card-title w-full flex items-center justify-center">
                <h3 className="text-sm md:text-base 2xl:text-lg font-semibold text-[#F31B47] text-center">Business Debt</h3>
              </div>
            </div>
          </div>

          <div className="type-description text-center">
            <p className="text-xs md:text-sm lg:text-base 2xl:text-lg font-normal text-center" style={{ color: '#1E1E1E' }}>...And Many More!!</p>
          </div>
        </div>
      </div>
    </div>
  )
}
