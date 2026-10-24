"use client";

import React, { useState } from "react";
import AgeGate from "@/components/AgeGate";
import DisclaimerBanner from "@/components/DisclaimerBanner";
import Navigation, { NavTab } from "@/components/Navigation";
import StoryForm from "@/components/StoryForm";
import MatchesView from "@/components/MatchesView";
import ChatRoom from "@/components/ChatRoom";
import SettingsView from "@/components/SettingsView";
import { MatchProfile, MOCK_MATCHES } from "@/data/mockData";
import { ShieldCheck, HeartHandshake, Sparkles, MessageCircle } from "lucide-react";

export default function Home() {
  const [isAgeVerified, setIsAgeVerified] = useState(false);
  const [currentTab, setCurrentTab] = useState<NavTab>("story");
  const [activeChatMatch, setActiveChatMatch] = useState<MatchProfile | null>(null);
  const [blockedMatchIds, setBlockedMatchIds] = useState<string[]>([]);
  const [hasSubmittedStory, setHasSubmittedStory] = useState(false);

  const handleStorySubmitted = (storyData: {
    storyText: string;
    ageRange: string;
    duration: string;
    supportGoal: string;
  }) => {
    setHasSubmittedStory(true);
    setCurrentTab("matches");
  };

  const handleOpenChat = (match: MatchProfile) => {
    setActiveChatMatch(match);
    setCurrentTab("chat");
  };

  const handleBackToMatches = () => {
    setCurrentTab("matches");
  };

  const handleBlockUser = (matchId: string) => {
    setBlockedMatchIds((prev) => [...prev, matchId]);
    setActiveChatMatch(null);
    setCurrentTab("matches");
  };

  const handleDataDeleted = () => {
    setHasSubmittedStory(false);
    setActiveChatMatch(null);
    setBlockedMatchIds([]);
    setCurrentTab("story");
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#faf7f2]">
      {/* 1. Mandatory Age Gate on first visit */}
      <AgeGate onVerified={() => setIsAgeVerified(true)} />

      {/* 2. Top Navigation */}
      <Navigation
        currentTab={currentTab}
        onTabChange={(tab) => {
          if (tab === "chat" && !activeChatMatch) {
            // If they click chat without an active match, choose the first match for demo
            setActiveChatMatch(MOCK_MATCHES[0]);
          }
          setCurrentTab(tab);
        }}
        matchesCount={3 - blockedMatchIds.length}
        hasActiveChat={Boolean(activeChatMatch)}
      />

      {/* 3. Disclaimer Banner (Pinned on landing / story / matches) */}
      {currentTab !== "chat" && <DisclaimerBanner />}

      {/* 4. Tab Views */}
      <div className="flex-1 w-full max-w-2xl mx-auto px-4 py-6 sm:py-8 pb-28 sm:pb-16">
        {currentTab === "story" && (
          <div className="space-y-6">
            <StoryForm onStorySubmitted={handleStorySubmitted} />
          </div>
        )}

        {currentTab === "matches" && (
          <div className="space-y-6">
            <MatchesView
              onOpenChat={handleOpenChat}
              onEditStory={() => setCurrentTab("story")}
            />
          </div>
        )}

        {currentTab === "chat" && (
          <div>
            {activeChatMatch ? (
              <ChatRoom
                match={activeChatMatch}
                onBackToMatches={handleBackToMatches}
                onBlockUser={handleBlockUser}
              />
            ) : (
              <div className="bg-white rounded-3xl p-8 border border-stone-200 text-center space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#fbeee9] text-[#c26d60] flex items-center justify-center mx-auto">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <h3 className="font-serif font-bold text-lg text-stone-800">
                  No Active Chat Yet
                </h3>
                <p className="text-xs text-stone-600 max-w-sm mx-auto">
                  Connect with one of your 3 peer matches first. A chat opens as soon as both of you agree to connect.
                </p>
                <button
                  onClick={() => setCurrentTab("matches")}
                  className="px-5 py-3 rounded-2xl bg-[#c26d60] text-white text-xs font-semibold cursor-pointer"
                >
                  View My Peer Matches
                </button>
              </div>
            )}
          </div>
        )}

        {currentTab === "settings" && (
          <SettingsView onDataDeleted={handleDataDeleted} />
        )}
      </div>
    </main>
  );
}
