// @ts-nocheck
import { useEffect, useRef, useState } from "react";
import { BRAND, DigitalHumanPortrait, Pill, Mark } from "./App";

/**
 * AUREN — MVP Demo v2 · "The Call"
 *
 * The Digital Human IS the interface. The whole demo is one live session
 * with her, styled like a video call:
 *   — she fills the screen; her words type out as she speaks
 *   — the consumer talks to her through ONE input bar (type anything)
 *   — she listens: her replies echo the consumer's own words
 *   — the scam rehearsal arrives as a screen-shared WhatsApp window
 *     inside the call, while she coaches live over it
 *   — the evidential scorecard is delivered by her at the end
 *
 * Her brain here is a scripted classifier (keywords → intents). In
 * production the same flow runs on a live LLM with voice and avatar.
 */

const DIMS = [
  { key: "IR", label: "Investor Reasoning" },
  { key: "AL", label: "AI Literacy" },
  { key: "RA", label: "Risk Awareness" },
  { key: "SR", label: "Scam Resistance" },
  { key: "BS", label: "Behavioral Stability" },
];
const dimLabel = (k) => DIMS.find(d => d.key === k).label;
const dimColor = (v) => (v < 40 ? BRAND.warmRed : v < 55 ? BRAND.amber : BRAND.lime);

// ─────────────────────────────────────────────────────────────
// Typewriter — makes her "speak"
// ─────────────────────────────────────────────────────────────
function useTypewriter(text, speed = 22) {
  const [shown, setShown] = useState("");
  const [done, setDone] = useState(false);
  const idxRef = useRef(0);
  useEffect(() => {
    setShown(""); setDone(!text); idxRef.current = 0;
    if (!text) return;
    const iv = setInterval(() => {
      idxRef.current += 1;
      setShown(text.slice(0, idxRef.current));
      if (idxRef.current >= text.length) { clearInterval(iv); setDone(true); }
    }, speed);
    return () => clearInterval(iv);
  }, [text]);
  const skip = () => { idxRef.current = text.length; setShown(text); setDone(true); };
  return { shown, done, skip };
}

// ─────────────────────────────────────────────────────────────
// Her scripted brain — intent classification of free text
// ─────────────────────────────────────────────────────────────
const has = (t, words) => words.some(w => t.includes(w));
const frag = (t, n = 52) => (t.length > n ? t.slice(0, n).trim() + "…" : t);

function classifyInterview(qId, raw) {
  const t = raw.toLowerCase();
  if (qId === 0) { // invested before?
    if (has(t, ["no", "never", "not yet", "thinking", "belum"])) return { adj: { RA: +2 }, obs: "Pre-investor. High teachability window — habits not yet formed.", react: (n, f) => `"${f}" — that's actually a good place to start, ${n}. No bad habits to unlearn.` };
    if (has(t, ["trade", "trading", "often", "active", "daily", "crypto"])) return { adj: { IR: +4, BS: -3 }, obs: "Active trader. Overconfidence risk flagged for rehearsal path.", react: (n, f) => `"${f}" — experienced, then. I'll be watching for overconfidence as much as gaps.` };
    return { adj: { IR: +2 }, obs: "Self-taught experience. Tactical exposure, no strategic framework detected yet.", react: (n, f) => `"${f}" — good, some real exposure to anchor on. Not a test, remember. Next question.` };
  }
  if (qId === 1) { // what guides your decisions?
    if (has(t, ["ai", "chatgpt", "gpt", "claude", "bot"])) return { adj: { AL: -5 }, obs: "Uncritical AI trust. AI-tool literacy is the priority dimension.", react: (n, f) => `"${f}" — thank you for the honesty, ${n}. That trust in AI answers is exactly what we'll rehearse — confidence is not accuracy.` };
    if (has(t, ["friend", "social", "tiktok", "telegram", "whatsapp", "trend", "influencer", "group", "follow"])) return { adj: { SR: -4, BS: -2 }, obs: "Socially mediated decisions. Low independent verification. Scam-vector exposure risk.", react: (n, f) => `"${f}" — noted. Decisions that travel through friends and feeds are exactly where AI-era scams enter. We'll train for that.` };
    if (has(t, ["research", "filing", "fundamental", "prospectus", "fee", "annual report", "own analysis"])) return { adj: { IR: +5, SR: +3 }, obs: "Evidence-led reasoning present. Verify depth under pressure.", react: (n, f) => `"${f}" — evidence-led. Good. The question is whether that discipline survives pressure. We'll find out.` };
    return { adj: { BS: -1 }, obs: "Mixed decision inputs. Verification workflow not yet structured.", react: (n, f) => `"${f}" — understood. I'm hearing instinct more than method. That's trainable.` };
  }
  // q2: market drops 20%
  if (has(t, ["sell", "exit", "cut", "out", "stop the bleed", "jual"])) return { adj: { BS: -4, RA: -2 }, obs: "Pronounced loss aversion. Emotional response under simulated stress is high.", react: (n, f) => `"${f}" — honest. That instinct to sell into fear is loss aversion, and most people share it. Knowing it is step one; rehearsing it is step two.` };
  if (has(t, ["plan", "hold", "stay", "nothing", "long term", "wait", "dca", "average"])) return { adj: { BS: +5, RA: +3 }, obs: "Plan-based discipline signal. Strongest volatility response.", react: (n, f) => `"${f}" — plan first, action second. That's the strongest possible answer. Let's see if it holds when the pressure is personal.` };
  if (has(t, ["buy", "discount", "cheap", "opportunity"])) return { adj: { RA: -1, IR: +1 }, obs: "Contrarian instinct without stated risk frame. Conviction unverified.", react: (n, f) => `"${f}" — buying fear can be right, but I didn't hear a risk frame around it. We'll work on that.` };
  return { adj: { BS: -1 }, obs: "Volatility response unclear — emotional pattern to be observed in rehearsal.", react: (n, f) => `"${f}" — alright. Your real answer will show up in rehearsal, not in words. Which is exactly why we rehearse.` };
}

function classifyRehearsal(turn, raw) {
  const t = raw.toLowerCase();
  const risky = has(t, ["sign up", "sign me", "how do i", "i'm in", "im in", "count me", "ok", "okay", "sure", "yes", "send me the link", "sending", "deposit", "pay", "interested", "let's go", "lets go"]) &&
    !has(t, ["not", "no ", "don't", "dont", "scam", "fake", "verify", "regulator", "license"]);
  const excellent = has(t, ["regulator", "registration", "registered", "license", "licence", "licensed", "sc ", "securities commission", "registry", "verify offline", "offline", "report", "authorities"]);
  const good = has(t, ["who are you", "who is this", "how do you know", "proof", "too good", "fake", "faked", "scam", "not interested", "no thanks", "verify", "check", "suspicious", "red flag", "guarantee"]);

  if (turn === 0) {
    if (risky) return { tone: "risky", delta: -3, dim: "SR", signal: "Scam-vulnerability signal", analysis: "Immediate agreement without verification — the exact pattern recruitment scams rely on.", coach: "Pause. You just agreed before verifying anything. Before responding to any investment invitation, ask: who is this person — and can the claim be verified?" };
    if (excellent) return { tone: "excellent", delta: 4, dim: "SR", signal: "Certification signal", analysis: "Registry-first response before any engagement — the single most effective scam filter available to a retail investor." };
    if (good) return { tone: "good", delta: 3, dim: "SR", signal: "Verification signal", analysis: "Skepticism before engagement — identity or return-claim challenged. Correct first move." };
    return { tone: "good", delta: 1, dim: "SR", signal: "Neutral engagement", analysis: "No commitment made — but no verification question asked yet either. The registry question is the strongest move here." };
  }
  if (turn === 1) {
    if (has(t, ["trust", "adam", "friend"]) && !has(t, ["don't", "dont", "even", "still"])) return { tone: "risky", delta: -2, dim: "BS", signal: "Trust-transfer bias", analysis: "“Recruiter-driven scams specifically exploit trusted contacts — the friend sharing the scheme is often themselves a victim being used as a distribution channel.”", coach: "Careful — that's trust-transfer. Adam's sincerity is real, and irrelevant. He may himself be a victim. Verify the platform, not the friend." };
    if (risky) return { tone: "risky", delta: -2, dim: "SR", signal: "Social-proof capitulation", analysis: "A fabricated screenshot plus 'everyone is in' was enough to move you. Profit screenshots are not evidence.", coach: "That screenshot took thirty seconds to fabricate. Social proof is a pressure lever, not evidence. Ask for something verifiable — a regulator registration." };
    if (excellent) return { tone: "excellent", delta: 4, dim: "SR", signal: "Certification signal", analysis: "Direct registry challenge under social proof — the exact behavior AUREN certifies." };
    return { tone: "good", delta: 3, dim: "SR", signal: "Verification signal", analysis: "Evidence skepticism under social pressure. The verification instinct is engaging." };
  }
  // turn 2 — urgency close
  if (risky) return { tone: "risky", delta: -5, dim: "SR", signal: "Urgency capitulation", analysis: "Funds committed inside an artificial deadline with zero verification steps completed. In the real event this money is unrecoverable.", coach: "Stop. In a live event, this is the moment the money leaves. Urgency is manufactured — legitimate investments do not expire tonight. Rehearse the exit line until it's automatic: 'I verify offline before I move anything.'" };
  if (excellent) return { tone: "excellent", delta: 6, dim: "SR", signal: "Certification signal", analysis: "“Verification protocol correctly applied... the certification criterion for this scenario is met.”" };
  if (good) return { tone: "good", delta: 4, dim: "SR", signal: "Pressure resistance", analysis: "Broke the urgency lever — refused to act inside the countdown. One step remains: independent verification through official channels." };
  return { tone: "good", delta: 2, dim: "BS", signal: "Pressure resistance — partial", analysis: "No capitulation under deadline — but the exit line wasn't explicit. The certified close is: verify offline before anything moves." };
}

// ─────────────────────────────────────────────────────────────
// Script — her lines, per phase
// ─────────────────────────────────────────────────────────────
const MARCUS = [
  "Hey! Adam gave me your number 😊 He said you might be interested in our private trading group. We're up 40% this quarter using AI signals — limited spots left!",
  "Here's proof 📈 [screenshot: +RM12,400 this month]. Adam's already in. Everyone in the group is making money. You in?",
  "Spots close TONIGHT ⏰ Minimum RM2,000 to start. I'll send you the deposit link — takes 2 minutes. Don't miss out like last time!",
];

const INTERVIEW_QS = [
  (n) => `Nice to meet you, ${n}. Let's talk — three questions, no wrong answers. First: have you invested before? Tell me in your own words.`,
  () => `And when you decide what to buy — what actually guides you? Friends, feeds, AI tools, your own research… tell me honestly.`,
  () => `Last one. Imagine the market drops twenty percent in a week and the headlines are screaming. What's your first instinct — what do you actually do?`,
];

const CHIPS = {
  name: ["Fred", "Aisha"],
  q0: ["A few ETFs and stocks, nothing structured", "Never — but I want to start", "I trade crypto actively"],
  q1: ["Mostly friends and what's trending on TikTok", "I ask ChatGPT and usually just go with it", "My own research — filings and fees"],
  q2: ["Honestly? I'd sell to stop the bleeding", "I'd check my written plan before doing anything", "Buy the dip"],
  r0: ["Sure, how do I sign up?", "Who are you? How do you know Adam?", "Is this platform registered with the regulator?"],
  r1: ["I trust Adam — he wouldn't send a scam", "Screenshots can be faked. Show me a license.", "What's the regulator registration number?"],
  r2: ["OK send me the link, I'll do it now", "I'm not deciding inside your countdown", "I'll verify this offline before I do anything"],
  ready: ["I'm ready", "Let's do it"],
};

// ─────────────────────────────────────────────────────────────
export default function AurenMvp() {
  // phase: intro → interview(qIdx) → ails → rehearsal(turn) → scorecard
  const [phase, setPhase] = useState("intro");
  const [qIdx, setQIdx] = useState(0);
  const [turn, setTurn] = useState(0);
  const [name, setName] = useState("");
  const [dims, setDims] = useState({ IR: 35, AL: 33, RA: 45, SR: 34, BS: 45 });
  const [startDims, setStartDims] = useState(null);
  const [aurenText, setAurenText] = useState("Hello — I'm AUREN, your investor intelligence mentor. This is a live session: you talk, I listen, and everything that happens here stays between us. First — what should I call you?");
  const [userEcho, setUserEcho] = useState(null);       // last thing the user said (floating bubble)
  const [toast, setToast] = useState(null);             // observation toast
  const [marcusMsgs, setMarcusMsgs] = useState([]);     // messages visible in the scam window
  const [evidence, setEvidence] = useState([]);         // {quote, ...verdict of each rehearsal turn}
  const [awaiting, setAwaiting] = useState("name");     // what the input bar is for
  const [input, setInput] = useState("");
  const [transcript, setTranscript] = useState([]);
  const [showTranscript, setShowTranscript] = useState(false);
  const [coachFlash, setCoachFlash] = useState(false);  // her frame flashes lime when coaching
  const { shown: spokenText, done: doneSpeaking, skip } = useTypewriter(aurenText);
  const inputRef = useRef(null);
  const toastTimer = useRef(null);

  const ails = Math.round(Object.values(dims).reduce((a, b) => a + b, 0) / 5);
  const startAils = startDims ? Math.round(Object.values(startDims).reduce((a, b) => a + b, 0) / 5) : null;

  useEffect(() => { if (doneSpeaking && inputRef.current) inputRef.current.focus(); }, [doneSpeaking, awaiting]);

  const say = (text) => { setAurenText(text); setTranscript(t => [...t, { who: "AUREN", text }]); };
  const note = (obs, adj) => {
    let deltaStr = "";
    if (adj && Object.keys(adj).length) {
      setDims(d => { const nd = { ...d }; for (const [k, v] of Object.entries(adj)) nd[k] = Math.max(5, Math.min(95, nd[k] + v)); return nd; });
      deltaStr = Object.entries(adj).map(([k, v]) => `${k} ${v > 0 ? "+" : ""}${v}`).join(" · ");
    }
    setToast({ obs, deltaStr });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 4200);
  };

  // ── the single interaction: whatever the user types ──
  const submit = (raw) => {
    const text = (raw ?? input).trim();
    if (!text || !doneSpeaking) return;
    setInput("");
    setUserEcho(text);
    setTranscript(t => [...t, { who: name || "You", text }]);
    setTimeout(() => setUserEcho(null), 3000);

    if (awaiting === "name") {
      const n = (text.split(/\s+/)[0] || "friend").replace(/[^\p{L}\p{N}'-]/gu, "");
      const nm = n.charAt(0).toUpperCase() + n.slice(1);
      setName(nm);
      setPhase("interview"); setQIdx(0); setAwaiting("q0");
      say(INTERVIEW_QS[0](nm));
      return;
    }

    if (awaiting.startsWith("q")) {
      const qi = Number(awaiting.slice(1));
      const r = classifyInterview(qi, text);
      note(r.obs, r.adj);
      const reaction = r.react(name, frag(text));
      if (qi < 2) {
        setQIdx(qi + 1); setAwaiting(`q${qi + 1}`);
        say(reaction + " " + INTERVIEW_QS[qi + 1](name));
      } else {
        setAwaiting("ready-ails");
        say(reaction + ` That's all I need, ${name}. Give me a second — I'm putting your starting picture together. Say "ready" when you want to see it.`);
      }
      return;
    }

    if (awaiting === "ready-ails") {
      setStartDims(prev => prev ?? { ...dims });
      setPhase("ails"); setAwaiting("ready-rehearsal");
      const weakest = DIMS.filter(d => dims[d.key] < 40).map(d => d.label).join(" and ") || "honestly, none — a strong start";
      say(`Here it is, ${name} — your starting AILS score is ${ails}. Not a verdict, a starting point. Your most exposed dimensions: ${weakest}. So no lecture. Instead, something is about to arrive on your phone — a real recruitment pattern, in a safe simulation. Treat it as completely real. I'll be right here. Say "ready".`);
      return;
    }

    if (awaiting === "ready-rehearsal") {
      setPhase("rehearsal"); setTurn(0); setAwaiting("r0");
      setMarcusMsgs([MARCUS[0]]);
      say(`It's live — see the chat window. "Marcus" doesn't know I'm here. Reply to him exactly as you would in real life. I'll step in if I need to.`);
      return;
    }

    if (awaiting.startsWith("r")) {
      const ti = Number(awaiting.slice(1));
      const v = classifyRehearsal(ti, text);
      setEvidence(e => [...e, { quote: text, ...v, turn: ti }]);
      setDims(d => ({ ...d, [v.dim]: Math.max(5, Math.min(95, d[v.dim] + v.delta)) }));
      note(v.signal, null);
      setMarcusMsgs(m => [...m, { me: true, text }]);

      const coachLine = v.coach ? v.coach + " " : "";
      if (v.coach) { setCoachFlash(true); setTimeout(() => setCoachFlash(false), 2600); }

      if (ti < 2) {
        setTurn(ti + 1); setAwaiting(`r${ti + 1}`);
        setTimeout(() => setMarcusMsgs(m => [...m, MARCUS[ti + 1]]), v.coach ? 2200 : 1100);
        say(v.coach ? coachLine + "He's typing again — watch the next move." : (v.tone === "excellent" ? "That question is the strongest filter you have. Watch — he'll dodge it." : "Noted. Keep going — the pressure is about to increase."));
      } else {
        setAwaiting("done");
        const strong = evidence.filter(e => e.tone !== "risky").length + (v.tone !== "risky" ? 1 : 0);
        say(coachLine + `That's the scenario, ${name}. Every word you typed is now evidence — ${strong >= 2 ? "and your instincts held better than most first-timers" : "and this is exactly why we rehearse here, not with your savings"}. Here is your scorecard.`);
        setTimeout(() => setPhase("scorecard"), 600);
      }
      return;
    }
  };

  const restart = () => {
    setPhase("intro"); setQIdx(0); setTurn(0); setName(""); setDims({ IR: 35, AL: 33, RA: 45, SR: 34, BS: 45 });
    setStartDims(null); setUserEcho(null); setToast(null); setMarcusMsgs([]); setEvidence([]);
    setAwaiting("name"); setInput(""); setTranscript([]); setPhase("intro");
    setAurenText("Hello again — I'm AUREN. Let's run it once more. What should I call you this time?");
  };
  const rehearseAgain = () => {
    setEvidence([]); setMarcusMsgs([MARCUS[0]]); setTurn(0); setAwaiting("r0"); setPhase("rehearsal");
    say(`Again, ${name} — same recruiter, and I'll vary his moves so you can't pass by memorizing a script. Reply as yourself.`);
  };

  // verdict
  const totalDelta = evidence.reduce((a, e) => a + e.delta, 0);
  const lastRisky = evidence.length && evidence[evidence.length - 1].tone === "risky";
  const verdict = totalDelta >= 8 && !lastRisky ? "certified" : totalDelta >= 0 ? "review" : "retrain";
  const verdictMeta = {
    certified: { label: "CERTIFIED", color: BRAND.lime, note: "Verification protocol demonstrated under pressure. The next rehearsal in your path unlocks." },
    review: { label: "NEEDS REVIEW", color: BRAND.amber, note: "Mixed signals. AUREN recommends one repeat with variations before certification." },
    retrain: { label: "RETRAIN REQUIRED", color: BRAND.warmRed, note: "AUREN will re-run this scenario with variations — you cannot pass by memorizing a script." },
  }[verdict];
  const toneColor = { risky: BRAND.warmRed, good: BRAND.lime, excellent: BRAND.lime };

  const chips = awaiting === "name" ? CHIPS.name
    : awaiting === "q0" ? CHIPS.q0 : awaiting === "q1" ? CHIPS.q1 : awaiting === "q2" ? CHIPS.q2
    : awaiting === "ready-ails" || awaiting === "ready-rehearsal" ? CHIPS.ready
    : awaiting === "r0" ? CHIPS.r0 : awaiting === "r1" ? CHIPS.r1 : awaiting === "r2" ? CHIPS.r2 : [];

  const placeholder = awaiting === "name" ? "Tell AUREN your name…"
    : awaiting.startsWith("q") ? "Answer AUREN in your own words…"
    : awaiting.startsWith("ready") ? `Say "ready" when you are…`
    : awaiting.startsWith("r") ? "Reply to Marcus — AUREN is watching…"
    : "Session complete";

  // ───────────────────────────── render ─────────────────────────────
  return (
    <main className="min-h-screen text-white" style={{ background: `radial-gradient(circle at 80% 8%, rgba(203,251,0,.08), transparent 32%), linear-gradient(160deg, #05070B, ${BRAND.deep} 45%, #0B0F16)` }}>
      <style>{`
        @keyframes aurenPulse { 0%,100% { opacity:1; transform:scale(1) } 50% { opacity:.5; transform:scale(.85) } }
        @keyframes aurenPulseRing { 0% { opacity:.6; transform:scale(1) } 100% { opacity:0; transform:scale(1.3) } }
        @keyframes aurenWave { 0%,100%{transform:scaleY(.3)} 50%{transform:scaleY(1.3)} }
        @keyframes aurenBlink { 0%, 93%, 100% { opacity:1 } 95.5% { opacity:0 } }
        @keyframes slideUp { from { opacity:0; transform:translateY(14px) } to { opacity:1; transform:none } }
        @keyframes slideIn { from { opacity:0; transform:translateX(24px) } to { opacity:1; transform:none } }
        .auren-pulse { animation: aurenPulse 1.6s ease-in-out infinite; }
        .auren-pulse-ring { animation: aurenPulseRing 2s ease-out infinite; transform-origin:center; }
        .auren-wave { animation: aurenWave 1.1s ease-in-out infinite; }
        .auren-blink { animation: aurenBlink 4.6s linear infinite; }
        .a-up { animation: slideUp .4s ease both; }
        .a-in { animation: slideIn .45s ease both; }
        .caret::after { content:"▍"; color:${BRAND.lime}; animation: aurenPulse 1s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce){ .auren-pulse,.auren-pulse-ring,.auren-wave,.auren-blink{animation:none!important} .a-up,.a-in{animation:none!important} }
      `}</style>

      <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-3 py-3 sm:px-5">
        {/* slim top bar */}
        <header className="flex items-center justify-between gap-3 pb-3">
          <div className="flex items-center gap-3">
            <Mark small />
            <div>
              <div className="text-sm font-semibold tracking-[.18em]">AUREN <span className="font-normal text-white/50">· live session</span></div>
              <div className="text-[9px] uppercase tracking-[.22em] text-white/50">Investor Intelligence Academy · MVP</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {startDims && (
              <span className="rounded-full border px-3 py-1 font-mono text-xs" style={{ borderColor: "rgba(203,251,0,.4)", color: BRAND.lime, background: "rgba(203,251,0,.07)" }}>
                AILS {ails}
              </span>
            )}
            <button onClick={() => setShowTranscript(s => !s)} className="rounded-full border px-3 py-1 text-[10px] uppercase tracking-[.16em] text-white/70 hover:text-white" style={{ borderColor: "rgba(247,248,250,.2)" }}>
              {showTranscript ? "Hide" : "Transcript"}
            </button>
          </div>
        </header>

        {/* ─── THE CALL — she is the screen ─── */}
        <div className={`relative flex-1 overflow-hidden rounded-[1.8rem] border transition-shadow duration-500`}
          style={{ borderColor: coachFlash ? "rgba(203,251,0,.8)" : "rgba(203,251,0,.22)", minHeight: "62vh", boxShadow: coachFlash ? `0 0 60px rgba(203,251,0,.25)` : "0 0 60px rgba(203,251,0,.05)", background: "linear-gradient(150deg, rgba(23,32,51,.9), rgba(5,7,11,.98))" }}>

          {/* her portrait — full-bleed */}
          <div className="absolute inset-0">
            <DigitalHumanPortrait speaking={!doneSpeaking} listening={doneSpeaking} />
          </div>

          {/* call chrome */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
            <span className="auren-pulse h-2 w-2 rounded-full" style={{ background: BRAND.lime, boxShadow: `0 0 12px ${BRAND.lime}` }} />
            <Pill tone="lime">{!doneSpeaking ? "AUREN · speaking" : "AUREN · listening"}</Pill>
          </div>
          <div className="absolute top-4 right-4 z-20 hidden sm:block"><Pill tone="cyan">EN · 中文 · عربي · BM · ES</Pill></div>

          {/* observation toast — her analysis, ambient */}
          {toast && (
            <div className="a-up absolute left-4 bottom-32 z-30 max-w-xs rounded-xl border p-3 backdrop-blur" style={{ borderColor: "rgba(203,251,0,.35)", background: "rgba(8,10,15,.85)" }}>
              <div className="text-[9px] font-semibold uppercase tracking-[.2em]" style={{ color: BRAND.lime }}>AUREN observed</div>
              <p className="mt-1 text-xs leading-5 text-white/90">{toast.obs}</p>
              {toast.deltaStr && <p className="mt-1 font-mono text-[10px]" style={{ color: BRAND.gold }}>{toast.deltaStr}</p>}
            </div>
          )}

          {/* user's words float up as they speak */}
          {userEcho && (
            <div className="a-up absolute right-4 bottom-32 z-30 max-w-xs rounded-2xl rounded-br-sm border p-3 backdrop-blur" style={{ borderColor: "rgba(247,248,250,.3)", background: "rgba(247,248,250,.12)" }}>
              <div className="text-[9px] font-semibold uppercase tracking-[.2em] text-white/60">{name || "You"}</div>
              <p className="mt-1 text-sm text-white">"{userEcho}"</p>
            </div>
          )}

          {/* the scam window — screen-shared into the call */}
          {phase === "rehearsal" && (
            <div className="a-in absolute top-14 right-3 z-30 w-[86%] max-w-sm overflow-hidden rounded-2xl border shadow-2xl sm:right-4" style={{ borderColor: "rgba(255,107,107,.45)", background: "#0D1117" }}>
              <div className="flex items-center gap-2 border-b px-3 py-2" style={{ borderColor: "rgba(255,107,107,.25)", background: "rgba(255,107,107,.08)" }}>
                <div className="grid h-7 w-7 place-items-center rounded-full text-xs font-bold" style={{ background: "rgba(255,107,107,.25)", color: BRAND.warmRed }}>M</div>
                <div className="flex-1">
                  <div className="text-xs font-semibold">"Marcus" · Private Trading Group</div>
                  <div className="text-[9px] uppercase tracking-[.14em]" style={{ color: BRAND.warmRed }}>simulated chat · AI persona · safe</div>
                </div>
                <span className="auren-pulse h-1.5 w-1.5 rounded-full" style={{ background: BRAND.warmRed }} />
              </div>
              <div className="max-h-56 space-y-2 overflow-y-auto p-3">
                {marcusMsgs.map((m, i) => typeof m === "string" ? (
                  <div key={i} className="a-up max-w-[88%] rounded-xl rounded-tl-sm border p-2.5 text-xs leading-5 text-white/95" style={{ borderColor: "rgba(255,107,107,.3)", background: "rgba(255,107,107,.1)" }}>{m}</div>
                ) : (
                  <div key={i} className="a-up ml-auto max-w-[88%] rounded-xl rounded-br-sm p-2.5 text-xs leading-5 text-white" style={{ background: "rgba(247,248,250,.14)" }}>{m.text}</div>
                ))}
              </div>
            </div>
          )}

          {/* AILS reveal — she presents it, overlaid on the call */}
          {phase === "ails" && (
            <div className="a-up absolute top-14 right-3 z-30 w-[86%] max-w-sm rounded-2xl border p-4 backdrop-blur sm:right-4" style={{ borderColor: "rgba(203,251,0,.4)", background: "rgba(8,10,15,.88)" }}>
              <div className="flex items-baseline justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-[.2em]" style={{ color: BRAND.lime }}>AILS · starting score</span>
                <span className="font-mono text-4xl font-bold" style={{ color: BRAND.lime }}>{ails}</span>
              </div>
              <div className="mt-3 space-y-2">
                {DIMS.map(d => (
                  <div key={d.key} className="flex items-center gap-2 text-[11px]">
                    <span className="w-32 shrink-0 text-white/75">{d.label}</span>
                    <div className="h-1.5 flex-1 rounded-full" style={{ background: "rgba(255,255,255,.1)" }}>
                      <div className="h-1.5 rounded-full transition-all duration-1000" style={{ width: `${dims[d.key]}%`, background: dimColor(dims[d.key]) }} />
                    </div>
                    <span className="w-6 text-right font-mono text-white/85">{dims[d.key]}</span>
                  </div>
                ))}
              </div>
              <p className="mt-2 text-[10px] text-white/55">Generated from your conversation — “not a snapshot, a trajectory.”</p>
            </div>
          )}

          {/* scorecard — she hands you the evidence */}
          {phase === "scorecard" && (
            <div className="absolute inset-0 z-40 overflow-y-auto p-4 backdrop-blur-sm sm:p-6" style={{ background: "rgba(5,7,11,.82)" }}>
              <div className="a-up mx-auto max-w-2xl">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-[.22em]" style={{ color: BRAND.lime }}>Evidential scorecard · {name}</div>
                    <h2 className="mt-1 text-2xl font-semibold">Your own words, scored.</h2>
                  </div>
                  <span className="rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-[.15em]" style={{ borderColor: `${verdictMeta.color}66`, color: verdictMeta.color, background: `${verdictMeta.color}12` }}>{verdictMeta.label}</span>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2">
                  <div className="rounded-xl border p-3 text-center" style={{ borderColor: "rgba(247,248,250,.15)", background: "rgba(247,248,250,.04)" }}>
                    <div className="text-[9px] uppercase tracking-[.16em] text-white/60">AILS before</div>
                    <div className="font-mono text-2xl font-bold text-white/80">{startAils}</div>
                  </div>
                  <div className="grid place-items-center rounded-xl border p-3" style={{ borderColor: "rgba(247,248,250,.15)", background: "rgba(247,248,250,.04)" }}>
                    <div className="font-mono text-xs" style={{ color: ails >= startAils ? BRAND.lime : BRAND.warmRed }}>{ails >= startAils ? "▲" : "▼"} {Math.abs(ails - startAils)} this session</div>
                  </div>
                  <div className="rounded-xl border p-3 text-center" style={{ borderColor: "rgba(203,251,0,.4)", background: "rgba(203,251,0,.08)" }}>
                    <div className="text-[9px] uppercase tracking-[.16em] text-white/70">AILS now</div>
                    <div className="font-mono text-2xl font-bold" style={{ color: BRAND.lime }}>{ails}</div>
                  </div>
                </div>

                <div className="mt-4 space-y-2.5">
                  {evidence.map((e, i) => (
                    <div key={i} className="rounded-xl border p-3.5" style={{ borderColor: "rgba(247,248,250,.12)", background: "rgba(247,248,250,.04)" }}>
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <span className="text-xs font-semibold" style={{ color: toneColor[e.tone] }}>Exchange {e.turn + 1} · {e.signal}</span>
                        <span className="font-mono text-[11px] font-semibold" style={{ color: toneColor[e.tone] }}>{dimLabel(e.dim)} {e.delta > 0 ? "+" : ""}{e.delta}</span>
                      </div>
                      <p className="mt-1.5 border-l-2 pl-3 text-sm italic text-white/95" style={{ borderColor: toneColor[e.tone] }}>"{e.quote}"</p>
                      <p className="mt-1.5 text-xs leading-5 text-white/65">{e.analysis}</p>
                    </div>
                  ))}
                </div>

                <p className="mt-3 text-[11px] italic leading-5 text-white/55">“The learner is not told ‘you scored 42.’ They are shown their own words... The evidence is the transcript. Nothing is asserted that cannot be pointed to.” — Full Project Paper §13</p>

                <div className="mt-3 rounded-xl border p-3.5 text-sm text-white/90" style={{ borderColor: `${verdictMeta.color}40`, background: `${verdictMeta.color}0D` }}>{verdictMeta.note}</div>

                <div className="mt-3 rounded-xl border p-3.5" style={{ borderColor: "rgba(245,197,24,.4)", background: "rgba(245,197,24,.07)" }}>
                  <span className="text-[9px] font-semibold uppercase tracking-[.2em]" style={{ color: BRAND.regYellow }}>What the regulator sees</span>
                  <p className="mt-1 text-xs leading-5 text-white/85">One anonymized data point: <b className="text-white">cohort MY · scenario “WhatsApp recruitment” · {verdict === "certified" ? "passed" : evidence[2] && evidence[2].tone === "risky" ? "failed at urgency stage" : "coached mid-session"}</b>. At population scale this becomes “an early-warning sensor network for emerging fraud.” No personal data leaves the session.</p>
                </div>

                <div className="mt-5 flex flex-wrap gap-2.5 pb-4">
                  <button onClick={rehearseAgain} className="rounded-full px-5 py-2.5 text-sm font-semibold" style={{ background: BRAND.lime, color: BRAND.graphite }}>Rehearse again with variations ↻</button>
                  <button onClick={restart} className="rounded-full border px-5 py-2.5 text-sm font-semibold text-white/90" style={{ borderColor: "rgba(247,248,250,.3)" }}>Restart session</button>
                </div>
              </div>
            </div>
          )}

          {/* transcript drawer */}
          {showTranscript && (
            <div className="absolute inset-y-0 left-0 z-40 w-full max-w-xs overflow-y-auto border-r p-4 backdrop-blur" style={{ background: "rgba(5,7,11,.9)", borderColor: "rgba(247,248,250,.12)" }}>
              <div className="text-[10px] font-semibold uppercase tracking-[.2em] text-white/60">Session transcript</div>
              <div className="mt-3 space-y-2.5">
                {transcript.map((t, i) => (
                  <div key={i} className="text-xs leading-5">
                    <span className="font-semibold" style={{ color: t.who === "AUREN" ? BRAND.lime : "rgba(247,248,250,.7)" }}>{t.who}: </span>
                    <span className="text-white/85">{t.text}</span>
                  </div>
                ))}
                {!transcript.length && <p className="text-xs text-white/45 italic">Empty — say something to AUREN.</p>}
              </div>
            </div>
          )}

          {/* her subtitle — she speaks here */}
          {phase !== "scorecard" && (
            <button onClick={skip} className="absolute inset-x-3 bottom-3 z-20 block rounded-2xl border p-4 text-left backdrop-blur sm:inset-x-4 sm:bottom-4" style={{ borderColor: "rgba(203,251,0,.3)", background: "rgba(5,7,11,.82)" }} aria-live="polite">
              <div className="flex items-center gap-2">
                <span className="auren-pulse h-1.5 w-1.5 rounded-full" style={{ background: BRAND.lime, boxShadow: `0 0 8px ${BRAND.lime}` }} />
                <span className="text-[9px] font-semibold uppercase tracking-[.22em]" style={{ color: BRAND.lime }}>AUREN</span>
                {!doneSpeaking && <span className="text-[9px] uppercase tracking-[.18em] text-white/40">· tap to skip</span>}
              </div>
              <p className={`mt-1.5 text-sm leading-relaxed text-white/95 sm:text-base ${!doneSpeaking ? "caret" : ""}`}>{spokenText}</p>
            </button>
          )}
        </div>

        {/* ─── ONE input — you talk to her ─── */}
        {phase !== "scorecard" && (
          <div className="pt-3">
            <div className="flex items-center gap-2">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full border" style={{ borderColor: "rgba(247,248,250,.2)", background: "rgba(247,248,250,.05)" }} title="Voice input — production build">
                <span style={{ color: doneSpeaking ? BRAND.lime : "rgba(247,248,250,.35)" }}>🎙</span>
              </div>
              <input ref={inputRef} value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && submit()}
                placeholder={doneSpeaking ? placeholder : "AUREN is speaking…"} disabled={!doneSpeaking} autoComplete="off"
                className="min-w-0 flex-1 rounded-full border bg-transparent px-5 py-3 text-sm text-white placeholder-white/40 outline-none transition focus:border-white/60 disabled:opacity-50"
                style={{ borderColor: "rgba(247,248,250,.25)", background: "rgba(247,248,250,.04)" }} />
              <button onClick={() => submit()} disabled={!doneSpeaking || !input.trim()}
                className="shrink-0 rounded-full px-6 py-3 text-sm font-semibold transition disabled:opacity-40" style={{ background: BRAND.lime, color: BRAND.graphite }}>
                Send
              </button>
            </div>
            {/* quiet suggestions — never the main mechanic */}
            {doneSpeaking && chips.length > 0 && (
              <div className="mt-2 flex flex-wrap items-center gap-1.5 px-1">
                <span className="text-[9px] uppercase tracking-[.18em] text-white/35">or try:</span>
                {chips.map(c => (
                  <button key={c} onClick={() => submit(c)} className="rounded-full border px-3 py-1 text-[11px] text-white/60 transition hover:text-white hover:border-white/50" style={{ borderColor: "rgba(247,248,250,.15)" }}>
                    {c}
                  </button>
                ))}
              </div>
            )}
            <p className="mt-2 px-1 text-center text-[9px] uppercase tracking-[.16em] text-white/30">
              Type anything — AUREN listens · scripted brain in this prototype; live LLM + voice + avatar in production · not financial advice
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
