"use client";

import React from "react";
import { PenTool, Sparkles, MessageCircle, ShieldCheck } from "lucide-react";

export type NavTab = "story" | "matches" | "chat" | "settings";

interface NavigationProps {
  currentTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  matchesCount: number;
  hasActiveChat: boolean;
}

export default function Navigation({
  currentTab,
  onTabChange,
  matchesCount,
  hasActiveChat
}: NavigationProps) {
  const tabs = [
    {
      id: "story" as NavTab,
      label: "My Story",
      icon: PenTool,
      badge: null
    },
    {
      id: "matches" as NavTab,
      label: "Matches",
      icon: Sparkles,
      badge: matchesCount > 0 ? matchesCount : null
    },
    {
      id: "chat" as NavTab,
      label: "Chat",
      icon: MessageCircle,
      badge: hasActiveChat ? "●" : null
    },
    {
      id: "settings" as NavTab,
      label: "Privacy",
      icon: ShieldCheck,
      badge: null
    }
  ];

  return (
    <>
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#faf7f2]/95 backdrop-blur-md border-b border-[#eaddd0]">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#fbeee9] flex items-center justify-center text-[#c26d60] font-serif font-black text-base shadow-xs">
              🌙
            </div>
            <div>
              <span className="font-serif font-bold text-lg text-stone-800 tracking-tight block leading-tight">
                MoonPeer
              </span>
              <span className="text-[10px] text-stone-500 tracking-wide font-medium">
                Anonymous Menstrual Health Peer Support
              </span>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-1 text-xs">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = currentTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`nav-desktop-${tab.id}`}
                  onClick={() => onTabChange(tab.id)}
                  className={`py-2 px-3.5 rounded-xl font-medium transition cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? "bg-[#c26d60] text-white shadow-xs"
                      : "text-stone-600 hover:bg-stone-200/50"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className="ml-1 text-[10px] bg-white/20 px-1.5 rounded-full font-bold">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar (Always visible on mobile) */}
      <nav 
        id="mobile-bottom-nav"
        className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#eaddd0] py-1.5 px-3 shadow-lg"
      >
        <div className="flex items-center justify-around">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`nav-mobile-${tab.id}`}
                onClick={() => onTabChange(tab.id)}
                className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl min-w-[64px] min-h-[48px] transition cursor-pointer active:scale-95 relative ${
                  isActive ? "text-[#c26d60]" : "text-stone-400 hover:text-stone-600"
                }`}
              >
                <div className="relative">
                  <Icon className="w-5 h-5" />
                  {tab.badge && (
                    <span className="absolute -top-1.5 -right-2 bg-[#c26d60] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                      {tab.badge}
                    </span>
                  )}
                </div>
                <span className={`text-[10px] mt-0.5 ${isActive ? "font-bold text-stone-800" : "font-medium"}`}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
