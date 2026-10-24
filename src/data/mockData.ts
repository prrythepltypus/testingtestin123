export interface MatchProfile {
  id: string;
  alias: string;
  explanation: string;
  symptoms: string[];
  duration: string;
  supportGoal: string;
  matchScore: number;
  status: "idle" | "requested" | "connected" | "declined";
}

export interface ChatMessage {
  id: string;
  senderAlias: string;
  isMe: boolean;
  text: string;
  timestamp: string;
  flagged?: boolean;
}

export const MOCK_MATCHES: MatchProfile[] = [
  {
    id: "match-1",
    alias: "Quiet Willow",
    explanation: "Also navigating heavy, exhausting periods and severe cramping for 2+ years; seeking gentle emotional solidarity and everyday coping tips.",
    symptoms: ["Severe Cramps", "Heavy Flow", "Fatigue", "Lower Back Pain"],
    duration: "1-3 years",
    supportGoal: "Emotional solidarity & daily coping",
    matchScore: 94,
    status: "idle"
  },
  {
    id: "match-2",
    alias: "Warm Cedar",
    explanation: "Managing irregular cycles and cycle-related mood shifts while balancing a demanding work schedule; looking for someone who gets the mental toll.",
    symptoms: ["Irregular Cycles", "PMDD / Mood Drops", "Brain Fog", "Bloating"],
    duration: "3-5 years",
    supportGoal: "Balancing work & emotional support",
    matchScore: 89,
    status: "idle"
  },
  {
    id: "match-3",
    alias: "Gentle Meadow",
    explanation: "Suspecting endometriosis after years of dismissal by clinics; preparing for a new specialist visit and wants to compare notes on advocacy.",
    symptoms: ["Deep Pelvic Pain", "Ovulation Pain", "Digestive Flare-ups"],
    duration: "5+ years",
    supportGoal: "Doctor visit prep & advocacy",
    matchScore: 85,
    status: "idle"
  }
];

export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: "msg-1",
    senderAlias: "Quiet Willow",
    isMe: false,
    text: "Hi there! I saw we both experience really intense cramps and fatigue around day 2. Just knowing someone else gets that heavy fog is already comforting.",
    timestamp: "10:14 AM"
  },
  {
    id: "msg-2",
    senderAlias: "You (Gentle River)",
    isMe: true,
    text: "Hi Quiet Willow! Thank you for saying that. Yes, the fatigue is honestly the hardest part when people expect you to just push through work as normal.",
    timestamp: "10:16 AM"
  },
  {
    id: "msg-3",
    senderAlias: "Quiet Willow",
    isMe: false,
    text: "Exactly. What has helped me lately is keeping a heated lavender wrap at my desk and drinking peppermint-ginger tea. Have you found any small comforts that help take the edge off?",
    timestamp: "10:18 AM"
  }
];

export const RED_FLAG_KEYWORDS = [
  "soaking through",
  "soak through",
  "two pads an hour",
  "fainted",
  "fainting",
  "blacked out",
  "unbearable pain",
  "vomiting constantly",
  "suicide",
  "kill myself",
  "end my life",
  "hurt myself",
  "self harm",
  "pregnant and bleeding"
];

export const MEDICAL_ADVICE_TRIGGERS = [
  "you should take",
  "take 800mg",
  "take 500mg",
  "take ibuprofen",
  "stop taking your medication",
  "stop your birth control",
  "you definitely have",
  "i diagnose you with",
  "increase your dose",
  "prescription"
];
