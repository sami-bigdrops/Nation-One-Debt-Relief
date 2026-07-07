'use client';

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import TrustedForm from "./TrustedForm";
import LoadingSpinner from "./LoadingSpinner";
import SubmissionOverlay from "./SubmissionOverlay";
import { lookupZip } from "@/lib/zipLookup";

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  zipCode: z.string().min(1, "Zip code is required"),
  city: z.string().optional(),
  state: z.string().optional(),
  homeOwner: z.string().min(1, "Please select home owner status"),
  debtAmount: z.string().min(1, "Please select debt amount"),
});

type FormData = z.infer<typeof formSchema>;

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FormModal({ isOpen, onClose }: FormModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [trustedFormCertUrl, setTrustedFormCertUrl] = useState("");
  const [subid1, setSubid1] = useState("");
  const [subid2, setSubid2] = useState("");
  const [subid3, setSubid3] = useState("");
  // Handle TrustedForm certificate data
  const handleTrustedFormReady = (certUrl: string) => {
    setTrustedFormCertUrl(certUrl);
  };

  // UTM Parameter Detection with Cookie Fallback
  useEffect(() => {
    if (!isOpen) return;

    // Helper function to get cookie value
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift() || '';
      return '';
    };

    // Read UTM values from cookies (they should already be set by hero component)
    const utmSource = getCookie('subid1') || "";
    const utmId = getCookie('subid2') || "";
    const utmS1 = getCookie('subid3') || "";

    setSubid1(utmSource);
    setSubid2(utmId);
    setSubid3(utmS1);
  }, [isOpen]);

  useEffect(() => {
    const restoreBodyScroll = () => {
      const storedScrollY = document.body.getAttribute('data-scroll-y');
      document.body.classList.remove('modal-open');
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
      document.body.style.width = '';
      document.body.removeAttribute('data-scroll-y');
      if (storedScrollY) {
        window.scrollTo(0, parseInt(storedScrollY, 10));
      }
    };

    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.classList.add('modal-open');
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.overflow = 'hidden';
      document.body.style.width = '100%';
      document.body.setAttribute('data-scroll-y', scrollY.toString());
      return restoreBodyScroll;
    }
    restoreBodyScroll();
  }, [isOpen]);

  // Close modal on escape key
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);

  // Phone Number Formatting
  const formatPhoneNumber = (value: string) => {
    const phoneNumber = value.replace(/\D/g, "");
    const limitedPhoneNumber = phoneNumber.slice(0, 10);
    
    if (limitedPhoneNumber.length === 0) {
      return "";
    }
    
    if (limitedPhoneNumber.length >= 6) {
      return `(${limitedPhoneNumber.slice(0, 3)}) ${limitedPhoneNumber.slice(3, 6)}-${limitedPhoneNumber.slice(6)}`;
    } else if (limitedPhoneNumber.length >= 3) {
      return `(${limitedPhoneNumber.slice(0, 3)}) ${limitedPhoneNumber.slice(3)}`;
    } else {
      return limitedPhoneNumber;
    }
  };

  // Zip Code Formatting
  const formatZipCode = (value: string) => {
    return value.replace(/\D/g, "").slice(0, 5);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const zipCode = watch('zipCode');
  const handleZipBlur = async () => {
    const zip = (zipCode ?? '').replace(/\D/g, '');
    if (zip.length !== 5) return;
    const lookup = await lookupZip(zip);
    if (lookup) {
      setValue('city', lookup.city);
      setValue('state', lookup.state);
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      let city = data.city ?? '';
      let state = data.state ?? '';
      const zipDigits = (data.zipCode ?? '').replace(/\D/g, '');
      if (zipDigits.length === 5 && (!city || !state)) {
        const lookup = await lookupZip(zipDigits);
        if (lookup) {
          city = lookup.city;
          state = lookup.state;
        }
      }

      const submissionData = {
        ...data,
        city: city || undefined,
        state: state || undefined,
        subid1,
        subid2,
        subid3,
        trustedformCertUrl: trustedFormCertUrl,
      };

      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.accessToken && result.expiresAt) {
        localStorage.setItem('thankyou_token', result.accessToken);
        localStorage.setItem('thankyou_expires', result.expiresAt.toString());
      }
      if (!result.redirectUrl?.startsWith('http')) {
        localStorage.setItem('form_data', JSON.stringify({ email: data.email }));
      }

      reset();
      onClose();

      if (result.redirectUrl) {
        window.location.href = result.redirectUrl;
      } else {
        window.location.href = "/thankyou";
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
      alert(`Submission failed: ${errorMessage}`);
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <SubmissionOverlay visible={isSubmitting} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Background overlay with blur */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-modal-fade-in"
        onClick={onClose}
      />
      
      {/* Modal content */}
      <div className="relative w-full max-w-md mx-auto bg-white rounded-lg shadow-2xl max-h-[90vh] overflow-y-auto animate-modal-zoom-in">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-200"
          aria-label="Close modal"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Form */}
        <form
          id="lead-form-modal"
          method="POST"
          action="/api/submit-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(onSubmit)(e);
          }}
          className="p-6 pt-12"
        >
          <h3
            className="text-xl font-bold text-center mb-6 md:text-2xl lg:text-3xl"
            style={{ color: "#002868" }}
          >
            Start here for your FREE Quote
          </h3>

          <div className="space-y-4">
            {/* TrustedForm Integration */}
            <TrustedForm onCertUrlReady={handleTrustedFormReady} />

            <input type="hidden" name="subid1" value={subid1} />
            <input type="hidden" name="subid2" value={subid2} />
            <input type="hidden" name="subid3" value={subid3} />
            <input type="hidden" {...register("city")} />
            <input type="hidden" {...register("state")} />

            <input
              type="text"
              placeholder="First Name"
              data-arohaa-field="firstName"
              {...register("firstName")}
              className={`w-full text-sm p-3 rounded border focus:outline-none focus:border-red-600 focus:shadow-[0_0_0_2px_rgba(0,40,104,0.1)] placeholder:text-sm placeholder:text-gray-700 ${
                errors.firstName ? "border-red-500" : "border-gray-300"
              }`}
            />

            <input
              type="text"
              placeholder="Last Name"
              data-arohaa-field="lastName"
              {...register("lastName")}
              className={`w-full text-sm p-3 rounded border focus:outline-none focus:border-red-600 focus:shadow-[0_0_0_2px_rgba(0,40,104,0.1)] placeholder:text-sm placeholder:text-gray-700 ${
                errors.lastName ? "border-red-500" : "border-gray-300"
              }`}
            />

            <input
              type="email"
              placeholder="Email"
              data-arohaa-field="email"
              {...register("email")}
              className={`w-full text-sm p-3 rounded border focus:outline-none focus:border-red-600 focus:shadow-[0_0_0_2px_rgba(0,40,104,0.1)] placeholder:text-sm placeholder:text-gray-700 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />

            <input
              type="tel"
              placeholder="Phone"
              maxLength={14}
              data-arohaa-field="phone"
              {...register("phone")}
              onChange={(e) => {
                const input = e.target;
                const formatted = formatPhoneNumber(input.value);
                if (formatted !== input.value) {
                  input.value = formatted;
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Backspace') {
                  const input = e.target as HTMLInputElement;
                  const currentValue = input.value;
                  const cursorPosition = input.selectionStart || 0;
                  
                  if (currentValue[cursorPosition - 1] === ' ' || 
                      currentValue[cursorPosition - 1] === '-' || 
                      currentValue[cursorPosition - 1] === ')') {
                    e.preventDefault();
                    const newValue = currentValue.slice(0, cursorPosition - 2) + currentValue.slice(cursorPosition);
                    input.value = newValue;
                    const newCursorPosition = Math.max(0, cursorPosition - 2);
                    setTimeout(() => {
                      input.setSelectionRange(newCursorPosition, newCursorPosition);
                    }, 0);
                    input.dispatchEvent(new Event('input', { bubbles: true }));
                  }
                }
              }}
              className={`w-full text-sm p-3 rounded border focus:outline-none focus:border-red-600 focus:shadow-[0_0_0_2px_rgba(0,40,104,0.1)] placeholder:text-sm placeholder:text-gray-700 ${
                errors.phone ? "border-red-500" : "border-gray-300"
              }`}
            />

            <input
              type="text"
              placeholder="Zip Code"
              data-arohaa-field="zipCode"
              {...(() => {
                const { onChange, onBlur, ...rest } = register("zipCode");
                return {
                  ...rest,
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                    const formatted = formatZipCode(e.target.value);
                    e.target.value = formatted;
                    onChange(e);
                  },
                  onBlur: (e: React.FocusEvent<HTMLInputElement>) => {
                    onBlur(e);
                    void handleZipBlur();
                  },
                };
              })()}
              className={`w-full text-sm p-3 rounded border focus:outline-none focus:border-red-600 focus:shadow-[0_0_0_2px_rgba(0,40,104,0.1)] placeholder:text-sm placeholder:text-gray-700 ${
                errors.zipCode ? "border-red-500" : "border-gray-300"
              }`}
            />

            <select
              data-arohaa-field="homeOwner"
              {...register("homeOwner")}
              className={`w-full text-sm p-3 rounded border appearance-none bg-no-repeat bg-right pr-10 cursor-pointer focus:outline-none focus:border-red-600 focus:shadow-[0_0_0_2px_rgba(0,40,104,0.1)] ${
                errors.homeOwner ? "border-red-500" : "border-gray-300"
              }`}
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23999999' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e\")",
                backgroundPosition: "right 10px center",
                backgroundSize: "16px",
              }}
            >
              <option value="">Are you Home Owner?</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>

            <select
              data-arohaa-field="debtAmount"
              {...register("debtAmount")}
              className={`w-full text-sm p-3 rounded border appearance-none bg-no-repeat bg-right pr-10 cursor-pointer focus:outline-none focus:border-red-600 focus:shadow-[0_0_0_2px_rgba(0,40,104,0.1)] ${
                errors.debtAmount ? "border-red-500" : "border-gray-300"
              }`}
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23999999' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e\")",
                backgroundPosition: "right 10px center",
                backgroundSize: "16px",
              }}
            >
              <option value="">Select Debt Amount</option>
              <option value="$0 - $4,999">$0 - $4,999</option>
              <option value="$5,000 - $7,499">$5,000 - $7,499</option>
              <option value="$7,500 - $9,999">$7,500 - $9,999</option>
              <option value="$10,000 - $14,999">$10,000 - $14,999</option>
              <option value="$15,000 - $19,999">$15,000 - $19,999</option>
              <option value="$20,000 - $29,999">$20,000 - $29,999</option>
              <option value="$30,000 - $39,999">$30,000 - $39,999</option>
              <option value="$40,000 - $49,999">$40,000 - $49,999</option>
              <option value="$50,000 - $59,999">$50,000 - $59,999</option>
              <option value="$60,000 - $69,999">$60,000 - $69,999</option>
              <option value="$70,000 - $79,999">$70,000 - $79,999</option>
              <option value="$80,000 - $89,999">$80,000 - $89,999</option>
              <option value="$90,000 - $99,999">$90,000 - $99,999</option>
              <option value="Above $100,000+">Above $100,000+</option>
            </select>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-gradient-to-r from-[#BF0A2F] to-[#DF413F] p-4 py-3 px-5 rounded-full flex justify-center items-center text-sm lg:text-lg text-white font-normal cursor-pointer border-none relative overflow-hidden mt-6 before:content-[''] before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:animate-[shimmer_1.5s_infinite] ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <LoadingSpinner size="sm" />
                  <span>Submitting...</span>
                </div>
              ) : (
                "Submit"
              )}
            </button>
          </div>

          <div className="w-full text-xs text-gray-400 text-center mt-4 px-2">
            <p>
              By submitting this form, I agree to the Nation One Debt Relief Terms of Use and Privacy Policy. 
              I authorize Nation One Debt Relief and its partners to send me marketing text messages or phone calls 
              at the number provided, including those made with an autodialer. Standard message and data rates may apply. 
              Message frequency varies. Opt-out anytime by replying STOP or using the unsubscribe link.
            </p>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}
