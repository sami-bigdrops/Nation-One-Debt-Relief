'use client';

import React, { useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';

const MESSAGES = [
  'Submitting your information...',
  'Checking your eligibility...',
  'Finding the best options for you...',
  'Almost there...',
];

export default function SubmissionOverlay({ visible }: { visible: boolean }) {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const interval = setInterval(() => {
      setMessageIndex((i) => (i + 1) % MESSAGES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-6 p-8 rounded-xl bg-white/95 shadow-xl max-w-sm mx-4">
        <LoadingSpinner size="lg" />
        <p className="text-center text-gray-800 font-medium min-h-[1.5rem]" key={messageIndex}>
          {MESSAGES[messageIndex]}
        </p>
      </div>
    </div>
  );
}
