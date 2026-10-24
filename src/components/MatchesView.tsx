"use client";

import React, { useState } from "react";
import { Users, HeartHandshake, Sparkles, MessageCircle, Check, X, ShieldCheck, ArrowRight } from "lucide-react";
import { MatchProfile, MOCK_MATCHES } from "@/data/mockData";

interface MatchesViewProps {
  onOpenChat: (match: MatchProfile) => void;
  onEditStory: () => void;
}

export default function MatchesView({ onOpenChat, onEditStory }: MatchesViewProps) {
  const [matches, setMatches] = useState<MatchProfile[]>(MOCK_MATCHES);

  const handleConnectRequest = (matchId: string) => {
    setMatches((prev) =>
      prev.map((m) => {
        if (m.id === matchId) {
          return { ...m, status: "requested" };
        }
        return m;
      })
    );
  };

  const handleSimulateMutualOptIn = (matchId: string) => {
    setMatches((prev) =>
      prev.map((m) => {
        if (m.id === matchId) {
          return { ...m, status: "connected" };
        }
        return m;
      })
    );
  };

  const handleDeclineQuietly = (matchId: string) => {
    setMatches((prev) =>
      prev.map((m) => {
        if (m.id === matchId) {
          return { ...m, status: "declined" };
        }
        return m;
      })
    );
  };

  const activeMatches = matches.filter((m) => m.status !== "declined");

  return (
    <div id="matches-container" className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#eaddd0] shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#5b7c67]">
            <Sparkles className="w-5 h-5" />
            <span className="text-xs font-semibold uppercase tracking-wider">Similarity Matching</span>
          </div>
          <button
            onClick={onEditStory}
            className="text-xs text-stone-500 hover:text-stone-800 underline cursor-pointer"
          >
            Update my story
          </button>
        </div>

        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-800">
          Your Top 3 Peer Matches
        </h1>
        <p className="text-stone-600 text-sm leading-relaxed">
          Based on your shared symptoms, duration, and emotional goals. No personal details, names, or raw stories are ever shared.
        </p>

        <div className="bg-[#eef4f0] p-3 rounded-2xl flex items-center gap-2 text-xs text-[#5b7c67] font-medium">
          <ShieldCheck className="w-4 h-4 shrink-0" />
          <span>Double Opt-In Protected: A chat only opens when both people choose to connect.</span>
        </div>
      </div>

      {/* Matches List */}
      <div className="space-y-4">
        {activeMatches.map((match, idx) => (
          <div
            key={match.id}
            id={`match-card-${match.id}`}
            className="bg-white rounded-3xl p-6 sm:p-7 border border-[#eaddd0] shadow-sm space-y-5 transition-all hover:border-[#c26d60]/40"
          >
            {/* Top row */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#fbeee9] text-[#c26d60] flex items-center justify-center font-serif font-bold text-lg">
                  {match.alias.split(" ")[0][0]}
                  {match.alias.split(" ")[1] ? match.alias.split(" ")[1][0] : ""}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base sm:text-lg font-serif font-bold text-stone-800">
                      {match.alias}
                    </h3>
                    <span className="text-xs text-stone-400">#{idx + 1}</span>
                  </div>
                  <span className="text-xs text-stone-500">Journey: {match.duration}</span>
                </div>
              </div>

              <div className="bg-[#f0f5f2] px-3 py-1.5 rounded-full border border-[#d6e5dc] text-xs font-semibold text-[#5b7c67]">
                {match.matchScore}% Match
              </div>
            </div>

            {/* Non-identifying explanation */}
            <div className="bg-[#faf7f2] p-4 rounded-2xl border border-stone-200">
              <p className="text-stone-700 text-sm italic leading-relaxed">
                &ldquo;{match.explanation}&rdquo;
              </p>
            </div>

            {/* Shared tags */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
                Shared Experiences &amp; Goal:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {match.symptoms.map((symp) => (
                  <span
                    key={symp}
                    className="px-3 py-1 bg-stone-100 rounded-lg text-xs text-stone-600 font-medium"
                  >
                    {symp}
                  </span>
                ))}
                <span className="px-3 py-1 bg-[#fbeee9] text-[#c26d60] rounded-lg text-xs font-medium">
                  🎯 {match.supportGoal}
                </span>
              </div>
            </div>

            {/* Action State */}
            <div className="pt-2 border-t border-stone-100">
              {match.status === "idle" && (
                <div className="flex items-center gap-3">
                  <button
                    id={`btn-connect-${match.id}`}
                    onClick={() => handleConnectRequest(match.id)}
                    className="flex-1 py-3.5 px-5 rounded-2xl bg-[#c26d60] hover:bg-[#b05e52] text-white text-sm font-medium shadow-sm transition flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                  >
                    <HeartHandshake className="w-4 h-4" />
                    <span>Request to Connect</span>
                  </button>

                  <button
                    id={`btn-decline-${match.id}`}
                    onClick={() => handleDeclineQuietly(match.id)}
                    className="py-3.5 px-4 rounded-2xl bg-white hover:bg-stone-50 border border-stone-200 text-stone-500 hover:text-stone-700 text-xs font-medium transition cursor-pointer"
                    title="Quietly pass on this match"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {match.status === "requested" && (
                <div className="space-y-3 bg-[#faf7f2] p-4 rounded-2xl border border-stone-200">
                  <div className="flex items-center gap-2 text-stone-700 text-xs sm:text-sm font-medium">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse"></span>
                    <span>Connection request sent! Waiting for {match.alias} to opt in.</span>
                  </div>

                  {/* Demo helper to simulate both opted in */}
                  <div className="pt-1 flex items-center justify-between text-xs">
                    <span className="text-stone-400 italic">[Hackathon Demo Helper]:</span>
                    <button
                      onClick={() => handleSimulateMutualOptIn(match.id)}
                      className="text-[#5b7c67] hover:underline font-semibold cursor-pointer"
                    >
                      Simulate {match.alias} saying YES →
                    </button>
                  </div>
                </div>
              )}

              {match.status === "connected" && (
                <div className="space-y-3 bg-[#eef4f0] p-4 rounded-2xl border border-[#d6e5dc]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[#5b7c67] text-sm font-bold">
                      <Check className="w-4 h-4" />
                      <span>Mutual Opt-In Confirmed!</span>
                    </div>
                  </div>

                  <p className="text-xs text-stone-600">
                    Both of you have agreed to connect anonymously. Your private chat room is ready.
                  </p>

                  <button
                    id={`btn-open-chat-${match.id}`}
                    onClick={() => onOpenChat(match)}
                    className="w-full py-3.5 px-5 rounded-2xl bg-[#5b7c67] hover:bg-[#4d6a57] text-white text-sm font-medium shadow-sm transition flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Enter Anonymous Chat with {match.alias}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {activeMatches.length === 0 && (
          <div className="bg-white rounded-3xl p-8 border border-stone-200 text-center space-y-4">
            <p className="text-stone-600 text-sm">
              You’ve reviewed all 3 matches for now.
            </p>
            <button
              onClick={() => setMatches(MOCK_MATCHES)}
              className="px-6 py-3 rounded-2xl bg-[#c26d60] text-white text-sm font-medium cursor-pointer"
            >
              Reset Sample Matches
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
