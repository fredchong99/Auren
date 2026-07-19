// @ts-nocheck
import { useEffect, useRef, useState } from "react";
import { BRAND, DigitalHumanPortrait, Pill, Mark } from "./App";

/**
 * AUREN — MVP Demo
 * One continuous session, hosted end-to-end by the Digital Human.
 *
 * The prototype proves the core loop from the project papers:
 *   Interview (conversational) → AILS score → Rehearsal with live coaching
 *   → Evidential scorecard → (regulator glimpse)
 *
 * The Digital Human is the interface: the consumer talks to HER —
 * typing answers or tapping replies — and she drives every step.
 * In production her brain is an LLM + voice; this prototype scripts it.
 */

const DIMS = [
  { key: "IR", label: "Investor Reasoning" },
  { key: "AL", label: "AI Literacy" },
  { key: "RA", label: "Risk Awareness" },
  { key: "SR", label: "Scam Resistance" },
  { key: "BS", label: "Behavioral Stability" },
];

const STEPS = ["Meet AUREN", "Interview", "AILS Score", "Rehearsal", "Scorecard"];

// ── Interview script: 3 questions, tap or type ──
const INTERVIEW = [
  {
    q: (name) => `Nice to meet you, ${name}. First — have you ever invested before? Be honest, this isn't a test.`,
    options: [
      { text: "Yes — ETFs and a few stocks, nothing structured.", obs: "Self-taught beginner. Tactical experience, no strategic framework.", adj: { IR: +2 } },
      { text: "No, but I've been thinking about starting.", obs: "Pre-investor. High teachability window — habits not yet formed.", adj: { RA: +2 } },
      { text: "Yes, actively — I trade often.", obs: "Active trader. Overconfidence risk flagged for rehearsal path.", adj: { IR: +4, BS: -3 } },
    ],
  },
  {
    q: () => "When you decide what to buy — what actually guides you?",
    options: [
      { text: "Friends' tips and what's trending on social media.", obs: "Socially mediated decisions. Low independent verification. Scam-vector exposure risk.", adj: { SR: -4, BS: -2 } },
      { text: "I ask AI tools and mostly go with what they say.", obs: "Uncritical AI trust. AI-tool literacy is the priority dimension.", adj: { AL: -5 } },
      { text: "My own research — filings, fees, fundamentals.", obs: "Evidence-led reasoning present. Verify depth under pressure.", adj: { IR: +5, SR: +3 } },
    ],
  },
  {
    q: () => "Last one. The market drops 20% in a week and headlines are screaming. What's your first instinct?",
    options: [
      { text: "Sell. Stop the bleeding.", obs: "Pronounced loss aversion. Emotional response under simulated stress is high.", adj: { BS: -4, RA: -2 } },
      { text: "Honestly — I'd panic a bit, then wait.", obs: "Emotional response present but contained. Discipline trainable.", adj: { BS: -1 } },
      { text: "Check my written plan before doing anything.", obs: "Plan-based discipline signal. Strongest volatility response.", adj: { BS: +5, RA: +3 } },
    ],
  },
];

// ── Rehearsal script: WhatsApp scam, 3 turns ──
const REHEARSAL = [
  {
    persona: "Hey! Adam gave me your number 😊 He said you might be interested in our private trading group. We're up 40% this quarter using AI signals — limited spots left!",
    choices: [
      { text: "Sure, sounds legit — how do I sign up?", tone: "risky", delta: -3, dim: "SR",
        signal: "Scam-vulnerability signal",
        analysis: "Immediate agreement without verification — the exact pattern recruitment scams rely on.",
        coaching: "Notice what just happened — you agreed before verifying anything. Before responding to any investment invitation, ask: who is this person, and can the claim be verified?" },
      { text: "Who are you exactly? How do you know Adam?", tone: "good", delta: 2, dim: "SR",
        signal: "Verification signal",
        analysis: "Identity challenge before engagement. Correct first move." },
      { text: "40% a quarter? That sounds too good to be true.", tone: "good", delta: 3, dim: "SR",
        signal: "Verification signal",
        analysis: "Return-claim skepticism. No legitimate investment offers guaranteed outsized returns." },
    ],
  },
  {
    persona: "Here's proof 📈 [screenshot: +RM12,400 this month]. Adam's already in. Everyone in the group is making money. You in?",
    choices: [
      { text: "Wow okay — I trust Adam, he wouldn't share a scam.", tone: "risky", delta: -2, dim: "BS",
        signal: "Trust-transfer bias",
        analysis: "“Recruiter-driven scams specifically exploit trusted contacts — the friend sharing the scheme is often themselves a victim being used as a distribution channel.”",
        coaching: "Trust-transfer is the number one recruitment vector. Adam may himself be a victim. And profit screenshots are trivially fabricated — they are not evidence." },
      { text: "Screenshots can be faked. Is this platform licensed?", tone: "good", delta: 3, dim: "SR",
        signal: "Verification signal",
        analysis: "Evidence skepticism plus a licensing question. Strong verification instinct." },
      { text: "What's the regulator registration number?", tone: "excellent", delta: 4, dim: "SR",
        signal: "Certification signal",
        analysis: "Direct registry challenge — the single most effective scam filter available to a retail investor." },
    ],
  },
  {
    persona: "Spots close TONIGHT ⏰ Minimum RM2,000 to start. I'll send you the deposit link — takes 2 minutes. Don't miss out like last time!",
    choices: [
      { text: "Okay, send me the link — I'll do it now.", tone: "risky", delta: -5, dim: "SR",
        signal: "Urgency capitulation",
        analysis: "Deadline pressure exists precisely to bypass verification. In the real event, this is the moment the money leaves.",
        coaching: "Stop. Urgency is manufactured — legitimate investments do not expire tonight. Pressure to act before verifying is itself the strongest scam signal in this conversation." },
      { text: "Actually — can you send me the regulator registration first?", tone: "good", delta: 4, dim: "SR",
        signal: "Verification signal",
        analysis: "“Live coaching landed... the verification instinct is now active.”" },
      { text: "I'm going to verify this offline before I do anything.", tone: "excellent", delta: 6, dim: "SR",
        signal: "Certification signal",
        analysis: "“Verification protocol correctly applied... the certification criterion for this scenario is met.”" },
    ],
  },
];

const toneColor = { risky: BRAND.warmRed, good: BRAND.lime, excellent: BRAND.lime };

function dimColor(v) { return v < 40 ? BRAND.warmRed : v < 55 ? BRAND.amber : BRAND.lime; }

export default function AurenMvp() {
  const [step, setStep] = useState(0); // 0 meet · 1 interview · 2 ails · 3 rehearsal · 4 scorecard
  const [name, setName] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [qIdx, setQIdx] = useState(0);
  const [freeText, setFreeText] = useState("");
  const [observations, setObservations] = useState([]);
  const [dims, setDims] = useState({ IR: 35, AL: 33, RA: 45, SR: 34, BS: 45 });
  const [startDims, setStartDims] = useState(null);
  const [picks, setPicks] = useState([]);
  const [thinking, setThinking] = useState(false);
  const stageRef = useRef(null);

  const ails = Math.round(Object.values(dims).reduce((a, b) => a + b, 0) / 5);
  const startAils = startDims ? Math.round(Object.values(startDims).reduce((a, b) => a + b, 0) / 5) : ails;
  const rehearsalDone = picks.length >= REHEARSAL.length;
  const totalDelta = picks.reduce((a, p) => a + p.delta, 0);
  const lastPick = picks[picks.length - 1];
  const verdict = rehearsalDone
    ? (totalDelta >= 6 && lastPick.tone !== "risky" ? "certified" : totalDelta >= 0 ? "review" : "retrain")
    : null;
  const verdictMeta = {
    certified: { label: "CERTIFIED", color: BRAND.lime, note: "Verification protocol demonstrated under pressure. The next rehearsal in your path unlocks." },
    review: { label: "NEEDS REVIEW", color: BRAND.amber, note: "Mixed signals. AUREN recommends one repeat with variations before certification." },
    retrain: { label: "RETRAIN REQUIRED", color: BRAND.warmRed, note: "AUREN will re-run this scenario with variations — you cannot pass by memorizing a script." },
  };

  useEffect(() => { if (stageRef.current) stageRef.current.scrollTop = stageRef.current.scrollHeight; }, [qIdx, picks, step, thinking]);

  const pause = (fn, ms = 700) => { setThinking(true); setTimeout(() => { setThinking(false); fn(); }, ms); };

  // ── AUREN's spoken line, per state — she narrates the whole session ──
  const aurenLine = (() => {
    if (step === 0) return "Hello — I'm AUREN. Before I teach you anything, I'd like to understand how you think about risk, AI, and money. First: what should I call you?";
    if (step === 1) {
      if (thinking) return "…";
      return INTERVIEW[qIdx] ? INTERVIEW[qIdx].q(name) : `Thank you, ${name}. I have a clear picture now. Let me show you exactly where you stand today.`;
    }
    if (step === 2) {
      const weakest = DIMS.filter(d => dims[d.key] < 40).map(d => d.label).join(" and ") || "none — a strong start";
      return `${name}, your starting AILS score is ${ails}. This isn't a verdict — it's a starting point. Your weakest dimensions are ${weakest}. So instead of a lecture, we're going to rehearse the exact situation that exploits them. Ready?`;
    }
    if (step === 3) {
      if (rehearsalDone) return "Rehearsal complete. Every word you chose is now evidence. Ready to see what I observed — quote by quote?";
      if (picks.length === 0) return "You've just been added to a group chat. This is a safe simulation — but 'Marcus' will pressure you exactly like the real thing. I'll step in live if I see a risky pattern.";
      if (lastPick && lastPick.tone === "risky") return "I stepped in for a reason — read the coaching note before your next reply.";
      return "Good instinct. Keep going — the pressure is about to increase.";
    }
    if (step === 4) {
      if (verdict === "certified") return `Strong session, ${name}. Your verification instinct held under pressure. Here is your evidence — not a grade, your own words.`;
      if (verdict === "retrain") return `${name}, this is exactly why we rehearse — every one of those mistakes was made safely here, instead of with your savings. Here is your evidence.`;
      return `Progress, ${name}. My coaching landed mid-session and your later replies improved. Here is your evidence — not a grade, your own words.`;
    }
    return "";
  })();

  // ── handlers ──
  const submitName = () => {
    const n = nameInput.trim() || "friend";
    setName(n.charAt(0).toUpperCase() + n.slice(1));
    pause(() => setStep(1), 600);
  };

  const answerInterview = (opt) => {
    setObservations(o => [...o, { label: `Q${qIdx + 1}`, text: opt.obs, answer: opt.text }]);
    if (opt.adj) setDims(d => { const nd = { ...d }; for (const [k, v] of Object.entries(opt.adj)) nd[k] = Math.max(5, Math.min(95, nd[k] + v)); return nd; });
    if (qIdx + 1 < INTERVIEW.length) pause(() => setQIdx(i => i + 1), 800);
    else pause(() => { setQIdx(i => i + 1); setTimeout(() => { setStartDims(prev => prev ?? undefined); }, 0); }, 800);
  };

  const answerFree = () => {
    const t = freeText.trim();
    if (!t) return;
    setFreeText("");
    answerInterview({ text: t, obs: "Free-form answer captured. In production, the cognitive engine scores open answers directly — nuance logged.", adj: {} });
  };

  const goAils = () => { setStartDims({ ...dims }); setStep(2); };

  const pickRehearsal = (c) => {
    setPicks(p => [...p, c]);
    setDims(d => ({ ...d, [c.dim]: Math.max(5, Math.min(95, d[c.dim] + c.delta)) }));
  };

  const restart = () => {
    setStep(0); setName(""); setNameInput(""); setQIdx(0); setObservations([]);
    setDims({ IR: 35, AL: 33, RA: 45, SR: 34, BS: 45 }); setStartDims(null); setPicks([]);
  };

  const interviewFinished = qIdx >= INTERVIEW.length;

  // ─────────────────────────── render ───────────────────────────
  return (
    <main className="min-h-screen text-white" style={{ background: `radial-gradient(circle at 85% 10%, rgba(203,251,0,.10), transparent 30%), linear-gradient(150deg, ${BRAND.deep}, ${BRAND.navy} 60%, ${BRAND.graphite})` }}>
      <style>{`
        @keyframes aurenPulse { 0%,100% { opacity:1; transform:scale(1) } 50% { opacity:.5; transform:scale(.85) } }
        @keyframes aurenPulseRing { 0% { opacity:.6; transform:scale(1) } 100% { opacity:0; transform:scale(1.3) } }
        @keyframes aurenWave { 0%,100%{transform:scaleY(.3)} 50%{transform:scaleY(1.3)} }
        @keyframes aurenBlink { 0%, 93%, 100% { opacity:1 } 95.5% { opacity:0 } }
        .auren-pulse { animation: aurenPulse 1.6s ease-in-out infinite; }
        .auren-pulse-ring { animation: aurenPulseRing 2s ease-out infinite; transform-origin:center; }
        .auren-wave { animation: aurenWave 1.1s ease-in-out infinite; }
        .auren-blink { animation: aurenBlink 4.6s linear infinite; }
        @media (prefers-reduced-motion: reduce){ .auren-pulse,.auren-pulse-ring,.auren-wave,.auren-blink{animation:none!important} }
      `}</style>

      {/* top bar */}
      <header className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-4">
        <div className="flex items-center gap-3">
          <Mark small />
          <div>
            <div className="text-base font-semibold tracking-[.18em]">AUREN</div>
            <div className="text-[9px] uppercase tracking-[.25em] text-white/70">Investor Intelligence Academy · MVP demo</div>
          </div>
        </div>
        <div className="hidden items-center gap-2 sm:flex">
          <Pill tone="yellow">IOSCO TechSprint 2026</Pill>
          <Pill tone="muted">Not financial advice</Pill>
        </div>
      </header>

      {/* stepper */}
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-2 px-5 pb-5">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <span className="rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[.16em]"
              style={{
                color: i === step ? BRAND.graphite : i < step ? BRAND.lime : "rgba(247,248,250,.55)",
                background: i === step ? BRAND.lime : i < step ? "rgba(203,251,0,.08)" : "transparent",
                borderColor: i <= step ? "rgba(203,251,0,.45)" : "rgba(247,248,250,.15)",
              }}>
              {i < step ? "✓ " : `${i + 1} · `}{s}
            </span>
            {i < STEPS.length - 1 && <span className="h-px w-4" style={{ background: "rgba(247,248,250,.15)" }} />}
          </div>
        ))}
      </div>

      <div className="mx-auto grid max-w-6xl gap-6 px-5 pb-16 lg:grid-cols-12">
        {/* ── LEFT: the Digital Human — the hero, always present ── */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-5 space-y-3">
            <div className="relative overflow-hidden rounded-[2rem] border" style={{ borderColor: "rgba(203,251,0,.25)", background: "linear-gradient(145deg, rgba(23,32,51,.92), rgba(8,10,15,.98))", boxShadow: "0 0 80px rgba(203,251,0,.07)" }}>
              <div className="relative aspect-[4/5]">
                <DigitalHumanPortrait speaking={!thinking} listening={thinking} />
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                  <span className="auren-pulse h-2 w-2 rounded-full" style={{ background: BRAND.lime, boxShadow: `0 0 12px ${BRAND.lime}` }} />
                  <Pill tone="lime">AUREN · Live session</Pill>
                </div>
                <div className="absolute top-4 right-4 z-10"><Pill tone="cyan">EN · 中文 · عربي · BM · ES</Pill></div>
                {/* her speech — the driver of the whole session */}
                <div className="absolute bottom-4 left-4 right-4 rounded-2xl border p-4 backdrop-blur" style={{ borderColor: "rgba(203,251,0,.25)", background: "rgba(8,10,15,.82)" }}>
                  <div className="text-[10px] uppercase tracking-[.22em]" style={{ color: BRAND.lime }}>AUREN speaks</div>
                  <p className="mt-2 text-sm leading-relaxed text-white/95" aria-live="polite">"{aurenLine}"</p>
                </div>
              </div>
            </div>

            {/* live AILS rail — updates with every answer */}
            <div className="rounded-2xl border p-4" style={{ borderColor: "rgba(203,251,0,.18)", background: "rgba(8,10,15,.55)" }}>
              <div className="flex items-baseline justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-[.2em]" style={{ color: BRAND.lime }}>AILS · live</span>
                <span className="font-mono text-2xl font-semibold">{step >= 2 ? ails : "—"}</span>
              </div>
              <div className="mt-3 space-y-2">
                {DIMS.map(d => (
                  <div key={d.key} className="flex items-center gap-3 text-xs">
                    <span className="w-36 shrink-0 text-white/80">{d.label}</span>
                    <div className="h-1.5 flex-1 rounded-full" style={{ background: "rgba(255,255,255,.08)" }}>
                      <div className="h-1.5 rounded-full transition-all duration-700" style={{ width: step >= 2 ? `${dims[d.key]}%` : "0%", background: dimColor(dims[d.key]) }} />
                    </div>
                    <span className="w-7 text-right font-mono text-white/85">{step >= 2 ? dims[d.key] : "·"}</span>
                  </div>
                ))}
              </div>
              {step < 2 && <p className="mt-2 text-[10px] text-white/55">Score reveals after the interview — every later reply moves it live.</p>}
            </div>
          </div>
        </div>

        {/* ── RIGHT: the conversation stage ── */}
        <div className="lg:col-span-7">
          <div ref={stageRef} className="rounded-[2rem] border p-5 md:p-7 lg:max-h-[82vh] lg:overflow-y-auto" style={{ borderColor: "rgba(247,248,250,.1)", background: "rgba(8,10,15,.45)" }}>

            {/* STEP 0 · MEET */}
            {step === 0 && (
              <div>
                <Pill tone="lime">Step 1 · Meet AUREN</Pill>
                <h1 className="mt-4 text-3xl font-semibold leading-tight md:text-5xl">Talk to her.<br />She does the rest.</h1>
                <p className="mt-4 max-w-lg text-sm leading-7 text-white/80">This is the AUREN core loop, end to end: a conversational assessment, a live scam rehearsal with coaching, and a quote-level evidential scorecard — all hosted by the Digital Human. About 3 minutes.</p>
                <div className="mt-8 max-w-md">
                  <label className="text-[10px] font-semibold uppercase tracking-[.2em] text-white/70" htmlFor="name-input">Tell AUREN your name</label>
                  <div className="mt-2 flex gap-2">
                    <input id="name-input" value={nameInput} onChange={e => setNameInput(e.target.value)} onKeyDown={e => e.key === "Enter" && submitName()}
                      placeholder="Type your name…" autoComplete="off"
                      className="flex-1 rounded-full border bg-transparent px-5 py-3 text-sm text-white placeholder-white/40 outline-none focus:border-white/50"
                      style={{ borderColor: "rgba(247,248,250,.25)" }} />
                    <button onClick={submitName} className="rounded-full px-6 py-3 text-sm font-semibold" style={{ background: BRAND.lime, color: BRAND.graphite }}>Start →</button>
                  </div>
                  <p className="mt-3 text-[11px] text-white/50">Prototype note: AUREN's replies here are scripted. In production she runs on a live LLM with voice — same flow, real conversation.</p>
                </div>
              </div>
            )}

            {/* STEP 1 · INTERVIEW */}
            {step === 1 && (
              <div>
                <div className="flex items-center justify-between">
                  <Pill tone="lime">Step 2 · Interview — a conversation, not a questionnaire</Pill>
                  <span className="text-xs text-white/60">{Math.min(qIdx + 1, INTERVIEW.length)} / {INTERVIEW.length}</span>
                </div>

                {/* transcript so far */}
                <div className="mt-6 space-y-4">
                  {observations.map((o, i) => (
                    <div key={i} className="space-y-2">
                      <div className="rounded-2xl border p-4" style={{ borderColor: "rgba(203,251,0,.2)", background: "rgba(203,251,0,.05)" }}>
                        <div className="text-[10px] font-semibold uppercase tracking-[.2em]" style={{ color: BRAND.lime }}>AUREN</div>
                        <p className="mt-1 text-sm text-white/90">{INTERVIEW[i] ? INTERVIEW[i].q(name) : ""}</p>
                      </div>
                      <div className="ml-8 rounded-2xl border p-4" style={{ borderColor: "rgba(247,248,250,.15)", background: "rgba(247,248,250,.05)" }}>
                        <div className="text-[10px] font-semibold uppercase tracking-[.2em] text-white/60">{name}</div>
                        <p className="mt-1 text-sm italic text-white/95">"{o.answer}"</p>
                      </div>
                      <div className="ml-8 flex items-start gap-2 text-[11px] text-white/60">
                        <span className="auren-pulse mt-1 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: BRAND.lime }} />
                        <span><b style={{ color: BRAND.lime }}>Observed:</b> {o.text}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* current question */}
                {!interviewFinished && !thinking && (
                  <div className="mt-6">
                    <div className="rounded-2xl border p-4" style={{ borderColor: "rgba(203,251,0,.3)", background: "rgba(203,251,0,.07)" }}>
                      <div className="text-[10px] font-semibold uppercase tracking-[.2em]" style={{ color: BRAND.lime }}>AUREN asks</div>
                      <p className="mt-1 text-base text-white">{INTERVIEW[qIdx].q(name)}</p>
                    </div>
                    <div className="mt-3 space-y-2">
                      {INTERVIEW[qIdx].options.map(o => (
                        <button key={o.text} onClick={() => answerInterview(o)}
                          className="block w-full rounded-2xl border p-3.5 text-left text-sm text-white/95 transition hover:border-white/50 hover:scale-[1.01]"
                          style={{ borderColor: "rgba(247,248,250,.18)", background: "rgba(247,248,250,.04)" }}>
                          "{o.text}"
                        </button>
                      ))}
                      <div className="flex gap-2 pt-1">
                        <input value={freeText} onChange={e => setFreeText(e.target.value)} onKeyDown={e => e.key === "Enter" && answerFree()}
                          placeholder="…or type your own answer to AUREN" autoComplete="off"
                          className="flex-1 rounded-full border bg-transparent px-4 py-2.5 text-sm text-white placeholder-white/40 outline-none focus:border-white/50"
                          style={{ borderColor: "rgba(247,248,250,.2)" }} />
                        <button onClick={answerFree} className="rounded-full border px-4 py-2.5 text-sm font-semibold text-white/90" style={{ borderColor: "rgba(203,251,0,.4)" }}>Send</button>
                      </div>
                    </div>
                  </div>
                )}
                {thinking && <p className="mt-6 text-sm text-white/50 italic">AUREN is listening…</p>}

                {interviewFinished && !thinking && (
                  <div className="mt-8 rounded-2xl border p-5" style={{ borderColor: "rgba(203,251,0,.4)", background: "rgba(203,251,0,.08)" }}>
                    <div className="text-[10px] font-semibold uppercase tracking-[.2em]" style={{ color: BRAND.lime }}>Interview complete · {INTERVIEW.length} dimensions observed</div>
                    <p className="mt-2 text-sm text-white/90">AUREN has generated your learner profile from the conversation.</p>
                    <button onClick={goAils} className="mt-4 rounded-full px-6 py-3 text-sm font-semibold" style={{ background: BRAND.lime, color: BRAND.graphite }}>Reveal my AILS score →</button>
                  </div>
                )}
              </div>
            )}

            {/* STEP 2 · AILS */}
            {step === 2 && (
              <div>
                <Pill tone="lime">Step 3 · AILS — AI-era Investor Literacy Score</Pill>
                <div className="mt-6 rounded-2xl p-6 text-center" style={{ background: "rgba(203,251,0,.09)", border: "1px solid rgba(203,251,0,.3)" }}>
                  <div className="text-[10px] uppercase tracking-[.22em] text-white/70">Starting score · {name}</div>
                  <div className="mt-1 font-mono text-7xl font-bold" style={{ color: BRAND.lime }}>{ails}</div>
                  <div className="mt-1 text-xs text-white/70">{ails < 50 ? "Foundation Learner" : "Developing Investor"} · generated from a conversation, not a quiz</div>
                </div>
                <div className="mt-5 space-y-3">
                  {DIMS.map(d => (
                    <div key={d.key} className="rounded-xl border p-3" style={{ borderColor: "rgba(247,248,250,.1)", background: "rgba(247,248,250,.03)" }}>
                      <div className="flex justify-between text-sm"><span className="text-white/90">{d.label}</span><span className="font-mono" style={{ color: dimColor(dims[d.key]) }}>{dims[d.key]}</span></div>
                      <div className="mt-2 h-2 rounded-full" style={{ background: "rgba(255,255,255,.08)" }}>
                        <div className="h-2 rounded-full transition-all duration-1000" style={{ width: `${dims[d.key]}%`, background: dimColor(dims[d.key]) }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-5 rounded-xl border p-4 text-sm text-white/85" style={{ borderColor: "rgba(247,248,250,.12)", background: "rgba(247,248,250,.03)" }}>
                  <b style={{ color: BRAND.lime }}>Why this matters:</b> “AILS is not a snapshot. It is a trajectory.” Every rehearsal you complete updates this score with quote-level evidence.
                </div>
                <button onClick={() => setStep(3)} className="mt-6 rounded-full px-6 py-3 text-sm font-semibold" style={{ background: BRAND.lime, color: BRAND.graphite }}>Enter the rehearsal →</button>
              </div>
            )}

            {/* STEP 3 · REHEARSAL */}
            {step === 3 && (
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <Pill tone="red">Step 4 · Rehearsal — WhatsApp scam scenario</Pill>
                  <span className="text-[10px] uppercase tracking-[.18em] text-white/60">Safe simulation · AI persona</span>
                </div>

                <div className="mt-5 flex items-center gap-3 rounded-2xl border p-3" style={{ borderColor: "rgba(255,107,107,.3)", background: "rgba(255,107,107,.06)" }}>
                  <div className="grid h-9 w-9 place-items-center rounded-full text-sm font-semibold" style={{ background: "rgba(255,107,107,.2)", color: BRAND.warmRed }}>M</div>
                  <div>
                    <div className="text-sm font-semibold">"Marcus" · Private Trading Group</div>
                    <div className="text-[10px] uppercase tracking-[.18em]" style={{ color: BRAND.warmRed }}>AI persona · recruiter pattern · applies real pressure</div>
                  </div>
                </div>

                <div className="mt-5 space-y-4">
                  {REHEARSAL.slice(0, Math.min(picks.length + 1, REHEARSAL.length)).map((turn, i) => (
                    <div key={i} className="space-y-3">
                      <div className="max-w-lg rounded-2xl rounded-tl-sm border p-4" style={{ borderColor: "rgba(255,107,107,.25)", background: "rgba(255,107,107,.07)" }}>
                        <div className="text-[10px] font-semibold uppercase tracking-[.2em]" style={{ color: BRAND.warmRed }}>Marcus</div>
                        <p className="mt-1.5 text-sm leading-6 text-white/95">{turn.persona}</p>
                      </div>
                      {picks[i] ? (
                        <>
                          <div className="ml-auto max-w-lg rounded-2xl rounded-tr-sm border p-4" style={{ borderColor: `${toneColor[picks[i].tone]}55`, background: "rgba(247,248,250,.05)" }}>
                            <div className="flex items-center justify-between gap-3">
                              <div className="text-[10px] font-semibold uppercase tracking-[.2em] text-white/70">{name}</div>
                              <span className="rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[.15em]" style={{ background: `${toneColor[picks[i].tone]}18`, color: toneColor[picks[i].tone] }}>
                                {DIMS.find(d => d.key === picks[i].dim).label} {picks[i].delta > 0 ? "+" : ""}{picks[i].delta}
                              </span>
                            </div>
                            <p className="mt-1.5 text-sm leading-6 text-white/95">"{picks[i].text}"</p>
                          </div>
                          {picks[i].coaching && (
                            <div className="max-w-xl rounded-2xl border p-4" style={{ borderColor: "rgba(203,251,0,.45)", background: "rgba(203,251,0,.09)" }}>
                              <div className="flex items-center gap-2">
                                <span className="auren-pulse h-1.5 w-1.5 rounded-full" style={{ background: BRAND.lime, boxShadow: `0 0 8px ${BRAND.lime}` }} />
                                <span className="text-[10px] font-semibold uppercase tracking-[.2em]" style={{ color: BRAND.lime }}>AUREN · live coaching</span>
                              </div>
                              <p className="mt-2 text-sm leading-6 text-white/95">{picks[i].coaching}</p>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="ml-auto max-w-lg space-y-2">
                          <div className="text-right text-[10px] uppercase tracking-[.2em] text-white/60">Reply as yourself</div>
                          {turn.choices.map(c => (
                            <button key={c.text} onClick={() => pickRehearsal(c)}
                              className="block w-full rounded-2xl border p-3.5 text-left text-sm text-white/95 transition hover:border-white/50 hover:scale-[1.01]"
                              style={{ borderColor: "rgba(247,248,250,.18)", background: "rgba(247,248,250,.04)" }}>
                              "{c.text}"
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {rehearsalDone && (
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border p-4" style={{ borderColor: "rgba(203,251,0,.35)", background: "rgba(203,251,0,.07)" }}>
                    <span className="text-sm text-white/95">Rehearsal complete — every reply logged as evidence.</span>
                    <button onClick={() => setStep(4)} className="rounded-full px-5 py-2.5 text-sm font-semibold" style={{ background: BRAND.lime, color: BRAND.graphite }}>View evidential scorecard →</button>
                  </div>
                )}
              </div>
            )}

            {/* STEP 4 · SCORECARD */}
            {step === 4 && (
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <Pill tone="lime">Step 5 · Evidential scorecard</Pill>
                  <span className="rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-[.15em]" style={{ borderColor: `${verdictMeta[verdict].color}55`, color: verdictMeta[verdict].color, background: `${verdictMeta[verdict].color}10` }}>
                    {verdictMeta[verdict].label}
                  </span>
                </div>

                {/* AILS movement */}
                <div className="mt-5 grid grid-cols-3 gap-3">
                  <div className="rounded-2xl border p-4 text-center" style={{ borderColor: "rgba(247,248,250,.12)", background: "rgba(247,248,250,.03)" }}>
                    <div className="text-[10px] uppercase tracking-[.18em] text-white/60">AILS before</div>
                    <div className="mt-1 font-mono text-3xl font-bold text-white/80">{startAils}</div>
                  </div>
                  <div className="grid place-items-center rounded-2xl border p-4" style={{ borderColor: "rgba(247,248,250,.12)", background: "rgba(247,248,250,.03)" }}>
                    <div className="font-mono text-sm" style={{ color: totalDelta >= 0 ? BRAND.lime : BRAND.warmRed }}>{totalDelta >= 0 ? "▲" : "▼"} {Math.abs(ails - startAils)} pts · this session</div>
                  </div>
                  <div className="rounded-2xl border p-4 text-center" style={{ borderColor: "rgba(203,251,0,.35)", background: "rgba(203,251,0,.07)" }}>
                    <div className="text-[10px] uppercase tracking-[.18em] text-white/70">AILS now</div>
                    <div className="mt-1 font-mono text-3xl font-bold" style={{ color: BRAND.lime }}>{ails}</div>
                  </div>
                </div>

                {/* quote-level evidence */}
                <div className="mt-5 space-y-3">
                  {picks.map((p, i) => (
                    <div key={i} className="rounded-2xl border p-4" style={{ borderColor: "rgba(247,248,250,.1)", background: "rgba(247,248,250,.03)" }}>
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <span className="text-xs font-semibold" style={{ color: toneColor[p.tone] }}>Turn {i * 2 + 2} · {p.signal}</span>
                        <span className="font-mono text-xs font-semibold" style={{ color: toneColor[p.tone] }}>{DIMS.find(d => d.key === p.dim).label} {p.delta > 0 ? "+" : ""}{p.delta}</span>
                      </div>
                      <p className="mt-2 border-l-2 pl-3 text-sm italic text-white/95" style={{ borderColor: toneColor[p.tone] }}>"{p.text}"</p>
                      <p className="mt-2 text-xs leading-5 text-white/70">{p.analysis}</p>
                    </div>
                  ))}
                </div>

                <p className="mt-4 text-xs leading-5 text-white/60 italic">“The learner is not told ‘you scored 42.’ They are shown their own words... The evidence is the transcript. Nothing is asserted that cannot be pointed to.” — Full Project Paper §13</p>

                <div className="mt-4 rounded-2xl border p-4 text-sm text-white/90" style={{ borderColor: `${verdictMeta[verdict].color}40`, background: `${verdictMeta[verdict].color}0D` }}>
                  {verdictMeta[verdict].note}
                </div>

                {/* regulator glimpse — 30 seconds, not a dashboard */}
                <div className="mt-6 rounded-2xl border p-5" style={{ borderColor: "rgba(245,197,24,.35)", background: "rgba(245,197,24,.06)" }}>
                  <Pill tone="yellow">What the regulator sees</Pill>
                  <p className="mt-3 text-sm leading-6 text-white/90">Your session just became one anonymized data point: <b className="text-white">cohort MY · 25–34 · scenario “WhatsApp recruitment” · {verdict === "certified" ? "passed" : (picks[2] && picks[2].tone === "risky" ? "failed pressure at urgency stage" : "coaching required mid-session")}</b>. Aggregated across a population, this is “an early-warning sensor network for emerging fraud” — regulators see which scams are starting to work <i>before</i> the losses reach the complaints desk. No personal data leaves the session.</p>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <button onClick={() => { setPicks([]); setStep(3); }} className="rounded-full px-6 py-3 text-sm font-semibold" style={{ background: BRAND.lime, color: BRAND.graphite }}>Rehearse again with variations ↻</button>
                  <button onClick={restart} className="rounded-full border px-6 py-3 text-sm font-semibold text-white/90" style={{ borderColor: "rgba(247,248,250,.25)" }}>Restart full demo</button>
                </div>
              </div>
            )}
          </div>

          <p className="mt-4 px-2 text-center text-[10px] uppercase tracking-[.18em] text-white/40">
            AUREN MVP · the core loop: interview → AILS → rehearsal → evidential scorecard · “AUREN is not a course. It is where investors rehearse the moment before it happens.”
          </p>
        </div>
      </div>
    </main>
  );
}
