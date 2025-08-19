'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

interface UtmParams {
  utm_source: string
  utm_id: string
  utm_s1: string
}

export default function ThankYouPage() {
  const searchParams = useSearchParams()
  const [utmParams, setUtmParams] = useState<UtmParams>({
    utm_source: '',
    utm_id: '',
    utm_s1: ''
  })

  useEffect(() => {
    // Helper function to get cookie value
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift() || '';
      return '';
    };

    // Helper function to set cookie
    const setCookie = (name: string, value: string, days: number = 30) => {
      const expires = new Date();
      expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
      document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
    };

    // Get UTM parameters from URL
    const utm_source = searchParams.get('utm_source') || ''
    const utm_id = searchParams.get('utm_id') || ''
    const utm_s1 = searchParams.get('utm_s1') || ''

    // If URL parameters exist, use them and save to cookies
    if (utm_source || utm_id || utm_s1) {
      if (utm_source) setCookie('subid1', utm_source);
      if (utm_id) setCookie('subid2', utm_id);
      if (utm_s1) setCookie('subid3', utm_s1);
      
      setUtmParams({ utm_source, utm_id, utm_s1 })
    } else {
      // If no URL parameters, try to read from cookies
      const cookieUtmSource = getCookie('subid1') || '';
      const cookieUtmId = getCookie('subid2') || '';
      const cookieUtmS1 = getCookie('subid3') || '';
      
      setUtmParams({
        utm_source: cookieUtmSource,
        utm_id: cookieUtmId,
        utm_s1: cookieUtmS1
      })
    }
  }, [searchParams])

  return (
    <main>
      {/* Thank You Section */}
      <section id="thankyou" className="py-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="thankyou-content text-center max-w-2xl mx-auto">
            <div className="mb-8">
              <Image 
                src="/checked.png" 
                alt="Thank You Image" 
                width={80} 
                height={80}
                className="mx-auto"
              />
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              Thank you!
            </h3>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Thank you for requesting information from Nation One Debt Relief. You will be contacted by a Customer Specialist shortly.
            </p>
            <div className="thankyou-contact-container bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h4 className="text-xl font-semibold text-gray-800 mb-3">
                For immediate assistance
              </h4>
              <p className="text-gray-600">
                Call us at{' '}
                <a 
                  href="tel:+18664951543" 
                  className="text-red-600 font-semibold hover:text-red-700 transition-colors"
                >
                  1-(866)-495-1543
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Thank You Divider */}
      <div className="thankyou-divider h-1 bg-gradient-to-r from-red-500 to-blue-600"></div>

      {/* Ad Section */}
      <section id="ad" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="ad-content text-center max-w-4xl mx-auto">
            <p className="text-xl text-gray-700 mb-8 font-medium">
              In addition to debt relief, here are 2 great offers.
            </p>

            <div className="ad-images grid grid-cols-1 md:grid-cols-1 gap-8">
              <a 
                href={`https://www.platinum-home-track.com/28KL6/49FHNSP/?uid=112&sub1=ndr_${utmParams.utm_source}&sub2=${utmParams.utm_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block transition-transform hover:scale-105"
              >
                <Image 
                  src="/ad3.jpg" 
                  alt="Ads Image" 
                  width={400} 
                  height={300}
                  className="w-full h-auto rounded-lg shadow-md"
                />
              </a>
              <a 
                href={`https://www.platinum-home-track.com/28KL6/49FHNSP/?uid=114&sub1=ndr_${utmParams.utm_source}&sub2=${utmParams.utm_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block transition-transform hover:scale-105"
              >
                <Image 
                  src="/ad1.png" 
                  alt="Ads Image" 
                  width={400} 
                  height={300}
                  className="w-full h-auto rounded-lg shadow-md"
                />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
