'use client'

import React from 'react'
import Image from 'next/image'
import { useFormModal } from '../components/FormModalProvider'

export default function Info() {
  const { openModal } = useFormModal()
  
  const handleCTAClick = (e: React.MouseEvent) => {
    e.preventDefault()
    openModal()
  }

  return (
    <div className='p-4 md:px-16 md:py-8 xl:px-30 2xl:px-40 2xl:py-10 bg-[rgba(210,227,255,0.8)]'>
      <div className="container mx-auto">
        <div className="content">
          <div className="info-container w-full h-full flex flex-col-reverse md:flex-row items-center justify-center gap-2.5 md:gap-2.5">
            <div className="left w-full md:w-1/2 flex flex-col items-start justify-center gap-3">
              <div className="info-title text-left">
                <h2 className="text-base md:text-lg lg:text-2xl xl:text-3xl 2xl:mb-2 font-semibold leading-relaxed" style={{ color: '#002868' }}>
                  Feeling overwhelmed by credit card bills and high interest debt?
                </h2>
              </div>

              <div className="info-heading text-left">
                <h4 className="text-sm md:text-base lg:text-lg xl:text-2xl 2xl:mb-2 font-medium text-black">Common Signs of Financial Stress:</h4>
              </div>

              <div className="info-list w-full flex items-start 2xl:mb-1 justify-center">
                <ul className="info-list-ul w-full flex flex-col items-start justify-center gap-2.5 list-disc pl-4 m-0" style={{ color: '#1E1E1E' }}>
                  <li className="w-full flex list-item list-disc">
                    <p className="text-xs md:text-sm lg:text-base xl:text-lg  font-normal m-0 leading-relaxed" style={{ color: '#1E1E1E' }}>
                      You feel anxiety each month when your bills are due
                    </p>
                  </li>
                  <li className="w-full flex list-item list-disc">
                    <p className="text-xs md:text-sm lg:text-base xl:text-lg  font-normal m-0 leading-relaxed" style={{ color: '#1E1E1E' }}>
                      You struggle to make the minimum payments on your credit cards
                    </p>
                  </li>
                  <li className="w-full flex list-item list-disc">
                    <p className="text-xs md:text-sm lg:text-base xl:text-lg  font-normal m-0 leading-relaxed" style={{ color: '#1E1E1E' }}>
                      Your high interest debt balance is growing faster than you can keep up with
                    </p>
                  </li>
                </ul>
              </div>

              <div className="line w-full h-px bg-[#999999] opacity-100 md:my-2 2xl:mb-2"></div>

              <div className="info-text text-left">
                <p className="text-xs md:text-sm lg:text-base xl:text-lg  font-normal leading-relaxed" style={{ color: '#1E1E1E' }}>
                  Discover our 3-step plan to become debt-free and don&apos;t waste another day worrying about your debt.
                </p>
              </div>

            </div>

            <div className="right w-full md:w-1/2 flex items-center justify-center">
              <div className="image-container w-full flex items-center justify-center md:h-[400px]">
                <Image src="/info-img.webp" alt="info" width={400} height={300} className='w-full h-full object-contain' />
              </div>
            </div>
          </div>
          <div className="cta-btn-container w-full flex items-center justify-center m-0 mx-auto">
            <button 
              onClick={handleCTAClick}
              className="cta-btn w-full md:w-max bg-[#BF0A2F] mt-6 py-4 px-5 flex rounded-full justify-center items-center text-xs md:text-base lg:text-lg text-white font-normal cursor-pointer border-none relative overflow-hidden bg-gradient-to-r from-[#BF0A2F] to-[#DF413F] before:content-[''] before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:animate-[shimmer_1.5s_infinite]"
            >
              Get Your FREE Consultation Now!
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
