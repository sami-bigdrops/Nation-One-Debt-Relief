import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#f8f9fa] p-5">
      <div className="container p-4 mx-auto">
        <div className="content flex flex-col items-center justify-center lg:mb-4 gap-4">
          <div className="footer-logo flex items-center justify-center w-30 md:w-40 h-auto">
            <Image src="/brand.svg" alt="Nation One Debt Relief" width={100} height={30} className="w-full h-auto" />
          </div>

          <p className="footer-text text-xs lg:mb-5 xl:text-sm  text-justify xl:max-w-[1000px] text-[#1E1E1E] leading-relaxed tracking-[0.2px]">
            Please note that all calls with the company may be recorded or monitored for quality assurance and training purposes. *Clients who are able to stay with the program and get all their debt settled realize approximate savings of 46% before fees, or 25% including our fees, over 24 to 48 months. All claims are based on enrolled debts. Not all debts are eligible for enrollment. Not all clients complete our program for various reasons, including their ability to save sufficient funds. Estimates based on prior results, which will vary based on specific circumstances. We do not guarantee that your debts will be lowered by a specific amount or percentage or that you will be debt-free within a specific period of time. We do not assume consumer debt, make monthly payments to creditors or provide tax, bankruptcy, accounting or legal advice or credit repair services. Not available in all states. Please contact a tax professional to discuss tax consequences of settlement. Please consult with a bankruptcy attorney for more information on bankruptcy. Depending on your state, we may be available to recommend a local tax professional and/or bankruptcy attorney. Read and understand all program materials prior to enrollment, including potential adverse impact on credit rating.
          </p>

          <div className="footer-links w-full flex items-center justify-center bg-[#FDDEE580] max-w-lg xl:max-w-3xl ">
            <div className="copyright w-full p-2 xl:p-4 flex flex-col items-center justify-center gap-2.5">
              <p className="text-xs text-center xl:text-sm text-[#1E1E1E] md:max-w-[420px] max-w-[184px] lg:max-w-[550px] 2xl:max-w-4xl">&copy; {currentYear} Nation One Debt Relief | All rights reserved | <Link href="/privacy-policy" className="text-xs xl:text-sm text-center text-[#1E1E1E] max-w-[184px] no-underline hover:text-[#666666] transition-colors">Privacy Policy</Link> | <Link href="/terms-of-use" className="text-xs xl:text-sm text-center text-[#1E1E1E] max-w-[184px] no-underline hover:text-[#666666] transition-colors">Terms and Conditions</Link> | <a href="https://www.hatsaltfolder.com/o-bflc-u47-530cb734b9a5090d7b137afe8d0836be" className="text-xs xl:text-sm text-center text-[#1E1E1E] max-w-[184px] no-underline hover:text-[#666666] transition-colors">Unsubscribe</a></p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
