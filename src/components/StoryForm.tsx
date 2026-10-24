"use client";

import React, { useState } from "react";
import { Sparkles, Shield, AlertTriangle, Phone, ArrowRight, CheckCircle2, Lock, EyeOff } from "lucide-react";
import { RED_FLAG_KEYWORDS } from "@/data/mockData";

interface StoryFormProps {
  onStorySubmitted: (storyData: {
    storyText: string;
    ageRange: string;
    duration: string;
    supportGoal: string;
  }) => void;
}

const AGE_RANGES = ["18-24", "25-34", "35-44", "45-54", "55+"];
const DURATIONS = ["< 6 months", "6-12 months", "1-3 years", "3-5 years", "5+ years"];
const SUPPORT_GOALS = [
  "Emotional solidarity",
  "Daily coping routines",
  "Navigating work & study",
  "Doctor visit prep & advocacy"
];

export default function StoryForm({ onStorySubmitted }: StoryFormProps) {
  const [storyText, setStoryText] = useState("");
  const [ageRange, setAgeRange] = useState("25-34");
  const [duration, setDuration] = useState("1-3 years");
  const [supportGoal, setSupportGoal] = useState("Emotional solidarity");

  const [redFlagDetected, setRedFlagDetected] = useState<string | null>(null);
  const [dismissedCrisis, setDismissedCrisis] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showPiiDemo, setShowPiiDemo] = useState(false);

  // Check for red flag triggers
  const checkForRedFlags = (text: string) => {
    const lower = text.toLowerCase();
    for (const phrase of RED_FLAG_KEYWORDS) {
      if (lower.includes(phrase)) {
        return phrase;
      }
    }
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!storyText.trim()) return;

    setIsAnalyzing(true);

    setTimeout(() => {
      setIsAnalyzing(false);
      const flagged = checkForRedFlags(storyText);

      if (flagged && !dismissedCrisis) {
        setRedFlagDetected(flagged);
        return;
      }

      onStorySubmitted({
        storyText,
        ageRange,
        duration,
        supportGoal
      });
    }, 600);
  };

  const handleTestCrisisKeyword = () => {
    const sample = "For the past 2 days I've been soaking through two pads an hour, feeling severe dizzy spells and fainting. I also feel so hopeless about my health.";
    setStoryText(sample);
    setRedFlagDetected("two pads an hour");
  };

  // Simulated PII cleaner for demonstration
  const cleanPiiDemo = (raw: string) => {
    return raw
      .replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, "[email removed]")
      .replace(/\b\d{3}[-.\s]??\d{3}[-.\s]??\d{4}\b/g, "[phone removed]")
      .replace(/@\w+/g, "[handle removed]");
  };

  return (
    <div id="story-submission-container" className="max-w-2xl mx-auto space-y-6">
      {/* Intro Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#eaddd0] shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-[#c26d60]">
          <Sparkles className="w-5 h-5" />
          <span className="text-xs font-semibold uppercase tracking-wider">Your Story Matters</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-800">
          Share your experience in your own words
        </h1>
        <p className="text-stone-600 text-sm leading-relaxed">
          Tell us what you are experiencing. We will find 3 peers who truly understand what you are going through. Your exact words and identity are <strong>never</strong> shared publicly.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-stone-500">
          <div className="flex items-center gap-1 bg-[#faf7f2] px-3 py-1.5 rounded-full border border-stone-200">
            <Lock className="w-3.5 h-3.5 text-[#5b7c67]" />
            <span>100% Anonymous</span>
          </div>
          <div className="flex items-center gap-1 bg-[#faf7f2] px-3 py-1.5 rounded-full border border-stone-200">
            <EyeOff className="w-3.5 h-3.5 text-[#5b7c67]" />
            <span>Names &amp; Contacts Auto-Stripped</span>
          </div>
        </div>
      </div>

      {/* Red Flag Emergency Card if triggered */}
      {redFlagDetected && !dismissedCrisis && (
        <div 
          id="crisis-urgent-card"
          className="bg-rose-50 border-2 border-rose-300 rounded-3xl p-6 sm:p-8 space-y-4 shadow-md animate-in fade-in duration-300"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-100 flex items-center justify-center text-rose-700 shrink-0">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-serif font-bold text-rose-900">
                We care about your safety and wellbeing
              </h3>
              <p className="text-rose-800 text-xs sm:text-sm mt-1 leading-relaxed">
                Your story mentioned severe symptoms or distress that could require immediate care. While peer support is comforting, urgent medical and crisis support is available right now:
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 pt-2">
            <div className="bg-white p-4 rounded-2xl border border-rose-200 space-y-1">
              <span className="text-xs font-bold text-rose-800 block">📞 988 Suicide &amp; Crisis Lifeline</span>
              <p className="text-xs text-stone-600">Free, confidential 24/7 call or text support across the US.</p>
              <a href="tel:988" className="inline-block mt-2 text-xs font-bold text-rose-700 underline">
                Call or Text 988 Now
              </a>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-rose-200 space-y-1">
              <span className="text-xs font-bold text-amber-800 block">🏥 Urgent Medical Attention</span>
              <p className="text-xs text-stone-600">If you are soaking &gt;2 pads/hr, fainted, or experiencing acute pain, please visit an Emergency Room or urgent clinic.</p>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3 items-center justify-between border-t border-rose-200">
            <span className="text-xs text-rose-700 italic">
              You are never excluded. You can still continue to connect with peers:
            </span>
            <button
              id="btn-continue-after-crisis"
              type="button"
              onClick={() => {
                setDismissedCrisis(true);
              }}
              className="px-5 py-2.5 rounded-xl bg-rose-800 hover:bg-rose-900 text-white text-xs font-semibold cursor-pointer shrink-0 transition"
            >
              I understand, continue with peer match
            </button>
          </div>
        </div>
      )}

      {/* Main Story Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border border-[#eaddd0] shadow-sm space-y-6">
        {/* Story Textarea */}
        <div className="space-y-2">
          <label htmlFor="story-input" className="block text-sm font-semibold text-stone-800">
            What has your menstrual health journey been like?
          </label>
          <textarea
            id="story-input"
            rows={5}
            value={storyText}
            onChange={(e) => setStoryText(e.target.value)}
            placeholder="Share your symptoms, feelings, questions, or what a typical cycle looks like for you... (e.g., 'I’ve had intense lower pelvic cramping that doesn't respond to heating pads, and heavy bleeding for the last two years. Feeling isolated and hoping to talk with someone who gets it.')"
            className="w-full p-4 rounded-2xl border border-stone-200 focus:border-[#c26d60] focus:ring-2 focus:ring-[#fbeee9] outline-none text-stone-800 text-sm sm:text-base leading-relaxed transition resize-y"
            required
          />
          <div className="flex justify-between items-center text-xs text-stone-400">
            <span>Minimum 20 characters</span>
            <button
              type="button"
              onClick={handleTestCrisisKeyword}
              className="text-[#c26d60] hover:underline cursor-pointer"
            >
              [Demo: Test Urgent Red-Flag Alert]
            </button>
          </div>
        </div>

        {/* Tappable Choice: Age Range */}
        <div className="space-y-2.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-stone-500">
            Age Range (Optional)
          </label>
          <div className="flex flex-wrap gap-2">
            {AGE_RANGES.map((age) => (
              <button
                key={age}
                type="button"
                onClick={() => setAgeRange(age)}
                className={`py-2.5 px-4 rounded-xl text-xs sm:text-sm font-medium transition cursor-pointer ${
                  ageRange === age
                    ? "bg-[#c26d60] text-white shadow-sm"
                    : "bg-[#faf7f2] hover:bg-stone-100 text-stone-700 border border-stone-200"
                }`}
              >
                {age}
              </button>
            ))}
          </div>
        </div>

        {/* Tappable Choice: Duration */}
        <div className="space-y-2.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-stone-500">
            How long has this been going on?
          </label>
          <div className="flex flex-wrap gap-2">
            {DURATIONS.map((dur) => (
              <button
                key={dur}
                type="button"
                onClick={() => setDuration(dur)}
                className={`py-2.5 px-4 rounded-xl text-xs sm:text-sm font-medium transition cursor-pointer ${
                  duration === dur
                    ? "bg-[#5b7c67] text-white shadow-sm"
                    : "bg-[#faf7f2] hover:bg-stone-100 text-stone-700 border border-stone-200"
                }`}
              >
                {dur}
              </button>
            ))}
          </div>
        </div>

        {/* Tappable Choice: Support Goal */}
        <div className="space-y-2.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-stone-500">
            What kind of support are you hoping for most?
          </label>
          <div className="grid sm:grid-cols-2 gap-2">
            {SUPPORT_GOALS.map((goal) => (
              <button
                key={goal}
                type="button"
                onClick={() => setSupportGoal(goal)}
                className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-medium text-left transition cursor-pointer flex items-center justify-between ${
                  supportGoal === goal
                    ? "bg-[#fbeee9] border-2 border-[#c26d60] text-[#c26d60]"
                    : "bg-[#faf7f2] hover:bg-stone-100 text-stone-700 border border-stone-200"
                }`}
              >
                <span>{goal}</span>
                {supportGoal === goal && <CheckCircle2 className="w-4 h-4 text-[#c26d60] shrink-0" />}
              </button>
            ))}
          </div>
        </div>

        {/* PII Privacy Shield Note */}
        <div className="bg-[#faf7f2] p-4 rounded-2xl border border-stone-200 text-xs text-stone-600 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-stone-800 flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-[#5b7c67]" />
              Privacy Shield Active
            </span>
            <button
              type="button"
              onClick={() => setShowPiiDemo(!showPiiDemo)}
              className="text-[#c26d60] underline cursor-pointer"
            >
              {showPiiDemo ? "Hide PII explanation" : "How does PII stripping work?"}
            </button>
          </div>
          <p>
            Before your story is processed or converted to match embeddings, our server strips personal names, emails, phone numbers, addresses, social handles, and specific schools or workplaces.
          </p>
          {showPiiDemo && (
            <div className="bg-white p-3 rounded-xl border border-stone-200 font-mono text-[11px] text-stone-500 mt-2">
              Example: &ldquo;Hi I&apos;m Maya, 415-555-0192, maya@gmail.com&rdquo; → &ldquo;Hi [name removed], [phone removed], [email removed]&rdquo;
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          id="btn-submit-story"
          type="submit"
          disabled={isAnalyzing || !storyText.trim()}
          className="w-full py-4 px-6 rounded-2xl bg-[#c26d60] hover:bg-[#b05e52] disabled:opacity-50 text-white font-medium text-base shadow-md transition flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
        >
          {isAnalyzing ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Cleaning story &amp; extracting tags...
            </span>
          ) : (
            <>
              <span>Find My 3 Peer Matches</span>
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
