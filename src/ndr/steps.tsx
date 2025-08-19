import React from 'react'
import Image from 'next/image'

export default function Steps() {
  return (
    <div className="mt-10 mb-10">
      <div className="container mx-auto gap-4 xl:gap-6">
        <div className="content flex flex-col p-4 gap-10">
          <div className="title-container">
            <div className="title">
              <h2 className="text-2xl font-semibold text-center leading-relaxed mb-4 md:text-2xl md:text-3xl xl:text-4xl" style={{ color: '#002868' }}>Get Debt Relief in Just 3 Steps!</h2>
            </div>
          </div>
          
          <div className="steps-grid grid grid-cols-1 gap-15 xl:gap-15 justify-items-center h-full md:grid-cols-3 lg:px-12 xl:px-50 md:gap-0">
            <div className="steps-wrapper flex items-center justify-center gap-4 w-full h-full max-w-50 lg:max-w-60 xl:max-w-78 relative">
              <div className="step-card flex flex-col items-center pt-8 px-4 pb-4 rounded-2xl overflow-visible border-3 md:border-4 border-[#E00C37] gap-4 w-full md:h-79 lg:h-90 xl:h-95 2xl:h-84 md:pt-11">
                <div className="number text-lg lg:text-xl 2xl:text-2xl font-semibold absolute left-1/2 -top-7 2xl:-top-8 text-white bg-[#E00C37] rounded-full z-10 -translate-x-1/2 w-14 h-14 lg:w-16 lg:h-16 2xl:w-16 2xl:h-16 flex items-center justify-center md:text-xl md:w-14 md:h-14">1</div>
                <div className="step-info w-full flex flex-col items-center justify-center gap-2.5 2xl:gap-4 lg:gap-3">
                  <div className="step-title">
                    <h3 className="text-base text-center m-0 font-medium md:text-base lg:text-lg xl:text-xl" style={{ color: '#003995' }}>Free Consultation & Financial Assessment</h3>
                  </div>
                  <div className="step-image w-15 h-15 lg:w-18 lg:h-18 xl:w-20 xl:h-20">
                    <Image 
                      src="/step-1.webp" 
                      alt="Step 1" 
                      width={60} 
                      height={60} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="step-description">
                    <p className="text-sm font-normal text-center m-0 font-light md:text-sm lg:text-base " style={{ color: '#1E1E1E' }}>
                      Evaluate the client's financial situation at no cost, analyzing debt, income, and financial goals for the best possible relief options.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="steps-wrapper flex items-center justify-center gap-4 w-full h-full max-w-50 lg:max-w-60 xl:max-w-75 relative">
              <div className="step-card flex flex-col items-center pt-8 px-4 pb-4 rounded-2xl overflow-visible border-3 md:border-4 border-[#E00C37] gap-4 w-full md:h-79 lg:h-90 xl:h-95 2xl:h-84 md:pt-11">
                <div className="number text-lg lg:text-xl 2xl:text-2xl font-semibold absolute left-1/2 -top-7 2xl:-top-8 text-white bg-[#E00C37] rounded-full z-10 -translate-x-1/2 w-14 h-14 lg:w-16 lg:h-16 2xl:w-16 2xl:h-16 flex items-center justify-center md:text-xl md:w-14 md:h-14">2</div>
                <div className="step-info w-full flex flex-col items-center justify-center gap-2.5 lg:gap-3 2xl:gap-4">
                  <div className="step-title">
                      <h3 className="text-base text-center m-0 font-medium md:text-base lg:text-lg xl:text-xl" style={{ color: '#003995' }}>Personalized Debt Relief Plan</h3>
                  </div>
                  <div className="step-image w-15 h-15 lg:w-18 lg:h-18 xl:w-20 xl:h-20">
                    <Image 
                      src="/step-2.webp" 
                      alt="Step 2" 
                      width={60} 
                      height={60} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="step-description ">
                    <p className="text-sm font-normal text-center m-0 md:text-sm lg:text-base" style={{ color: '#1E1E1E' }}>Develop a tailored strategy and negotiate with creditors to reduce debt, lower interest rates, and create a feasible repayment plan.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="steps-wrapper flex items-center justify-center gap-4 w-full h-full max-w-50 lg:max-w-60 xl:max-w-75 relative">
              <div className="step-card flex flex-col items-center pt-8 px-4 pb-4 rounded-2xl overflow-visible border-3 md:border-4 border-[#E00C37] gap-4 w-full md:h-79 lg:h-90 xl:h-95 2xl:h-84 md:pt-11">
                <div className="number text-lg lg:text-xl 2xl:text-2xl font-semibold absolute left-1/2 -top-7 2xl:-top-8 text-white bg-[#E00C37] rounded-full z-10 -translate-x-1/2 w-14 h-14 lg:w-16 lg:h-16 2xl:w-16 2xl:h-16 flex items-center justify-center md:text-xl md:w-14 md:h-14">3</div>
                <div className="step-info w-full flex flex-col items-center justify-center gap-2.5 lg:gap-3 2xl:gap-4">
                  <div className="step-title">
                    <h3 className="text-base text-center m-0 font-medium md:text-base lg:text-lg xl:text-xl" style={{ color: '#003995' }}>Structured Payments & Financial Stability</h3>
                  </div>
                  <div className="step-image w-15 h-15 lg:w-18 lg:h-18 xl:w-20 xl:h-20">
                    <Image 
                      src="/step-3.webp" 
                      alt="Step 3" 
                      width={60} 
                      height={60} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="step-description">
                    <p className="text-sm font-normal text-center m-0 md:text-sm lg:text-base" style={{ color: '#1E1E1E' }}>Implement a manageable payment plan leading to debt relief, financial freedom, and long-term stability.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
