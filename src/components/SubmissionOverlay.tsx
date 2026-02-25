'use client';

import React, { useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';

const STATUS_MESSAGES = [
  'Submitting your information...',
  'Checking your eligibility...',
  'Finding the best options for you...',
  'Matching you with trusted partners...',
  'Almost there...',
];

const FACTS = [
  'The average American carries over $90,000 in debt when including mortgages.',
  'Debt settlement can help reduce what you owe by up to 50% in many cases.',
  'Millions of Americans seek debt relief each year – you are not alone.',
  'Free consultations let you explore options with no obligation.',
  'Acting sooner often means more options and better outcomes.',
  'Many people qualify for debt relief without realizing it.',
  'Debt relief programs typically work with major credit card issuers.',
  'Reducing debt can improve your credit score over time.',
  'Debt consolidation can simplify multiple payments into one.',
  'Professional help can often negotiate lower interest rates on your behalf.',
];

export default function SubmissionOverlay({ visible }: { visible: boolean }) {
  const [statusIndex, setStatusIndex] = useState(0);
  const [factIndex, setFactIndex] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const statusInterval = setInterval(() => {
      setStatusIndex((i) => (i + 1) % STATUS_MESSAGES.length);
    }, 2200);
    return () => clearInterval(statusInterval);
  }, [visible]);

  useEffect(() => {
    if (!visible) return;
    const factInterval = setInterval(() => {
      setFactIndex((i) => (i + 1) % FACTS.length);
    }, 4000);
    return () => clearInterval(factInterval);
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 backdrop-blur-md"
      style={{ width: '100vw', height: '100vh', minWidth: '100vw', minHeight: '100vh' }}
    >
      <div
        className="flex flex-col items-center justify-center w-full h-full max-w-lg max-h-[90vh] mx-4 p-6"
        style={{ minHeight: 320 }}
      >
        <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl border border-gray-100 overflow-hidden flex flex-col items-center p-8">
          <LoadingSpinner size="lg" />
          <p
            className="mt-6 text-center text-gray-800 font-semibold text-lg min-h-[2rem] transition-opacity duration-300"
            key={`status-${statusIndex}`}
          >
            {STATUS_MESSAGES[statusIndex]}
          </p>
          <div className="mt-8 w-full border-t border-gray-200 pt-6">
            <p className="text-xs font-medium uppercase tracking-wider text-gray-400 mb-2 text-center">
              Did you know?
            </p>
            <p
              className="text-center text-gray-600 text-sm leading-relaxed min-h-[3.5rem] transition-opacity duration-300"
              key={`fact-${factIndex}`}
            >
              {FACTS[factIndex]}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
