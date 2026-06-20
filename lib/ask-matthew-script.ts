/**
 * Scripted responses for the "Ask Matthew" demo chat. No AI/API — a keyword
 * matcher over a small intent map. (Phase 2 swaps this for a real AI SDK chat.)
 */

interface Intent {
  keywords: string[];
  response: string;
}

/** Checked in order — first matching keyword wins, so specific intents go first. */
const INTENTS: Intent[] = [
  {
    keywords: ["shop", "buy", "merch", "store", "purchase", "drop"],
    response:
      "You can shop the latest drop right from this page — tap a product and it adds to your bag without ever leaving the chat. (This is a scripted demo, so the cart is for show.)",
  },
  {
    keywords: ["contact", "email", "reach", "dm", "booking", "book you"],
    response:
      "Best way to reach Matthew is right here, or email hello@askmatthew.example. Bookings and collabs go through the same inbox.",
  },
  {
    keywords: ["music", "listen", "song", "track", "spotify", "sound"],
    response:
      "Matthew's latest single is pinned up top — hit play and it streams inline. Want the full playlist or the story behind the record?",
  },
  {
    keywords: ["learn", "teach", "how do you", "tutorial", "lesson", "course"],
    response:
      "There's a learning path for that — short lessons that build on each other. Ask about a topic and I'll point you to the right starting step.",
  },
  {
    keywords: [
      "what do you do",
      "who are you",
      "about",
      "your work",
      "portfolio",
      "yourself",
      "do you make",
    ],
    response:
      "Matthew is a creator — music, video, and the occasional sold-out drop. This page replaces a static link-in-bio: ask anything and it routes you to the right thing (shop, listen, learn, or get in touch).",
  },
];

const FALLBACK =
  "Good question! In the full version I'd answer that with AI — for this demo, try asking about Matthew's work, music, shop, or how to get in touch.";

/** Returns a canned answer for a user message. */
export function matchResponse(input: string): string {
  const text = input.toLowerCase();
  for (const intent of INTENTS) {
    if (intent.keywords.some((k) => text.includes(k))) return intent.response;
  }
  return FALLBACK;
}

/** Starter chips shown under the chat — each resolves to a real intent. */
export const SUGGESTED_PROMPTS = [
  "What do you do?",
  "Where can I shop your latest drop?",
  "What music do you make?",
  "How do I contact you?",
];
