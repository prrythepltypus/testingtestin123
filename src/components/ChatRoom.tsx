"use client";

import React, { useState, useRef, useEffect } from "react";
import { 
  Send, 
  ShieldAlert, 
  UserX, 
  Flag, 
  ArrowLeft, 
  AlertCircle, 
  Phone, 
  Info,
  CheckCircle2,
  Lock
} from "lucide-react";
import { MatchProfile, ChatMessage, INITIAL_CHAT_MESSAGES, MEDICAL_ADVICE_TRIGGERS, RED_FLAG_KEYWORDS } from "@/data/mockData";
import DisclaimerBanner from "./DisclaimerBanner";

interface ChatRoomProps {
  match: MatchProfile;
  onBackToMatches: () => void;
  onBlockUser: (matchId: string) => void;
}

export default function ChatRoom({ match, onBackToMatches, onBlockUser }: ChatRoomProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_CHAT_MESSAGES);
  const [inputMessage, setInputMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  // Moderation state
  const [moderationWarning, setModerationWarning] = useState<string | null>(null);
  const [crisisAlert, setCrisisAlert] = useState(false);

  // Modals
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [reportSubmitted, setReportSubmitted] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isSending) return;

    const lower = inputMessage.toLowerCase();

    // 1. Check for medical advice / diagnosing / prescribing
    for (const phrase of MEDICAL_ADVICE_TRIGGERS) {
      if (lower.includes(phrase)) {
        setModerationWarning(
          "We love sharing personal stories, but telling someone what medication or dose to take (or diagnosing a condition) is not permitted. Please rephrase by sharing your personal experience ('What helped me was...') and encourage consulting a clinician."
        );
        return;
      }
    }

    // 2. Check for crisis / self-harm triggers
    for (const phrase of RED_FLAG_KEYWORDS) {
      if (lower.includes(phrase)) {
        setCrisisAlert(true);
        // Do not block them completely, but show the lifeline
      }
    }

    setIsSending(true);
    setModerationWarning(null);

    // Simulate sending message
    setTimeout(() => {
      const newMsg: ChatMessage = {
        id: `msg-${Date.now()}`,
        senderAlias: "You (Gentle River)",
        isMe: true,
        text: inputMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };

      setMessages((prev) => [...prev, newMsg]);
      setInputMessage("");
      setIsSending(false);

      // Simulate a gentle peer reply after a short delay
      setTimeout(() => {
        const replyMsg: ChatMessage = {
          id: `msg-${Date.now() + 1}`,
          senderAlias: match.alias,
          isMe: false,
          text: "Thank you for sharing that with me. It brings so much peace knowing I’m not alone in this.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        };
        setMessages((prev) => [...prev, replyMsg]);
      }, 1500);
    }, 400);
  };

  const handleBlockConfirm = () => {
    onBlockUser(match.id);
    setShowBlockModal(false);
  };

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReportSubmitted(true);
    setTimeout(() => {
      onBlockUser(match.id);
    }, 1500);
  };

  return (
    <div id="chat-room-container" className="max-w-2xl mx-auto flex flex-col h-[calc(100vh-140px)] min-h-[580px] bg-white rounded-3xl border border-[#eaddd0] shadow-sm overflow-hidden">
      {/* Top Header */}
      <div className="bg-[#faf7f2] border-b border-[#eaddd0] p-4 flex items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToMatches}
            className="p-2 rounded-xl hover:bg-stone-200 text-stone-600 transition cursor-pointer"
            title="Back to matches"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-serif font-bold text-stone-800">
                {match.alias}
              </h2>
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            </div>
            <div className="flex items-center gap-2 text-xs text-stone-500">
              <span>Your alias: <strong>Gentle River</strong></span>
              <span>•</span>
              <span className="flex items-center gap-1 text-[#5b7c67]">
                <Lock className="w-3 h-3" /> Anonymous
              </span>
            </div>
          </div>
        </div>

        {/* Safety Actions: Block and Report */}
        <div className="flex items-center gap-1">
          <button
            id="btn-report-chat"
            onClick={() => setShowReportModal(true)}
            className="p-2 text-stone-400 hover:text-amber-700 hover:bg-amber-50 rounded-xl transition cursor-pointer"
            title="Report this chat"
          >
            <Flag className="w-4 h-4" />
          </button>
          <button
            id="btn-block-chat"
            onClick={() => setShowBlockModal(true)}
            className="p-2 text-stone-400 hover:text-rose-700 hover:bg-rose-50 rounded-xl transition cursor-pointer"
            title="Block user"
          >
            <UserX className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Persistent Disclaimer Banner */}
      <DisclaimerBanner compact />

      {/* Moderation Warning Popup */}
      {moderationWarning && (
        <div 
          id="moderation-warning-banner"
          className="bg-amber-50 border-b border-amber-200 p-4 text-xs space-y-2 animate-in slide-in-from-top-2"
        >
          <div className="flex items-start gap-2 text-amber-900 font-semibold">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>Message Blocked by Peer Safety Moderation</span>
          </div>
          <p className="text-amber-800 pl-6 leading-relaxed">
            {moderationWarning}
          </p>
          <div className="pl-6 pt-1 flex items-center gap-3">
            <button
              onClick={() => setModerationWarning(null)}
              className="text-amber-900 font-bold underline cursor-pointer"
            >
              Dismiss and edit message
            </button>
          </div>
        </div>
      )}

      {/* In-Chat Crisis Lifeline Card */}
      {crisisAlert && (
        <div className="bg-rose-50 border-b border-rose-200 p-3.5 text-xs text-rose-900 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-rose-700 shrink-0" />
            <span>
              <strong>Care reminder:</strong> If you are feeling overwhelmed or in crisis, free 24/7 help is available at <strong>988</strong> (Call or Text).
            </span>
          </div>
          <button
            onClick={() => setCrisisAlert(false)}
            className="text-rose-700 font-bold underline cursor-pointer shrink-0"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Chat Messages Body */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-[#faf7f2]/50">
        <div className="text-center my-2">
          <span className="text-[11px] bg-stone-200/70 text-stone-600 px-3 py-1 rounded-full">
            Chat connected anonymously • Double opt-in confirmed
          </span>
        </div>

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.isMe ? "items-end" : "items-start"}`}
          >
            <div className="flex items-center gap-1.5 mb-1 px-1">
              <span className="text-[11px] font-semibold text-stone-500">
                {msg.senderAlias}
              </span>
              <span className="text-[10px] text-stone-400">{msg.timestamp}</span>
            </div>

            <div
              className={`max-w-[85%] sm:max-w-[75%] p-4 rounded-3xl text-sm leading-relaxed shadow-xs ${
                msg.isMe
                  ? "bg-[#c26d60] text-white rounded-br-xs"
                  : "bg-white text-stone-800 border border-stone-200 rounded-bl-xs"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input Area */}
      <div className="p-3 sm:p-4 bg-white border-t border-[#eaddd0]">
        <div className="flex items-center justify-between text-[11px] text-stone-400 mb-2 px-1">
          <span>Remember: Personal experiences welcome; no prescriptions or diagnosing.</span>
          <button
            type="button"
            onClick={() => {
              setInputMessage("You should take 800mg of ibuprofen for your pain");
            }}
            className="text-[#c26d60] hover:underline cursor-pointer"
          >
            [Demo: Test Medical Advice Block]
          </button>
        </div>

        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <input
            id="chat-message-input"
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder={`Message ${match.alias} anonymously...`}
            className="flex-1 py-3 px-4 rounded-2xl border border-stone-200 focus:border-[#c26d60] focus:ring-2 focus:ring-[#fbeee9] outline-none text-stone-800 text-sm transition"
          />
          <button
            id="btn-send-message"
            type="submit"
            disabled={!inputMessage.trim() || isSending}
            className="p-3.5 rounded-2xl bg-[#c26d60] hover:bg-[#b05e52] disabled:opacity-40 text-white shadow-sm transition cursor-pointer shrink-0 active:scale-95"
            title="Send message"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>

      {/* Block Confirmation Modal */}
      {showBlockModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full border border-stone-200 shadow-xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center mx-auto">
              <UserX className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="text-lg font-serif font-bold text-stone-800">
                Block {match.alias}?
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                This chat will end immediately. You will <strong>never</strong> be matched with this peer again, and neither of you will see each other&apos;s stories.
              </p>
            </div>
            <div className="space-y-2 pt-2">
              <button
                id="btn-confirm-block"
                onClick={handleBlockConfirm}
                className="w-full py-3 rounded-xl bg-rose-700 hover:bg-rose-800 text-white text-xs font-semibold cursor-pointer"
              >
                Yes, Block and End Chat
              </button>
              <button
                onClick={() => setShowBlockModal(false)}
                className="w-full py-2.5 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50 text-xs font-medium cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-stone-200 shadow-xl space-y-4">
            {!reportSubmitted ? (
              <form onSubmit={handleReportSubmit} className="space-y-4">
                <div className="flex items-center gap-2 text-amber-700">
                  <Flag className="w-5 h-5" />
                  <h3 className="text-lg font-serif font-bold text-stone-800">
                    Report Chat for Moderation
                  </h3>
                </div>
                <p className="text-xs text-stone-600">
                  Safety is our absolute priority. Reports are reviewed by human safety moderators. Submitting a report will quietly close this chat.
                </p>

                <div className="space-y-2 text-xs">
                  <label className="font-semibold text-stone-700 block">Reason for Report:</label>
                  {[
                    "Giving medical advice or prescribing dosages",
                    "Harassment, abusive language, or hate speech",
                    "Sharing unsolicited contact information or spam",
                    "Other concern"
                  ].map((reason) => (
                    <label key={reason} className="flex items-center gap-2 text-stone-700 cursor-pointer">
                      <input
                        type="radio"
                        name="reportReason"
                        value={reason}
                        checked={reportReason === reason}
                        onChange={(e) => setReportReason(e.target.value)}
                        required
                      />
                      <span>{reason}</span>
                    </label>
                  ))}
                </div>

                <div className="space-y-2 pt-2">
                  <button
                    id="btn-submit-report"
                    type="submit"
                    className="w-full py-3 rounded-xl bg-amber-700 hover:bg-amber-800 text-white text-xs font-semibold cursor-pointer"
                  >
                    Submit Report &amp; Exit Chat
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowReportModal(false)}
                    className="w-full py-2.5 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50 text-xs font-medium cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-6 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-[#5b7c67] mx-auto" />
                <h4 className="font-serif font-bold text-stone-800 text-base">
                  Report Received
                </h4>
                <p className="text-xs text-stone-600">
                  Thank you for keeping our community safe. Exiting chat now...
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
