'use client'

import { useEffect, useRef } from 'react'

interface TrustedFormProps {
  onCertUrlReady: (certUrl: string) => void
}

export default function TrustedForm({ onCertUrlReady }: TrustedFormProps) {
  const certUrlRef = useRef<string>('')

  useEffect(() => {
    // Initialize TrustedForm
    const initTrustedForm = () => {
      // Check if script is already loaded
      if (document.querySelector('script[src*="trustedform.js"]')) {
        return
      }
      
      // Create script element
      const tf = document.createElement('script')
      tf.type = 'text/javascript'
      tf.async = true
      tf.src = 'https://api.trustedform.com/trustedform.js'

      // Set configuration variables BEFORE loading script
      ;(window as any).field = process.env.NEXT_PUBLIC_TRUSTEDFORM_FIELD || 'xxTrustedFormCertUrl'
      ;(window as any).provideReferrer = process.env.NEXT_PUBLIC_TRUSTEDFORM_PROVIDE_REFERRER === 'true' || false

      // Optional: Enable sandbox mode for testing
      if (process.env.NEXT_PUBLIC_TRUSTEDFORM_SANDBOX === 'true') {
        ;(window as any).sandbox = true
      }

      // Insert script
      const s = document.getElementsByTagName('script')[0]
      s.parentNode?.insertBefore(tf, s)
    }

    // Initialize TrustedForm
    initTrustedForm()

    // Check for cert URL every 100ms for up to 10 seconds
    const checkCertUrl = () => {
      // Try multiple ways to get the certificate URL
      let certUrl = document.getElementById('xxTrustedFormCertUrl_0')?.getAttribute('value')
      
      // Method 2: Try getting it from the window object
      if (!certUrl && (window as any).TrustedForm) {
        try {
          certUrl = (window as any).TrustedForm.getCertUrl()
        } catch (e) {
          // TrustedForm.getCertUrl() not available yet
        }
      }
      
      // Method 3: Try getting it from the window object properties
      if (!certUrl && (window as any).xxTrustedFormCertUrl) {
        certUrl = (window as any).xxTrustedFormCertUrl
      }
      
      // Method 4: Try getting it from the script tag
      if (!certUrl) {
        const script = document.querySelector('script[src*="trustedform.js"]')
        if (script) {
          const scriptContent = script.innerHTML
          const match = scriptContent.match(/certUrl["']?\s*:\s*["']([^"']+)["']/)
          if (match) {
            certUrl = match[1]
          }
        }
      }
      
      // Method 5: Check for any element with cert URL pattern
      if (!certUrl) {
        const elements = document.querySelectorAll('[id*="TrustedForm"], [id*="trustedform"]')
        elements.forEach(el => {
          const value = el.getAttribute('value')
          if (value && value.includes('trustedform.com')) {
            certUrl = value
          }
        })
      }
      
      if (certUrl && certUrl !== certUrlRef.current) {
        certUrlRef.current = certUrl
        onCertUrlReady(certUrl)
        return
      }
    }

    const interval = setInterval(checkCertUrl, 100)
    const timeout = setTimeout(() => {
      clearInterval(interval)
      // If no cert URL after 10 seconds, call with empty string
      if (!certUrlRef.current) {
        onCertUrlReady('')
      }
    }, 10000)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [onCertUrlReady])

  return (
    <>
      {/* Hidden TrustedForm fields - No name attributes to prevent URL pollution */}
      <input type="hidden" id="xxTrustedFormCertUrl_0" />
      <input type="hidden" id="xxTrustedFormToken_0" />
    </>
  )
}
