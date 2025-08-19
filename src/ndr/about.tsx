import React from 'react'
import Image from 'next/image'

export default function About() {
  return (
    <div className="bg-[rgba(210,227,255,0.9)]  mt-10">
      <div className="container mx-auto p-4 ">
        <div className="content flex flex-col items-center justify-center gap-5 md:gap-7">
          <div className="title-container md:mt-7 lg:mt-8 2xl:mt-10">
            <div className="title">
              <h2
                className="text-2xl font-semibold text-center leading-relaxed mb-4 md:text-2xl md:text-3xl xl:text-4xl"
                style={{ color: '#002868' }}
              >
                Know More About Nation One Debt Relief
              </h2>
            </div>
          </div>

          <div className="about-container flex flex-col items-center justify-center gap-5 md:flex-row md:gap-7 lg:gap-8  xl:px-25 md:mb-8 xl:mb-12 2xl:px-40 2xl:mb-10">
            <div className="left hidden md:block md:w-1/4 lg:w-[18%] 2xl:w-[15%]  md:flex md:justify-center">
              <div className="image-container md:w-[300px] md:h-[300px] md:rounded-full overflow-hidden flex items-center justify-center"
                style={{
                  minHeight: "400px",
                  minWidth: "120px",
                  borderRadius: "100px",
                  background: "#e5eaf2"
                }}
              >
                <Image
                  src="/about-1.webp"
                  alt="About Nation One Debt Relief"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                  style={{
                    width: "100%",
                    height: "100%",
                    minHeight: "400px",
                    minWidth: "120px",
                    borderRadius: "100px"
                  }}
                />
              </div>
            </div>

            <div className="mid w-full flex flex-col items-center justify-center gap-4 md:w-3/4 lg:w-[65%] 2xl:w-[65%] md:items-start">
              <div className="about-description">
                <p className="text-sm lg:text-base  font-normal text-gray-900 leading-relaxed text-justify">
                  Nation One Debt Relief differentiates itself via its market knowledge, personalized approach, and commitment to your success. In order to reduce interest rates, reduce remaining balances, and establish feasible repayment plans, we engage directly with creditors through a team of expert negotiators. Our method is straightforward to understand, open, and customized to meet your financial objectives.
                </p>
              </div>

              <div className="line w-full h-px bg-gray-900 opacity-40 xl:opacity-60 xl:mt-1 xl:mb-1 "></div>

              <div className="about-reasons-title w-full">
                <h4 className="w-full text-base lg:text-lg xl:text-xl font-semibold text-gray-700 text-left">Reasons why you should consider us:</h4>
              </div>

              <div className="features-container w-full">
                <div className="about-features w-full flex flex-col justify-start items-start gap-1 xl:gap-2">
                  <div className="about-feature-item w-full flex items-center justify-start gap-2">
                    <div className="feature-icon w-4 h-4 flex items-center justify-center">
                      <svg className="w-4 h-4 text-[#F31B47]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2ZM12 20C16.4267 20 20 16.4267 20 12C20 7.57333 16.4267 4 12 4C7.57333 4 4 7.57333 4 12C4 16.4267 7.57333 20 12 20ZM12 18C8.68 18 6 15.32 6 12C6 8.68 8.68 6 12 6C15.32 6 18 8.68 18 12C18 15.32 15.32 18 12 18ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z"></path>
                      </svg>
                    </div>
                    <div className="description">
                      <p className="text-sm lg:text-base font-normal leading-relaxed" style={{ color: '#1E1E1E' }}>Personalized Debt Solutions</p>
                    </div>
                  </div>
                  <div className="about-feature-item w-full flex items-center justify-start gap-2">
                    <div className="feature-icon w-4 h-4">
                      <svg className="w-4 h-4 text-[#F31B47]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2ZM12 20C16.4267 20 20 16.4267 20 12C20 7.57333 16.4267 4 12 4C7.57333 4 4 7.57333 4 12C4 16.4267 7.57333 20 12 20ZM12 18C8.68 18 6 15.32 6 12C6 8.68 8.68 6 12 6C15.32 6 18 8.68 18 12C18 15.32 15.32 18 12 18ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z"></path>
                      </svg>
                    </div>
                    <div className="description">
                      <p className="text-sm lg:text-base font-normal leading-relaxed" style={{ color: '#1E1E1E' }}>Expert Negotiation</p>
                    </div>
                  </div>
                  <div className="about-feature-item w-full flex items-center justify-start gap-2">
                    <div className="feature-icon w-4 h-4">
                      <svg className="w-4 h-4 text-[#F31B47]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2ZM12 20C16.4267 20 20 16.4267 20 12C20 7.57333 16.4267 4 12 4C7.57333 4 4 7.57333 4 12C4 16.4267 7.57333 20 12 20ZM12 18C8.68 18 6 15.32 6 12C6 8.68 8.68 6 12 6C15.32 6 18 8.68 18 12C18 15.32 15.32 18 12 18ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z"></path>
                      </svg>
                    </div>
                    <div className="description">
                      <p className="text-sm lg:text-base font-normal leading-relaxed" style={{ color: '#1E1E1E' }}>One Easy Monthly Payment</p>
                    </div>
                  </div>
                  <div className="about-feature-item w-full flex items-center justify-start gap-2">
                    <div className="feature-icon w-4 h-4">
                      <svg className="w-4 h-4 text-[#F31B47]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2ZM12 20C16.4267 20 20 16.4267 20 12C20 7.57333 16.4267 4 12 4C7.57333 4 4 7.57333 4 12C4 16.4267 7.57333 20 12 20ZM12 18C8.68 18 6 15.32 6 12C6 8.68 8.68 6 12 6C15.32 6 18 8.68 18 12C18 15.32 15.32 18 12 18ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z"></path>
                      </svg>
                    </div>
                    <div className="description">
                      <p className="text-sm lg:text-base font-normal leading-relaxed" style={{ color: '#1E1E1E' }}>Continuous Support and Guidance</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="right hidden lg:block lg:w-[18%] 2xl:w-[15%] lg:flex lg:justify-center">
              <div
                className="image-container lg:w-[260px] lg:h-[300px] lg:rounded-full"
                style={{
                  backgroundImage: "url('/about-2.webp')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  minHeight: "400px",
                  minWidth: "120px",
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
