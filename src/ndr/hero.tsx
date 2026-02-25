"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import TrustedForm from "../components/TrustedForm";
import LoadingSpinner from "../components/LoadingSpinner";
import SubmissionOverlay from "../components/SubmissionOverlay";
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

export default function Hero() {
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

    const urlParams = new URLSearchParams(window.location.search);
    let utmSource = urlParams.get("utm_source") || "";
    let utmId = urlParams.get("utm_id") || "";
    let utmS1 = urlParams.get("utm_s1") || "";

    // If URL parameters exist, use them and save to cookies
    if (utmSource || utmId || utmS1) {
      if (utmSource) setCookie('subid1', utmSource);
      if (utmId) setCookie('subid2', utmId);
      if (utmS1) setCookie('subid3', utmS1);
      
      // Clean the URL by removing UTM parameters
      const cleanUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);
    } else {
      // If no URL parameters, try to read from cookies
      utmSource = getCookie('subid1') || "";
      utmId = getCookie('subid2') || "";
      utmS1 = getCookie('subid3') || "";
    }

    setSubid1(utmSource);
    setSubid2(utmId);
    setSubid3(utmS1);
  }, []);

  // Phone Number Formatting
  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const phoneNumber = value.replace(/\D/g, "");
    
    // Limit to 10 digits
    const limitedPhoneNumber = phoneNumber.slice(0, 10);
    
    // Don't format if empty
    if (limitedPhoneNumber.length === 0) {
      return "";
    }
    
    // Progressive formatting - only add formatting when we have enough digits
    if (limitedPhoneNumber.length >= 6) {
      return `(${limitedPhoneNumber.slice(0, 3)}) ${limitedPhoneNumber.slice(
        3,
        6
      )}-${limitedPhoneNumber.slice(6)}`;
    } else if (limitedPhoneNumber.length >= 3) {
      return `(${limitedPhoneNumber.slice(0, 3)}) ${limitedPhoneNumber.slice(3)}`;
    } else {
      // No formatting for 1-2 digits
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
      const submissionData = {
        ...data,
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

  return (
    <>
      <SubmissionOverlay visible={isSubmitting} />
      <div
      className="w-full h-full bg-cover bg-center bg-no-repeat p-4 lg:py-10 lg:px-10 xl:px-50 xl:py-20"
      style={{
        backgroundImage:
          "linear-gradient(180deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/hero-bg.webp')",
      }}
    >
      <div className="container mx-auto">
        <div className="w-full h-full flex flex-col justify-center items-center gap-5 lg:gap-10 md:flex-row md:justify-between">
          <div className="w-full flex flex-col justify-center items-center md:w-[60%] md:gap-5">
            <div className="main-title">
              <h1 className="text-2xl font-bold text-white text-center md:text-3xl xl:mb-4 lg:text-4xl xl:text-5xl md:text-left">
                See if you qualify for debt relief and regain control!
              </h1>
            </div>
            <div className="hidden w-full h-px bg-white md:block"></div>
            <div className="hidden md:block">
              <p className="text-sm md:text-base lg:text-lg xl:text-xl xl:mb-4 text-white">
                From credit cards to medical bills - whatever your debt, we&apos;re
                here to help you become debt-free and live stress-free.
              </p>
            </div>

            <div className="hidden w-full flex flex-col justify-center items-center gap-4 border border-white bg-white/30 rounded-lg p-4 md:flex md:items-start md:p-4">
              <div className="hero-feature md:flex md:flex-col md:items-start md:gap-4">
                <div className="w-full flex flex-row justify-start items-start gap-2.5 md:items-center">
                  <div className="min-w-[30px] min-h-[30px] max-w-[30px] max-h-[30px] lg:min-w-[40px] lg:min-h-[40px] lg:max-w-[40px] lg:max-h-[40px] flex items-center justify-center rounded-full bg-[#F31B47] p-0 box-border">
                    <svg
                      className="w-4 h-4 lg:w-5 lg:h-5 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <div className="w-full flex flex-col justify-start items-start gap-1 md:w-full">
                    <div className="subheading">
                      <h3 className="text-xs  text-white mb-0 font-semibold md:text-base lg:mb-2 lg:text-lg xl:text-xl md:font-medium">
                        Pay up to 30% Less Than You Owe
                      </h3>
                    </div>
                    {/* <div className="description">
                       <p></p>
                     </div> */}
                  </div>
                </div>

                <div className="w-full flex flex-row justify-start items-start gap-2.5 md:items-center">
                  <div className="min-w-[30px] min-h-[30px] max-w-[30px] max-h-[30px] lg:min-w-[40px] lg:min-h-[40px] lg:max-w-[40px] lg:max-h-[40px] flex items-center justify-center rounded-full bg-[#F31B47] p-0 box-border">
                    <svg
                      className="w-4 h-4 lg:w-5 lg:h-5 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <div className="w-full flex flex-col justify-start items-start gap-1 md:w-full">
                    <div className="subheading">
                      <h3 className="text-xs text-white mb-0 font-semibold md:text-base lg:mb-2 lg:text-lg xl:text-xl md:font-medium">
                        Debt Relief In As Little As 24-48 Months
                      </h3>
                    </div>
                    {/* <div className="description">
                       <p></p>
                     </div> */}
                  </div>
                </div>

                <div className="w-full flex flex-row justify-start items-start gap-2.5 md:items-center">
                  <div className="min-w-[30px] min-h-[30px] max-w-[30px] max-h-[30px] lg:min-w-[40px] lg:min-h-[40px] lg:max-w-[40px] lg:max-h-[40px] flex items-center justify-center rounded-full bg-[#F31B47] p-0 box-border">
                    <svg
                      className="w-4 h-4 lg:w-5 lg:h-5 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <div className="w-full flex flex-col justify-start items-start gap-1 md:w-full">
                    <div className="subheading">
                      <h3 className="text-xs text-white mb-0 font-semibold md:text-base lg:mb-2 lg:text-lg xl:text-xl md:font-medium">
                        Free Consultation and Zero Upfront Fees
                      </h3>
                    </div>
                    {/* <div className="description">
                       <p></p>
                     </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-[40%] ">
            <div className="flex flex-col justify-center items-center gap-2.8 w-full">
              <form
                id="form"
                method="POST"
                action="#"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit(onSubmit)(e);
                }}
                className="w-full max-w-[300px] bg-white p-4 lg:p-5 rounded-lg flex flex-col justify-center items-center mx-auto gap-2.5 md:max-w-full md:m-0"
              >
                <h3
                  className="text-xl font-bold text-center md:text-2xl lg:text-3xl"
                  style={{ color: "#002868" }}
                >
                  Start here for your FREE Quote
                </h3>

                <div className="form-group">
                  {/* TrustedForm Integration */}
                  <TrustedForm onCertUrlReady={handleTrustedFormReady} />

                  {/* UTM Parameters - Values populated from state */}
                  <input type="hidden" id="hidden_subid1" name="subid1" value={subid1} />
                  <input type="hidden" id="hidden_subid2" name="subid2" value={subid2} />
                  <input type="hidden" id="hidden_subid3" name="subid3" value={subid3} />

                  <input
                    type="text"
                    id="first-name"
                    placeholder="First Name"
                    {...register("firstName")}
                    className={`w-full text-sm p-2.5 rounded border mb-1.5 lg:mb-2.5 focus:outline-none focus:border-red-600 focus:shadow-[0_0_0_2px_rgba(0,40,104,0.1)] placeholder:text-sm lg:placeholder:text-base placeholder:text-gray-700 ${
                      Object.keys(errors).length > 0 ? "border-red-500" : "border-gray-300"
                    }`}
                  />

                  <input
                    type="text"
                    id="last-name"
                    placeholder="Last Name"
                    {...register("lastName")}
                    className={`w-full text-sm p-2.5 rounded border mb-1.5 lg:mb-2.5 focus:outline-none focus:border-red-600 focus:border-red-600 focus:shadow-[0_0_0_2px_rgba(0,40,104,0.1)] placeholder:text-sm lg:placeholder:text-base placeholder:text-gray-700 ${
                      Object.keys(errors).length > 0 ? "border-red-500" : "border-gray-300"
                    }`}
                  />

                  <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    {...register("email")}
                    className={`w-full text-sm p-2.5 rounded border mb-1.5 lg:mb-2.5 focus:outline-none focus:border-red-600 focus:shadow-[0_0_0_2px_rgba(0,40,104,0.1)] placeholder:text-sm lg:placeholder:text-base placeholder:text-gray-700 ${
                      Object.keys(errors).length > 0 ? "border-red-500" : "border-gray-300"
                    }`}
                  />

                  <input
                    type="tel"
                    id="phone"
                    placeholder="Phone"
                    maxLength={14}
                    {...register("phone")}
                    onChange={(e) => {
                      const input = e.target;
                      
                      // Format the new value
                      const formatted = formatPhoneNumber(input.value);
                      
                      // Always update to ensure proper formatting
                      if (formatted !== input.value) {
                        input.value = formatted;
                      }
                    }}
                    onKeyDown={(e) => {
                      // Handle backspace specifically
                      if (e.key === 'Backspace') {
                        const input = e.target as HTMLInputElement;
                        const currentValue = input.value;
                        const cursorPosition = input.selectionStart || 0;
                        
                        // If cursor is at the beginning of a formatting character, remove it
                        if (currentValue[cursorPosition - 1] === ' ' || 
                            currentValue[cursorPosition - 1] === '-' || 
                            currentValue[cursorPosition - 1] === ')') {
                          e.preventDefault();
                          
                          // Remove the formatting character and the digit before it
                          const newValue = currentValue.slice(0, cursorPosition - 2) + currentValue.slice(cursorPosition);
                          input.value = newValue;
                          
                          // Set cursor position after the deleted content
                          const newCursorPosition = Math.max(0, cursorPosition - 2);
                          setTimeout(() => {
                            input.setSelectionRange(newCursorPosition, newCursorPosition);
                          }, 0);
                          
                          // Trigger onChange to reformat
                          input.dispatchEvent(new Event('input', { bubbles: true }));
                        }
                      }
                    }}
                    className={`w-full text-sm p-2.5 rounded border mb-1.5 lg:mb-2.5 focus:outline-none focus:border-red-600 focus:shadow-[0_0_0_2px_rgba(0,40,104,0.1)] placeholder:text-sm lg:placeholder:text-base placeholder:text-gray-700 ${
                      Object.keys(errors).length > 0 ? "border-red-500" : "border-gray-300"
                    }`}
                  />

                  <input
                    type="text"
                    id="zip-code"
                    placeholder="Zip Code"
                    {...register("zipCode")}
                    onBlur={handleZipBlur}
                    onChange={(e) => {
                      const formatted = formatZipCode(e.target.value)
                      e.target.value = formatted
                    }}
                    className={`w-full text-sm p-2.5 rounded border mb-1.5 lg:mb-2.5 focus:outline-none focus:border-red-600 focus:shadow-[0_0_0_2px_rgba(0,40,104,0.1)] placeholder:text-sm lg:placeholder:text-base placeholder:text-gray-700 ${
                      Object.keys(errors).length > 0 ? "border-red-500" : "border-gray-300"
                    }`}
                  />

                  <input
                    type="text"
                    id="city"
                    placeholder="City"
                    {...register("city")}
                    className={`w-full text-sm p-2.5 rounded border mb-1.5 lg:mb-2.5 focus:outline-none focus:border-red-600 focus:shadow-[0_0_0_2px_rgba(0,40,104,0.1)] placeholder:text-sm lg:placeholder:text-base placeholder:text-gray-700 ${
                      Object.keys(errors).length > 0 ? "border-red-500" : "border-gray-300"
                    }`}
                  />

                  <input
                    type="text"
                    id="state"
                    placeholder="State (e.g. NY)"
                    {...register("state")}
                    maxLength={2}
                    className={`w-full text-sm p-2.5 rounded border mb-1.5 lg:mb-2.5 focus:outline-none focus:border-red-600 focus:shadow-[0_0_0_2px_rgba(0,40,104,0.1)] placeholder:text-sm lg:placeholder:text-base placeholder:text-gray-700 ${
                      Object.keys(errors).length > 0 ? "border-red-500" : "border-gray-300"
                    }`}
                  />

                  <select
                    id="home-owner"
                    {...register("homeOwner")}
                    className={`w-full text-sm lg:text-base p-2.5 rounded border mb-1.5 lg:mb-2.5 appearance-none bg-no-repeat bg-right pr-10 cursor-pointer focus:outline-none focus:border-red-600 focus:shadow-[0_0_0_2px_rgba(0,40,104,0.1)] placeholder:text-sm lg:placeholder:text-base placeholder:text-gray-700 ${
                      Object.keys(errors).length > 0 ? "border-red-500" : "border-gray-300"
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
                    id="debt-amount"
                    {...register("debtAmount")}
                    className={`w-full text-sm lg:text-base p-2.5 rounded border mb-1.5 lg:mb-2.5 appearance-none bg-no-repeat bg-right pr-10 cursor-pointer focus:outline-none focus:border-red-600 focus:shadow-[0_0_0_2px_rgba(0,40,104,0.1)] placeholder:text-sm lg:placeholder:text-base placeholder:text-gray-700 ${
                      Object.keys(errors).length > 0 ? "border-red-500" : "border-gray-300"
                    }`}
                    style={{
                      backgroundImage:
                        'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'%3c/svg%3e")',
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
                  className={`w-full bg-gradient-to-r from-[#BF0A2F] to-[#DF413F] p-4 py-3 px-5 rounded-full flex justify-center items-center text-sm lg:text-lg text-white font-normal cursor-pointer border-none relative overflow-hidden mt-2.5 before:content-[''] before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:animate-[shimmer_1.5s_infinite] ${
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

                <div className="w-full text-xs lg:text-sm text-gray-400 text-justify mt-3">
                  <p>
                    By submitting this form, I agree to the Nation One Debt
                    Relief Terms of Use and Privacy Policy. I authorize Nation
                    One Debt Relief and its partners to send me marketing text
                    messages or phone calls at the number provided, including
                    those made with an autodialer. Standard message and data
                    rates may apply. Message frequency varies. Opt-out anytime
                    by replying STOP or using the unsubscribe link.
                  </p>
                </div>
                
                {/* Debug Button - Remove in production */}
                
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
