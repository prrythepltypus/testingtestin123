"use client";

import React, { useState, useEffect } from "react";
import { ShieldCheck, HeartHandshake, AlertCircle } from "lucide-react";

interface AgeGateProps {
  onVerified: () => void;
}

export default function AgeGate({ onVerified }: AgeGateProps) {
  const [status, setStatus] = useState<"checking" | "verified" | "under_18" | "unverified">("checking");

  useEffect(() => {
    const saved = localStorage.getItem("moon_peer_age_gate");
    if (saved === "verified") {
      setStatus("verified");
      onVerified();
    } else if (saved === "under_18") {
      setStatus("under_18");
    } else {
      setStatus("unverified");
    }
  }, [onVerified]);

  const handleVerify = () => {
    localStorage.setItem("moon_peer_age_gate", "verified");
    setStatus("verified");
    onVerified();
  };

  const handleUnder18 = () => {
    localStorage.setItem("moon_peer_age_gate", "under_18");
    setStatus("under_18");
  };

  const handleReset = () => {
    localStorage.removeItem("moon_peer_age_gate");
    setStatus("unverified");
  };

  if (status === "checking" || status === "verified") {
    return null;
  }

  return (
    <div 
      id="age-gate-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-300"
    >
      <div 
        id="age-gate-card"
        className="w-full max-w-md bg-[#faf7f2] border border-[#e8dfd5] rounded-3xl p-6 sm:p-8 shadow-2xl text-center space-y-6"
      >
        {status === "unverified" ? (
          <>
            <div className="mx-auto w-16 h-16 rounded-full bg-[#fbeee9] flex items-center justify-center text-[#c26d60]">
              <ShieldCheck className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="inline-block px-3 py-1 bg-[#eef4f0] text-[#5b7c67] text-xs font-semibold rounded-full tracking-wide uppercase">
                Welcome to MoonPeer
              </span>
              <h2 className="text-2xl font-serif font-bold text-stone-800">
                A Safe Space for Menstrual Peer Support
              </h2>
              <p className="text-stone-600 text-sm leading-relaxed">
                Before entering, please confirm your age. This community is designed exclusively for adults aged 18 and older to connect anonymously and share personal lived experiences.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <button
                id="btn-age-confirm-18"
                onClick={handleVerify}
                className="w-full py-4 px-6 rounded-2xl bg-[#c26d60] hover:bg-[#b05e52] text-white font-medium text-base shadow-sm transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>I am 18 or older</span>
              </button>

              <button
                id="btn-age-decline-under-18"
                onClick={handleUnder18}
                className="w-full py-3.5 px-6 rounded-2xl bg-white hover:bg-stone-50 border border-stone-200 text-stone-600 font-medium text-sm transition-all duration-200 cursor-pointer"
              >
                I am under 18
              </button>
            </div>

            <p className="text-stone-400 text-xs">
              Your choice is saved privately on this device only. We never ask for your identity or birthdate.
            </p>
          </>
        ) : (
          /* Under 18 Caring Block Message */
          <div className="space-y-5 text-left">
            <div className="w-14 h-14 rounded-2xl bg-[#fbeee9] flex items-center justify-center text-[#c26d60] mx-auto">
              <HeartHandshake className="w-7 h-7" />
            </div>

            <div className="text-center space-y-2">
              <h3 className="text-xl font-serif font-bold text-stone-800">
                Thank you for visiting MoonPeer
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                Our peer chats are reserved for adults 18+, but your reproductive health and questions are deeply important.
              </p>
            </div>

            <div className="bg-[#ffffff] p-4 rounded-2xl border border-stone-200 space-y-3 text-xs text-stone-700">
              <div className="flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-[#c26d60] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-stone-800">Support Resources for Teens & Young People:</span>
                  <ul className="list-disc pl-4 mt-1 space-y-1 text-stone-600">
                    <li><strong>Crisis Text Line:</strong> Text HOME to 741741 (Free, 24/7)</li>
                    <li><strong>Planned Parenthood Teen Talk:</strong> Expert advice & clinic finder</li>
                    <li><strong>Talk to a trusted adult:</strong> A school nurse, parent, or primary care doctor</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="pt-2 text-center">
              <button
                onClick={handleReset}
                className="text-xs text-stone-400 hover:text-stone-600 underline cursor-pointer"
              >
                Selected by mistake? Click here to change your answer
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
