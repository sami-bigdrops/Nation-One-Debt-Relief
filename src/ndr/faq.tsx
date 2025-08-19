'use client'

import React, { useState } from 'react'

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(0)

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? -1 : index)
  }

  const faqData = [
    {
      question: "What is debt relief?",
      answer: "Debt relief is a process that helps reduce, settle, or restructure outstanding debts for easier repayment."
    },
    {
      question: "How does debt settlement work?",
      answer: "A company negotiates with creditors to lower the total amount owed, allowing you to pay less than the original debt."
    },
    {
      question: "Is debt relief the same as bankruptcy?",
      answer: "No, debt relief helps reduce or settle debts without legal bankruptcy proceedings"
    },
    {
      question: "Will debt relief stop creditor calls?",
      answer: "Once you enroll in a program, creditors may reduce or stop collection calls, especially after negotiations begin."
    }
  ]

  return (
    <div className=' p-4 mt-6 mb-6'>
      <div className="container mx-auto">
        <div className="content">
          <div className="title-container mb-12">
            <div className="title">
              <h2 className="text-2xl font-semibold text-center leading-relaxed mb-4 md:text-2xl md:text-3xl xl:text-4xl" style={{ color: '#002868' }}>Frequently Asked Questions</h2>
            </div>
          </div>
          <div className="quetions-container">
            <div className="faq-container w-full  max-w-[800px]  mx-auto my-5 flex flex-col gap-4">
              {faqData.map((faq, index) => (
                <div key={index} className={`faq-item border border-[#03334E] rounded-lg overflow-hidden ${activeIndex === index ? 'active' : ''}`}>
                  <div 
                    className="faq-header flex justify-between items-center p-4 bg-white cursor-pointer"
                    onClick={() => toggleFAQ(index)}
                  >
                    <h3 className="text-sm md:text-base lg:text-lg xl:text-2xl  font-semibold m-0 text-[#313863]">{faq.question}</h3>
                    <svg 
                      className={`toggle-icon w-4 h-4 md:w-4 lg:w-5 lg:h-5  md:h-4 xl:w-6 xl:h-6 transition-transform duration-300 ease-in-out text-[#03334E] ${activeIndex === index ? 'rotate-45' : ''}`} 
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 4V20M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div 
                    className={`faq-content overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] bg-white px-4 ${
                      activeIndex === index 
                        ? 'max-h-[1000px] pb-4 opacity-100 transform translate-y-0' 
                        : 'max-h-0 opacity-0 transform -translate-y-2.5'
                    }`}
                  >
                    <div className="faq-description text-justify max-w-[800px]">
                      <p className="text-xs md:text-sm lg:text-base xl:text-lg  text-[#1E1E1E]">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
