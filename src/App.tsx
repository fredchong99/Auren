// @ts-nocheck
import { useEffect, useState } from "react";

/**
 * AUREN — Investor Intelligence Academy · v2.0
 * AI-powered investor education platform — investor demo
 *
 * Built for the IOSCO TechSprint (Madrid, Demo Day 8 Oct 2026)
 * — Persistent hyper-realistic Digital Human host
 * — AI-led conversational cognitive assessment
 * — Live Rehearsal Engine with evidential scorecards
 * — Regulator oversight dashboard
 * — Spot-the-Scam lab (IOSCO Problem Statement 1)
 * — Multilingual + integrated eKYC
 *
 * All quoted text (in Quote blocks and “…” citations) is verbatim from:
 * AUREN Concept Paper v2 · Full Project Paper · Project Paper Deck v2
 */

const BRAND = {
  graphite: "#111418",
  navy: "#172033",
  deep: "#080A0F",
  white: "#F7F8FA",
  lime: "#CBFB00",
  gold: "#D8B56D",
  cyan: "#72E7FF",
  warmRed: "#FF6B6B",
  amber: "#F2A93B",
  muted: "#9BA3AF",
  regYellow: "#F5C518",
};

const sections = [
  "Overview",
  "Problem",
  "Journey",
  "AUREN Interview",
  "Assessment",
  "Dashboard",
  "3-Day Course",
  "AI Memory",
  "AI Literacy Lab",
  "Spot the Scam",
  "Rehearsal Engine",
  "Simulation",
  "Report",
  "Regulator View",
  "Platform",
  "Enterprise",
];

const moduleColors = {
  VIDEO: "#72E7FF",
  "AI CHAT": "#CBFB00",
  SIMULATION: "#D8B56D",
  CHECKPOINT: "#9BA3AF",
};

const courseDays = [
  {
    day: "Day 1",
    title: "Markets, Risk & Self-Awareness",
    outcome: "Understand capital markets and your own investor behavior.",
    duration: "~1h 50m · 5 modules",
    modules: [
      { type: "VIDEO", duration: "25 min", title: "How capital markets work", detail: "Stocks, bonds, ETFs and funds. Why markets exist, who participates, how prices move." },
      { type: "VIDEO", duration: "20 min", title: "Risk, volatility and time horizon", detail: "What risk really means. Risk vs reward tradeoffs. Why your time horizon changes everything." },
      { type: "AI CHAT", duration: "20 min", title: "Investor psychology and bias", detail: "AUREN walks you through cognitive biases that ruin investors: loss aversion, recency bias, FOMO, anchoring." },
      { type: "SIMULATION", duration: "20 min", title: "Personal risk awareness check", detail: "Interactive scenarios reveal your real risk tolerance — not what you think it is. AUREN observes in real time." },
      { type: "CHECKPOINT", duration: "10 min", title: "Day 1 reflection with AUREN", detail: "Recap conversation. AUREN logs what stuck, what didn't, and quietly reshapes Day 2 to fit you." },
    ],
  },
  {
    day: "Day 2",
    title: "Using AI Safely",
    outcome: "Use AI as a learning tool without blindly trusting it.",
    duration: "~2h 5m · 6 modules",
    modules: [
      { type: "VIDEO", duration: "20 min", title: "What AI can and cannot do", detail: "How LLMs actually work. What they're good at. Where they fail. Why confidence ≠ accuracy." },
      { type: "SIMULATION", duration: "25 min", title: "Hallucinations and false confidence", detail: "Spot the hallucination. Compare AI answers side-by-side. Learn the telltale signs of fabricated information." },
      { type: "AI CHAT", duration: "25 min", title: "Source verification workflow", detail: "AUREN teaches a 5-step process to verify any AI claim. Primary vs secondary sources. Red flags." },
      { type: "AI CHAT", duration: "20 min", title: "Prompting AI for learning", detail: "How to ask AI good investing questions. Templates that work. What you should never ask AI about your money." },
      { type: "VIDEO", duration: "15 min", title: "Education vs financial advice", detail: "The legal and ethical line. When AI helps. When you must escalate to a licensed human." },
      { type: "CHECKPOINT", duration: "20 min", title: "Day 2 misinformation challenge", detail: "Apply everything from Day 2. Spot misinformation, verify sources, get scored on accuracy AND process." },
    ],
  },
  {
    day: "Day 3",
    title: "Simulation & Assessment",
    outcome: "Apply learning in realistic scenarios. Earn your verified credential.",
    duration: "~2h · 6 modules",
    modules: [
      { type: "SIMULATION", duration: "25 min", title: "Market crash scenario", detail: "Markets drop 18% in a week. Headlines panic. AUREN watches how you respond." },
      { type: "SIMULATION", duration: "20 min", title: "Scam detection scenario", detail: "A friend shares an AI trading bot promising 85% accuracy. What do you actually do?" },
      { type: "SIMULATION", duration: "20 min", title: "AI misinformation challenge", detail: "Two AI tools give opposite answers. Both sound confident. How do you decide?" },
      { type: "AI CHAT", duration: "30 min", title: "Final AUREN oral assessment", detail: "AUREN conducts a closing conversation. Tests reasoning, not memorization. Adapts to your responses." },
      { type: "CHECKPOINT", duration: "15 min", title: "Verified investor learning report", detail: "Your 5-dimension competency report. Behavioral observations. Shareable credential." },
      { type: "AI CHAT", duration: "10 min", title: "Recommended next path", detail: "AUREN suggests what to learn next. Not a sales pitch — a learning plan." },
    ],
  },
];

const ailsAssessment = {
  score: 42,
  range: "38–46",
  band: "Foundation Learner",
  candidate: "Aisha Tan",
  dimensions: [
    { label: "Investor Reasoning", value: 35, max: 100, color: BRAND.warmRed, tier: "weak" },
    { label: "AI Literacy", value: 28, max: 100, color: BRAND.warmRed, tier: "weak" },
    { label: "Risk Awareness", value: 45, max: 100, color: BRAND.amber, tier: "moderate" },
    { label: "Scam Resistance", value: 30, max: 100, color: BRAND.warmRed, tier: "weak" },
    { label: "Behavioral Stability", value: 45, max: 100, color: BRAND.amber, tier: "moderate" },
  ],
  narrative: "The learner demonstrates surface-level confidence in capital-market exposure — having held some ETFs and individual stocks — but lacks the structured reasoning framework needed to navigate AI-influenced markets. Decision-making is socially mediated (peer and social-media driven) rather than evidence-led. Loss aversion is pronounced: emotional response under simulated market stress is high. AI literacy is the most underdeveloped dimension: the learner currently treats AI outputs as authoritative without source verification, hallucination awareness, or escalation logic. Scam resistance is weak — vulnerable to deepfake and social-engineering vectors common on social media. The learner shows positive engagement signals (curiosity, honesty in self-disclosure), making the prognosis for the 3-day adaptive course strong.",
  strengths: [
    "Honest and reflective in self-disclosure — strong foundation for adaptive learning",
    "Has practical exposure (ETFs, individual stocks) to anchor abstract concepts",
    "Curious about AI rather than defensive — open to literacy training",
    "Maintains conversational engagement without defensiveness under questioning",
  ],
  improvements: [
    "Build structured decision frameworks (e.g., written investment thesis before action)",
    "Develop AI source-verification workflow — never act on a single AI response",
    "Strengthen scam detection: train pattern recognition on deepfakes and social-media fraud",
    "Address loss aversion through behavioral discipline modules (Day 1, Module 4)",
    "Develop terminology fluency — distinguish education from financial advice consistently",
  ],
  recommendedTrack: "Foundation Learner + AI Safety Priority",
  projectedAfterCourse: 76,
  cohortAverage: 51,
  percentile: 28,
};

const interviewConversation = [
  {
    auren: "Hi Aisha. I'm not going to test you — I just want to understand how you think. Have you ever invested before?",
    user: "Yeah, a little. Some ETFs and a couple of stocks. Nothing structured.",
    observation: { label: "Investing experience", value: "Self-taught beginner. Some tactical experience, no strategic framework." },
  },
  {
    auren: "Okay, good starting point. When you decided what to buy, what guided you?",
    user: "Mostly things friends recommended. Or what was trending on social media.",
    observation: { label: "Research approach", value: "Socially influenced. Low independent verification. Scam-vector exposure risk." },
  },
  {
    auren: "Thanks for being honest. Now imagine the market drops 20% in a week. Headlines are scary. What's your first instinct?",
    user: "Honestly? I'd probably sell. Just to stop the bleeding.",
    observation: { label: "Loss aversion", value: "Strong emotional response. Behavioral discipline module flagged for Day 1." },
  },
  {
    auren: "That makes sense — most people feel that way. Last question: how much do you trust AI tools when researching investments?",
    user: "Pretty much fully? If ChatGPT tells me something, I usually just go with it.",
    observation: { label: "AI literacy", value: "Uncritical trust. AI Literacy Lab and Spot-the-Scam are priority modules." },
  },
  {
    auren: "Thank you, Aisha. I have a clear picture now. Let me show you exactly where you stand today — and where this course can take you.",
    user: null,
    observation: { label: "Assessment complete", value: "5/5 dimensions assessed. Generating AILS score." },
  },
];

// ───────────────────────── Primitives ─────────────────────────

function Mark({ small = false }) {
  return (
    <div
      className={`${small ? "h-8 w-8" : "h-12 w-12"} rounded-2xl grid place-items-center border`}
      style={{ borderColor: "rgba(203,251,0,.35)", background: "rgba(203,251,0,.08)", boxShadow: "0 0 42px rgba(203,251,0,.18)" }}
    >
      <div className={`${small ? "h-4 w-4" : "h-6 w-6"} rounded-full border-2 relative`} style={{ borderColor: BRAND.lime }}>
        <span className="absolute left-[-8px] right-[-8px] top-1/2 h-[2px] -translate-y-1/2" style={{ background: BRAND.lime }} />
      </div>
    </div>
  );
}

function Pill({ children, tone = "lime" }) {
  const styles = {
    lime: { color: BRAND.lime, borderColor: "rgba(203,251,0,.35)", background: "rgba(203,251,0,.07)" },
    gold: { color: BRAND.gold, borderColor: "rgba(216,181,109,.35)", background: "rgba(216,181,109,.08)" },
    cyan: { color: BRAND.cyan, borderColor: "rgba(114,231,255,.35)", background: "rgba(114,231,255,.08)" },
    red: { color: BRAND.warmRed, borderColor: "rgba(255,107,107,.35)", background: "rgba(255,107,107,.08)" },
    amber: { color: BRAND.amber, borderColor: "rgba(242,169,59,.35)", background: "rgba(242,169,59,.08)" },
    yellow: { color: BRAND.regYellow, borderColor: "rgba(245,197,24,.35)", background: "rgba(245,197,24,.08)" },
    muted: { color: "rgba(247,248,250,.85)", borderColor: "rgba(247,248,250,.2)", background: "rgba(247,248,250,.04)" },
    dark: { color: BRAND.graphite, borderColor: "rgba(17,20,24,.15)", background: "rgba(17,20,24,.04)" },
  }[tone];
  return (
    <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em]" style={styles}>
      {children}
    </span>
  );
}

function SectionHeader({ eyebrow, title, body, eyebrowTone = "lime" }) {
  return (
    <div className="max-w-3xl">
      <Pill tone={eyebrowTone}>{eyebrow}</Pill>
      <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white md:text-5xl">{title}</h2>
      {body && <p className="mt-5 text-base leading-8 text-white/80 md:text-lg">{body}</p>}
    </div>
  );
}

// Verbatim quote from the AUREN papers — used across sections ("quote everything")
function Quote({ children, cite, dark = true }) {
  return (
    <figure className="mt-8 max-w-3xl">
      <blockquote
        className="border-l-2 pl-5 text-base md:text-lg leading-8 italic"
        style={{ borderColor: BRAND.lime, color: dark ? "rgba(247,248,250,.92)" : "rgba(17,20,24,.85)", fontFamily: "Palatino, 'Palatino Linotype', Georgia, serif" }}
      >
        “{children}”
      </blockquote>
      <figcaption className="mt-2 pl-5 font-mono text-[10px] uppercase tracking-[.2em]" style={{ color: dark ? "rgba(247,248,250,.5)" : "rgba(17,20,24,.5)" }}>
        — {cite}
      </figcaption>
    </figure>
  );
}

// ───────────────── Hyper-realistic Digital Human (omnipresent host) ─────────────────

function DigitalHumanPortrait({ speaking = false, listening = false }) {
  return (
    <svg viewBox="0 0 360 480" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="skin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F5D7B8" />
          <stop offset="50%" stopColor="#E8B895" />
          <stop offset="100%" stopColor="#C99571" />
        </linearGradient>
        <linearGradient id="hair" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2A2018" />
          <stop offset="100%" stopColor="#1A1410" />
        </linearGradient>
        <linearGradient id="blazer" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1F2940" />
          <stop offset="100%" stopColor="#0E1424" />
        </linearGradient>
        <radialGradient id="bgEnv" cx="50%" cy="35%" r="80%">
          <stop offset="0%" stopColor="#2A3550" />
          <stop offset="60%" stopColor="#141A2B" />
          <stop offset="100%" stopColor="#080A0F" />
        </radialGradient>
        <radialGradient id="aurenHalo" cx="50%" cy="30%" r="50%">
          <stop offset="0%" stopColor="#CBFB00" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#CBFB00" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="lips" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#B8675A" />
          <stop offset="100%" stopColor="#8A4538" />
        </linearGradient>
      </defs>

      <rect width="360" height="480" fill="url(#bgEnv)" />
      <rect width="360" height="480" fill="url(#aurenHalo)" />
      <ellipse cx="280" cy="120" rx="120" ry="200" fill="rgba(203,251,0,0.06)" />

      <path d="M 40 480 Q 60 360, 130 320 L 230 320 Q 300 360, 320 480 Z" fill="url(#blazer)" />
      <path d="M 130 320 L 160 380 L 180 340 L 200 380 L 230 320" fill="none" stroke="#2A3550" strokeWidth="1.5" opacity="0.6" />
      <path d="M 158 330 L 180 360 L 202 330 L 200 320 L 180 326 L 160 320 Z" fill="#F0EEE8" />

      <path d="M 158 295 Q 158 320 165 330 L 195 330 Q 202 320 202 295 Z" fill="url(#skin)" />
      <path d="M 158 320 Q 180 325 202 320 L 200 330 L 160 330 Z" fill="rgba(0,0,0,0.15)" />

      <path d="M 110 180 Q 100 100, 180 80 Q 260 100, 250 180 L 255 290 Q 250 310, 230 320 L 230 270 Q 240 220, 220 180 L 140 180 Q 120 220, 130 270 L 130 320 Q 110 310, 105 290 Z" fill="url(#hair)" />

      <ellipse cx="180" cy="210" rx="58" ry="78" fill="url(#skin)" />
      <ellipse cx="155" cy="215" rx="14" ry="40" fill="rgba(140,90,60,0.15)" />
      <ellipse cx="205" cy="215" rx="14" ry="40" fill="rgba(140,90,60,0.15)" />

      <path d="M 124 175 Q 130 130, 180 120 Q 230 130, 236 175 Q 230 155, 200 152 Q 180 165, 160 155 Q 135 158, 124 175 Z" fill="url(#hair)" />
      <path d="M 122 180 Q 110 220, 118 270 Q 122 230, 130 200 Z" fill="url(#hair)" />
      <path d="M 238 180 Q 250 220, 242 270 Q 238 230, 230 200 Z" fill="url(#hair)" />

      <path d="M 150 195 Q 160 188, 172 192" stroke="#2A2018" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M 188 192 Q 200 188, 210 195" stroke="#2A2018" strokeWidth="3" fill="none" strokeLinecap="round" />

      {/* Eyes — wrapped for a natural blink; closed-lid lines sit beneath the group */}
      <path d="M 153 208 Q 161 210, 169 208" stroke="#B58A66" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M 191 208 Q 199 210, 207 208" stroke="#B58A66" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <g className="auren-blink">
        <ellipse cx="161" cy="208" rx="8" ry="5" fill="#FAFAFA" />
        <ellipse cx="199" cy="208" rx="8" ry="5" fill="#FAFAFA" />
        <circle cx="161" cy="208" r="4.5" fill="#3A2818" />
        <circle cx="199" cy="208" r="4.5" fill="#3A2818" />
        <circle cx="161" cy="208" r="2" fill="#0A0604" />
        <circle cx="199" cy="208" r="2" fill="#0A0604" />
        <circle cx="162.5" cy="206.5" r="1" fill="#FFFFFF" />
        <circle cx="200.5" cy="206.5" r="1" fill="#FFFFFF" />
        <path d="M 153 207 Q 161 204, 169 207" stroke="#1A1008" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        <path d="M 191 207 Q 199 204, 207 207" stroke="#1A1008" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      </g>

      <path d="M 180 215 L 176 245 Q 180 250, 184 245 Z" fill="rgba(180,120,80,0.2)" />
      <ellipse cx="177" cy="248" rx="2" ry="1.5" fill="rgba(140,90,60,0.3)" />
      <ellipse cx="183" cy="248" rx="2" ry="1.5" fill="rgba(140,90,60,0.3)" />

      {!speaking ? (
        <>
          <path d="M 168 268 Q 180 274, 192 268" stroke="#8A4538" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M 170 268 Q 180 272, 190 268 Q 180 270, 170 268 Z" fill="url(#lips)" opacity="0.8" />
        </>
      ) : (
        <>
          <ellipse cx="180" cy="270" rx="9" ry="4" fill="#5C2A20" />
          <path d="M 171 268 Q 180 264, 189 268 Q 180 266, 171 268 Z" fill="url(#lips)" />
          <path d="M 171 272 Q 180 276, 189 272" stroke="#5C2A20" strokeWidth="1.5" fill="none" />
        </>
      )}

      <ellipse cx="148" cy="240" rx="10" ry="8" fill="rgba(220,140,120,0.25)" />
      <ellipse cx="212" cy="240" rx="10" ry="8" fill="rgba(220,140,120,0.25)" />
      <ellipse cx="180" cy="285" rx="20" ry="6" fill="rgba(140,90,60,0.12)" />

      <circle cx="123" cy="235" r="2.5" fill={BRAND.lime} opacity="0.7" />
      <circle cx="237" cy="235" r="2.5" fill={BRAND.lime} opacity="0.7" />

      {speaking && (
        <g transform="translate(180, 380)">
          {[8, 14, 22, 18, 26, 20, 28, 18, 22, 14, 8].map((h, i) => (
            <rect
              key={i}
              x={(i - 5) * 10 - 2}
              y={-h / 2}
              width="3"
              height={h}
              rx="1.5"
              fill={BRAND.lime}
              opacity={0.5 + (i % 3) * 0.15}
              className="auren-wave"
              style={{ transformOrigin: `${(i - 5) * 10}px 0px`, animationDelay: `${i * 0.08}s` }}
            />
          ))}
        </g>
      )}

      {listening && !speaking && (
        <circle cx="180" cy="210" r="90" fill="none" stroke={BRAND.lime} strokeWidth="1.5" opacity="0.6" className="auren-pulse-ring" />
      )}
    </svg>
  );
}

function DigitalHumanFrame({ status = "Live", caption, listening = false, speaking = true, badge = null }) {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border" style={{ borderColor: "rgba(203,251,0,.22)", background: "linear-gradient(145deg, rgba(23,32,51,.92), rgba(8,10,15,.98))" }}>
      <div className="relative aspect-[4/5]">
        <DigitalHumanPortrait speaking={speaking} listening={listening} />
        <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
          <span className="auren-pulse h-2 w-2 rounded-full" style={{ background: BRAND.lime, boxShadow: `0 0 12px ${BRAND.lime}` }} />
          <Pill tone="lime">AUREN · {status}</Pill>
        </div>
        {badge && <div className="absolute top-4 right-4 z-10">{badge}</div>}
        {caption && (
          <div className="absolute bottom-4 left-4 right-4 rounded-2xl border p-4 backdrop-blur" style={{ borderColor: "rgba(203,251,0,.22)", background: "rgba(8,10,15,.78)" }}>
            <div className="text-[10px] uppercase tracking-[.22em]" style={{ color: BRAND.lime }}>AUREN speaks</div>
            <p className="mt-2 text-sm leading-relaxed text-white/95">"{caption}"</p>
          </div>
        )}
      </div>
    </div>
  );
}

function DigitalHumanSupport({ caption, mode = "speaking" }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border" style={{ borderColor: "rgba(203,251,0,.2)", background: "linear-gradient(145deg, rgba(23,32,51,.9), rgba(8,10,15,.96))" }}>
      <div className="relative aspect-square">
        <DigitalHumanPortrait speaking={mode === "speaking"} listening={mode === "listening"} />
        <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
          <span className="auren-pulse h-1.5 w-1.5 rounded-full" style={{ background: BRAND.lime, boxShadow: `0 0 8px ${BRAND.lime}` }} />
          <span className="text-[9px] uppercase tracking-[.2em] font-semibold" style={{ color: BRAND.lime }}>AUREN</span>
        </div>
      </div>
      {caption && (
        <div className="p-3 border-t" style={{ borderColor: "rgba(203,251,0,.12)" }}>
          <p className="text-xs leading-5 text-white/90">"{caption}"</p>
        </div>
      )}
    </div>
  );
}

// ───────────────────────── Navigation ─────────────────────────

function Nav({ active, setActive }) {
  return (
    <>
      <style>{`
        @keyframes aurenPulse { 0%,100% { opacity:1; transform:scale(1) } 50% { opacity:.5; transform:scale(.85) } }
        @keyframes aurenPulseRing { 0% { opacity:.6; transform:scale(1) } 100% { opacity:0; transform:scale(1.3) } }
        @keyframes aurenWave { 0%,100%{transform:scaleY(.3)} 50%{transform:scaleY(1.3)} }
        @keyframes aurenBlink { 0%, 93%, 100% { opacity:1 } 95.5% { opacity:0 } }
        .auren-pulse { animation: aurenPulse 1.6s ease-in-out infinite; }
        .auren-pulse-ring { animation: aurenPulseRing 2s ease-out infinite; transform-origin: center; }
        .auren-wave { animation: aurenWave 1.1s ease-in-out infinite; }
        .auren-blink { animation: aurenBlink 4.6s linear infinite; }
        .auren-scroll { scrollbar-width: none; -ms-overflow-style: none; }
        .auren-scroll::-webkit-scrollbar { display: none; }
        @media (prefers-reduced-motion: reduce) {
          .auren-pulse, .auren-pulse-ring, .auren-wave, .auren-blink { animation: none !important; }
        }
      `}</style>
      <div className="fixed left-0 right-0 top-0 z-50 border-b backdrop-blur-2xl" style={{ borderColor: "rgba(247,248,250,.08)", background: "rgba(8,10,15,.88)" }}>
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 lg:px-5">
          <button onClick={() => setActive(0)} className="flex shrink-0 items-center gap-3">
            <Mark small />
            <div className="text-left">
              <div className="text-base font-semibold tracking-[.18em] text-white sm:text-lg">AUREN</div>
              <div className="hidden text-[9px] uppercase tracking-[.25em] text-white/75 sm:block">Investor Intelligence Academy</div>
            </div>
          </button>
          <div className="hidden items-center gap-1 xl:flex">
            {sections.map((s, i) => (
              <button key={s} title={s} onClick={() => setActive(i)} className="rounded-full px-2.5 py-1.5 text-[10px] uppercase tracking-[.14em] transition" style={{ color: i === active ? BRAND.graphite : "rgba(247,248,250,.75)", background: i === active ? BRAND.lime : "transparent" }}>
                {String(i + 1).padStart(2, "0")}
              </button>
            ))}
          </div>
          <div className="flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5" style={{ borderColor: "rgba(203,251,0,.35)", background: "rgba(203,251,0,.08)" }}>
            <span className="auren-pulse h-1.5 w-1.5 rounded-full" style={{ background: BRAND.lime, boxShadow: `0 0 8px ${BRAND.lime}` }} />
            <span className="text-[10px] font-semibold uppercase tracking-[.16em]" style={{ color: BRAND.lime }}>IOSCO TechSprint · 2026</span>
          </div>
        </div>
        <div className="auren-scroll flex items-center gap-1.5 overflow-x-auto border-t px-3 py-2 xl:hidden" style={{ borderColor: "rgba(247,248,250,.06)" }}>
          {sections.map((s, i) => (
            <button key={s} onClick={() => setActive(i)} className="shrink-0 rounded-full px-3 py-1.5 text-[10px] uppercase tracking-[.14em] transition" style={{ color: i === active ? BRAND.graphite : "rgba(247,248,250,.78)", background: i === active ? BRAND.lime : "rgba(247,248,250,.05)", border: i === active ? "none" : "1px solid rgba(247,248,250,.08)" }}>
              {String(i + 1).padStart(2, "0")} · {s}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

// ───────────────────────── Production Evidence Strip ─────────────────────────

function CapabilityStrip() {
  const caps = [
    { name: "Hyper-realistic Digital Human", desc: "AI host with conversational interaction, multilingual voice, and adaptive expression — present at every step of the learner journey.", metric: "EN · 中文 · العربية · Bahasa · ES" },
    { name: "Rehearsal Engine + AI Assessment", desc: "Live rehearsal with AI personas, real-time coaching, and a quantitative competency score with qualitative narrative across five dimensions.", metric: "Quote-level evidential scoring" },
    { name: "Regulator-grade Dashboard", desc: "Operational oversight for regulators: cohort analytics, vulnerability heatmaps, anonymized session tracking, audit-ready exports.", metric: "Built for IOSCO C8 standards" },
  ];
  return (
    <div className="mt-10 grid gap-3 md:grid-cols-3">
      {caps.map((p) => (
        <div key={p.name} className="rounded-2xl border p-5" style={{ borderColor: "rgba(203,251,0,.18)", background: "rgba(247,248,250,.04)" }}>
          <div className="flex items-baseline justify-between gap-2">
            <div className="text-base font-semibold text-white">{p.name}</div>
            <Pill tone="lime">Core</Pill>
          </div>
          <p className="mt-3 text-xs leading-5 text-white/90">{p.desc}</p>
          <div className="mt-3 text-xs font-semibold" style={{ color: BRAND.lime }}>{p.metric}</div>
        </div>
      ))}
    </div>
  );
}

// ───────────────────────── 1. HERO ─────────────────────────

function Hero({ go }) {
  return (
    <section className="min-h-screen overflow-hidden px-5 pb-20 pt-36 lg:pt-28" style={{ background: `radial-gradient(circle at 80% 20%, rgba(203,251,0,.18), transparent 28%), linear-gradient(135deg, ${BRAND.deep}, ${BRAND.navy} 55%, ${BRAND.graphite})` }}>
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <div className="flex flex-wrap gap-2">
            <Pill tone="lime">AI Investor Education · v2.0</Pill>
            <Pill tone="muted">Not financial advice</Pill>
            <Pill tone="yellow">IOSCO TechSprint 2026</Pill>
          </div>
          <h1 className="mt-7 text-5xl font-semibold leading-[.95] tracking-tight text-white md:text-7xl lg:text-[5.5rem]">
            Meet AUREN. Your AI mentor for the AI era.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/90">
            An AI rehearsal platform where retail investors practice — in safe simulation — the exact situations that determine their outcomes: deepfakes, misleading AI tools, social pressure, and market panic. Hosted every step by a hyper-realistic Digital Human. Built to be deployed by regulators across jurisdictions.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button onClick={() => go(10)} className="rounded-full px-6 py-4 text-sm font-semibold transition hover:scale-[1.02]" style={{ background: BRAND.lime, color: BRAND.graphite }}>Enter the live rehearsal →</button>
            <button onClick={() => go(3)} className="rounded-full border px-6 py-4 text-sm font-semibold text-white/90" style={{ borderColor: "rgba(247,248,250,.2)" }}>Meet AUREN</button>
            <button onClick={() => go(13)} className="rounded-full border px-6 py-4 text-sm font-semibold text-white/90" style={{ borderColor: "rgba(247,248,250,.2)" }}>Regulator view</button>
          </div>

          <div className="mt-10 grid max-w-2xl grid-cols-3 gap-3">
            {[
              { label: "15-min AUREN interview", target: 3, hint: "Conversational, not multiple-choice" },
              { label: "AILS competency score", target: 4, hint: "5-dimension cognitive assessment" },
              { label: "Spot-the-Scam Lab", target: 9, hint: "Deepfakes · scams · social media" },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => go(item.target)}
                className="group rounded-2xl border p-4 text-left text-sm text-white/95 transition hover:scale-[1.02] hover:border-white/30"
                style={{ borderColor: "rgba(247,248,250,.14)", background: "rgba(247,248,250,.04)" }}
              >
                <div className="font-semibold">{item.label}</div>
                <div className="mt-2 text-xs" style={{ color: BRAND.lime }}>{item.hint} →</div>
              </button>
            ))}
          </div>

          <Quote cite="Full Project Paper · Executive Summary">
            AUREN is not a course. It is where investors rehearse the moment before it happens — so that when it happens, they are ready.
          </Quote>
        </div>

        <div className="lg:col-span-5">
          <DigitalHumanFrame
            status="Ready to begin"
            caption="Before I teach you, I need to understand how you think about risk, AI, and money. This will take about 15 minutes."
            speaking={true}
            badge={<Pill tone="cyan">Live · multilingual</Pill>}
          />
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-7xl">
        <div className="text-xs uppercase tracking-[.22em] text-white/70">Core platform capabilities</div>
        <CapabilityStrip />
      </div>
    </section>
  );
}

// ───────────────────────── 2. PROBLEM ─────────────────────────

function Problem() {
  const stats = [
    { n: "$12.5B", d: "Reported digital fraud losses in 2023 — a 22% year-on-year increase", src: "FBI IC3 · 2023" },
    { n: "$4.57B", d: "Investment fraud as the costliest single category, up 38% year-on-year", src: "FBI IC3 · 2023" },
    { n: "10×", d: "Reported increase in global deepfake incidents 2022 → 2023", src: "Sumsub · 2024" },
  ];
  const risks = [
    { num: "01", label: "AI hallucinations", note: "Plausible-sounding but fabricated investment information — “a hallucinated statistic delivered with the fluency of a trusted advisor can drive a real loss.”" },
    { num: "02", label: "Deepfake fraud", note: "AI-generated impersonations of trusted figures on social media" },
    { num: "03", label: "Unverified sources", note: "Retail investors rarely check what AI tells them" },
    { num: "04", label: "Scam vulnerability", note: "Behavioral biases exploited by AI-enabled fraud at scale" },
    { num: "05", label: "Emotional investing", note: "Loss aversion and FOMO amplified by social media velocity" },
    { num: "06", label: "Advice/education confusion", note: "Users treat AI output as licensed financial advice" },
  ];
  return (
    <section className="px-5 pt-32 lg:pt-20 pb-36" style={{ background: BRAND.graphite }}>
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-8">
            <SectionHeader
              eyebrow="Why this matters"
              title="Retail investors use AI every day — but most have never been taught to question it."
              body="IOSCO's 2026 TechSprint identifies two urgent problems: AI-enabled fraud at unprecedented scale, and the gap between AI-powered investing and the literacy needed to use it responsibly. AUREN addresses both."
            />
          </div>
          <div className="lg:col-span-4">
            <DigitalHumanSupport
              caption="My job is to turn every one of these risks into a rehearsal — not to scare you, but to prepare you."
              mode="speaking"
            />
          </div>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {stats.map((s) => (
            <div key={s.n} className="rounded-3xl border p-6" style={{ borderColor: "rgba(255,107,107,.22)", background: "rgba(255,107,107,.05)" }}>
              <div className="text-5xl font-semibold tracking-tight" style={{ color: BRAND.warmRed }}>{s.n}</div>
              <p className="mt-3 text-sm leading-6 text-white/90">“{s.d}”</p>
              <div className="mt-3 font-mono text-[10px] uppercase tracking-[.2em] text-white/60">{s.src}</div>
            </div>
          ))}
        </div>

        <Quote cite="Full Project Paper §2 · The scale of AI-enabled fraud">
          Fraud is no longer a craft. It is a manufactured product. Generative AI compresses the time-to-fraud from weeks to minutes, the cost from thousands of dollars to cents, and the believability from ‘obvious’ to ‘indistinguishable.’
        </Quote>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {risks.map((r) => (
            <div key={r.num} className="rounded-3xl border p-6 transition hover:scale-[1.01] hover:border-white/30" style={{ borderColor: "rgba(247,248,250,.1)", background: "linear-gradient(180deg, rgba(247,248,250,.06), rgba(247,248,250,.025))" }}>
              <div className="font-mono text-sm" style={{ color: BRAND.lime }}>{r.num}</div>
              <div className="mt-3 text-xl font-semibold text-white">{r.label}</div>
              <p className="mt-3 text-sm leading-6 text-white/80">{r.note}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border p-5" style={{ borderColor: "rgba(203,251,0,.25)", background: "rgba(203,251,0,.06)" }}>
            <Pill tone="lime">IOSCO Problem Statement 1</Pill>
            <h3 className="mt-3 font-semibold text-white">Combating AI-enabled fraud and scams</h3>
            <p className="mt-2 text-sm leading-6 text-white/90">AUREN's Spot-the-Scam Lab and Rehearsal Engine train investors to identify deepfakes, voice clones, and social-media fraud — “through repeated rehearsal in scenarios that mirror the exact fraud environments the learner will encounter.”</p>
          </div>
          <div className="rounded-2xl border p-5" style={{ borderColor: "rgba(114,231,255,.25)", background: "rgba(114,231,255,.05)" }}>
            <Pill tone="cyan">IOSCO Problem Statement 2</Pill>
            <h3 className="mt-3 font-semibold text-white">Navigating capital markets with AI literacy</h3>
            <p className="mt-2 text-sm leading-6 text-white/90">AUREN's 3-day course + AI Literacy Lab teach foundational investing alongside critical thinking about AI tools — “practiced through simulated dialogues with AI tools that hallucinate, mislead, or blur the education-vs-advice line.”</p>
          </div>
        </div>

        <Quote cite="Full Project Paper §4 · Why existing investor education fails">
          Investors who can correctly define loss aversion in a quiz still panic-sell in a crash. Investors who have read about romance scams still transfer funds to persuasive strangers. Knowledge does not survive contact with pressure.
        </Quote>
      </div>
    </section>
  );
}

// ───────────────────────── 3. JOURNEY ─────────────────────────

function Journey() {
  const steps = [
    { num: "01", title: "Sign up", note: "Email, mobile, or institutional access" },
    { num: "02", title: "Verify identity", note: "Integrated eKYC — passport, national ID, or QR-to-phone" },
    { num: "03", title: "Upload background", note: "CV or profile (optional) — informs personalization" },
    { num: "04", title: "AUREN interview", note: "15-min conversation with the Digital Human", highlight: true },
    { num: "05", title: "AILS assessment", note: "AI cognitive engine generates competency score", highlight: true },
    { num: "06", title: "Personalized course", note: "3-day adaptive bootcamp, tailored to your weaknesses" },
    { num: "07", title: "Rehearsal + Scam Lab", note: "Live rehearsal scenarios with coaching and evidential scoring", highlight: true },
    { num: "08", title: "Verified credential", note: "Issued report + shareable certificate" },
  ];
  return (
    <section className="px-5 pt-32 lg:pt-20 pb-36" style={{ background: `linear-gradient(180deg, ${BRAND.deep}, ${BRAND.navy})` }}>
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="The 8-step user journey"
          title="From sign-up to verified credential — AUREN walks with you the whole way."
          body="Every step has AUREN — the hyper-realistic Digital Human — as your host. No forms-only flows. No abandoned dropdowns. A 15-minute conversation replaces 30 minutes of static onboarding."
        />
        <div className="mt-12 grid gap-3 md:grid-cols-4">
          {steps.map((s) => (
            <div key={s.num} className="rounded-3xl border p-5 transition hover:scale-[1.01]" style={{ borderColor: s.highlight ? "rgba(203,251,0,.45)" : "rgba(247,248,250,.1)", background: s.highlight ? "rgba(203,251,0,.08)" : "rgba(247,248,250,.035)" }}>
              <div className="font-mono text-xs" style={{ color: s.highlight ? BRAND.lime : "rgba(247,248,250,.7)" }}>{s.num}</div>
              <div className="mt-3 text-lg font-semibold text-white">{s.title}</div>
              <p className="mt-2 text-xs leading-5 text-white/80">{s.note}</p>
            </div>
          ))}
        </div>
        <Quote cite="Full Project Paper §12 · The seven-step operating flow">
          The flow is not a pipeline the learner passes through once; it is a training cycle that repeats until the skill is real.
        </Quote>
      </div>
    </section>
  );
}

// ───────────────────────── 4. AUREN INTERVIEW ─────────────────────────

function Interview({ go }) {
  const [step, setStep] = useState(0);
  const visible = interviewConversation.slice(0, step + 1);
  const completed = step >= interviewConversation.length - 1;
  const currentTurn = interviewConversation[Math.min(step, interviewConversation.length - 1)];
  const progressPct = Math.round(((step + 1) / interviewConversation.length) * 100);

  return (
    <section className="px-5 pt-32 lg:pt-20 pb-36" style={{ background: BRAND.white, color: BRAND.graphite }}>
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <Pill tone="dark">AUREN Interview · 15 min</Pill>
          <h2 className="mt-5 text-4xl font-semibold tracking-tight md:text-6xl">A conversation, not a questionnaire.</h2>
          <p className="mt-6 text-lg leading-8 text-black/75">AUREN — the hyper-realistic Digital Human — conducts a natural conversation. No multiple-choice. No forms. She listens, adapts, and builds your profile in real time. “The learner experiences a conversation; the platform conducts an assessment.”</p>
          <p className="mt-3 text-sm text-black/70"><span className="font-semibold" style={{ color: BRAND.graphite }}>Click "Continue conversation" to walk through a sample interview.</span></p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7 space-y-5">
            <div className="rounded-[2rem] overflow-hidden shadow-2xl shadow-black/20">
              <DigitalHumanFrame
                status="Interviewing"
                caption={currentTurn.auren}
                speaking={!completed}
                listening={false}
              />
            </div>

            <div className="rounded-[2rem] border p-5 md:p-6" style={{ borderColor: "rgba(17,20,24,.08)", background: "#F8F9FB" }}>
              <div className="flex items-center justify-between">
                <div className="text-xs font-semibold uppercase tracking-[.2em] text-black/70">Conversation transcript</div>
                <div className="text-xs text-black/70">Turn {step + 1} of {interviewConversation.length}</div>
              </div>
              <div className="mt-5 space-y-4">
                {visible.map((turn, i) => (
                  <div key={i} className="space-y-2">
                    <div className="rounded-2xl p-4" style={{ background: BRAND.graphite, color: "white" }}>
                      <div className="text-[10px] font-semibold uppercase tracking-[.2em]" style={{ color: BRAND.lime }}>AUREN</div>
                      <div className="mt-1.5 text-sm leading-6">{turn.auren}</div>
                    </div>
                    {turn.user && (
                      <div className="ml-6 rounded-2xl border p-4" style={{ borderColor: "rgba(17,20,24,.1)", background: "white" }}>
                        <div className="text-[10px] font-semibold uppercase tracking-[.2em] text-black/60">Aisha (you)</div>
                        <div className="mt-1.5 text-sm leading-6 text-black/90">{turn.user}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {!completed && (
                <button onClick={() => setStep(s => s + 1)} className="mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition hover:scale-[1.02]" style={{ background: BRAND.graphite, color: BRAND.lime }}>
                  Continue conversation →
                </button>
              )}
              {completed && (
                <div className="mt-6 rounded-2xl border p-4" style={{ borderColor: "rgba(203,251,0,.4)", background: "rgba(203,251,0,.12)" }}>
                  <div className="text-[10px] font-semibold uppercase tracking-[.2em]" style={{ color: BRAND.graphite }}>Interview complete · 14 min</div>
                  <div className="mt-1 text-sm text-black/80">AUREN has generated your learner profile. Continue to see your AILS competency assessment.</div>
                  <button onClick={() => go(4)} className="mt-4 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold" style={{ background: BRAND.graphite, color: BRAND.lime }}>
                    See your AILS assessment →
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-[2rem] p-6 text-white lg:sticky lg:top-36" style={{ background: `linear-gradient(145deg, ${BRAND.navy}, ${BRAND.graphite})` }}>
              <div className="flex items-center justify-between">
                <div className="text-xs font-semibold uppercase tracking-[.2em]" style={{ color: BRAND.lime }}>Live observations</div>
                <div className="flex items-center gap-2">
                  <span className="auren-pulse h-2 w-2 rounded-full" style={{ background: BRAND.lime }} />
                  <span className="text-[10px] uppercase tracking-[.2em] text-white/80">AI assessment</span>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {visible.map((turn, i) => (
                  <div key={i} className="rounded-xl border p-3" style={{ borderColor: "rgba(203,251,0,.25)", background: "rgba(203,251,0,.06)" }}>
                    <div className="text-[10px] font-semibold uppercase tracking-[.2em]" style={{ color: BRAND.lime }}>{turn.observation.label}</div>
                    <div className="mt-1 text-sm leading-5 text-white/95">{turn.observation.value}</div>
                  </div>
                ))}
                {Array.from({ length: interviewConversation.length - visible.length }).map((_, i) => (
                  <div key={`pending-${i}`} className="rounded-xl border p-3 opacity-30" style={{ borderColor: "rgba(255,255,255,.1)" }}>
                    <div className="text-[10px] font-semibold uppercase tracking-[.2em] text-white/60">Listening...</div>
                    <div className="mt-1 text-sm text-white/40">—</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-xl p-4" style={{ background: "rgba(203,251,0,.08)", border: "1px solid rgba(203,251,0,.25)" }}>
                <div className="flex items-baseline justify-between">
                  <div className="text-[10px] font-semibold uppercase tracking-[.2em]" style={{ color: BRAND.lime }}>Profile completion</div>
                  <div className="text-2xl font-semibold">{progressPct}%</div>
                </div>
                <div className="mt-3 h-1.5 rounded-full" style={{ background: "rgba(255,255,255,.1)" }}>
                  <div className="h-1.5 rounded-full transition-all" style={{ width: `${progressPct}%`, background: BRAND.lime }} />
                </div>
                <div className="mt-2 text-xs text-white/80">{step + 1} of {interviewConversation.length} dimensions assessed</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ───────────────────────── 5. AILS ASSESSMENT ─────────────────────────

function Assessment({ go }) {
  const a = ailsAssessment;
  return (
    <section className="px-5 pt-32 lg:pt-20 pb-36" style={{ background: BRAND.white, color: BRAND.graphite }}>
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4 space-y-5">
            <div>
              <Pill tone="dark">AILS · AI-era Investor Literacy Score</Pill>
              <h2 className="mt-5 text-4xl font-semibold tracking-tight md:text-5xl">Your starting point.</h2>
              <p className="mt-5 text-base leading-7 text-black/75">Generated by AUREN's AI cognitive assessment engine — a five-dimension behavioral analysis calibrated for investor literacy in the AI era. “AILS is not a snapshot. It is a trajectory.”</p>
            </div>
            <div className="rounded-2xl overflow-hidden border shadow-lg" style={{ borderColor: "rgba(17,20,24,.08)" }}>
              <DigitalHumanSupport
                caption="This isn't a verdict — it's a starting point. Let me walk you through what I observed."
                mode="speaking"
              />
            </div>
            <div className="rounded-2xl p-5" style={{ background: "rgba(203,251,0,.18)" }}>
              <div className="text-xs font-semibold uppercase tracking-[.18em] text-black/70">Recommended track</div>
              <div className="mt-2 text-lg font-semibold">{a.recommendedTrack}</div>
              <button onClick={() => go(6)} className="mt-4 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition hover:scale-[1.02]" style={{ background: BRAND.graphite, color: BRAND.lime }}>
                Start personalized course →
              </button>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="rounded-[2rem] border bg-white p-6 shadow-2xl shadow-black/10 md:p-8" style={{ borderColor: "rgba(17,20,24,.08)" }}>
              <div className="rounded-2xl p-6 md:p-8" style={{ background: "linear-gradient(135deg, #E8F5D8, #F4F9E8)" }}>
                <div className="text-7xl font-bold md:text-8xl" style={{ color: "#3D6B14" }}>{a.score}</div>
                <div className="mt-3 text-[10px] font-semibold uppercase tracking-[.22em] text-black/70">AILS Score</div>
                <div className="mt-1 text-sm text-black/80">Range: {a.range} · Band: <strong>{a.band}</strong></div>
                <div className="mt-4 flex flex-wrap gap-4 text-sm">
                  <span className="text-black/80">Candidate: <strong>{a.candidate}</strong></span>
                  <span className="text-black/80">Cohort percentile: <strong>Bottom {a.percentile}%</strong></span>
                </div>
              </div>

              <div className="mt-6 grid gap-3 grid-cols-2 md:grid-cols-5">
                {a.dimensions.map((d) => (
                  <div key={d.label} className="rounded-2xl p-4" style={{ background: "#F0F2F5" }}>
                    <div className="text-xs text-black/70 leading-tight">{d.label}</div>
                    <div className="mt-2 text-3xl font-bold" style={{ color: d.color }}>{d.value}</div>
                    <div className="mt-1 h-1.5 rounded-full bg-black/10">
                      <div className="h-1.5 rounded-full" style={{ width: `${d.value}%`, background: d.color }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border-l-4 p-5" style={{ background: "#F8F9FB", borderColor: "#3D6B14" }}>
                <div className="text-xs font-semibold uppercase tracking-[.2em]" style={{ color: "#3D6B14" }}>Assessment</div>
                <p className="mt-3 text-sm leading-6 text-black/80">{a.narrative}</p>
              </div>

              <div className="mt-4 rounded-2xl border-l-4 p-5" style={{ background: "#F8F9FB", borderColor: "#3D6B14" }}>
                <div className="text-xs font-semibold uppercase tracking-[.2em]" style={{ color: "#3D6B14" }}>Strengths</div>
                <ul className="mt-3 space-y-2">
                  {a.strengths.map((s, i) => (
                    <li key={i} className="flex gap-3 text-sm leading-6 text-black/80">
                      <span style={{ color: "#3D6B14" }}>✓</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 rounded-2xl border-l-4 p-5" style={{ background: "#FFF6EC", borderColor: "#D97706" }}>
                <div className="text-xs font-semibold uppercase tracking-[.2em]" style={{ color: "#D97706" }}>Areas for Improvement</div>
                <ul className="mt-3 space-y-2">
                  {a.improvements.map((s, i) => (
                    <li key={i} className="flex gap-3 text-sm leading-6 text-black/80">
                      <span style={{ color: "#D97706" }}>→</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 grid gap-3 md:grid-cols-3">
                <div className="rounded-2xl p-4 text-center" style={{ background: "#F0F2F5" }}>
                  <div className="text-xs uppercase tracking-[.18em] text-black/70">You today</div>
                  <div className="mt-2 text-3xl font-bold" style={{ color: BRAND.graphite }}>{a.score}</div>
                </div>
                <div className="rounded-2xl p-4 text-center" style={{ background: "#F0F2F5" }}>
                  <div className="text-xs uppercase tracking-[.18em] text-black/70">Cohort avg</div>
                  <div className="mt-2 text-3xl font-bold" style={{ color: BRAND.gold }}>{a.cohortAverage}</div>
                </div>
                <div className="rounded-2xl p-4 text-center" style={{ background: "rgba(203,251,0,.22)" }}>
                  <div className="text-xs uppercase tracking-[.18em] text-black/80">Projected (post-course)</div>
                  <div className="mt-2 text-3xl font-bold" style={{ color: "#3D6B14" }}>{a.projectedAfterCourse}</div>
                </div>
              </div>
              <p className="mt-4 text-xs text-black/70 text-center">“For learners with this profile who complete the personalized rehearsal program, the projected post-program score is 76 — a shift from the bottom third of the cohort to well above average.” — Full Project Paper §14</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ───────────────────────── 6. DASHBOARD (LEARNER) ─────────────────────────

function Dashboard() {
  return (
    <section className="px-5 pt-32 lg:pt-20 pb-36" style={{ background: BRAND.deep }}>
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Learner dashboard"
          title="A learning cockpit — not a trading terminal."
          body="Progress, memory, lessons, AUREN observations, and the next recommended action. No buy/sell signals. No price predictions. Just learning."
        />
        <div className="mt-12 rounded-[2rem] border p-5 md:p-6" style={{ borderColor: "rgba(203,251,0,.16)", background: "linear-gradient(145deg, rgba(23,32,51,.88), rgba(17,20,24,.96))" }}>
          <div className="grid gap-5 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <DigitalHumanSupport
                caption="Ready when you are. Today's focus: Risk vs Return — your weakest area from the interview."
                mode="speaking"
              />
              <div className="mt-3 rounded-xl border p-3" style={{ borderColor: "rgba(203,251,0,.2)", background: "rgba(203,251,0,.04)" }}>
                <div className="text-[10px] uppercase tracking-[.2em]" style={{ color: BRAND.lime }}>AILS · current</div>
                <div className="mt-1 text-2xl font-semibold text-white">42 <span className="text-sm text-white/80">→ projected 76</span></div>
              </div>
            </div>

            <div className="lg:col-span-6 rounded-3xl border p-5" style={{ borderColor: "rgba(247,248,250,.1)", background: "rgba(247,248,250,.035)" }}>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-white">Today's learning path</h3>
                <Pill tone="gold">Day 1 of 3</Pill>
              </div>
              <div className="mt-5 space-y-3">
                {["Capital markets overview", "Stocks, bonds, ETFs and funds", "Risk vs return", "Investor psychology", "Personal risk check"].map((l, i) => (
                  <button key={l} className="flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition hover:scale-[1.01] hover:border-white/30" style={{ borderColor: i === 2 ? "rgba(203,251,0,.45)" : "rgba(247,248,250,.08)", background: i === 2 ? "rgba(203,251,0,.08)" : "rgba(247,248,250,.025)" }}>
                    <span className="font-mono text-xs" style={{ color: i < 2 ? BRAND.gold : i === 2 ? BRAND.lime : "rgba(247,248,250,.75)" }}>{i < 2 ? "✓" : `0${i + 1}`}</span>
                    <span className="text-white/95 flex-1">{l}</span>
                    {i === 2 && <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ background: BRAND.lime, color: BRAND.graphite }}>Resume →</span>}
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-3 space-y-3">
              {[["Investor Reasoning", 46, BRAND.warmRed], ["AI Literacy", 61, BRAND.amber], ["Risk Awareness", 38, BRAND.warmRed], ["Scam Resistance", 52, BRAND.amber], ["Behavioral Stability", 58, BRAND.amber]].map(([k, v, c]) => (
                <div key={String(k)} className="rounded-2xl border p-3" style={{ borderColor: "rgba(247,248,250,.1)", background: "rgba(247,248,250,.035)" }}>
                  <div className="flex justify-between text-xs text-white/90"><span>{k}</span><span style={{ color: c }}>{v}</span></div>
                  <div className="mt-2 h-1.5 rounded-full" style={{ background: "rgba(255,255,255,.08)" }}>
                    <div className="h-1.5 rounded-full" style={{ width: `${v}%`, background: c }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ───────────────────────── 7. 3-DAY COURSE ─────────────────────────

function Course() {
  const totals = courseDays.reduce((acc, d) => acc + d.modules.length, 0);
  return (
    <section className="px-5 pt-32 lg:pt-20 pb-36" style={{ background: BRAND.graphite }}>
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <SectionHeader
              eyebrow="3-day flagship course"
              title="Short enough to complete. Deep enough to certify."
              body="A ~6-hour adaptive bootcamp across 3 days. AI-led conversations, simulations, video, and checkpoints. Every module reshapes itself to your interview profile."
            />
          </div>
          <div className="lg:col-span-4">
            <DigitalHumanSupport
              caption="What you see here is the default. Your version will adapt based on your interview — your weaknesses get more time."
              mode="speaking"
            />
          </div>
        </div>

        <div className="mt-10 grid gap-3 grid-cols-2 md:grid-cols-4">
          {[
            ["3", "Days"],
            [String(totals), "Modules"],
            ["~6h", "Total time"],
            ["100%", "Adaptive"],
          ].map(([num, label], i) => (
            <div key={label} className="rounded-2xl border p-4" style={{ borderColor: i === 3 ? "rgba(203,251,0,.3)" : "rgba(247,248,250,.1)", background: i === 3 ? "rgba(203,251,0,.08)" : "rgba(247,248,250,.04)" }}>
              <div className="text-3xl font-semibold" style={{ color: i === 3 ? BRAND.lime : "white" }}>{num}</div>
              <div className="mt-1 text-xs uppercase tracking-[.18em] text-white/80">{label}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {Object.entries(moduleColors).map(([type, color]) => (
            <span key={type} className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[.18em]" style={{ borderColor: `${color}55`, color: color, background: `${color}10` }}>
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: color }} />
              {type}
            </span>
          ))}
        </div>

        <div className="mt-10 space-y-6">
          {courseDays.map((day) => (
            <div key={day.day} className="rounded-[2rem] border p-6 md:p-8" style={{ borderColor: "rgba(203,251,0,.16)", background: "rgba(247,248,250,.035)" }}>
              <div className="flex flex-wrap items-baseline justify-between gap-3 border-b pb-5" style={{ borderColor: "rgba(247,248,250,.08)" }}>
                <div>
                  <Pill tone="lime">{day.day}</Pill>
                  <h3 className="mt-3 text-2xl font-semibold text-white md:text-3xl">{day.title}</h3>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-white/90">{day.outcome}</p>
                </div>
                <div className="text-xs uppercase tracking-[.18em] text-white/80">{day.duration}</div>
              </div>

              <div className="mt-6 space-y-3">
                {day.modules.map((m, i) => (
                  <div key={i} className="flex flex-col gap-3 rounded-2xl border p-4 transition hover:border-white/30 md:flex-row md:items-start md:gap-5" style={{ borderColor: "rgba(247,248,250,.08)", background: "rgba(247,248,250,.02)" }}>
                    <div className="flex shrink-0 items-center gap-3 md:w-44">
                      <span className="font-mono text-xs text-white/80">{String(i + 1).padStart(2, "0")}</span>
                      <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[.18em]" style={{ borderColor: `${moduleColors[m.type]}55`, color: moduleColors[m.type], background: `${moduleColors[m.type]}10` }}>
                        <span className="h-1.5 w-1.5 rounded-full" style={{ background: moduleColors[m.type] }} />
                        {m.type}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h4 className="text-base font-semibold text-white md:text-lg">{m.title}</h4>
                        <span className="text-xs text-white/80">{m.duration}</span>
                      </div>
                      <p className="mt-1 text-sm leading-6 text-white/90">{m.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <Quote cite="Concept Paper §5 · What changed from v1 to v2">
          Knowledge does not survive contact with pressure. Skill does. AUREN v1 delivered knowledge well. AUREN v2 delivers skill.
        </Quote>
      </div>
    </section>
  );
}

// ───────────────────────── 8. AI MEMORY ─────────────────────────

function Memory() {
  const timeline = [
    { day: "Day 1 · 10:14", color: BRAND.gold, type: "Observation", text: "Hesitated on Risk vs Return module — re-explained with retirement analogy. Comprehension confirmed." },
    { day: "Day 1 · 14:22", color: BRAND.lime, type: "Strength", text: "Strong performance on diversification quiz. Marked as foundation concept — won't re-teach." },
    { day: "Day 2 · 09:48", color: BRAND.warmRed, type: "Pattern", text: "Showed emotional response in market-crash simulation. Course rebalanced to add 1 extra behavioral module." },
    { day: "Day 2 · 16:05", color: BRAND.gold, type: "Misconception", text: "User believed AI tools are regulated like financial advisors. Corrected in AI Literacy Lab — followup added Day 3." },
    { day: "Day 3 · 11:30", color: BRAND.lime, type: "Growth", text: "Source verification workflow now applied without prompting. AI Literacy score upgraded from 28 to 64." },
  ];
  const stats = [
    { label: "Concepts mastered", value: 14 },
    { label: "Concepts needing review", value: 3 },
    { label: "Behavioral signals logged", value: 27 },
    { label: "Course adaptations made", value: 9 },
  ];
  return (
    <section className="px-5 pt-32 lg:pt-20 pb-36" style={{ background: `linear-gradient(180deg, ${BRAND.deep}, ${BRAND.navy})` }}>
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <SectionHeader
              eyebrow="Persistent AI memory"
              title="AUREN remembers — so the course gets smarter, not longer."
              body="Most education platforms reset every session. AUREN logs every hesitation, misconception, and strength. The course quietly reshapes itself in response. This is what turns a course into mentorship."
            />
          </div>
          <div className="lg:col-span-4">
            <DigitalHumanSupport
              caption="I noticed you struggled with risk-vs-return on Day 1. I changed Day 2 to revisit it through a retirement framing — that worked better for you."
              mode="speaking"
            />
          </div>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-12">
          <div className="lg:col-span-8 rounded-[2rem] border p-6" style={{ borderColor: "rgba(203,251,0,.16)", background: "rgba(247,248,250,.035)" }}>
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-white">Learner memory timeline</h3>
              <div className="flex items-center gap-2">
                <span className="auren-pulse h-2 w-2 rounded-full" style={{ background: BRAND.lime }} />
                <span className="text-[10px] uppercase tracking-[.2em] text-white/80">Aisha Tan</span>
              </div>
            </div>
            <div className="mt-6 space-y-4">
              {timeline.map((m, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <span className="h-3 w-3 rounded-full" style={{ background: m.color, boxShadow: `0 0 10px ${m.color}` }} />
                    {i < timeline.length - 1 && <span className="mt-1 w-px flex-1" style={{ background: "rgba(247,248,250,.1)" }} />}
                  </div>
                  <div className="flex-1 pb-4">
                    <div className="flex flex-wrap items-baseline gap-3">
                      <span className="font-mono text-xs text-white/80">{m.day}</span>
                      <span className="rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-[.18em]" style={{ borderColor: `${m.color}55`, color: m.color, background: `${m.color}10` }}>{m.type}</span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-white/95">{m.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 space-y-3">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl border p-5" style={{ borderColor: "rgba(247,248,250,.1)", background: "rgba(247,248,250,.04)" }}>
                <div className="text-4xl font-semibold text-white">{s.value}</div>
                <div className="mt-2 text-xs uppercase tracking-[.18em] text-white/80">{s.label}</div>
              </div>
            ))}
            <div className="rounded-2xl border p-5" style={{ borderColor: "rgba(203,251,0,.25)", background: "rgba(203,251,0,.06)" }}>
              <div className="text-[10px] uppercase tracking-[.2em]" style={{ color: BRAND.lime }}>Why this matters</div>
              <p className="mt-2 text-sm leading-6 text-white/95">Memory is what makes AUREN feel like a mentor, not a course. It's also a proprietary learning dataset — a moat no static curriculum can replicate.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ───────────────────────── 9. AI LITERACY LAB ─────────────────────────

function LiteracyLab() {
  return (
    <section className="px-5 pt-32 lg:pt-20 pb-36" style={{ background: `linear-gradient(180deg, ${BRAND.navy}, ${BRAND.deep})` }}>
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <SectionHeader
              eyebrow="AI Literacy Lab · IOSCO PS2"
              title="Teach users not to blindly trust AI."
              body="Side-by-side AI answer comparison. Hallucination detection. Source verification workflows. Knowing when to escalate to a licensed professional."
            />
          </div>
          <div className="lg:col-span-4">
            <DigitalHumanSupport
              caption="Confidence isn't accuracy. Let me show you how to tell the difference."
              mode="speaking"
            />
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border p-6" style={{ borderColor: "rgba(255,107,107,.3)", background: "rgba(255,107,107,.06)" }}>
            <Pill tone="red">AI Answer A · Flagged</Pill>
            <p className="mt-4 text-base leading-7 text-white/95">"This fund is guaranteed to outperform the market because AI predicts strong growth based on recent trends."</p>
            <div className="mt-5 space-y-2 text-sm text-white/90">
              <div className="flex gap-2"><span style={{ color: BRAND.warmRed }}>✗</span><span>“It makes a guarantee claim, and no investment can be guaranteed”</span></div>
              <div className="flex gap-2"><span style={{ color: BRAND.warmRed }}>✗</span><span>“It cites no source and offers no fundamental analysis”</span></div>
              <div className="flex gap-2"><span style={{ color: BRAND.warmRed }}>✗</span><span>“Its advisory tone crosses the line between education and advice — a line that matters legally and practically”</span></div>
              <div className="flex gap-2"><span style={{ color: BRAND.warmRed }}>✗</span><span>"Recent trends" = no fundamental analysis</span></div>
            </div>
          </div>

          <div className="rounded-3xl border p-6" style={{ borderColor: "rgba(203,251,0,.3)", background: "rgba(203,251,0,.06)" }}>
            <Pill tone="lime">AI Answer B · Accepted</Pill>
            <p className="mt-4 text-base leading-7 text-white/95">"Here are factors to research when evaluating a fund: management fees, diversification strategy, historical volatility, your time horizon, and the official fund prospectus. I can't tell you whether to invest — that depends on your circumstances."</p>
            <div className="mt-5 space-y-2 text-sm text-white/90">
              <div className="flex gap-2"><span style={{ color: BRAND.lime }}>✓</span><span>“It is educational rather than advisory”</span></div>
              <div className="flex gap-2"><span style={{ color: BRAND.lime }}>✓</span><span>Names specific factors to research</span></div>
              <div className="flex gap-2"><span style={{ color: BRAND.lime }}>✓</span><span>“It points to primary sources” (prospectus)</span></div>
              <div className="flex gap-2"><span style={{ color: BRAND.lime }}>✓</span><span>“It explicitly acknowledges the AI's limits”</span></div>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border p-5" style={{ borderColor: "rgba(203,251,0,.25)", background: "rgba(203,251,0,.06)" }}>
          <div className="text-[10px] uppercase tracking-[.2em]" style={{ color: BRAND.lime }}>AUREN's verification workflow</div>
          <p className="mt-2 text-sm leading-6 text-white/95"><strong>1.</strong> Identify claim type · <strong>2.</strong> Locate primary source · <strong>3.</strong> Cross-check at least 2 independent sources · <strong>4.</strong> Test for advisory language · <strong>5.</strong> If decision-grade, escalate to licensed professional.</p>
        </div>

        <Quote cite="Full Project Paper §10 · Rehearsing conversations with AI tools">
          The skill being built is not distrust of AI. It is calibrated trust: knowing what AI is good for, where it fails, and how to check.
        </Quote>
      </div>
    </section>
  );
}

// ───────────────────────── 10. SPOT THE SCAM LAB (IOSCO PS1) ─────────────────────────

const scamScenarios = [
  {
    id: "deepfake",
    title: "Deepfake CEO endorsement",
    category: "Deepfake video",
    severity: "high",
    description: "A viral video shows a famous tech CEO endorsing a new crypto platform with 'guaranteed 30% monthly returns'. The video looks real, sounds real, and is being shared by thousands.",
    redFlags: [
      "Famous figure endorsing a financial product (almost always fake)",
      "Specific guaranteed return — no legitimate investment offers this",
      "Pressure to act quickly · limited-time offer language",
      "Slight lip-sync mismatch · unnatural eye movement · audio compression artifacts",
      "Platform not registered with any major regulator",
    ],
    aurenSays: "I'll pause the video mid-play and ask you live: what would you do next? Then we'll walk through the detection signals — on this exact video.",
  },
  {
    id: "social",
    title: "WhatsApp 'private investment group'",
    category: "Social media fraud",
    severity: "high",
    description: "A friend forwards you a WhatsApp invite to an 'exclusive AI-powered trading group'. Members share screenshots of profits. The group claims to use proprietary AI signals.",
    redFlags: [
      "Closed messaging app group — outside regulator oversight",
      "Profit screenshots cannot be verified · easily fabricated",
      "'Proprietary AI' claim with no audit trail",
      "Pressure from a trusted friend (who may themselves be a victim recruiter)",
      "Request to deposit through an unregulated platform",
    ],
    aurenSays: "Notice the chain — your friend is being used. The scam targets through trust networks, not strangers.",
  },
  {
    id: "voice",
    title: "Voice clone phone call",
    category: "Voice deepfake",
    severity: "medium",
    description: "You receive a call. It sounds exactly like your investment advisor's voice. They urgently need you to transfer funds to a 'new account' due to a 'security issue'.",
    redFlags: [
      "Urgency creates emotional pressure — designed to bypass critical thinking",
      "Voice cloning needs only 3 seconds of public audio (interview, podcast, social)",
      "Account change request via phone — never legitimate process",
      "Pressure to act before verifying",
      "Resistance to 'let me call you back on the number I have on file'",
    ],
    aurenSays: "If your real advisor asked you to do this, they would understand you calling back through your verified channel.",
  },
  {
    id: "synthetic",
    title: "Synthetic 'finfluencer'",
    category: "AI-generated persona",
    severity: "medium",
    description: "A TikTok account with 200K followers gives investing tips. Looks like a real person. Posts daily. But the person doesn't exist — entire persona is AI-generated.",
    redFlags: [
      "Reverse image search returns no other instances",
      "No verifiable credentials or background",
      "Content patterns suggest automation (regular intervals, similar templates)",
      "No live appearances · only pre-recorded or text content",
      "Engagement metrics inconsistent with follower count",
    ],
    aurenSays: "Synthetic influencers are getting harder to detect. The defense isn't spotting them — it's never acting on advice from anyone you can't verify.",
  },
];

// Interactive deepfake mock player — plays, pauses mid-play, AUREN asks live
function DeepfakePlayer() {
  const [phase, setPhase] = useState("idle"); // idle | playing | paused | answered | answered-bad
  const [t, setT] = useState(0);
  useEffect(() => {
    if (phase !== "playing") return;
    const iv = setInterval(() => {
      setT((x) => {
        if (x + 1 >= 7) { setPhase("paused"); return 7; }
        return x + 1;
      });
    }, 400);
    return () => clearInterval(iv);
  }, [phase]);
  const signals = [
    ["Lip-sync mismatch", "Mouth trails the audio by ~120 ms on plosives"],
    ["Unnatural blink rate", "Metronomic blink interval — real speakers blink irregularly"],
    ["Audio compression artifacts", "Voice-clone models leave spectral smearing above 8 kHz"],
    ["Lighting inconsistency", "Face illumination doesn't match the key light direction"],
  ];
  return (
    <div className="mt-4">
      <div className="relative overflow-hidden rounded-2xl" style={{ background: "#05070A", aspectRatio: "16/9" }}>
        <div className="absolute inset-0" style={{ background: "radial-gradient(120% 90% at 50% 20%, #26313E 0%, #141A21 55%, #05070A 100%)" }} />
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2" style={{ width: "38%", height: "72%", borderRadius: "46% 46% 0 0 / 34% 34% 0 0", background: "radial-gradient(60% 40% at 50% 18%, #B9A98C 0%, #8C7B5F 28%, #2C3540 30%, #1B222B 100%)", filter: "saturate(.8)" }} />
        <span className="absolute top-3 left-3 rounded px-2 py-0.5 font-mono text-[9px] uppercase tracking-[.18em] text-white" style={{ background: BRAND.warmRed }}>Forwarded · 12.4K shares</span>
        <div className="absolute left-4 right-4 bottom-3 text-white">
          <div className="text-xs font-semibold md:text-sm">"Tech CEO announces: guaranteed 30% monthly returns"</div>
          <div className="font-mono text-[9px] opacity-60">viral-clip.example · reposted by @cryptodaily_my</div>
        </div>
        {phase === "paused" && (
          <div className="absolute inset-0 grid place-items-center p-4 text-center" style={{ background: "rgba(5,7,10,.72)", backdropFilter: "blur(2px)" }}>
            <div>
              <div className="font-mono text-[9px] uppercase tracking-[.22em]" style={{ color: BRAND.lime }}>AUREN pauses the video</div>
              <div className="mt-1 text-lg font-semibold text-white">What would you do next?</div>
            </div>
          </div>
        )}
        {phase === "idle" && (
          <button onClick={() => setPhase("playing")} className="absolute inset-0 grid place-items-center">
            <span className="grid h-14 w-14 place-items-center rounded-full text-xl" style={{ background: BRAND.lime, color: BRAND.graphite }}>▶</span>
          </button>
        )}
      </div>
      <div className="mt-1.5 h-1 rounded-full" style={{ background: "rgba(255,255,255,.1)" }}>
        <div className="h-1 rounded-full transition-all" style={{ width: `${(t / 19) * 100}%`, background: BRAND.lime }} />
      </div>
      <div className="mt-1 flex justify-between font-mono text-[9px] text-white/50">
        <span>0:{String(t).padStart(2, "0")} / 0:19</span>
        <span>rehearsal asset · not a real person</span>
      </div>
      {phase === "paused" && (
        <div className="mt-3 space-y-2">
          <button onClick={() => setPhase("answered-bad")} className="block w-full rounded-xl border p-3 text-left text-xs text-white/95 transition hover:border-white/40" style={{ borderColor: "rgba(247,248,250,.15)", background: "rgba(247,248,250,.04)" }}>
            "Forward it to my family group — if he's backing it, it's legit."
          </button>
          <button onClick={() => setPhase("answered")} className="block w-full rounded-xl border p-3 text-left text-xs text-white/95 transition hover:border-white/40" style={{ borderColor: "rgba(247,248,250,.15)", background: "rgba(247,248,250,.04)" }}>
            "Check credible outlets + the company's official channels first."
          </button>
        </div>
      )}
      {(phase === "answered" || phase === "answered-bad") && (
        <div className="mt-3">
          <div className="rounded-xl border p-3 text-xs leading-5 text-white/95" style={{ borderColor: phase === "answered" ? "rgba(203,251,0,.4)" : "rgba(255,107,107,.4)", background: phase === "answered" ? "rgba(203,251,0,.07)" : "rgba(255,107,107,.07)" }}>
            <span className="font-semibold uppercase tracking-[.15em] text-[9px]" style={{ color: phase === "answered" ? BRAND.lime : BRAND.warmRed }}>{phase === "answered" ? "Certified response" : "Amplification risk"}</span>
            <p className="mt-1">{phase === "answered" ? "“The defense AUREN teaches is not perfect detection, which is increasingly impossible, but a behavioral rule rehearsed until it becomes instinct: never act on advice from anyone you cannot verify.”" : "Forwarding an unverified clip makes you the distribution channel. Here are the four signals AUREN annotates on this exact video:"}</p>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {signals.map(([s, d]) => (
              <div key={s} className="rounded-lg border p-2.5" style={{ borderColor: "rgba(247,248,250,.12)", background: "rgba(247,248,250,.03)" }}>
                <div className="text-[10px] font-semibold text-white">{s}</div>
                <div className="mt-0.5 text-[9px] leading-4 text-white/70">{d}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ScamModal({ scenario, close }) {
  if (!scenario) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 py-8" style={{ background: "rgba(8,10,15,.88)", backdropFilter: "blur(8px)" }}>
      <div className="relative max-h-full w-full max-w-3xl overflow-y-auto rounded-[2rem] border" style={{ borderColor: "rgba(255,107,107,.3)", background: `linear-gradient(145deg, ${BRAND.navy}, ${BRAND.deep})` }}>
        <button onClick={close} className="absolute top-4 right-4 z-10 rounded-full border px-3 py-1 text-sm text-white/95 hover:bg-white/10" style={{ borderColor: "rgba(247,248,250,.2)" }}>✕</button>

        <div className="grid gap-0 lg:grid-cols-12">
          <div className="lg:col-span-5 p-5 border-b lg:border-b-0 lg:border-r" style={{ borderColor: "rgba(247,248,250,.08)" }}>
            <div className="rounded-2xl overflow-hidden">
              <DigitalHumanSupport
                caption={scenario.aurenSays}
                mode="speaking"
              />
            </div>
            <div className="mt-4 rounded-xl border p-3" style={{ borderColor: "rgba(255,107,107,.3)", background: "rgba(255,107,107,.06)" }}>
              <div className="text-[10px] uppercase tracking-[.2em]" style={{ color: BRAND.warmRed }}>Scam category</div>
              <div className="mt-1 text-sm font-semibold text-white">{scenario.category}</div>
              <div className="mt-1 text-xs text-white/80">Severity: {scenario.severity.toUpperCase()}</div>
            </div>
          </div>

          <div className="lg:col-span-7 p-6 md:p-7">
            <Pill tone="red">Scam scenario</Pill>
            <h3 className="mt-4 text-2xl font-semibold text-white md:text-3xl">{scenario.title}</h3>
            <p className="mt-3 text-sm leading-6 text-white/90">{scenario.description}</p>

            {scenario.id === "deepfake" && <DeepfakePlayer />}

            <div className="mt-6">
              <div className="text-[10px] uppercase tracking-[.2em]" style={{ color: BRAND.warmRed }}>Red flags AUREN teaches you to spot</div>
              <ul className="mt-3 space-y-2">
                {scenario.redFlags.map((rf, i) => (
                  <li key={i} className="flex gap-3 text-sm leading-6 text-white/95">
                    <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold" style={{ background: "rgba(255,107,107,.15)", color: BRAND.warmRed }}>{String(i + 1).padStart(2, "0")}</span>
                    <span>{rf}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 rounded-xl border p-4" style={{ borderColor: "rgba(203,251,0,.25)", background: "rgba(203,251,0,.06)" }}>
              <div className="text-[10px] uppercase tracking-[.2em]" style={{ color: BRAND.lime }}>The defense protocol</div>
              <p className="mt-2 text-sm leading-6 text-white/95">Verify identity through a known channel · refuse to act under time pressure · check regulator registry · escalate to a licensed professional if decision-grade.</p>
            </div>

            <button onClick={close} className="mt-6 rounded-full px-5 py-2.5 text-sm font-semibold" style={{ background: BRAND.lime, color: BRAND.graphite }}>Got it — next scenario</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ScamLab({ openScam }) {
  return (
    <section className="px-5 pt-32 lg:pt-20 pb-36" style={{ background: BRAND.graphite }}>
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Pill tone="red">IOSCO Problem Statement 1</Pill>
            <h2 className="mt-5 text-4xl font-semibold tracking-tight text-white md:text-5xl">Spot the Scam Lab.</h2>
            <p className="mt-5 text-base leading-8 text-white/90 md:text-lg">AI has lowered the cost of fraud to near-zero. Deepfakes, voice clones, synthetic finfluencers, and AI-generated investment narratives now spread at social-media velocity. AUREN trains your pattern recognition before you need it.</p>
          </div>
          <div className="lg:col-span-4">
            <DigitalHumanSupport
              caption="I won't just show you scams — I'll show you the patterns. Once you see them, you can't unsee them."
              mode="speaking"
            />
          </div>
        </div>

        <div className="mt-10 grid gap-2 md:grid-cols-4">
          {[
            { label: "Deepfake video", count: "8 scenarios" },
            { label: "Voice clones", count: "5 scenarios" },
            { label: "Social media fraud", count: "12 scenarios" },
            { label: "Synthetic personas", count: "6 scenarios" },
          ].map((c) => (
            <div key={c.label} className="rounded-2xl border p-4" style={{ borderColor: "rgba(247,248,250,.1)", background: "rgba(247,248,250,.04)" }}>
              <div className="text-sm font-semibold text-white">{c.label}</div>
              <div className="mt-1 text-xs text-white/80">{c.count}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {scamScenarios.map((s) => (
            <button
              key={s.id}
              onClick={() => openScam(s)}
              className="rounded-[2rem] border p-6 text-left transition hover:scale-[1.01] hover:border-white/30"
              style={{ borderColor: s.severity === "high" ? "rgba(255,107,107,.25)" : "rgba(242,169,59,.25)", background: "rgba(247,248,250,.035)" }}
            >
              <div className="flex items-center justify-between">
                <Pill tone={s.severity === "high" ? "red" : "amber"}>{s.category}</Pill>
                <span className="text-[10px] uppercase tracking-[.18em] font-semibold" style={{ color: s.severity === "high" ? BRAND.warmRed : BRAND.amber }}>{s.severity} risk</span>
              </div>
              <h3 className="mt-4 text-xl font-semibold text-white">{s.title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/90 line-clamp-3">{s.description}</p>
              <div className="mt-5 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm text-white/95" style={{ borderColor: "rgba(247,248,250,.2)" }}>
                Walk through with AUREN →
              </div>
            </button>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border p-5" style={{ borderColor: "rgba(203,251,0,.25)", background: "rgba(203,251,0,.06)" }}>
          <Pill tone="lime">Cross-jurisdictional</Pill>
          <p className="mt-3 text-sm leading-6 text-white/95"><strong className="text-white">Scams localize.</strong> “A UK deepfake scenario looks different from a Brazilian pump-and-dump, and both differ from a Malaysian WhatsApp investment group. The scenarios are culturally situated, because scams are culturally situated.” Rehearsal libraries are regionalized — UK FCA warnings, MAS typologies, SEBI alerts, CNMV advisories — continuously updated by partner regulators.</p>
        </div>
      </div>
    </section>
  );
}

// ───────────────────────── 11. REHEARSAL ENGINE ─────────────────────────

const rehearsalTurns = [
  {
    persona: "Hey! Adam gave me your number 😊 He said you might be interested in our private trading group. We're up 40% this quarter using AI signals — limited spots left!",
    choices: [
      { text: "Sure, sounds legit — how do I sign up?", tone: "risky", delta: -3, dim: "Scam Resistance",
        analysis: "Immediate agreement without verification — the exact pattern recruitment scams rely on.",
        coaching: "Notice what just happened — you agreed before verifying anything. Before responding to any investment invitation, ask: who is this person, and can the claim be verified?" },
      { text: "Who are you exactly? How do you know Adam?", tone: "good", delta: 2, dim: "Scam Resistance",
        analysis: "Identity challenge before engagement. Correct first move." },
      { text: "40% a quarter? That sounds too good to be true.", tone: "good", delta: 3, dim: "Scam Resistance",
        analysis: "Return-claim skepticism. No legitimate investment offers guaranteed outsized returns." },
    ],
  },
  {
    persona: "Here's proof 📈 [screenshot: +RM12,400 this month]. Adam's already in. Everyone in the group is making money. You in?",
    choices: [
      { text: "Wow okay — I trust Adam, he wouldn't share a scam.", tone: "risky", delta: -2, dim: "Behavioral Stability",
        analysis: "Trust-transfer bias. “Recruiter-driven scams specifically exploit trusted contacts, because the friend sharing the scheme is often themselves a victim being used as a distribution channel.”",
        coaching: "Trust-transfer is the number one recruitment vector. Adam may himself be a victim. And profit screenshots are trivially fabricated — they are not evidence." },
      { text: "Screenshots can be faked. Is this platform licensed?", tone: "good", delta: 3, dim: "Scam Resistance",
        analysis: "Evidence skepticism plus a licensing question. Strong verification instinct." },
      { text: "What's the regulator registration number?", tone: "excellent", delta: 4, dim: "Scam Resistance",
        analysis: "Direct registry challenge — the single most effective scam filter available to a retail investor." },
    ],
  },
  {
    persona: "Spots close TONIGHT ⏰ Minimum RM2,000 to start. I'll send you the deposit link — takes 2 minutes. Don't miss out like last time!",
    choices: [
      { text: "Okay, send me the link — I'll do it now.", tone: "risky", delta: -5, dim: "Scam Resistance",
        analysis: "Urgency capitulation. Deadline pressure exists precisely to bypass verification.",
        coaching: "Stop. Urgency is manufactured — legitimate investments do not expire tonight. Any pressure to act before verifying is itself the strongest scam signal in this entire conversation." },
      { text: "Actually — can you send me the regulator registration first?", tone: "good", delta: 4, dim: "Scam Resistance",
        analysis: "“Live coaching landed... the verification instinct is now active.”" },
      { text: "I'm going to verify this offline before I do anything.", tone: "excellent", delta: 6, dim: "Scam Resistance",
        analysis: "“Verification protocol correctly applied... the certification criterion for this scenario is met.”" },
    ],
  },
];

function RehearsalEngine({ logEvidence }) {
  const [picks, setPicks] = useState([]);
  const [showScorecard, setShowScorecard] = useState(false);
  const stage = picks.length;
  const done = stage >= rehearsalTurns.length;
  const totalDelta = picks.reduce((a, p) => a + p.delta, 0);
  const baseScamRes = 30;
  const liveScamRes = Math.max(0, Math.min(100, baseScamRes + picks.filter(p => p.dim === "Scam Resistance").reduce((a, p) => a + p.delta, 0)));
  const lastPick = picks[picks.length - 1];
  const verdict = totalDelta >= 6 && lastPick && lastPick.tone !== "risky" ? "certified" : totalDelta >= 0 ? "review" : "retrain";
  const verdictMeta = {
    certified: { label: "CERTIFIED", color: BRAND.lime, note: "Verification protocol demonstrated under pressure. This scenario is certified — the next rehearsal in your path unlocks." },
    review:    { label: "NEEDS REVIEW", color: BRAND.amber, note: "Mixed signals. AUREN recommends one repeat with variations before certification." },
    retrain:   { label: "RETRAIN REQUIRED", color: BRAND.warmRed, note: "Scam-vulnerability patterns dominated this session. AUREN will re-run this scenario with variations — “the learner cannot pass by memorizing a script.”" },
  }[verdict];
  const toneColor = { risky: BRAND.warmRed, good: BRAND.lime, excellent: BRAND.lime };
  const aurenCaption = showScorecard
    ? "Here is your evidence. Not a grade — your own words, and what they revealed."
    : done
    ? "Rehearsal complete. Ready to see what I observed — quote by quote?"
    : stage === 0
    ? "You've just been added to a group chat. I'll be right here — if I see a risky pattern, I'll step in live."
    : lastPick && lastPick.tone === "risky"
    ? "I stepped in for a reason — look at the coaching note before your next reply."
    : "Good instinct. Keep going — the pressure is about to increase.";

  const pick = (c, turnIdx) => {
    setPicks(p => [...p, c]);
    logEvidence && logEvidence({ turn: turnIdx * 2 + 2, quote: c.text, tone: c.tone, dim: c.dim, delta: c.delta, source: "Rehearsal · WhatsApp scam" });
  };
  const reset = () => { setPicks([]); setShowScorecard(false); };

  return (
    <section className="px-5 pt-32 lg:pt-20 pb-36" style={{ background: `linear-gradient(180deg, ${BRAND.deep}, ${BRAND.navy})` }}>
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Pill tone="lime">Rehearsal Engine · The core mechanic</Pill>
            <h2 className="mt-5 text-4xl font-semibold tracking-tight text-white md:text-5xl">Rehearse the moment — before it happens.</h2>
            <p className="mt-5 text-base leading-8 text-white/90 md:text-lg">A live conversation with an AI persona applying real scam pressure. AUREN coaches mid-conversation. Every word you choose becomes evidence in your scorecard. <span className="text-white font-semibold">Play the scenario below.</span></p>
            <Quote cite="Full Project Paper · Part Six · What We Are Asking IOSCO to See">
              AUREN will show a live rehearsal... The AI persona will apply pressure. AUREN, the Digital Human, will coach them live. The evidential scorecard will appear at the end — quote-level, evidence-based, competency-mapped.
            </Quote>
          </div>
          <div className="lg:col-span-4">
            <DigitalHumanSupport caption={aurenCaption} mode={showScorecard ? "speaking" : "listening"} />
            <div className="mt-3 rounded-xl border p-3" style={{ borderColor: "rgba(203,251,0,.2)", background: "rgba(203,251,0,.04)" }}>
              <div className="flex justify-between text-[10px] uppercase tracking-[.2em]">
                <span style={{ color: BRAND.lime }}>Scam Resistance · live</span>
                <span className="text-white/90 font-mono">{liveScamRes}</span>
              </div>
              <div className="mt-2 h-1.5 rounded-full" style={{ background: "rgba(255,255,255,.08)" }}>
                <div className="h-1.5 rounded-full transition-all" style={{ width: `${liveScamRes}%`, background: liveScamRes < 40 ? BRAND.warmRed : liveScamRes < 55 ? BRAND.amber : BRAND.lime }} />
              </div>
              <div className="mt-1.5 text-[10px] text-white/70">Base 30 · updates with every reply you choose</div>
            </div>
          </div>
        </div>

        {!showScorecard && (
          <div className="mt-10 rounded-[2rem] border p-5 md:p-6" style={{ borderColor: "rgba(255,107,107,.25)", background: "rgba(247,248,250,.03)" }}>
            <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-4" style={{ borderColor: "rgba(247,248,250,.08)" }}>
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-full text-sm font-semibold" style={{ background: "rgba(255,107,107,.18)", color: BRAND.warmRed }}>M</div>
                <div>
                  <div className="text-sm font-semibold text-white">"Marcus" · Private Trading Group</div>
                  <div className="text-[10px] uppercase tracking-[.18em]" style={{ color: BRAND.warmRed }}>AI persona · recruiter pattern</div>
                </div>
              </div>
              <Pill tone="red">Rehearsal · WhatsApp scam scenario</Pill>
            </div>

            <div className="mt-5 space-y-4">
              {rehearsalTurns.slice(0, Math.min(stage + 1, rehearsalTurns.length)).map((turn, i) => (
                <div key={i} className="space-y-3">
                  <div className="max-w-xl rounded-2xl rounded-tl-sm border p-4" style={{ borderColor: "rgba(255,107,107,.25)", background: "rgba(255,107,107,.07)" }}>
                    <div className="text-[10px] font-semibold uppercase tracking-[.2em]" style={{ color: BRAND.warmRed }}>Marcus</div>
                    <p className="mt-1.5 text-sm leading-6 text-white/95">{turn.persona}</p>
                  </div>

                  {picks[i] ? (
                    <>
                      <div className="ml-auto max-w-xl rounded-2xl rounded-tr-sm border p-4" style={{ borderColor: `${toneColor[picks[i].tone]}55`, background: "rgba(247,248,250,.05)" }}>
                        <div className="flex items-center justify-between gap-3">
                          <div className="text-[10px] font-semibold uppercase tracking-[.2em] text-white/70">You · Turn {i * 2 + 2}</div>
                          <span className="rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[.15em]" style={{ background: `${toneColor[picks[i].tone]}18`, color: toneColor[picks[i].tone] }}>{picks[i].tone} · {picks[i].delta > 0 ? "+" : ""}{picks[i].delta}</span>
                        </div>
                        <p className="mt-1.5 text-sm leading-6 text-white/95">"{picks[i].text}"</p>
                      </div>
                      {picks[i].coaching && (
                        <div className="max-w-2xl rounded-2xl border p-4" style={{ borderColor: "rgba(203,251,0,.4)", background: "rgba(203,251,0,.08)" }}>
                          <div className="flex items-center gap-2">
                            <span className="auren-pulse h-1.5 w-1.5 rounded-full" style={{ background: BRAND.lime, boxShadow: `0 0 8px ${BRAND.lime}` }} />
                            <span className="text-[10px] font-semibold uppercase tracking-[.2em]" style={{ color: BRAND.lime }}>AUREN · Live coaching</span>
                          </div>
                          <p className="mt-2 text-sm leading-6 text-white/95">{picks[i].coaching}</p>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="ml-auto max-w-xl space-y-2">
                      <div className="text-[10px] uppercase tracking-[.2em] text-white/70 text-right">Choose your reply</div>
                      {turn.choices.map((c) => (
                        <button key={c.text} onClick={() => pick(c, i)} className="block w-full rounded-2xl border p-3.5 text-left text-sm text-white/95 transition hover:scale-[1.01] hover:border-white/40" style={{ borderColor: "rgba(247,248,250,.15)", background: "rgba(247,248,250,.04)" }}>
                          "{c.text}"
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {done && (
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border p-4" style={{ borderColor: "rgba(203,251,0,.3)", background: "rgba(203,251,0,.06)" }}>
                <span className="text-sm text-white/95">Rehearsal complete · 3 exchanges · every reply logged as evidence.</span>
                <button onClick={() => setShowScorecard(true)} className="rounded-full px-5 py-2.5 text-sm font-semibold" style={{ background: BRAND.lime, color: BRAND.graphite }}>View evidential scorecard →</button>
              </div>
            )}
          </div>
        )}

        {showScorecard && (
          <div className="mt-10 rounded-[2rem] border overflow-hidden" style={{ borderColor: "rgba(203,251,0,.25)", background: "rgba(247,248,250,.03)" }}>
            <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-5 border-b" style={{ borderColor: "rgba(247,248,250,.08)" }}>
              <div>
                <div className="text-[10px] uppercase tracking-[.22em]" style={{ color: BRAND.lime }}>Evidential scorecard</div>
                <h3 className="mt-1 text-2xl font-semibold text-white">WhatsApp scam scenario</h3>
              </div>
              <div className="rounded-full border px-4 py-2 text-sm font-semibold uppercase tracking-[.15em]" style={{ borderColor: `${verdictMeta.color}55`, color: verdictMeta.color, background: `${verdictMeta.color}10` }}>{verdictMeta.label}</div>
            </div>

            <div className="grid lg:grid-cols-2 gap-0">
              <div className="p-6 border-b lg:border-b-0 lg:border-r" style={{ borderColor: "rgba(247,248,250,.08)" }}>
                <div className="text-[10px] font-semibold uppercase tracking-[.2em] text-white/70">Your transcript · quote-level</div>
                <div className="mt-4 space-y-4">
                  {picks.map((p, i) => (
                    <div key={i} className="flex gap-3">
                      <span className="mt-1 w-1 shrink-0 rounded-full" style={{ background: toneColor[p.tone], minHeight: "2.5rem" }} />
                      <div>
                        <div className="text-[10px] font-semibold uppercase tracking-[.18em] text-white/70">Turn {i * 2 + 2} · You</div>
                        <p className="mt-1 text-sm italic leading-6 text-white/95">"{p.text}"</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6" style={{ background: "rgba(8,10,15,.5)" }}>
                <div className="text-[10px] font-semibold uppercase tracking-[.2em]" style={{ color: BRAND.lime }}>AUREN's analysis</div>
                <div className="mt-4 space-y-4">
                  {picks.map((p, i) => (
                    <div key={i}>
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="text-xs font-semibold" style={{ color: toneColor[p.tone] }}>Turn {i * 2 + 2} · {p.tone === "risky" ? "Vulnerability signal" : p.tone === "excellent" ? "Certification signal" : "Verification signal"}</span>
                        <span className="font-mono text-xs font-semibold" style={{ color: toneColor[p.tone] }}>{p.dim} {p.delta > 0 ? "+" : ""}{p.delta}</span>
                      </div>
                      <p className="mt-1 text-sm leading-6 text-white/90">{p.analysis}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="px-6 py-5 border-t flex flex-wrap items-center justify-between gap-4" style={{ borderColor: "rgba(247,248,250,.08)" }}>
              <div>
                <div className="text-sm text-white/95">{verdictMeta.note}</div>
                <div className="mt-2 text-xs text-white/75">Net session impact: <span className="font-mono font-semibold" style={{ color: totalDelta >= 0 ? BRAND.lime : BRAND.warmRed }}>{totalDelta > 0 ? "+" : ""}{totalDelta}</span> · Scam Resistance now <span className="font-mono font-semibold text-white">{liveScamRes}</span> · Logged to your AILS profile.</div>
              </div>
              <button onClick={reset} className="rounded-full border px-5 py-2.5 text-sm font-semibold text-white/95" style={{ borderColor: "rgba(247,248,250,.25)" }}>Rehearse again with variations ↻</button>
            </div>
          </div>
        )}

        <Quote cite="Full Project Paper §13 · The evidential scorecard">
          The learner is not told ‘you scored 42.’ They are shown their own words, the exact moments those words revealed vulnerability or demonstrated skill, and the specific effect on each competency dimension. The evidence is the transcript. Nothing is asserted that cannot be pointed to.
        </Quote>
      </div>
    </section>
  );
}

// ───────────────────────── 12. SIMULATION ─────────────────────────

const simScenarios = [
  {
    title: "Market drops 18%",
    context: "Your portfolio is down 18% in 3 days. Social media is in panic. Headlines call it the start of a crash.",
    choices: [
      { text: "Sell everything to limit losses", verdict: "flagged", note: "Panic response detected. No reference to written plan or time horizon." },
      { text: "Buy more — it's a discount", verdict: "flagged", note: "Untested hypothesis. No risk frame, no source for the 'discount' claim." },
      { text: "Check fundamentals before deciding", verdict: "accepted", note: "Research-led. AUREN logs this as a positive discipline signal." },
      { text: "Stick to my written investment plan", verdict: "excellent", note: "Plan-based discipline. The strongest possible response to volatility." },
    ],
    observes: "Emotional control under loss",
  },
  {
    title: "Friend shares AI trading bot",
    context: "A friend forwards an AI bot claiming 85% accuracy. They've personally made 'good money' for 2 months. They invite you to join.",
    choices: [
      { text: "Try it with a small amount", verdict: "flagged", note: "Anecdotal evidence accepted. Small bets normalize the larger ones later." },
      { text: "Ignore — sounds like a scam", verdict: "mixed", note: "Defensive but no investigation. Real scams need to be reported, not just avoided." },
      { text: "Research the company and licensing", verdict: "accepted", note: "Due diligence. AUREN logs scam-awareness signal." },
      { text: "Ask for verified track record + regulator status", verdict: "excellent", note: "Structured verification. This is the response a regulator would teach." },
    ],
    observes: "Scam awareness + due diligence",
  },
  {
    title: "Viral stock trend",
    context: "A stock is trending on social media, up 40% in a week. Three friends have already bought in. You feel pressure to act.",
    choices: [
      { text: "Buy now before missing out", verdict: "flagged", note: "FOMO + momentum chasing. AUREN flags this as the highest-risk pattern." },
      { text: "Avoid — too risky", verdict: "mixed", note: "Avoidance without analysis. Misses the learning opportunity." },
      { text: "Wait and observe price action", verdict: "accepted", note: "Patience. AUREN notes emotional regulation." },
      { text: "Research why it's trending — and who benefits", verdict: "excellent", note: "Source-led + skeptical. This is critical thinking applied." },
    ],
    observes: "Hype resistance + critical thinking",
  },
  {
    title: "Conflicting AI answers",
    context: "You ask two AI tools the same investment question. They give opposite advice — and both sound confident.",
    choices: [
      { text: "Go with the more confident-sounding one", verdict: "flagged", note: "Confidence ≠ accuracy. This is the core AI literacy trap." },
      { text: "Pick the one that matches your existing view", verdict: "flagged", note: "Confirmation bias. AUREN flags this as a critical AI-literacy gap." },
      { text: "Check official primary sources", verdict: "accepted", note: "Source verification. The correct first move." },
      { text: "Don't act — escalate to a licensed advisor", verdict: "excellent", note: "Knows when AI is not enough. The gold standard." },
    ],
    observes: "AI literacy + escalation judgment",
  },
];

function SimulationModal({ data, close, logEvidence }) {
  const [pick, setPick] = useState(null);
  useEffect(() => { setPick(null); }, [data]);
  if (!data) return null;
  const verdictColor = {
    flagged: BRAND.warmRed,
    mixed: BRAND.gold,
    accepted: BRAND.lime,
    excellent: BRAND.lime,
  };
  const onPick = (i) => {
    if (pick === null) {
      const c = data.choices[i];
      logEvidence && logEvidence({ quote: c.text, tone: c.verdict === "flagged" ? "risky" : c.verdict === "mixed" ? "good" : "excellent", dim: data.observes, delta: c.verdict === "flagged" ? -2 : c.verdict === "excellent" ? 3 : 1, source: `Simulation · ${data.title}` });
    }
    setPick(i);
  };
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 py-8" style={{ background: "rgba(8,10,15,.88)", backdropFilter: "blur(8px)" }}>
      <div className="relative max-h-full w-full max-w-3xl overflow-y-auto rounded-[2rem] border" style={{ borderColor: "rgba(203,251,0,.3)", background: `linear-gradient(145deg, ${BRAND.navy}, ${BRAND.deep})` }}>
        <button onClick={close} className="absolute top-4 right-4 z-10 rounded-full border px-3 py-1 text-sm text-white/95 hover:bg-white/10" style={{ borderColor: "rgba(247,248,250,.2)" }}>✕</button>
        <div className="grid gap-0 lg:grid-cols-12">
          <div className="lg:col-span-5 p-5 border-b lg:border-b-0 lg:border-r" style={{ borderColor: "rgba(247,248,250,.08)" }}>
            <div className="rounded-2xl overflow-hidden">
              <DigitalHumanSupport
                caption="There's no right answer — only patterns I observe in how you decide."
                mode="speaking"
              />
            </div>
            <div className="mt-4 rounded-xl border p-3" style={{ borderColor: "rgba(203,251,0,.25)", background: "rgba(203,251,0,.06)" }}>
              <div className="text-[10px] uppercase tracking-[.2em]" style={{ color: BRAND.lime }}>AUREN observes</div>
              <div className="mt-1 text-sm text-white/95">{data.observes}</div>
            </div>
          </div>

          <div className="lg:col-span-7 p-6 md:p-7">
            <Pill tone="lime">Simulation</Pill>
            <h3 className="mt-4 text-2xl font-semibold text-white md:text-3xl">{data.title}</h3>
            <p className="mt-3 text-sm leading-6 text-white/90">{data.context}</p>

            <div className="mt-6 space-y-3">
              {data.choices.map((c, i) => (
                <button
                  key={c.text}
                  onClick={() => onPick(i)}
                  className="block w-full rounded-2xl border p-4 text-left transition hover:scale-[1.01]"
                  style={{
                    borderColor: pick === i ? verdictColor[c.verdict] : "rgba(247,248,250,.12)",
                    background: pick === i ? "rgba(247,248,250,.06)" : "rgba(247,248,250,.03)",
                  }}
                >
                  <div className="text-white/95">{c.text}</div>
                  {pick === i && (
                    <div className="mt-3 border-t pt-3 text-sm" style={{ borderColor: "rgba(247,248,250,.1)" }}>
                      <span className="font-semibold uppercase tracking-wider text-xs" style={{ color: verdictColor[c.verdict] }}>{c.verdict}</span>
                      <span className="ml-2 text-white/95">{c.note}</span>
                    </div>
                  )}
                </button>
              ))}
            </div>

            {pick !== null && (
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border p-4" style={{ borderColor: "rgba(203,251,0,.25)", background: "rgba(203,251,0,.06)" }}>
                <span className="text-sm text-white/95">AUREN has logged your response to your AILS profile.</span>
                <button onClick={close} className="rounded-full px-4 py-2 text-sm font-semibold" style={{ background: BRAND.lime, color: BRAND.graphite }}>Continue →</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Simulation({ openSim }) {
  return (
    <section className="px-5 pt-32 lg:pt-20 pb-36" style={{ background: BRAND.graphite }}>
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Simulation engine"
          title="AUREN observes how you think under pressure."
          body="Realistic decision scenarios measure reasoning, verification, emotional control, and scam awareness. Click any scenario to try it."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {simScenarios.map((s, i) => (
            <button
              key={s.title}
              onClick={() => openSim(s)}
              className="rounded-[2rem] border p-6 min-h-[220px] flex flex-col justify-between text-left transition hover:scale-[1.02] hover:border-white/30"
              style={{ borderColor: "rgba(247,248,250,.1)", background: i === 1 ? "rgba(216,181,109,.08)" : "rgba(247,248,250,.035)" }}
            >
              <div>
                <div className="font-mono text-xs" style={{ color: BRAND.lime }}>Scenario 0{i + 1}</div>
                <h3 className="mt-5 text-xl font-semibold text-white">{s.title}</h3>
              </div>
              <div className="mt-6 inline-flex items-center rounded-full border px-4 py-3 text-sm text-white/95" style={{ borderColor: "rgba(247,248,250,.2)" }}>Start challenge →</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

// ───────────────────────── 13. LEARNER REPORT ─────────────────────────

function Report({ evidence }) {
  const scores = ailsAssessment.dimensions;
  return (
    <section className="px-5 pt-32 lg:pt-20 pb-36" style={{ background: BRAND.white, color: BRAND.graphite }}>
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start space-y-5">
            <div>
              <Pill tone="dark">Verified credential</Pill>
              <h2 className="mt-5 text-4xl font-semibold tracking-tight md:text-5xl">A learning credential. Not investment advice.</h2>
              <p className="mt-5 text-base leading-7 text-black/75">Issued after course completion. Measures five literacy dimensions, includes behavioral observations and explainability — built for the user, the regulator, and the procurement officer alike.</p>
            </div>
            <div className="rounded-2xl overflow-hidden border" style={{ borderColor: "rgba(17,20,24,.08)" }}>
              <DigitalHumanSupport
                caption="You started at 42. You finished at 76. Here's what changed — and what to learn next."
                mode="speaking"
              />
            </div>
            <div className="grid gap-3">
              {[
                "5-dimension competency score",
                "Behavioral observation log",
                "Explainability for every score",
                "Verified credential ID",
                "No buy/sell signals · No predictions",
              ].map(x => (
                <div key={x} className="flex items-center gap-3 text-sm">
                  <span className="grid h-5 w-5 place-items-center rounded-full" style={{ background: BRAND.lime, color: BRAND.graphite }}>✓</span>
                  <span className="text-black/80">{x}</span>
                </div>
              ))}
            </div>
            <Quote cite="Full Project Paper §14 · Measurement: AILS as a trajectory" dark={false}>
              Every score movement is anchored in transcript evidence. This makes AILS auditable by regulators, defensible to procurement teams, and explainable to the learner.
            </Quote>
          </div>

          <div className="lg:col-span-7 space-y-5">
            {evidence.length > 0 && (
              <div className="rounded-[2rem] border p-6" style={{ borderColor: "rgba(122,150,10,.5)", background: "rgba(203,251,0,.12)" }}>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">This session's live evidence</h3>
                  <Pill tone="dark">{String(evidence.length)} signals · your play</Pill>
                </div>
                <p className="mt-1 text-xs text-black/70">Captured from the rehearsal and simulations you just played in this demo — the same pipeline that feeds the real credential.</p>
                <div className="mt-4 space-y-2">
                  {evidence.slice(-6).map((e, i) => (
                    <div key={i} className="flex flex-wrap items-baseline gap-x-3 gap-y-1 rounded-xl bg-white/70 p-3 text-sm">
                      <span className="font-mono text-[10px] uppercase tracking-[.15em] text-black/50">{e.source}</span>
                      <span className="italic text-black/85">"{e.quote}"</span>
                      <span className="ml-auto font-mono text-xs font-semibold" style={{ color: e.delta < 0 ? "#B4443E" : "#3D6B14" }}>{e.dim} {e.delta > 0 ? "+" : ""}{e.delta}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="rounded-[2rem] bg-white p-6 md:p-7 shadow-2xl shadow-black/10">
              <div className="flex items-center justify-between border-b pb-5">
                <div>
                  <div className="text-xs uppercase tracking-[.22em] text-black/70">AUREN Learning Report</div>
                  <div className="mt-1 text-2xl font-semibold">{ailsAssessment.candidate}</div>
                  <div className="mt-1 text-xs text-black/70">Cert · AUR-26-04881 · Issued 24 May 2026</div>
                </div>
                <Mark small />
              </div>

              <div className="mt-6 grid gap-3 grid-cols-3">
                <div className="rounded-2xl p-4 text-center" style={{ background: "#F0F2F5" }}>
                  <div className="text-xs uppercase tracking-[.18em] text-black/70">Started</div>
                  <div className="mt-2 text-4xl font-bold" style={{ color: BRAND.warmRed }}>42</div>
                </div>
                <div className="rounded-2xl p-4 text-center flex items-center justify-center" style={{ background: "rgba(216,181,109,.15)" }}>
                  <div className="text-sm text-black/80"><strong>+34</strong> point improvement</div>
                </div>
                <div className="rounded-2xl p-4 text-center" style={{ background: "rgba(203,251,0,.22)" }}>
                  <div className="text-xs uppercase tracking-[.18em] text-black/80">Final</div>
                  <div className="mt-2 text-4xl font-bold" style={{ color: "#3D6B14" }}>76</div>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {scores.map((s, i) => {
                  const finalVal = [78, 64, 72, 82, 84][i];
                  return (
                    <div key={s.label} className="rounded-2xl p-4" style={{ background: "#F8F9FB" }}>
                      <div className="flex items-baseline justify-between text-sm">
                        <span className="font-semibold">{s.label}</span>
                        <span><strong>{finalVal}</strong> <span className="text-black/60 text-xs">(was {s.value})</span></span>
                      </div>
                      <div className="mt-3 h-2 rounded-full bg-black/10 relative">
                        <div className="absolute h-2 rounded-full" style={{ width: `${s.value}%`, background: "rgba(0,0,0,.3)" }} />
                        <div className="absolute h-2 rounded-full" style={{ width: `${finalVal}%`, background: "#3D6B14" }} />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 rounded-2xl p-5" style={{ background: "rgba(203,251,0,.22)" }}>
                <div className="text-xs uppercase tracking-[.2em] text-black/80">Recommended next path</div>
                <div className="mt-2 text-xl font-semibold">Confident Learner: AI-Assisted Research Workflow</div>
                <div className="mt-2 text-sm text-black/80">Builds on strong AI literacy. Targets remaining gap in advanced product comprehension.</div>
              </div>
            </div>

            <div className="rounded-[2rem] border bg-white p-6" style={{ borderColor: "rgba(17,20,24,.08)" }}>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Behavioral observations</h3>
                <Pill tone="dark">Explainable AI</Pill>
              </div>
              <div className="mt-4 space-y-3 text-sm text-black/80">
                <p>• Demonstrated source verification on 6 of 7 AI literacy challenges.</p>
                <p>• Emotional response detected in market-crash simulation — followup module added Day 2.</p>
                <p>• Correctly identified 4 of 4 scam scenarios in Spot-the-Scam Lab. Strong improvement.</p>
                <p>• Showed bias toward confirmation in 1 of 4 conflicting-AI scenarios — flagged for awareness.</p>
                <p>• Plan-based decision-making emerged consistently from Day 2 onwards.</p>
              </div>
            </div>

            <div className="rounded-2xl p-4 text-xs leading-5 text-black/75" style={{ background: "#F0F2F5" }}>
              <strong className="text-black">Educational platform.</strong> AUREN is not a financial advisor, broker, or robo-advisor. This report measures learning, not investment skill, and does not constitute financial advice in any jurisdiction. Scores reflect observed responses to educational scenarios.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ───────────────────────── 14. REGULATOR VIEW ─────────────────────────

function RegulatorView() {
  return (
    <section className="px-5 pt-32 lg:pt-20 pb-36" style={{ background: BRAND.deep }}>
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Regulator view · IOSCO C8"
          title="What 39 regulators see when AUREN runs in their jurisdiction."
          body="A regulator-grade operational dashboard for investor literacy oversight: anonymized cohorts, vulnerability heatmaps, scam-detection analytics, and audit-ready exports. No personal data exposed."
          eyebrowTone="yellow"
        />

        <div className="mt-10 rounded-[2rem] border overflow-hidden" style={{ borderColor: "rgba(245,197,24,.25)", background: "#0E1424" }}>
          <div className="flex items-center justify-between px-5 py-4 border-b" style={{ background: BRAND.navy, borderColor: "rgba(245,197,24,.15)" }}>
            <div className="flex items-center gap-3">
              <div className="grid h-8 w-8 place-items-center rounded-lg" style={{ background: BRAND.regYellow, color: BRAND.graphite }}>
                <span className="text-sm">🛡</span>
              </div>
              <div>
                <div className="font-semibold" style={{ color: BRAND.regYellow }}>AUREN Regulator Dashboard</div>
                <div className="text-[10px] uppercase tracking-[.18em] text-white/70">Investor Literacy Oversight System</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="rounded-lg border px-3 py-1.5 text-xs text-white/90" style={{ borderColor: "rgba(247,248,250,.15)" }}>↓ Export</button>
              <button className="rounded-lg border px-3 py-1.5 text-xs text-white/90" style={{ borderColor: "rgba(247,248,250,.15)" }}>↻ Refresh</button>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-0">
            <div className="lg:col-span-3 p-4 border-r" style={{ background: BRAND.navy, borderColor: "rgba(245,197,24,.1)" }}>
              <div className="space-y-1">
                {[
                  { label: "Learner Reports", active: true, count: 14782 },
                  { label: "Interview Sessions", count: 16204 },
                  { label: "Behavioral Evidence" },
                  { label: "Scam Detection", count: 89 },
                  { label: "Analytics" },
                  { label: "Vulnerability Heatmap" },
                  { label: "Cohort Compare" },
                  { label: "All Profiles" },
                ].map((item) => (
                  <button key={item.label} className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition" style={{ background: item.active ? "rgba(245,197,24,.12)" : "transparent", color: item.active ? BRAND.regYellow : "rgba(247,248,250,.8)" }}>
                    <span className="text-xs font-medium">{item.label}</span>
                    {item.count !== undefined && <span className="text-[10px] opacity-70">{item.count.toLocaleString()}</span>}
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-9 p-5 md:p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-2xl font-semibold text-white">Learner Reports</h3>
                <div className="text-xs text-white/75">Jurisdiction: <span className="font-semibold" style={{ color: BRAND.regYellow }}>Malaysia (national pilot)</span></div>
              </div>

              <div className="mt-5 grid gap-3 grid-cols-2 md:grid-cols-4">
                {[
                  { label: "Total Learners", value: "14,782", color: BRAND.regYellow },
                  { label: "Active Today", value: "1,204", color: BRAND.lime },
                  { label: "Credentials Issued", value: "8,941", color: BRAND.cyan },
                  { label: "Avg AILS Score", value: "67", color: BRAND.gold },
                ].map((kpi) => (
                  <div key={kpi.label} className="rounded-xl border p-4" style={{ borderColor: "rgba(245,197,24,.12)", background: "rgba(245,197,24,.04)" }}>
                    <div className="text-3xl font-semibold" style={{ color: kpi.color }}>{kpi.value}</div>
                    <div className="mt-1 text-[10px] uppercase tracking-[.18em] text-white/75">{kpi.label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-xl border p-4" style={{ borderColor: "rgba(245,197,24,.12)", background: "rgba(245,197,24,.03)" }}>
                <div className="flex items-baseline justify-between">
                  <div>
                    <div className="text-sm font-semibold text-white">Top behavioral vulnerabilities (anonymized)</div>
                    <div className="text-[10px] text-white/70">Last 30 days · across all completed assessments</div>
                  </div>
                  <Pill tone="yellow">Live</Pill>
                </div>
                <div className="mt-4 space-y-2">
                  {[
                    { label: "Uncritical trust in AI outputs", pct: 68, severity: "high" },
                    { label: "Susceptibility to deepfake endorsements", pct: 54, severity: "high" },
                    { label: "Loss aversion driving panic-sell", pct: 47, severity: "medium" },
                    { label: "Social-media-led investment decisions", pct: 41, severity: "medium" },
                    { label: "Confusion: education vs financial advice", pct: 38, severity: "medium" },
                  ].map((v) => (
                    <div key={v.label} className="flex items-center gap-3 text-xs">
                      <div className="flex-1 text-white/90">{v.label}</div>
                      <div className="w-32 h-1.5 rounded-full" style={{ background: "rgba(255,255,255,.08)" }}>
                        <div className="h-1.5 rounded-full" style={{ width: `${v.pct}%`, background: v.severity === "high" ? BRAND.warmRed : BRAND.amber }} />
                      </div>
                      <div className="w-10 text-right font-mono" style={{ color: v.severity === "high" ? BRAND.warmRed : BRAND.amber }}>{v.pct}%</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 rounded-xl border" style={{ borderColor: "rgba(245,197,24,.12)" }}>
                <div className="grid grid-cols-12 px-4 py-2.5 text-[10px] uppercase tracking-[.18em] border-b" style={{ borderColor: "rgba(245,197,24,.12)", color: BRAND.regYellow }}>
                  <div className="col-span-3">Session ID</div>
                  <div className="col-span-3">Started</div>
                  <div className="col-span-3">Cohort</div>
                  <div className="col-span-2">AILS</div>
                  <div className="col-span-1">Status</div>
                </div>
                {[
                  { id: "AUR-26-58979", started: "27 May · 14:12", cohort: "MY · 25–34", ails: 67, status: "Issued" },
                  { id: "AUR-26-08783", started: "27 May · 10:57", cohort: "MY · 55+", ails: 51, status: "In course" },
                  { id: "AUR-26-63251", started: "27 May · 09:23", cohort: "MY · 18–24", ails: 42, status: "In course" },
                  { id: "AUR-26-37363", started: "26 May · 16:49", cohort: "MY · 35–44", ails: 73, status: "Issued" },
                  { id: "AUR-26-22147", started: "26 May · 11:08", cohort: "MY · 25–34", ails: 58, status: "Review" },
                ].map((r) => (
                  <div key={r.id} className="grid grid-cols-12 px-4 py-3 text-xs items-center border-b" style={{ borderColor: "rgba(247,248,250,.04)" }}>
                    <div className="col-span-3 font-mono text-white/95">{r.id}</div>
                    <div className="col-span-3 text-white/90">{r.started}</div>
                    <div className="col-span-3 text-white/90">{r.cohort}</div>
                    <div className="col-span-2 font-semibold" style={{ color: r.ails < 50 ? BRAND.warmRed : r.ails < 65 ? BRAND.amber : BRAND.lime }}>{r.ails}</div>
                    <div className="col-span-1 text-[10px]" style={{ color: r.status === "Issued" ? BRAND.lime : r.status === "Review" ? BRAND.amber : "rgba(247,248,250,.7)" }}>{r.status}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Quote cite="Full Project Paper §16 · The regulator view">
          This turns AUREN into something regulators have never had — an early-warning sensor network for emerging fraud, powered by the aggregate learning behavior of the population itself. When learners across a jurisdiction suddenly begin failing a new scenario type, that signal reaches the regulator before the corresponding losses reach the complaints desk.
        </Quote>

        <div className="mt-8 rounded-2xl border p-5" style={{ borderColor: "rgba(245,197,24,.25)", background: "rgba(245,197,24,.05)" }}>
          <Pill tone="yellow">Cross-jurisdictional</Pill>
          <p className="mt-3 text-sm leading-6 text-white/95"><strong className="text-white">A regulator competitive moat.</strong> “For the first time, a regulator can compare their jurisdiction's rehearsal outcomes — AI literacy, scam resistance, behavioral discipline — against anonymized peer regulators, using a common measurement standard across IOSCO members... AILS, deployed across jurisdictions, is that instrument.”</p>
        </div>
      </div>
    </section>
  );
}

// ───────────────────────── 15. PLATFORM ENGINE ─────────────────────────

function Engine() {
  const layers = [
    {
      tier: "Interaction Layer",
      color: BRAND.lime,
      status: "Multilingual · always-on",
      modules: ["Hyper-realistic Digital Human", "Multilingual Voice", "Conversation Engine", "Real-time Adaptation"],
    },
    {
      tier: "Intelligence Layer",
      color: BRAND.cyan,
      status: "AI cognitive engine",
      modules: ["Rehearsal Engine", "AI Persona Library", "5-Dimension Cognitive Assessment", "Evidential Scorecard Generator", "Persistent Memory", "Explainability Engine"],
    },
    {
      tier: "Trust Layer",
      color: BRAND.gold,
      status: "Regulator-grade compliance",
      modules: ["eKYC + Liveness Detection", "QR-to-Phone Verification", "ID / Passport Scan", "Privacy-by-Design", "Audit Logs"],
    },
    {
      tier: "Deployment Layer",
      color: BRAND.muted,
      status: "Cross-surface",
      modules: ["Web", "Mobile", "Kiosk", "Embedded Widget", "Regulator API"],
    },
  ];
  return (
    <section className="px-5 pt-32 lg:pt-20 pb-36" style={{ background: `linear-gradient(145deg, ${BRAND.graphite}, ${BRAND.navy})` }}>
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <SectionHeader
              eyebrow="Platform architecture"
              title="One platform. Four layers. Built for cross-jurisdictional deployment."
              body="AUREN is structured as four interoperable layers — interaction, intelligence, trust, deployment. Each can be configured for the regulatory and linguistic context of a deploying jurisdiction without code changes."
            />
          </div>
          <div className="lg:col-span-4">
            <DigitalHumanSupport
              caption="Everything you see — me, the rehearsal engine, the regulator dashboard — is the same AUREN platform, configured for each context."
              mode="speaking"
            />
          </div>
        </div>

        <div className="mt-10 space-y-3">
          {layers.map((layer) => (
            <div key={layer.tier} className="rounded-[2rem] border p-5 md:p-6" style={{ borderColor: `${layer.color}33`, background: "rgba(247,248,250,.035)" }}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: layer.color, boxShadow: `0 0 10px ${layer.color}` }} />
                  <span className="text-[10px] uppercase tracking-[.22em] font-semibold" style={{ color: layer.color }}>{layer.tier}</span>
                </div>
                <span className="text-[10px] uppercase tracking-[.18em] text-white/75">{layer.status}</span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {layer.modules.map((m) => (
                  <span key={m} className="rounded-full border px-3 py-2 text-sm text-white/95" style={{ borderColor: `${layer.color}33`, background: `${layer.color}10` }}>{m}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border p-5 text-sm leading-6 text-white/95" style={{ borderColor: "rgba(203,251,0,.25)", background: "rgba(203,251,0,.06)" }}>
          <strong className="text-white">Why this matters for IOSCO.</strong> “Because each layer is independently configurable — language, jurisdiction, compliance regime, deployment surface — a single AUREN build can serve any IOSCO member jurisdiction without bespoke rebuilds. Configuration, not code changes, is the localization mechanism.” — Full Project Paper §7
        </div>
      </div>
    </section>
  );
}

// ───────────────────────── 16. ENTERPRISE / COMMERCIALIZATION ─────────────────────────

function Enterprise() {
  const segments = [
    { who: "Retail users", model: "B2C subscription", offer: "Adaptive course, verified credential, AI literacy training. Freemium → premium.", chip: "Direct revenue" },
    { who: "Banks & brokers", model: "B2B licensing", offer: "Compliance-friendly investor education for client onboarding. Cohort dashboards. Reduces mis-selling exposure.", chip: "Enterprise SaaS" },
    { who: "Universities", model: "Institutional", offer: "Embedded curriculum for finance, business, and AI literacy programs.", chip: "Annual contract" },
    { who: "Regulators · IOSCO", model: "National rollout", offer: "Public literacy programs. Multilingual. Cross-jurisdictional cohort analytics.", chip: "Grant + license" },
    { who: "Compliance training", model: "Vertical extension", offer: "Same engine, retuned: advisor training, compliance certification, continuing education.", chip: "Same engine" },
  ];
  const criteria = [
    { name: "Clarity & Relevance", weight: 25, note: "“v2 answers both IOSCO problem statements more directly.”" },
    { name: "Consumer Impact", weight: 25, note: "“v2 produces measurable behavioral change, not just measurable content consumption.”" },
    { name: "Feasibility & Team Capability", weight: 20, note: "“A validated architecture applied to a new and urgent context. This lowers execution risk substantially.”" },
    { name: "Cross-Jurisdictional Potential", weight: 20, note: "“One platform. Any jurisdiction.”" },
    { name: "Innovation & Uniqueness", weight: 10, note: "“No existing investor education product uses live rehearsal with evidential scoring... AUREN v2 is the first.”" },
  ];
  return (
    <section className="px-5 pt-32 lg:pt-20 pb-36" style={{ background: BRAND.deep }}>
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Commercialization"
          title="One platform. Five revenue engines."
          body="The same core product serves consumer, institutional, academic, regulator, and compliance-training segments — each with its own pricing model and procurement path. AUREN is built to be deployed, not just demonstrated."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
          {segments.map((s) => (
            <div key={s.who} className="rounded-[2rem] border p-6 transition hover:scale-[1.02] hover:border-white/30" style={{ borderColor: "rgba(203,251,0,.14)", background: "rgba(247,248,250,.035)" }}>
              <div className="text-[10px] uppercase tracking-[.2em]" style={{ color: BRAND.lime }}>{s.chip}</div>
              <h3 className="mt-3 text-xl font-semibold text-white">{s.who}</h3>
              <div className="mt-1 text-xs text-white/80">{s.model}</div>
              <p className="mt-5 text-sm leading-6 text-white/95">{s.offer}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-[2rem] border p-6 md:p-8" style={{ borderColor: "rgba(247,248,250,.12)", background: "rgba(247,248,250,.03)" }}>
          <Pill tone="lime">Scored against IOSCO's five weighted criteria</Pill>
          <div className="mt-6 space-y-4">
            {criteria.map((c) => (
              <div key={c.name} className="grid gap-2 md:grid-cols-12 md:items-center">
                <div className="md:col-span-4">
                  <div className="text-sm font-semibold text-white">{c.name}</div>
                  <div className="text-xs italic text-white/70">{c.note}</div>
                </div>
                <div className="md:col-span-7 h-2 rounded-full" style={{ background: "rgba(255,255,255,.08)" }}>
                  <div className="h-2 rounded-full" style={{ width: `${c.weight * 4}%`, background: BRAND.lime }} />
                </div>
                <div className="md:col-span-1 font-mono text-sm text-right" style={{ color: BRAND.lime }}>{c.weight}%</div>
              </div>
            ))}
          </div>
          <Quote cite="Concept Paper §6 · How v2 strengthens AUREN's answer to IOSCO">
            v1 scored approximately 8.5/10 against IOSCO's weighted criteria. v2, executed correctly, moves that score into the 9.0–9.4 range. The architectural change is what unlocks the additional value.
          </Quote>
        </div>

        <div className="mt-10 rounded-[2rem] border p-6 md:p-8" style={{ borderColor: "rgba(245,197,24,.3)", background: "rgba(245,197,24,.06)" }}>
          <Pill tone="yellow">Demo Day · 8 October 2026 · Madrid</Pill>
          <h3 className="mt-4 text-2xl font-semibold text-white md:text-3xl">Why AUREN can win.</h3>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <div>
              <div className="text-sm font-semibold text-white">Both IOSCO problem statements addressed</div>
              <p className="mt-2 text-sm leading-6 text-white/90">PS1 — Rehearsal Engine + Spot the Scam Lab (deepfakes, voice clones, social media fraud). PS2 — AILS assessment + 3-day adaptive course + AI Literacy Lab. Most teams will pick one. We do both.</p>
            </div>
            <div>
              <div className="text-sm font-semibold text-white">End-to-end platform, not a single feature</div>
              <p className="mt-2 text-sm leading-6 text-white/90">Digital Human, cognitive assessment, rehearsal engine, adaptive course, scam detection lab, regulator dashboard — one integrated platform, not a stack of disconnected tools.</p>
            </div>
            <div>
              <div className="text-sm font-semibold text-white">Cross-jurisdictional from day one</div>
              <p className="mt-2 text-sm leading-6 text-white/90">Multilingual architecture supporting English, Mandarin, Arabic, Bahasa Melayu, Spanish. Configurable for any regulatory framework across IOSCO's 130+ jurisdictions.</p>
            </div>
            <div>
              <div className="text-sm font-semibold text-white">Regulator-grade measurement</div>
              <p className="mt-2 text-sm leading-6 text-white/90">AI cognitive scoring + behavioral observation + audit-trail dashboard. The "How outcomes will be measured" question — built in from day one.</p>
            </div>
          </div>
          <Quote cite="Full Project Paper · Part Six · In closing">
            The judges will not be watching a demo. They will be watching what investor education becomes when the mechanic changes — when knowledge delivery gives way to skill rehearsal, when scoring becomes evidential, and when the AI takes the role of both mentor and adversary in service of the learner's protection.
          </Quote>
        </div>
      </div>
    </section>
  );
}

// ───────────────────────── ROOT ─────────────────────────

export default function AurenPrototypeRevised() {
  const [active, setActive] = useState(0);
  const [simData, setSimData] = useState(null);
  const [scamData, setScamData] = useState(null);
  const [evidence, setEvidence] = useState([]);
  const logEvidence = (e) => setEvidence((prev) => [...prev, e]);

  // Scroll to top whenever the section changes
  useEffect(() => { window.scrollTo({ top: 0, behavior: "auto" }); }, [active]);

  // Arrow-key navigation between sections (disabled while a modal is open)
  useEffect(() => {
    const onKey = (ev) => {
      if (simData || scamData) return;
      if (ev.target && /INPUT|TEXTAREA|SELECT/.test(ev.target.tagName)) return;
      if (ev.key === "ArrowRight") setActive((a) => Math.min(sections.length - 1, a + 1));
      if (ev.key === "ArrowLeft") setActive((a) => Math.max(0, a - 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [simData, scamData]);

  const content = [
    <Hero key="hero" go={setActive} />,
    <Problem key="problem" />,
    <Journey key="journey" />,
    <Interview key="interview" go={setActive} />,
    <Assessment key="assessment" go={setActive} />,
    <Dashboard key="dashboard" />,
    <Course key="course" />,
    <Memory key="memory" />,
    <LiteracyLab key="literacy" />,
    <ScamLab key="scam" openScam={setScamData} />,
    <RehearsalEngine key="rehearsal" logEvidence={logEvidence} />,
    <Simulation key="simulation" openSim={setSimData} />,
    <Report key="report" evidence={evidence} />,
    <RegulatorView key="regulator" />,
    <Engine key="engine" />,
    <Enterprise key="enterprise" />,
  ];

  return (
    <main className="min-h-screen" style={{ background: BRAND.deep }}>
      <Nav active={active} setActive={setActive} />
      {content[active]}
      <SimulationModal data={simData} close={() => setSimData(null)} logEvidence={logEvidence} />
      <ScamModal scenario={scamData} close={() => setScamData(null)} />
      <div className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-full border px-3 py-2 backdrop-blur-2xl" style={{ borderColor: "rgba(247,248,250,.12)", background: "rgba(8,10,15,.78)" }}>
        <button onClick={() => setActive(Math.max(0, active - 1))} className="rounded-full px-4 py-2 text-sm text-white/80 disabled:opacity-30" disabled={active === 0}>←</button>
        <span className="min-w-[150px] text-center text-[10px] uppercase tracking-[.2em] text-white/90">{String(active + 1).padStart(2, "0")} · {sections[active]}</span>
        <button onClick={() => setActive(Math.min(sections.length - 1, active + 1))} className="rounded-full px-4 py-2 text-sm font-semibold" style={{ background: BRAND.lime, color: BRAND.graphite }} disabled={active === sections.length - 1}>Next →</button>
      </div>
      <div className="h-24" aria-hidden />
    </main>
  );
}
