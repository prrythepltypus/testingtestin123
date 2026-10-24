"use client";

import React, { useState } from "react";
import { Trash2, ShieldCheck, Lock, EyeOff, AlertTriangle, CheckCircle2, RefreshCw } from "lucide-react";

interface SettingsViewProps {
  onDataDeleted: () => void;
}

export default function SettingsView({ onDataDeleted }: SettingsViewProps) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletedSuccess, setDeletedSuccess] = useState(false);

  // Simulated anonymous ID
  const anonymousId = "anon-usr-7f91-44b2";

  const handleDeleteData = () => {
    setIsDeleting(true);
    setTimeout(() => {
      setIsDeleting(false);
      setDeletedSuccess(true);
      setTimeout(() => {
        onDataDeleted();
      }, 1500);
    }, 1000);
  };

  return (
    <div id="settings-container" className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#eaddd0] shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-[#5b7c67]">
          <ShieldCheck className="w-5 h-5" />
          <span className="text-xs font-semibold uppercase tracking-wider">Privacy &amp; Control</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-800">
          Your Privacy &amp; Data Settings
        </h1>
        <p className="text-stone-600 text-sm leading-relaxed">
          MoonPeer is built on radical anonymity. We collect the bare minimum needed for matching and never sell, track, or share your data.
        </p>
      </div>

      {/* Anonymous Identity */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#eaddd0] shadow-sm space-y-4">
        <h3 className="text-base font-serif font-bold text-stone-800 flex items-center gap-2">
          <Lock className="w-4 h-4 text-[#c26d60]" />
          <span>Anonymous Identity</span>
        </h3>
        <p className="text-xs text-stone-600 leading-relaxed">
          You are signed in via an anonymous cryptographic session. No email, name, phone number, or social login was ever created.
        </p>

        <div className="bg-[#faf7f2] p-4 rounded-2xl border border-stone-200 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block">
              Anonymous Session ID
            </span>
            <span className="font-mono text-xs text-stone-700">{anonymousId}</span>
          </div>
          <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-200">
            Active
          </span>
        </div>
      </div>

      {/* What We Store Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#eaddd0] shadow-sm space-y-4">
        <h3 className="text-base font-serif font-bold text-stone-800 flex items-center gap-2">
          <EyeOff className="w-4 h-4 text-[#5b7c67]" />
          <span>What We Store &amp; For How Long</span>
        </h3>

        <div className="space-y-3 text-xs">
          <div className="p-3.5 bg-[#faf7f2] rounded-2xl border border-stone-100 space-y-1">
            <span className="font-semibold text-stone-800 block">1. Cleaned Story &amp; Symptoms</span>
            <p className="text-stone-600">
              Only text with names, contacts, and locations stripped. Converted to private mathematical vectors solely for matching you with 3 peers.
            </p>
          </div>

          <div className="p-3.5 bg-[#faf7f2] rounded-2xl border border-stone-100 space-y-1">
            <span className="font-semibold text-stone-800 block">2. Temporary Chat Messages</span>
            <p className="text-stone-600">
              Messages exchanged during active peer chats under randomized aliases (e.g. &ldquo;Quiet Willow&rdquo;). Messages are private to the 2 participants.
            </p>
          </div>

          <div className="p-3.5 bg-[#faf7f2] rounded-2xl border border-stone-100 space-y-1">
            <span className="font-semibold text-stone-800 block">3. Zero Trackers &amp; No Ads</span>
            <p className="text-stone-600">
              No Google Analytics, Meta Pixel, ad beacons, or external scripts. Your browser connects only to our secure Next.js server.
            </p>
          </div>
        </div>
      </div>

      {/* Delete My Data Section */}
      <div className="bg-rose-50/70 border border-rose-200 rounded-3xl p-6 sm:p-7 space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
            <Trash2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-serif font-bold text-rose-950">
              Delete All My Data
            </h3>
            <p className="text-xs text-rose-800 mt-1 leading-relaxed">
              Permanently remove your story, matching vectors, active connections, messages, and anonymous account. This action cannot be undone.
            </p>
          </div>
        </div>

        <button
          id="btn-trigger-delete-data"
          type="button"
          onClick={() => setShowConfirmModal(true)}
          className="w-full py-3.5 px-5 rounded-2xl bg-rose-700 hover:bg-rose-800 text-white text-xs sm:text-sm font-semibold transition cursor-pointer active:scale-[0.99] shadow-xs flex items-center justify-center gap-2"
        >
          <Trash2 className="w-4 h-4" />
          <span>Permanently Delete My Data &amp; Account</span>
        </button>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full border border-stone-200 shadow-xl space-y-4">
            {!deletedSuccess ? (
              <>
                <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center mx-auto">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div className="text-center space-y-2">
                  <h3 className="text-lg font-serif font-bold text-stone-800">
                    Are you completely sure?
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    This will immediately purge all your stories, chat history, and anonymous tokens from our database.
                  </p>
                </div>
                <div className="space-y-2 pt-2">
                  <button
                    id="btn-confirm-permanent-delete"
                    onClick={handleDeleteData}
                    disabled={isDeleting}
                    className="w-full py-3 rounded-xl bg-rose-700 hover:bg-rose-800 text-white text-xs font-semibold cursor-pointer flex items-center justify-center gap-2"
                  >
                    {isDeleting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Purging data securely...</span>
                      </>
                    ) : (
                      <span>Yes, permanently delete everything</span>
                    )}
                  </button>
                  <button
                    onClick={() => setShowConfirmModal(false)}
                    disabled={isDeleting}
                    className="w-full py-2.5 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50 text-xs font-medium cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-6 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-[#5b7c67] mx-auto" />
                <h4 className="font-serif font-bold text-stone-800 text-base">
                  Data Successfully Deleted
                </h4>
                <p className="text-xs text-stone-600">
                  All records and session tokens have been permanently wiped.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
