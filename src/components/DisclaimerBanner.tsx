"use client";

import React, { useState } from "react";
import { AlertTriangle, Phone, ChevronDown, ChevronUp, ShieldAlert, Heart } from "lucide-react";

interface DisclaimerBannerProps {
  compact?: boolean;
}

export default function DisclaimerBanner({ compact = false }: DisclaimerBannerProps) {
  const [showResources, setShowResources] = useState(false);

  return (
    <div 
      id="medical-disclaimer-banner"
      className="bg-[#fef8f4] border-b border-[#f3e5d8] text-stone-700 px-4 py-2.5 transition-all"
    >
      <div className="max-w-2xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-[#c26d60] shrink-0" />
          <span className="font-medium text-stone-800">
            <strong>Peer support only:</strong> This is not medical advice. If you are experiencing a medical emergency, call 911 or your local emergency number.
          </span>
        </div>

        <button
          id="btn-toggle-emergency-help"
          onClick={() => setShowResources(!showResources)}
          className="self-end sm:self-auto text-xs font-semibold text-[#c26d60] hover:text-[#9e5246] flex items-center gap-1 cursor-pointer underline underline-offset-2 shrink-0 py-1"
        >
          <span>{showResources ? "Hide Care Numbers" : "Crisis & Emergency Help"}</span>
          {showResources ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {showResources && (
        <div 
          id="emergency-resources-drawer"
          className="max-w-2xl mx-auto mt-3 pt-3 border-t border-[#f0dac8] grid sm:grid-cols-2 gap-3 text-xs animate-in slide-in-from-top-2 duration-200"
        >
          <div className="bg-white p-3 rounded-xl border border-[#eedfd1] space-y-1">
            <div className="flex items-center gap-1.5 font-semibold text-rose-800">
              <Phone className="w-3.5 h-3.5" />
              <span>988 Suicide & Crisis Lifeline</span>
            </div>
            <p className="text-stone-600">
              Free, confidential 24/7 mental health and crisis support across the United States.
            </p>
            <div className="pt-1">
              <a
                href="tel:988"
                className="inline-flex items-center gap-1 text-xs font-bold text-[#c26d60] hover:underline"
              >
                Call or Text 988
              </a>
            </div>
          </div>

          <div className="bg-white p-3 rounded-xl border border-[#eedfd1] space-y-1">
            <div className="flex items-center gap-1.5 font-semibold text-amber-800">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Urgent Red-Flag Symptoms</span>
            </div>
            <p className="text-stone-600">
              Soaking &gt;2 pads/hour for 2+ hours, sudden acute pelvic pain, fainting, dizziness, or pregnancy bleeding warrant urgent medical attention at an ER or Urgent Care clinic.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
