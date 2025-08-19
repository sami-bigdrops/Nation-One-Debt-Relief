import React from 'react'

export default function Choose() {
  return (
    <div
      className="w-full h-full px-4 py-5 md:px-7 md:py-8 xl:py-22"
      style={{
        backgroundImage: "linear-gradient(180deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/choose-bg.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container mx-auto">
        <div className="content">
          <div className="choose-container w-full h-full flex flex-col items-center justify-center gap-2.5 md:gap-4">
            <div className="choose-title">
              <h2 className="text-base md:text-xl xl:text-2xl  xl:text-3xl 2xl:text-4xl font-medium text-white text-center m-0 leading-relaxed">We Have Helped Over</h2>
            </div>

            <div className="choose-btn flex items-center justify-center w-full h-full max-w-50 md:max-w-60 2xl:max-w-110 ">
              <div className="ch-btn w-full bg-[#BF0A2F] py-2 px-5 2xl:px-8 2xl:py-5 flex rounded-[28px] 2xl:rounded-full justify-center items-center text-base md:text-xl xl:text-3xl 2xl:text-5xl text-white font-semibold border-none relative overflow-hidden text-shadow-[5px_8px_10px_rgba(0,0,0,0.5)] bg-gradient-to-r from-[#BF0A2F] to-[#DF413F]">100+</div>
            </div>

            <div className="choose-title-2">
              <h2 className="text-base md:text-xl xl:text-3xl 2xl:text-4xl font-medium text-white text-center m-0 leading-relaxed max-w-[120px] md:max-w-[150px] xl:max-w-[250px] 2xl:max-w-[350px]">Individuals to Get Debt Relief</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
