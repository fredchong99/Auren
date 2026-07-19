// @ts-nocheck
import { useEffect, useRef, useState } from "react";
import { BRAND, DigitalHumanPortrait, Pill, Mark } from "./App";

/**
 * AUREN — MVP Demo v3 · "Floating Avatar"
 *
 * Layout per Fred's direction:
 *   — the Digital Human is her OWN LAYER, floating at the top of the
 *     screen at all times; nothing ever covers her
 *   — the conversation (her lines, your replies, the scam chat, the
 *     AILS card, the scorecard) is a scrollable feed BELOW her
 *   — one fixed input bar at the bottom; you talk to her (or to the
 *     scam persona) through it
 *
 * She speaks live in her floating window (typewriter); finished lines
 * drop into the feed as history. Her brain here is a scripted intent
 * classifier — in production: live LLM + voice + real avatar.
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

// ── typewriter — makes her "speak" ──
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

// ── her scripted brain — intent classification of free text ──
const has = (t, words) => words.some(w => t.includes(w));
const frag = (t, n = 52) => (t.length > n ? t.slice(0, n).trim() + "…" : t);

function classifyInterview(qId, raw) {
  const t = raw.toLowerCase();
  if (qId === 0) {
    if (has(t, ["no", "never", "not yet", "thinking", "belum"])) return { adj: { RA: +2 }, obs: "Pre-investor. High teachability window — habits not yet formed.", react: (n, f) => `"${f}" — that's actually a good place to start, ${n}. No bad habits to unlearn.` };
    if (has(t, ["trade", "trading", "often", "active", "daily", "crypto"])) return { adj: { IR: +4, BS: -3 }, obs: "Active trader. Overconfidence risk flagged for rehearsal path.", react: (n, f) => `"${f}" — experienced, then. I'll be watching for overconfidence as much as gaps.` };
    return { adj: { IR: +2 }, obs: "Self-taught experience. Tactical exposure, no strategic framework detected yet.", react: (n, f) => `"${f}" — good, some real exposure to anchor on. Not a test, remember. Next question.` };
  }
  if (qId === 1) {
    if (has(t, ["ai", "chatgpt", "gpt", "claude", "bot"])) return { adj: { AL: -5 }, obs: "Uncritical AI trust. AI-tool literacy is the priority dimension.", react: (n, f) => `"${f}" — thank you for the honesty, ${n}. That trust in AI answers is exactly what we'll rehearse — confidence is not accuracy.` };
    if (has(t, ["friend", "social", "tiktok", "telegram", "whatsapp", "trend", "influencer", "group", "follow"])) return { adj: { SR: -4, BS: -2 }, obs: "Socially mediated decisions. Low independent verification. Scam-vector exposure risk.", react: (n, f) => `"${f}" — noted. Decisions that travel through friends and feeds are exactly where AI-era scams enter. We'll train for that.` };
    if (has(t, ["research", "filing", "fundamental", "prospectus", "fee", "annual report", "own analysis"])) return { adj: { IR: +5, SR: +3 }, obs: "Evidence-led reasoning present. Verify depth under pressure.", react: (n, f) => `"${f}" — evidence-led. Good. The question is whether that discipline survives pressure. We'll find out.` };
    return { adj: { BS: -1 }, obs: "Mixed decision inputs. Verification workflow not yet structured.", react: (n, f) => `"${f}" — understood. I'm hearing instinct more than method. That's trainable.` };
  }
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
  if (risky) return { tone: "risky", delta: -5, dim: "SR", signal: "Urgency capitulation", analysis: "Funds committed inside an artificial deadline with zero verification steps completed. In the real event this money is unrecoverable.", coach: "Stop. In a live event, this is the moment the money leaves. Urgency is manufactured — legitimate investments do not expire tonight. Rehearse the exit line until it's automatic: 'I verify offline before I move anything.'" };
  if (excellent) return { tone: "excellent", delta: 6, dim: "SR", signal: "Certification signal", analysis: "“Verification protocol correctly applied... the certification criterion for this scenario is met.”" };
  if (good) return { tone: "good", delta: 4, dim: "SR", signal: "Pressure resistance", analysis: "Broke the urgency lever — refused to act inside the countdown. One step remains: independent verification through official channels." };
  return { tone: "good", delta: 2, dim: "BS", signal: "Pressure resistance — partial", analysis: "No capitulation under deadline — but the exit line wasn't explicit. The certified close is: verify offline before anything moves." };
}

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
  const [phase, setPhase] = useState("intro"); // intro · interview · ails · rehearsal · scorecard
  const [name, setName] = useState("");
  const [dims, setDims] = useState({ IR: 35, AL: 33, RA: 45, SR: 34, BS: 45 });
  const [startDims, setStartDims] = useState(null);
  const [feed, setFeed] = useState([]);          // chronological conversation feed
  const [aurenText, setAurenText] = useState("Hello — I'm AUREN, your investor intelligence mentor. This is a live session: you talk, I listen. First — what should I call you?");
  const [evidence, setEvidence] = useState([]);
  const [awaiting, setAwaiting] = useState("name");
  const [input, setInput] = useState("");
  const [coachFlash, setCoachFlash] = useState(false);
  const { shown: spokenText, done: doneSpeaking, skip } = useTypewriter(aurenText);
  const inputRef = useRef(null);
  const speechRef = useRef(null);
  const currentLine = useRef(aurenText);

  const ails = Math.round(Object.values(dims).reduce((a, b) => a + b, 0) / 5);
  const startAils = startDims ? Math.round(Object.values(startDims).reduce((a, b) => a + b, 0) / 5) : null;

  useEffect(() => { if (doneSpeaking && inputRef.current) inputRef.current.focus(); }, [doneSpeaking, awaiting]);
  useEffect(() => { window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" }); }, [feed]);
  useEffect(() => { if (speechRef.current) speechRef.current.scrollTop = speechRef.current.scrollHeight; }, [spokenText]);

  const push = (item) => setFeed(f => [...f, item]);

  // she speaks: previous line drops into the feed as history, new line goes live in her window
  const say = (text, { coach = false } = {}) => {
    if (currentLine.current) push({ type: "auren", text: currentLine.current });
    currentLine.current = text;
    setAurenText(text);
    if (coach) { setCoachFlash(true); setTimeout(() => setCoachFlash(false), 2600); }
  };

  const note = (obs, adj) => {
    let deltaStr = "";
    if (adj && Object.keys(adj).length) {
      setDims(d => { const nd = { ...d }; for (const [k, v] of Object.entries(adj)) nd[k] = Math.max(5, Math.min(95, nd[k] + v)); return nd; });
      deltaStr = Object.entries(adj).map(([k, v]) => `${dimLabel(k)} ${v > 0 ? "+" : ""}${v}`).join(" · ");
    }
    push({ type: "obs", obs, deltaStr });
  };

  const submit = (raw) => {
    const text = (raw ?? input).trim();
    if (!text || !doneSpeaking) return;
    setInput("");

    if (awaiting === "name") {
      push({ type: "user", text });
      const n = (text.split(/\s+/)[0] || "friend").replace(/[^\p{L}\p{N}'-]/gu, "");
      const nm = n.charAt(0).toUpperCase() + n.slice(1);
      setName(nm);
      setPhase("interview"); setAwaiting("q0");
      say(INTERVIEW_QS[0](nm));
      return;
    }

    if (awaiting.startsWith("q")) {
      push({ type: "user", text });
      const qi = Number(awaiting.slice(1));
      const r = classifyInterview(qi, text);
      note(r.obs, r.adj);
      const reaction = r.react(name, frag(text));
      if (qi < 2) {
        setAwaiting(`q${qi + 1}`);
        say(reaction + " " + INTERVIEW_QS[qi + 1](name));
      } else {
        setAwaiting("ready-ails");
        say(reaction + ` That's all I need, ${name}. I'm putting your starting picture together — say "ready" when you want to see it.`);
      }
      return;
    }

    if (awaiting === "ready-ails") {
      push({ type: "user", text });
      const snap = { ...dims };
      setStartDims(prev => prev ?? snap);
      setPhase("ails"); setAwaiting("ready-rehearsal");
      const score = Math.round(Object.values(snap).reduce((a, b) => a + b, 0) / 5);
      push({ type: "ails", dims: snap, score });
      const weakest = DIMS.filter(d => snap[d.key] < 40).map(d => d.label).join(" and ") || "honestly, none — a strong start";
      say(`There it is, ${name} — your starting AILS is ${score}. Not a verdict, a starting point. Most exposed: ${weakest}. So no lecture — instead, something is about to arrive in a chat, a real recruitment pattern in a safe simulation. Treat it as completely real. Say "ready".`);
      return;
    }

    if (awaiting === "ready-rehearsal") {
      push({ type: "user", text });
      setPhase("rehearsal"); setAwaiting("r0");
      push({ type: "sys", text: "Simulated chat connected · “Marcus” · AI persona · safe rehearsal" });
      push({ type: "marcus", text: MARCUS[0] });
      say(`It's live — he's in the feed below. "Marcus" doesn't know I'm here. Reply to him exactly as you would in real life. I'll step in if I need to.`);
      return;
    }

    if (awaiting.startsWith("r")) {
      const ti = Number(awaiting.slice(1));
      push({ type: "user", text, toMarcus: true });
      const v = classifyRehearsal(ti, text);
      setEvidence(e => [...e, { quote: text, ...v, turn: ti }]);
      setDims(d => ({ ...d, [v.dim]: Math.max(5, Math.min(95, d[v.dim] + v.delta)) }));
      push({ type: "obs", obs: v.signal, deltaStr: `${dimLabel(v.dim)} ${v.delta > 0 ? "+" : ""}${v.delta}`, tone: v.tone });

      if (ti < 2) {
        setAwaiting(`r${ti + 1}`);
        setTimeout(() => push({ type: "marcus", text: MARCUS[ti + 1] }), v.coach ? 2400 : 1200);
        say(v.coach ? v.coach + " He's typing again — watch the next move."
          : (v.tone === "excellent" ? "That question is the strongest filter you have. Watch — he'll dodge it." : "Noted. Keep going — the pressure is about to increase."), { coach: !!v.coach });
      } else {
        setAwaiting("done");
        const strongCount = [...evidence, v].filter(e => e.tone !== "risky").length;
        const coachLine = v.coach ? v.coach + " " : "";
        say(coachLine + `That's the scenario, ${name}. Every word you typed is now evidence — ${strongCount >= 2 ? "and your instincts held better than most first-timers." : "and this is exactly why we rehearse here, not with your savings."} Here is your scorecard.`, { coach: !!v.coach });
        setTimeout(() => { setPhase("scorecard"); push({ type: "scorecard" }); }, 900);
      }
      return;
    }
  };

  const rehearseAgain = () => {
    setEvidence([]); setPhase("rehearsal"); setAwaiting("r0");
    push({ type: "sys", text: "Rehearsal restarted with variations · you cannot pass by memorizing a script" });
    push({ type: "marcus", text: MARCUS[0] });
    say(`Again, ${name} — same recruiter, varied moves. Reply as yourself.`);
  };
  const restart = () => {
    setPhase("intro"); setName(""); setDims({ IR: 35, AL: 33, RA: 45, SR: 34, BS: 45 });
    setStartDims(null); setFeed([]); setEvidence([]); setAwaiting("name"); setInput("");
    currentLine.current = "";
    say("Hello again — I'm AUREN. Let's run it once more. What should I call you this time?");
  };

  // verdict for scorecard card
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
    : "Session complete — restart below";

  // ───────────────────────────── render ─────────────────────────────
  // Three true layers:
  //   z-50 FIXED TOP    — the Digital Human, ~46% of the screen, never covered
  //   page flow         — the conversation feed, scrolls UNDER her layer
  //   z-50 FIXED BOTTOM — the input bar
  return (
    <main className="min-h-screen text-white" style={{ background: `linear-gradient(160deg, #05070B, ${BRAND.deep} 45%, #0B0F16)` }}>
      <style>{`
        @keyframes aurenPulse { 0%,100% { opacity:1; transform:scale(1) } 50% { opacity:.5; transform:scale(.85) } }
        @keyframes aurenPulseRing { 0% { opacity:.6; transform:scale(1) } 100% { opacity:0; transform:scale(1.3) } }
        @keyframes aurenWave { 0%,100%{transform:scaleY(.3)} 50%{transform:scaleY(1.3)} }
        @keyframes aurenBlink { 0%, 93%, 100% { opacity:1 } 95.5% { opacity:0 } }
        @keyframes slideUp { from { opacity:0; transform:translateY(12px) } to { opacity:1; transform:none } }
        .auren-pulse { animation: aurenPulse 1.6s ease-in-out infinite; }
        .auren-pulse-ring { animation: aurenPulseRing 2s ease-out infinite; transform-origin:center; }
        .auren-wave { animation: aurenWave 1.1s ease-in-out infinite; }
        .auren-blink { animation: aurenBlink 4.6s linear infinite; }
        .a-up { animation: slideUp .35s ease both; }
        .no-sb { scrollbar-width:none } .no-sb::-webkit-scrollbar{ display:none }
        .caret::after { content:"▍"; color:${BRAND.lime}; animation: aurenPulse 1s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce){ .auren-pulse,.auren-pulse-ring,.auren-wave,.auren-blink{animation:none!important} .a-up{animation:none!important} }
      `}</style>

      {/* ═══════════ LAYER 1 · FIXED TOP · the Digital Human — ~46% of screen, in front of everything ═══════════ */}
      <div className="fixed inset-x-0 top-0 z-50 flex flex-col" style={{ height: "46vh", background: "linear-gradient(160deg, #0A0E15, #05070B)", boxShadow: "0 22px 40px -12px rgba(0,0,0,.95), 0 1px 0 rgba(203,251,0,.15) inset" }}>
        {/* slim brand row */}
        <div className="flex shrink-0 items-center justify-between gap-2 px-3 py-1.5 sm:px-5">
          <div className="flex items-center gap-2">
            <Mark small />
            <span className="text-[11px] font-semibold tracking-[.18em]">AUREN <span className="font-normal text-white/45">· live session</span></span>
          </div>
          <div className="flex items-center gap-1.5">
            {startDims && <span className="rounded-full border px-2 py-0.5 font-mono text-[10px]" style={{ borderColor: "rgba(203,251,0,.4)", color: BRAND.lime, background: "rgba(203,251,0,.07)" }}>AILS {ails}</span>}
            <span className="rounded-full border px-2 py-0.5 text-[8px] uppercase tracking-[.16em] text-white/55" style={{ borderColor: "rgba(247,248,250,.18)" }}>Not advice</span>
          </div>
        </div>

        {/* her face — nothing overlaps it */}
        <div className="relative mx-3 min-h-0 flex-1 overflow-hidden rounded-2xl border transition-all duration-500 sm:mx-5"
          style={{ borderColor: coachFlash ? "rgba(203,251,0,.85)" : "rgba(203,251,0,.3)", boxShadow: coachFlash ? "0 0 50px rgba(203,251,0,.3)" : "none", background: "linear-gradient(150deg, rgba(23,32,51,.9), rgba(5,7,11,.98))" }}>
          <div className="absolute left-1/2 top-0 h-[260%] w-full max-w-md" style={{ transform: "translateX(-50%) translateY(-24%)", WebkitMaskImage: "linear-gradient(90deg, transparent, black 16%, black 84%, transparent)", maskImage: "linear-gradient(90deg, transparent, black 16%, black 84%, transparent)" }}>
            <DigitalHumanPortrait speaking={!doneSpeaking} listening={false} />
          </div>
          <div className="absolute top-2 left-2.5 z-10 flex items-center gap-1.5">
            <span className="auren-pulse h-1.5 w-1.5 rounded-full" style={{ background: BRAND.lime, boxShadow: `0 0 10px ${BRAND.lime}` }} />
            <span className="rounded-full border px-2 py-0.5 text-[8px] font-semibold uppercase tracking-[.16em]" style={{ color: BRAND.lime, borderColor: "rgba(203,251,0,.4)", background: "rgba(8,10,15,.6)" }}>
              {!doneSpeaking ? "speaking" : "listening"}
            </span>
          </div>
          <div className="absolute top-2 right-2.5 z-10 hidden sm:block">
            <span className="rounded-full border px-2 py-0.5 text-[8px] uppercase tracking-[.12em] text-white/55" style={{ borderColor: "rgba(247,248,250,.2)", background: "rgba(8,10,15,.6)" }}>EN · 中文 · عربي · BM · ES</span>
          </div>
        </div>

        {/* her voice — its own band BELOW her face, inside her layer */}
        <button onClick={skip} className="mx-3 mb-2.5 mt-2 shrink-0 rounded-xl border p-2.5 text-left sm:mx-5" style={{ borderColor: "rgba(203,251,0,.3)", background: "rgba(8,10,15,.85)" }} aria-live="polite">
          <div className="flex items-center gap-1.5">
            <span className="text-[8px] font-semibold uppercase tracking-[.2em]" style={{ color: BRAND.lime }}>AUREN</span>
            {!doneSpeaking && <span className="text-[8px] uppercase tracking-[.14em] text-white/35">tap to skip</span>}
          </div>
          <p ref={speechRef} className={`no-sb mt-1 max-h-[9.5vh] overflow-y-auto text-[13px] leading-snug text-white/95 sm:text-sm ${!doneSpeaking ? "caret" : ""}`}>{spokenText}</p>
        </button>
      </div>

      {/* ═══════════ LAYER 2 · PAGE FLOW · the conversation scrolls under her ═══════════ */}
      <div className="px-3 sm:px-5" style={{ paddingTop: "calc(46vh + 14px)", paddingBottom: "170px" }}>
        <div className="mx-auto max-w-3xl space-y-2.5">
          {phase === "intro" && feed.length === 0 && (
            <div className="a-up rounded-2xl border p-4 text-center" style={{ borderColor: "rgba(247,248,250,.1)", background: "rgba(247,248,250,.03)" }}>
              <p className="text-sm text-white/80">One live session: interview → AILS score → scam rehearsal → evidential scorecard.</p>
              <p className="mt-1 text-xs text-white/50">She stays floating above — the conversation scrolls here, beneath her.</p>
            </div>
          )}

          {feed.map((m, i) => {
            if (m.type === "auren") return (
              <div key={i} className="a-up max-w-[92%] rounded-2xl rounded-tl-md border p-3" style={{ borderColor: "rgba(203,251,0,.22)", background: "rgba(203,251,0,.05)" }}>
                <div className="text-[9px] font-semibold uppercase tracking-[.2em]" style={{ color: BRAND.lime }}>AUREN</div>
                <p className="mt-0.5 text-sm leading-6 text-white/90">{m.text}</p>
              </div>
            );
            if (m.type === "user") return (
              <div key={i} className="a-up ml-auto max-w-[86%] rounded-2xl rounded-br-md p-3" style={{ background: "rgba(247,248,250,.1)" }}>
                <div className="text-[9px] font-semibold uppercase tracking-[.2em] text-white/50">{name || "You"}{m.toMarcus ? " → Marcus" : ""}</div>
                <p className="mt-0.5 text-sm leading-6 text-white">"{m.text}"</p>
              </div>
            );
            if (m.type === "marcus") return (
              <div key={i} className="a-up max-w-[88%] rounded-2xl rounded-tl-md border p-3" style={{ borderColor: "rgba(255,107,107,.4)", background: "rgba(255,107,107,.09)" }}>
                <div className="flex items-center gap-1.5">
                  <span className="grid h-5 w-5 place-items-center rounded-full text-[9px] font-bold" style={{ background: "rgba(255,107,107,.25)", color: BRAND.warmRed }}>M</span>
                  <span className="text-[9px] font-semibold uppercase tracking-[.16em]" style={{ color: BRAND.warmRed }}>"Marcus" · simulated · AI persona</span>
                </div>
                <p className="mt-1 text-sm leading-6 text-white/95">{m.text}</p>
              </div>
            );
            if (m.type === "obs") return (
              <div key={i} className="a-up mx-auto flex max-w-[94%] items-baseline gap-2 rounded-full border px-3.5 py-1.5" style={{ borderColor: m.tone === "risky" ? "rgba(255,107,107,.35)" : "rgba(203,251,0,.25)", background: "rgba(8,10,15,.5)" }}>
                <span className="shrink-0 text-[8px] font-semibold uppercase tracking-[.18em]" style={{ color: m.tone === "risky" ? BRAND.warmRed : BRAND.lime }}>observed</span>
                <span className="text-[11px] leading-4 text-white/75">{m.obs}{m.deltaStr ? " · " : ""}{m.deltaStr && <span className="font-mono" style={{ color: BRAND.gold }}>{m.deltaStr}</span>}</span>
              </div>
            );
            if (m.type === "sys") return (
              <div key={i} className="a-up text-center font-mono text-[9px] uppercase tracking-[.18em] text-white/40">— {m.text} —</div>
            );
            if (m.type === "ails") return (
              <div key={i} className="a-up rounded-2xl border p-4" style={{ borderColor: "rgba(203,251,0,.4)", background: "rgba(8,10,15,.6)" }}>
                <div className="flex items-baseline justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-[.2em]" style={{ color: BRAND.lime }}>AILS · starting score</span>
                  <span className="font-mono text-3xl font-bold" style={{ color: BRAND.lime }}>{m.score}</span>
                </div>
                <div className="mt-2.5 space-y-1.5">
                  {DIMS.map(d => (
                    <div key={d.key} className="flex items-center gap-2 text-[11px]">
                      <span className="w-32 shrink-0 text-white/70">{d.label}</span>
                      <div className="h-1.5 flex-1 rounded-full" style={{ background: "rgba(255,255,255,.1)" }}>
                        <div className="h-1.5 rounded-full transition-all duration-1000" style={{ width: `${m.dims[d.key]}%`, background: dimColor(m.dims[d.key]) }} />
                      </div>
                      <span className="w-6 text-right font-mono text-white/80">{m.dims[d.key]}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-2 text-[10px] text-white/50">Generated from your conversation — “not a snapshot, a trajectory.”</p>
              </div>
            );
            if (m.type === "scorecard") return (
              <div key={i} className="a-up rounded-2xl border p-4" style={{ borderColor: `${verdictMeta.color}55`, background: "rgba(8,10,15,.65)" }}>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-[.2em]" style={{ color: BRAND.lime }}>Evidential scorecard · {name}</div>
                    <div className="mt-0.5 text-lg font-semibold">Your own words, scored.</div>
                  </div>
                  <span className="rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[.14em]" style={{ borderColor: `${verdictMeta.color}66`, color: verdictMeta.color, background: `${verdictMeta.color}12` }}>{verdictMeta.label}</span>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-lg border p-2" style={{ borderColor: "rgba(247,248,250,.15)" }}><div className="text-[8px] uppercase tracking-[.14em] text-white/55">before</div><div className="font-mono text-xl font-bold text-white/80">{startAils}</div></div>
                  <div className="grid place-items-center rounded-lg border p-2" style={{ borderColor: "rgba(247,248,250,.15)" }}><span className="font-mono text-[11px]" style={{ color: ails >= startAils ? BRAND.lime : BRAND.warmRed }}>{ails >= startAils ? "▲" : "▼"} {Math.abs(ails - startAils)}</span></div>
                  <div className="rounded-lg border p-2" style={{ borderColor: "rgba(203,251,0,.4)", background: "rgba(203,251,0,.07)" }}><div className="text-[8px] uppercase tracking-[.14em] text-white/60">now</div><div className="font-mono text-xl font-bold" style={{ color: BRAND.lime }}>{ails}</div></div>
                </div>
                <div className="mt-3 space-y-2">
                  {evidence.map((e, j) => (
                    <div key={j} className="rounded-xl border p-3" style={{ borderColor: "rgba(247,248,250,.12)", background: "rgba(247,248,250,.03)" }}>
                      <div className="flex flex-wrap items-baseline justify-between gap-1.5">
                        <span className="text-[11px] font-semibold" style={{ color: toneColor[e.tone] }}>Exchange {e.turn + 1} · {e.signal}</span>
                        <span className="font-mono text-[10px] font-semibold" style={{ color: toneColor[e.tone] }}>{dimLabel(e.dim)} {e.delta > 0 ? "+" : ""}{e.delta}</span>
                      </div>
                      <p className="mt-1 border-l-2 pl-2.5 text-[13px] italic text-white/95" style={{ borderColor: toneColor[e.tone] }}>"{e.quote}"</p>
                      <p className="mt-1 text-[11px] leading-4 text-white/60">{e.analysis}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-2.5 text-[10px] italic leading-4 text-white/50">“They are shown their own words... The evidence is the transcript. Nothing is asserted that cannot be pointed to.” — Full Project Paper §13</p>
                <div className="mt-2.5 rounded-xl border p-3 text-[12px] text-white/85" style={{ borderColor: `${verdictMeta.color}40`, background: `${verdictMeta.color}0D` }}>{verdictMeta.note}</div>
                <div className="mt-2.5 rounded-xl border p-3" style={{ borderColor: "rgba(245,197,24,.4)", background: "rgba(245,197,24,.07)" }}>
                  <span className="text-[8px] font-semibold uppercase tracking-[.2em]" style={{ color: BRAND.regYellow }}>What the regulator sees</span>
                  <p className="mt-1 text-[11px] leading-4 text-white/80">One anonymized data point: <b className="text-white">cohort MY · “WhatsApp recruitment” · {verdict === "certified" ? "passed" : evidence[2] && evidence[2].tone === "risky" ? "failed at urgency stage" : "coached mid-session"}</b>. At population scale: “an early-warning sensor network for emerging fraud.” No personal data leaves the session.</p>
                </div>
                <div className="mt-3.5 flex flex-wrap gap-2">
                  <button onClick={rehearseAgain} className="rounded-full px-4 py-2 text-[13px] font-semibold" style={{ background: BRAND.lime, color: BRAND.graphite }}>Rehearse again ↻</button>
                  <button onClick={restart} className="rounded-full border px-4 py-2 text-[13px] font-semibold text-white/90" style={{ borderColor: "rgba(247,248,250,.3)" }}>Restart session</button>
                </div>
              </div>
            );
            return null;
          })}
        </div>
      </div>

      {/* ═══════════ LAYER 3 · FIXED BOTTOM · the input — you talk to her ═══════════ */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t px-3 pb-3 pt-2.5 sm:px-5" style={{ borderColor: "rgba(247,248,250,.08)", background: "rgba(5,7,11,.94)", backdropFilter: "blur(10px)" }}>
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center gap-2">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full border" style={{ borderColor: "rgba(247,248,250,.2)", background: "rgba(247,248,250,.05)" }} title="Voice input — production build">
              <span style={{ color: doneSpeaking ? BRAND.lime : "rgba(247,248,250,.35)" }}>🎙</span>
            </div>
            <input ref={inputRef} value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && submit()}
              placeholder={doneSpeaking ? placeholder : "AUREN is speaking…"} disabled={!doneSpeaking || awaiting === "done"} autoComplete="off"
              className="min-w-0 flex-1 rounded-full border bg-transparent px-4 py-2.5 text-sm text-white placeholder-white/40 outline-none transition focus:border-white/60 disabled:opacity-50"
              style={{ borderColor: "rgba(247,248,250,.25)", background: "rgba(247,248,250,.04)" }} />
            <button onClick={() => submit()} disabled={!doneSpeaking || !input.trim() || awaiting === "done"}
              className="shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition disabled:opacity-40" style={{ background: BRAND.lime, color: BRAND.graphite }}>
              Send
            </button>
          </div>
          {doneSpeaking && chips.length > 0 && awaiting !== "done" && (
            <div className="no-sb mt-1.5 flex items-center gap-1.5 overflow-x-auto px-1">
              <span className="shrink-0 text-[8px] uppercase tracking-[.16em] text-white/35">or try:</span>
              {chips.map(c => (
                <button key={c} onClick={() => submit(c)} className="shrink-0 rounded-full border px-2.5 py-0.5 text-[11px] text-white/60 transition hover:text-white hover:border-white/50" style={{ borderColor: "rgba(247,248,250,.15)" }}>
                  {c}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
