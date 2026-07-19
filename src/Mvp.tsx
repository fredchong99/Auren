// @ts-nocheck
import { useEffect, useRef, useState } from "react";
import { BRAND, Pill, Mark } from "./App";
import { STR, classifyInterview, classifyRehearsal } from "./i18n";

/**
 * AUREN — MVP Demo · Digital-Human session
 * Three layers: fixed half-body avatar on top · conversation feed
 * beneath · fixed input bar. Roleplay mode swaps the persona in
 * full-screen. Voice via browser speech synthesis; full EN/BM
 * localization via src/i18n — the cross-jurisdictional claim, live.
 */

const DIM_KEYS = ["IR", "AL", "RA", "SR", "BS"];
const dimColor = (v) => (v < 40 ? BRAND.warmRed : v < 55 ? BRAND.amber : BRAND.lime);
const frag = (t, n = 52) => (t.length > n ? t.slice(0, n).trim() + "…" : t);

// ── typewriter — makes them "speak" on screen ──
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

// ── browser TTS — makes them audible ──
const cleanForSpeech = (t) => t
  .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}]/gu, " ")
  .replace(/["“”«»]/g, "").replace(/\s+/g, " ").trim();

function speakLine(text, { lang = "en-US", kind = "auren", enabled = true }) {
  try {
    if (!enabled || typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(cleanForSpeech(text));
    u.lang = lang;
    const voices = window.speechSynthesis.getVoices() || [];
    const match = voices.find(v => v.lang && v.lang.toLowerCase().startsWith(lang.slice(0, 2).toLowerCase()));
    if (match) u.voice = match;
    if (kind === "marcus") { u.pitch = 0.8; u.rate = 1.05; } else { u.pitch = 1.05; u.rate = 1.0; }
    window.speechSynthesis.speak(u);
  } catch (e) { /* speech unsupported — demo continues silently */ }
}
const stopSpeech = () => { try { window.speechSynthesis && window.speechSynthesis.cancel(); } catch (e) {} };

// ─────────────────────────────────────────────────────────────
// Half-body digital humans — seated, hands folded, RoleFit-style
// ─────────────────────────────────────────────────────────────
export function HalfBody({ variant = "auren", speaking = false }) {
  const A = variant === "auren";
  const v = variant;
  const skin = A ? ["#F5D7B8", "#E8B895", "#C99571"] : ["#EAC49B", "#D3A276", "#A97B52"];
  const hair = A ? ["#2A2018", "#1A1410"] : ["#232019", "#12100C"];
  const coat = A ? ["#1F2940", "#0E1424"] : ["#2E2A3E", "#161320"];
  const bg = A ? ["#2E3A55", "#161C2C", "#0A0C12"] : ["#3A3148", "#1E1929", "#0A0810"];
  const accent = A ? "#CBFB00" : "#FF6B6B";
  return (
    <svg viewBox="0 0 720 560" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={`skin-${v}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={skin[0]} /><stop offset="55%" stopColor={skin[1]} /><stop offset="100%" stopColor={skin[2]} />
        </linearGradient>
        <linearGradient id={`hair-${v}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={hair[0]} /><stop offset="100%" stopColor={hair[1]} />
        </linearGradient>
        <linearGradient id={`coat-${v}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={coat[0]} /><stop offset="100%" stopColor={coat[1]} />
        </linearGradient>
        <radialGradient id={`bg-${v}`} cx="50%" cy="24%" r="90%">
          <stop offset="0%" stopColor={bg[0]} /><stop offset="55%" stopColor={bg[1]} /><stop offset="100%" stopColor={bg[2]} />
        </radialGradient>
        <radialGradient id={`halo-${v}`} cx="50%" cy="24%" r="42%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.14" /><stop offset="100%" stopColor={accent} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`win-${v}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" /><stop offset="100%" stopColor="#DDE6F5" stopOpacity="0.09" />
        </linearGradient>
        <linearGradient id={`table-${v}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={A ? "#3A3029" : "#2E2637"} /><stop offset="100%" stopColor={A ? "#241D18" : "#191424"} />
        </linearGradient>
      </defs>

      {/* environment */}
      <rect width="720" height="560" fill={`url(#bg-${v})`} />
      <rect width="720" height="560" fill={`url(#halo-${v})`} />
      <rect x="560" width="160" height="560" fill={`url(#win-${v})`} />
      <rect x="70" y="70" width="110" height="86" rx="6" fill="#FFFFFF" opacity="0.05" />
      <rect x="86" y="86" width="78" height="54" rx="3" fill="#FFFFFF" opacity="0.05" />
      <rect x="536" y="60" width="92" height="120" rx="6" fill="#FFFFFF" opacity="0.04" />
      <ellipse cx="120" cy="420" rx="150" ry="120" fill="#000000" opacity="0.18" />
      <ellipse cx="620" cy="430" rx="140" ry="120" fill="#000000" opacity="0.16" />

      {/* table — the person sits behind/on it */}
      <rect x="0" y="474" width="720" height="86" fill={`url(#table-${v})`} />
      <rect x="0" y="474" width="720" height="4" fill="#FFFFFF" opacity="0.08" />

      {/* person — scaled to reference framing, anchored at the table */}
      <g transform="translate(360,552) scale(0.84) translate(-360,-552)">
      {/* hair behind shoulders */}
      {A && <path d="M 292 172 Q 286 82 360 74 Q 434 82 428 172 L 438 316 Q 432 348 402 360 L 402 262 Q 414 214 400 180 L 320 180 Q 306 214 318 262 L 318 360 Q 288 348 282 316 Z" fill={`url(#hair-${v})`} />}

      {/* torso — blazer/jacket */}
      <path d="M 206 560 L 212 386 Q 220 302 296 274 L 424 274 Q 500 302 508 386 L 514 560 Z" fill={`url(#coat-${v})`} />
      {/* shirt / tee */}
      {A
        ? <path d="M 334 276 L 360 314 L 386 276 L 381 264 L 360 272 L 339 264 Z" fill="#EFEDE6" />
        : <path d="M 332 276 Q 360 300 388 276 L 388 268 L 332 268 Z" fill="#0E0C14" />}
      {A && <path d="M 349 278 L 371 278 L 365 316 L 355 316 Z" fill="#9AA6C0" />}
      {A && <path d="M 352 284 L 368 284 M 350 294 L 370 294 M 352 304 L 366 304" stroke="#5E6C8C" strokeWidth="2" opacity="0.6" fill="none" />}
      {/* lapels */}
      <path d="M 296 274 L 344 338 L 360 310 L 338 276 Z" fill={coat[1]} opacity="0.9" />
      <path d="M 424 274 L 376 338 L 360 310 L 382 276 Z" fill={coat[1]} opacity="0.9" />
      <path d="M 296 274 L 344 338 M 424 274 L 376 338" stroke={A ? "#33415E" : "#403A56"} strokeWidth="2" fill="none" opacity="0.8" />

      {/* arms converging to folded hands */}
      <path d="M 214 356 Q 190 448 258 500 L 320 512 L 330 470 Q 262 448 250 366 Z" fill={`url(#coat-${v})`} />
      <path d="M 506 356 Q 530 448 462 500 L 400 512 L 390 470 Q 458 448 470 366 Z" fill={`url(#coat-${v})`} />
      <path d="M 250 366 Q 262 448 330 470 M 470 366 Q 458 448 390 470" stroke="#000000" strokeWidth="2" opacity="0.18" fill="none" />

      {/* folded hands on the table */}
      <path d="M 318 468 Q 312 442 342 436 Q 372 432 382 448 Q 390 434 416 440 Q 442 448 434 470 Q 426 490 396 493 L 348 493 Q 324 488 318 468 Z" fill={`url(#skin-${v})`} />
      <path d="M 340 452 Q 356 446 372 452 M 346 466 Q 362 460 380 466 M 352 480 Q 368 474 386 480" stroke="rgba(120,80,50,0.4)" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 382 448 Q 390 456 388 468" stroke="rgba(120,80,50,0.35)" strokeWidth="2" fill="none" />
      {A && <circle cx="398" cy="472" r="3" fill="#D8B56D" />}
      <ellipse cx="378" cy="496" rx="66" ry="7" fill="#000000" opacity="0.25" />

      </g>

      {/* teacup — AUREN only, like the reference */}
      {A && (<g>
        <ellipse cx="216" cy="512" rx="34" ry="8" fill="#E8E4DC" opacity="0.9" />
        <path d="M 190 500 Q 192 516 216 517 Q 240 516 242 500 Z" fill="#F2EFE9" />
        <ellipse cx="216" cy="500" rx="26" ry="6" fill="#CBB9A2" />
        <path d="M 242 502 Q 254 504 250 512 Q 247 517 240 514" fill="none" stroke="#F2EFE9" strokeWidth="4" />
      </g>)}

      {/* neck */}
      <path d="M 340 226 Q 340 252 347 264 L 373 264 Q 380 252 380 226 Z" fill={`url(#skin-${v})`} />
      <path d="M 340 250 Q 360 257 380 250 L 377 264 L 343 264 Z" fill="rgba(0,0,0,0.16)" />

      {/* head */}
      <ellipse cx="360" cy="158" rx="56" ry="72" fill={`url(#skin-${v})`} />
      <ellipse cx="336" cy="164" rx="13" ry="36" fill="rgba(140,90,60,0.13)" />
      <ellipse cx="384" cy="164" rx="13" ry="36" fill="rgba(140,90,60,0.13)" />

      {/* hair front */}
      {A
        ? (<g>
            <path d="M 306 128 Q 312 84 360 76 Q 408 84 414 128 Q 404 110 378 106 Q 360 116 342 106 Q 316 110 306 128 Z" fill={`url(#hair-${v})`} />
            <path d="M 304 132 Q 292 176 298 232 Q 302 192 310 158 Z M 416 132 Q 428 176 422 232 Q 418 192 410 158 Z" fill={`url(#hair-${v})`} />
          </g>)
        : (<g>
            <path d="M 302 140 Q 300 78 360 72 Q 420 78 418 140 Q 414 106 388 98 Q 360 108 332 98 Q 306 106 302 140 Z" fill={`url(#hair-${v})`} />
            <path d="M 302 140 Q 300 156 304 168 Q 307 146 312 136 Z M 418 140 Q 420 156 416 168 Q 413 146 408 136 Z" fill={`url(#hair-${v})`} opacity="0.85" />
          </g>)}

      {/* brows */}
      <path d="M 328 140 Q 340 133 353 137" stroke={hair[0]} strokeWidth={A ? 3 : 4} fill="none" strokeLinecap="round" />
      <path d="M 367 137 Q 380 133 392 140" stroke={hair[0]} strokeWidth={A ? 3 : 4} fill="none" strokeLinecap="round" />

      {/* eyes — blink group over closed-lid lines */}
      <path d="M 331 156 Q 340 159 350 156 M 370 156 Q 379 159 389 156" stroke="#B58A66" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <g className="auren-blink">
        <ellipse cx="340" cy="155" rx="8.5" ry="5.2" fill="#FAFAFA" />
        <ellipse cx="380" cy="155" rx="8.5" ry="5.2" fill="#FAFAFA" />
        <circle cx="340" cy="155" r="4.4" fill={A ? "#3A2818" : "#2E2115"} />
        <circle cx="380" cy="155" r="4.4" fill={A ? "#3A2818" : "#2E2115"} />
        <circle cx="340" cy="155" r="1.9" fill="#0A0604" />
        <circle cx="380" cy="155" r="1.9" fill="#0A0604" />
        <circle cx="341.5" cy="153.5" r="1" fill="#FFFFFF" />
        <circle cx="381.5" cy="153.5" r="1" fill="#FFFFFF" />
        <path d="M 332 153 Q 340 150 348 153 M 372 153 Q 380 150 388 153" stroke="#1A1008" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      </g>

      {/* nose */}
      <path d="M 360 162 L 356 190 Q 360 195 364 190 Z" fill="rgba(180,120,80,0.2)" />
      <ellipse cx="357" cy="193" rx="2" ry="1.5" fill="rgba(140,90,60,0.3)" />
      <ellipse cx="363" cy="193" rx="2" ry="1.5" fill="rgba(140,90,60,0.3)" />

      {/* stubble — Marcus */}
      {!A && <path d="M 322 208 Q 360 244 398 208 Q 398 222 382 232 Q 360 240 338 232 Q 322 222 322 208 Z" fill="rgba(40,30,20,0.13)" />}

      {/* mouth */}
      {!speaking ? (
        <g>
          <path d={A ? "M 348 212 Q 360 218 372 212" : "M 346 212 Q 362 220 376 210"} stroke={A ? "#8A4538" : "#7A4433"} strokeWidth="2.2" fill="none" strokeLinecap="round" />
          {A && <path d="M 350 212 Q 360 216 370 212 Q 360 214 350 212 Z" fill="#A85A48" opacity="0.8" />}
        </g>
      ) : (
        <g>
          <ellipse cx="360" cy="214" rx="9" ry="4.4" fill={A ? "#5C2A20" : "#4E241B"} />
          <path d="M 351 212 Q 360 208 369 212" stroke={A ? "#B8675A" : "#8A5240"} strokeWidth="2" fill="none" />
        </g>
      )}

      {/* cheeks + earrings */}
      {A && <ellipse cx="328" cy="186" rx="9" ry="7" fill="rgba(220,140,120,0.22)" />}
      {A && <ellipse cx="392" cy="186" rx="9" ry="7" fill="rgba(220,140,120,0.22)" />}
      {A && <circle cx="303" cy="184" r="2.4" fill={accent} opacity="0.75" />}
      {A && <circle cx="417" cy="184" r="2.4" fill={accent} opacity="0.75" />}

      {/* speaking waveform on the table edge */}
      {speaking && (
        <g transform="translate(360, 540)">
          {[6, 11, 17, 13, 20, 15, 22, 13, 17, 11, 6].map((h, i) => (
            <rect key={i} x={(i - 5) * 9 - 1.5} y={-h / 2} width="3" height={h} rx="1.5" fill={accent} opacity={0.4 + (i % 3) * 0.15} className="auren-wave" style={{ transformOrigin: `${(i - 5) * 9}px 0px`, animationDelay: `${i * 0.08}s` }} />
          ))}
        </g>
      )}
    </svg>
  );
}
// ─────────────────────────────────────────────────────────────
export default function AurenMvp({ onExit }) {
  const [lang, setLang] = useState("en");
  const L = STR[lang];
  const [voiceOn, setVoiceOn] = useState(true);
  const interacted = useRef(false);

  const [phase, setPhase] = useState("intro");
  const [name, setName] = useState("");
  const [dims, setDims] = useState({ IR: 35, AL: 33, RA: 45, SR: 34, BS: 45 });
  const [startDims, setStartDims] = useState(null);
  const [feed, setFeed] = useState([]);
  const [aurenText, setAurenText] = useState(STR.en.greeting);
  const [marcusText, setMarcusText] = useState("");
  const [evidence, setEvidence] = useState([]);
  const [awaiting, setAwaiting] = useState("name");
  const [input, setInput] = useState("");
  const [coachFlash, setCoachFlash] = useState(false);
  const [coachToast, setCoachToast] = useState(null);
  const [feedbackOn, setFeedbackOn] = useState(true);
  const aurenTw = useTypewriter(aurenText);
  const marcusTw = useTypewriter(marcusText);
  const inputRef = useRef(null);
  const speechRef = useRef(null);
  const currentLine = useRef(aurenText);
  const toastTimer = useRef(null);
  const langRef = useRef(lang); langRef.current = lang;
  const voiceRef = useRef(voiceOn); voiceRef.current = voiceOn;

  const roleplay = phase === "rehearsal";
  const doneSpeaking = roleplay ? marcusTw.done : aurenTw.done;

  const ails = Math.round(Object.values(dims).reduce((a, b) => a + b, 0) / 5);
  const startAils = startDims ? Math.round(Object.values(startDims).reduce((a, b) => a + b, 0) / 5) : null;
  const sentiment = evidence.reduce((a, e) => a + e.delta, 0);
  const sentimentFace = sentiment >= 6 ? "😄" : sentiment >= 1 ? "🙂" : sentiment === 0 ? "😐" : "😟";

  useEffect(() => { if (doneSpeaking && inputRef.current) inputRef.current.focus(); }, [doneSpeaking, awaiting]);
  useEffect(() => { if (!roleplay) window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" }); }, [feed, roleplay]);
  useEffect(() => { if (speechRef.current) speechRef.current.scrollTop = speechRef.current.scrollHeight; }, [aurenTw.shown]);
  useEffect(() => () => stopSpeech(), []);
  // re-localize the greeting if language switches before the session starts
  useEffect(() => {
    if (phase === "intro" && awaiting === "name") { currentLine.current = ""; setAurenText(STR[lang].greeting); currentLine.current = STR[lang].greeting; }
  }, [lang]);

  const voice = (text, kind) => {
    if (interacted.current) speakLine(text, { lang: STR[langRef.current].ttsLang, kind, enabled: voiceRef.current });
  };
  const push = (item) => setFeed(f => [...f, item]);

  const say = (text, { coach = false } = {}) => {
    if (currentLine.current) push({ type: "auren", text: currentLine.current });
    currentLine.current = text;
    setAurenText(text);
    voice(text, "auren");
    if (coach) { setCoachFlash(true); setTimeout(() => setCoachFlash(false), 2600); }
  };
  const toast = (t) => {
    setCoachToast(t);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setCoachToast(null), 9000);
  };
  const marcusSays = (idx, delay = 0) => {
    setTimeout(() => {
      const text = STR[langRef.current].marcus[idx];
      setMarcusText(text); push({ type: "marcus", text });
      voice(text, "marcus");
    }, delay);
  };
  const skipCurrent = () => { stopSpeech(); (roleplay ? marcusTw : aurenTw).skip(); };

  const submit = (raw) => {
    const text = (raw ?? input).trim();
    if (!text || !doneSpeaking) return;
    interacted.current = true;
    setInput("");

    if (awaiting === "name") {
      push({ type: "user", text });
      const n = (text.split(/\s+/)[0] || "friend").replace(/[^\p{L}\p{N}'-]/gu, "");
      const nm = n.charAt(0).toUpperCase() + n.slice(1);
      setName(nm);
      setPhase("interview"); setAwaiting("q0");
      say(L.qs[0](nm));
      return;
    }

    if (awaiting.startsWith("q")) {
      push({ type: "user", text });
      const qi = Number(awaiting.slice(1));
      const r = classifyInterview(qi, text);
      setDims(d => { const nd = { ...d }; for (const [k, v] of Object.entries(r.adj)) nd[k] = Math.max(5, Math.min(95, nd[k] + v)); return nd; });
      push({ type: "obs", obsId: r.id, adj: r.adj });
      const reaction = L.reacts[r.id](name, frag(text));
      if (qi < 2) { setAwaiting(`q${qi + 1}`); say(reaction + " " + L.qs[qi + 1](name)); }
      else { setAwaiting("ready-ails"); say(reaction + " " + L.interviewDone(name)); }
      return;
    }

    if (awaiting === "ready-ails") {
      push({ type: "user", text });
      const snap = { ...dims };
      setStartDims(prev => prev ?? snap);
      setPhase("ails"); setAwaiting("ready-rehearsal");
      const score = Math.round(Object.values(snap).reduce((a, b) => a + b, 0) / 5);
      push({ type: "ails", dims: snap, score });
      const weak = DIM_KEYS.filter(k => snap[k] < 40).map(k => L.dims[k]).join(lang === "ms" ? " dan " : " and ") || L.weakestNone;
      say(L.ailsLine(name, score, weak));
      return;
    }

    if (awaiting === "ready-rehearsal") {
      push({ type: "user", text });
      push({ type: "sys", key: "roleplaySys" });
      setPhase("rehearsal"); setAwaiting("r0");
      stopSpeech();
      toast({ kind: "auren", text: L.watchToast });
      marcusSays(0, 500);
      return;
    }

    if (awaiting.startsWith("r")) {
      const ti = Number(awaiting.slice(1));
      push({ type: "user", text, toMarcus: true });
      const v = classifyRehearsal(ti, text);
      setEvidence(e => [...e, { quote: text, ...v, turn: ti }]);
      setDims(d => ({ ...d, [v.dim]: Math.max(5, Math.min(95, d[v.dim] + v.delta)) }));
      push({ type: "obs", sig: v.sig, dim: v.dim, delta: v.delta, tone: v.tone });

      if (feedbackOn) {
        if (v.coach) {
          push({ type: "auren", text: L.coach[v.coach] });
          setCoachFlash(true); setTimeout(() => setCoachFlash(false), 2600);
          toast({ kind: "improvement", text: L.coach[v.coach] });
          voice(L.coach[v.coach], "auren");
        } else {
          toast({ kind: "good", sig: v.sig, text: L.ana[v.ana] });
        }
      }

      if (ti < 2) {
        setAwaiting(`r${ti + 1}`);
        marcusSays(ti + 1, v.coach && feedbackOn ? 3600 : 1400);
      } else {
        setAwaiting("done");
        setTimeout(() => {
          setPhase("scorecard");
          setMarcusText(""); setCoachToast(null);
          const strong = [...evidence, v].filter(e => e.tone !== "risky").length >= 2;
          say(L.closing(name, strong));
          push({ type: "scorecard" });
        }, 1800);
      }
      return;
    }
  };

  const rehearseAgain = () => {
    setEvidence([]); setAwaiting("r0");
    push({ type: "sys", key: "roleplayAgainSys" });
    setPhase("rehearsal");
    toast({ kind: "auren", text: L.watchToastAgain(name) });
    marcusSays(0, 500);
  };
  const restart = () => {
    stopSpeech();
    setPhase("intro"); setName(""); setDims({ IR: 35, AL: 33, RA: 45, SR: 34, BS: 45 });
    setStartDims(null); setFeed([]); setEvidence([]); setAwaiting("name"); setInput("");
    setMarcusText(""); setCoachToast(null);
    currentLine.current = "";
    say(L.greetingAgain);
  };

  const totalDelta = evidence.reduce((a, e) => a + e.delta, 0);
  const lastRisky = evidence.length && evidence[evidence.length - 1].tone === "risky";
  const verdict = totalDelta >= 8 && !lastRisky ? "certified" : totalDelta >= 0 ? "review" : "retrain";
  const vMeta = { ...L.verdict[verdict], color: verdict === "certified" ? BRAND.lime : verdict === "review" ? BRAND.amber : BRAND.warmRed };
  const toneColor = { risky: BRAND.warmRed, good: BRAND.lime, excellent: BRAND.lime };

  const chips = awaiting === "name" ? L.chips.name
    : awaiting === "q0" ? L.chips.q0 : awaiting === "q1" ? L.chips.q1 : awaiting === "q2" ? L.chips.q2
    : awaiting === "ready-ails" || awaiting === "ready-rehearsal" ? L.chips.ready
    : awaiting === "r0" ? L.chips.r0 : awaiting === "r1" ? L.chips.r1 : awaiting === "r2" ? L.chips.r2 : [];

  const placeholder = awaiting === "name" ? L.ui.phName
    : awaiting.startsWith("q") ? L.ui.phAnswer
    : awaiting.startsWith("ready") ? L.ui.phReady
    : awaiting.startsWith("r") ? L.ui.phMarcus
    : L.ui.phDone;

  // language + voice controls (both modes)
  const controls = (
    <div className="flex items-center gap-1.5">
      <div className="flex overflow-hidden rounded-full border" style={{ borderColor: "rgba(247,248,250,.25)" }}>
        {["en", "ms", "es"].map(l => (
          <button key={l} onClick={() => setLang(l)} className="px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[.12em] transition"
            style={{ background: lang === l ? BRAND.lime : "transparent", color: lang === l ? BRAND.graphite : "rgba(247,248,250,.6)" }}>
            {l === "en" ? "EN" : l === "ms" ? "BM" : "ES"}
          </button>
        ))}
      </div>
      <button onClick={() => { const nv = !voiceOn; setVoiceOn(nv); if (!nv) stopSpeech(); }} aria-label={voiceOn ? L.ui.voiceOn : L.ui.voiceOff}
        className="grid h-6 w-6 place-items-center rounded-full border text-[11px]" style={{ borderColor: voiceOn ? "rgba(203,251,0,.5)" : "rgba(247,248,250,.25)", color: voiceOn ? BRAND.lime : "rgba(247,248,250,.45)" }}>
        {voiceOn ? "🔊" : "🔇"}
      </button>
    </div>
  );

  const inputBar = (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t px-3 pb-3 pt-2.5 sm:px-5" style={{ borderColor: "rgba(247,248,250,.08)", background: "rgba(5,7,11,.94)", backdropFilter: "blur(10px)" }}>
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center gap-2">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full border" style={{ borderColor: "rgba(247,248,250,.2)", background: "rgba(247,248,250,.05)" }} title="Voice input — production build">
            <span style={{ color: doneSpeaking ? BRAND.lime : "rgba(247,248,250,.35)" }}>🎙</span>
          </div>
          <input ref={inputRef} value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && submit()}
            placeholder={doneSpeaking ? placeholder : (roleplay ? L.ui.phMarcusSpeaking : L.ui.phAurenSpeaking)} disabled={!doneSpeaking || awaiting === "done"} autoComplete="off"
            className="min-w-0 flex-1 rounded-full border bg-transparent px-4 py-2.5 text-sm text-white placeholder-white/40 outline-none transition focus:border-white/60 disabled:opacity-50"
            style={{ borderColor: "rgba(247,248,250,.25)", background: "rgba(247,248,250,.04)" }} />
          <button onClick={() => submit()} disabled={!doneSpeaking || !input.trim() || awaiting === "done"}
            className="shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition disabled:opacity-40" style={{ background: BRAND.lime, color: BRAND.graphite }}>
            {L.ui.send}
          </button>
        </div>
        {doneSpeaking && chips.length > 0 && awaiting !== "done" && (
          <div className="no-sb mt-1.5 flex items-center gap-1.5 overflow-x-auto px-1">
            <span className="shrink-0 text-[8px] uppercase tracking-[.16em] text-white/35">{L.ui.orTry}</span>
            {chips.map(c => (
              <button key={c} onClick={() => submit(c)} className="shrink-0 rounded-full border px-2.5 py-0.5 text-[11px] text-white/60 transition hover:text-white hover:border-white/50" style={{ borderColor: "rgba(247,248,250,.15)" }}>
                {c}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const styles = (
    <style>{`
      @keyframes aurenPulse { 0%,100% { opacity:1; transform:scale(1) } 50% { opacity:.5; transform:scale(.85) } }
      @keyframes aurenWave { 0%,100%{transform:scaleY(.3)} 50%{transform:scaleY(1.3)} }
      @keyframes aurenBlink { 0%, 93%, 100% { opacity:1 } 95.5% { opacity:0 } }
      @keyframes slideUp { from { opacity:0; transform:translateY(12px) } to { opacity:1; transform:none } }
      @keyframes toastIn { from { opacity:0; transform:translateY(-10px) } to { opacity:1; transform:none } }
      .auren-pulse { animation: aurenPulse 1.6s ease-in-out infinite; }
      .auren-wave { animation: aurenWave 1.1s ease-in-out infinite; }
      .auren-blink { animation: aurenBlink 4.6s linear infinite; }
      .a-up { animation: slideUp .35s ease both; }
      .t-in { animation: toastIn .4s ease both; }
      .no-sb { scrollbar-width:none } .no-sb::-webkit-scrollbar{ display:none }
      .caret::after { content:"▍"; color:${BRAND.lime}; animation: aurenPulse 1s ease-in-out infinite; }
      @media (prefers-reduced-motion: reduce){ .auren-pulse,.auren-wave,.auren-blink{animation:none!important} .a-up,.t-in{animation:none!important} }
    `}</style>
  );

  // ═══════════ ROLEPLAY MODE ═══════════
  if (roleplay) {
    return (
      <main className="fixed inset-0 flex flex-col text-white" style={{ background: "#0A0810" }}>
        {styles}
        <div className="z-30 flex shrink-0 items-center justify-between gap-2 px-3 py-2 sm:px-5" style={{ background: "rgba(5,7,11,.92)", borderBottom: "1px solid rgba(255,107,107,.2)" }}>
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold">{L.ui.personaName} <span className="font-normal text-white/50">· {L.ui.personaRole}</span></div>
            <div className="text-[9px] uppercase tracking-[.18em]" style={{ color: BRAND.warmRed }}>{L.ui.personaTag}</div>
          </div>
          <div className="flex shrink-0 items-center gap-1.5">
            <span className="rounded-full border px-2 py-0.5 font-mono text-[11px]" style={{ borderColor: sentiment < 0 ? "rgba(255,107,107,.45)" : "rgba(203,251,0,.4)", background: "rgba(8,10,15,.6)", color: sentiment < 0 ? BRAND.warmRed : BRAND.lime }}>
              {sentimentFace} {sentiment > 0 ? "+" : ""}{sentiment}
            </span>
            <button onClick={() => setFeedbackOn(f => !f)} className="flex items-center gap-1 rounded-full border px-2 py-0.5 text-[9px] uppercase tracking-[.1em]" style={{ borderColor: feedbackOn ? "rgba(203,251,0,.45)" : "rgba(247,248,250,.2)", color: feedbackOn ? BRAND.lime : "rgba(247,248,250,.5)" }}>
              {L.ui.feedback}
              <span className="relative inline-block h-3 w-5 rounded-full" style={{ background: feedbackOn ? "rgba(203,251,0,.35)" : "rgba(247,248,250,.15)" }}>
                <span className="absolute top-0.5 h-2 w-2 rounded-full transition-all" style={{ left: feedbackOn ? "11px" : "2px", background: feedbackOn ? BRAND.lime : "rgba(247,248,250,.6)" }} />
              </span>
            </button>
            {controls}
          </div>
        </div>

        <div className="relative min-h-0 flex-1">
          <div className="absolute inset-0 mx-auto" style={{ maxWidth: "calc((100vh - 150px) * 1.25)" }}>
            <HalfBody variant="marcus" speaking={!marcusTw.done} />
          </div>

          <div className="absolute left-3 top-3 z-20 w-[88px] overflow-hidden rounded-xl border shadow-xl transition-all duration-500 sm:w-[110px]" style={{ borderColor: coachFlash ? "rgba(203,251,0,.9)" : "rgba(203,251,0,.45)", boxShadow: coachFlash ? "0 0 30px rgba(203,251,0,.45)" : "0 8px 20px rgba(0,0,0,.6)" }}>
            <div className="relative" style={{ aspectRatio: "4/5", background: "#0A0E15" }}>
              <HalfBody variant="auren" speaking={coachFlash} />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-1 py-0.5" style={{ background: "rgba(5,7,11,.8)" }}>
                <span className="auren-pulse h-1 w-1 rounded-full" style={{ background: BRAND.lime }} />
                <span className="text-[7px] font-semibold uppercase tracking-[.14em]" style={{ color: BRAND.lime }}>{L.ui.watching}</span>
              </div>
            </div>
          </div>

          {coachToast && feedbackOn && (
            <div className="t-in absolute right-3 top-3 z-20 w-[70%] max-w-xs rounded-2xl border p-3 backdrop-blur" style={{
              borderColor: coachToast.kind === "improvement" ? "rgba(242,169,59,.6)" : "rgba(203,251,0,.5)",
              background: coachToast.kind === "improvement" ? "rgba(58,38,10,.88)" : "rgba(14,24,10,.88)",
            }}>
              <div className="flex items-center gap-1.5">
                <span className="text-xs">{coachToast.kind === "improvement" ? "⚠️" : "✔️"}</span>
                <span className="text-[9px] font-semibold uppercase tracking-[.18em]" style={{ color: coachToast.kind === "improvement" ? BRAND.amber : BRAND.lime }}>
                  {coachToast.kind === "improvement" ? L.ui.improvement : (coachToast.sig ? L.sig[coachToast.sig] : "AUREN")}
                </span>
                <span className="ml-auto text-[8px] uppercase tracking-[.12em] text-white/40">AUREN</span>
              </div>
              <p className="mt-1 text-[12px] leading-snug text-white/95">{coachToast.text}</p>
            </div>
          )}

          {marcusText && (
            <button onClick={skipCurrent} className="absolute inset-x-3 bottom-3 z-20 rounded-2xl p-3 text-left sm:inset-x-5" style={{ background: "linear-gradient(rgba(5,7,11,.55), rgba(5,7,11,.85))", backdropFilter: "blur(3px)" }} aria-live="polite">
              <div className="text-[9px] font-semibold uppercase tracking-[.18em]" style={{ color: BRAND.warmRed }}>Marcus{!marcusTw.done && <span className="ml-2 font-normal normal-case text-white/35">{L.ui.tapToSkip}</span>}</div>
              <p className="mt-1 max-h-[18vh] overflow-y-auto text-[15px] leading-snug text-white sm:text-base">{marcusTw.shown}</p>
            </button>
          )}
        </div>

        <div style={{ height: "76px" }} />
        {inputBar}
      </main>
    );
  }

  // ═══════════ SESSION MODE ═══════════
  return (
    <main className="min-h-screen text-white" style={{ background: `linear-gradient(160deg, #05070B, ${BRAND.deep} 45%, #0B0F16)` }}>
      {styles}

      <div className="fixed inset-x-0 top-0 z-50 flex flex-col" style={{ height: "62vh", background: "linear-gradient(160deg, #0A0E15, #05070B)", boxShadow: "0 22px 40px -12px rgba(0,0,0,.95), 0 1px 0 rgba(203,251,0,.15) inset" }}>
        <div className="flex shrink-0 items-center justify-between gap-2 px-3 py-1.5 sm:px-5">
          <div className="flex items-center gap-2">
            <Mark small />
            <span className="text-[11px] font-semibold tracking-[.18em]">AUREN <span className="font-normal text-white/45">· {L.ui.liveSession}</span></span>
          </div>
          <div className="flex items-center gap-1.5">
            {startDims && <span className="rounded-full border px-2 py-0.5 font-mono text-[10px]" style={{ borderColor: "rgba(203,251,0,.4)", color: BRAND.lime, background: "rgba(203,251,0,.07)" }}>AIRS {ails}</span>}
            <span className="hidden rounded-full border px-2 py-0.5 text-[8px] uppercase tracking-[.16em] text-white/55 sm:block" style={{ borderColor: "rgba(247,248,250,.18)" }}>{L.ui.notAdvice}</span>
            {controls}
            {onExit && <button onClick={() => { stopSpeech(); onExit(); }} aria-label="Back to overview" className="grid h-6 w-6 place-items-center rounded-full border text-xs text-white/70 hover:text-white" style={{ borderColor: "rgba(247,248,250,.25)" }}>✕</button>}
          </div>
        </div>

        <div className="relative mx-auto mb-2.5 min-h-0 w-full flex-1 overflow-hidden rounded-2xl border transition-all duration-500"
          style={{ maxWidth: "min(calc(100% - 24px), calc((62vh - 90px) * 1.25))", borderColor: coachFlash ? "rgba(203,251,0,.85)" : "rgba(203,251,0,.3)", boxShadow: coachFlash ? "0 0 50px rgba(203,251,0,.3)" : "none", background: "linear-gradient(150deg, rgba(23,32,51,.9), rgba(5,7,11,.98))" }}>
          <HalfBody variant="auren" speaking={!aurenTw.done} />
          <div className="absolute top-2 left-2.5 z-10 flex items-center gap-1.5">
            <span className="auren-pulse h-1.5 w-1.5 rounded-full" style={{ background: BRAND.lime, boxShadow: `0 0 10px ${BRAND.lime}` }} />
            <span className="rounded-full border px-2 py-0.5 text-[8px] font-semibold uppercase tracking-[.16em]" style={{ color: BRAND.lime, borderColor: "rgba(203,251,0,.4)", background: "rgba(8,10,15,.6)" }}>
              {!aurenTw.done ? L.ui.speaking : L.ui.listening}
            </span>
          </div>
          <div className="absolute top-2 right-2.5 z-10 hidden sm:block">
            <span className="rounded-full border px-2 py-0.5 text-[8px] uppercase tracking-[.12em] text-white/55" style={{ borderColor: "rgba(247,248,250,.2)", background: "rgba(8,10,15,.6)" }}>EN · 中文 · عربي · BM · ES</span>
          </div>
          <button onClick={skipCurrent} className="absolute inset-x-2.5 bottom-2.5 z-10 rounded-xl p-2.5 text-left" style={{ background: "linear-gradient(rgba(5,7,11,.45), rgba(5,7,11,.85))", backdropFilter: "blur(3px)" }} aria-live="polite">
            <div className="flex items-center gap-1.5">
              <span className="text-[8px] font-semibold uppercase tracking-[.2em]" style={{ color: BRAND.lime }}>AUREN</span>
              {!aurenTw.done && <span className="text-[8px] uppercase tracking-[.14em] text-white/35">{L.ui.tapToSkip}</span>}
            </div>
            <p ref={speechRef} className={`no-sb mt-0.5 max-h-[13vh] overflow-y-auto text-[13px] leading-snug text-white/95 sm:text-sm ${!aurenTw.done ? "caret" : ""}`}>{aurenTw.shown}</p>
          </button>
        </div>
      </div>

      <div className="px-3 sm:px-5" style={{ paddingTop: "calc(62vh + 14px)", paddingBottom: "170px" }}>
        <div className="mx-auto max-w-3xl space-y-2.5">
          {phase === "intro" && feed.length === 0 && (
            <div className="a-up rounded-2xl border p-4 text-center" style={{ borderColor: "rgba(247,248,250,.1)", background: "rgba(247,248,250,.03)" }}>
              <p className="text-sm text-white/80">{L.ui.introTitle}</p>
              <p className="mt-1 text-xs text-white/50">{L.ui.introSub}</p>
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
                <div className="text-[9px] font-semibold uppercase tracking-[.2em] text-white/50">{name || L.ui.you}{m.toMarcus ? ` ${L.ui.toMarcus}` : ""}</div>
                <p className="mt-0.5 text-sm leading-6 text-white">"{m.text}"</p>
              </div>
            );
            if (m.type === "marcus") return (
              <div key={i} className="a-up max-w-[88%] rounded-2xl rounded-tl-md border p-3" style={{ borderColor: "rgba(255,107,107,.4)", background: "rgba(255,107,107,.09)" }}>
                <div className="flex items-center gap-1.5">
                  <span className="grid h-5 w-5 place-items-center rounded-full text-[9px] font-bold" style={{ background: "rgba(255,107,107,.25)", color: BRAND.warmRed }}>M</span>
                  <span className="text-[9px] font-semibold uppercase tracking-[.16em]" style={{ color: BRAND.warmRed }}>{L.ui.personaName}</span>
                </div>
                <p className="mt-1 text-sm leading-6 text-white/95">{m.text}</p>
              </div>
            );
            if (m.type === "obs") {
              const label = m.obsId ? STR[lang].obs[m.obsId] : L.sig[m.sig];
              const deltaStr = m.obsId
                ? Object.entries(m.adj || {}).map(([k, v]) => `${L.dims[k]} ${v > 0 ? "+" : ""}${v}`).join(" · ")
                : `${L.dims[m.dim]} ${m.delta > 0 ? "+" : ""}${m.delta}`;
              return (
                <div key={i} className="a-up mx-auto flex max-w-[94%] items-baseline gap-2 rounded-full border px-3.5 py-1.5" style={{ borderColor: m.tone === "risky" ? "rgba(255,107,107,.35)" : "rgba(203,251,0,.25)", background: "rgba(8,10,15,.5)" }}>
                  <span className="shrink-0 text-[8px] font-semibold uppercase tracking-[.18em]" style={{ color: m.tone === "risky" ? BRAND.warmRed : BRAND.lime }}>{L.ui.observed}</span>
                  <span className="text-[11px] leading-4 text-white/75">{label}{deltaStr ? " · " : ""}<span className="font-mono" style={{ color: BRAND.gold }}>{deltaStr}</span></span>
                </div>
              );
            }
            if (m.type === "sys") return (
              <div key={i} className="a-up text-center font-mono text-[9px] uppercase tracking-[.18em] text-white/40">— {L.ui[m.key]} —</div>
            );
            if (m.type === "ails") return (
              <div key={i} className="a-up rounded-2xl border p-4" style={{ borderColor: "rgba(203,251,0,.4)", background: "rgba(8,10,15,.6)" }}>
                <div className="flex items-baseline justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-[.2em]" style={{ color: BRAND.lime }}>{L.ui.ailsTitle}</span>
                  <span className="font-mono text-3xl font-bold" style={{ color: BRAND.lime }}>{m.score}</span>
                </div>
                <div className="mt-2.5 space-y-1.5">
                  {DIM_KEYS.map(k => (
                    <div key={k} className="flex items-center gap-2 text-[11px]">
                      <span className="w-32 shrink-0 text-white/70">{L.dims[k]}</span>
                      <div className="h-1.5 flex-1 rounded-full" style={{ background: "rgba(255,255,255,.1)" }}>
                        <div className="h-1.5 rounded-full transition-all duration-1000" style={{ width: `${m.dims[k]}%`, background: dimColor(m.dims[k]) }} />
                      </div>
                      <span className="w-6 text-right font-mono text-white/80">{m.dims[k]}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-2 text-[10px] text-white/50">{L.ui.ailsNote}</p>
              </div>
            );
            if (m.type === "scorecard") return (
              <div key={i} className="a-up rounded-2xl border p-4" style={{ borderColor: `${vMeta.color}55`, background: "rgba(8,10,15,.65)" }}>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-[.2em]" style={{ color: BRAND.lime }}>{L.ui.scTitle} · {name}</div>
                    <div className="mt-0.5 text-lg font-semibold">{L.ui.scOwnWords}</div>
                  </div>
                  <span className="rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[.14em]" style={{ borderColor: `${vMeta.color}66`, color: vMeta.color, background: `${vMeta.color}12` }}>{vMeta.label}</span>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-lg border p-2" style={{ borderColor: "rgba(247,248,250,.15)" }}><div className="text-[8px] uppercase tracking-[.14em] text-white/55">{L.ui.before}</div><div className="font-mono text-xl font-bold text-white/80">{startAils}</div></div>
                  <div className="grid place-items-center rounded-lg border p-2" style={{ borderColor: "rgba(247,248,250,.15)" }}><span className="font-mono text-[11px]" style={{ color: ails >= startAils ? BRAND.lime : BRAND.warmRed }}>{ails >= startAils ? "▲" : "▼"} {Math.abs(ails - startAils)} · {L.ui.session}</span></div>
                  <div className="rounded-lg border p-2" style={{ borderColor: "rgba(203,251,0,.4)", background: "rgba(203,251,0,.07)" }}><div className="text-[8px] uppercase tracking-[.14em] text-white/60">{L.ui.now}</div><div className="font-mono text-xl font-bold" style={{ color: BRAND.lime }}>{ails}</div></div>
                </div>
                <div className="mt-3 space-y-2">
                  {evidence.map((e, j) => (
                    <div key={j} className="rounded-xl border p-3" style={{ borderColor: "rgba(247,248,250,.12)", background: "rgba(247,248,250,.03)" }}>
                      <div className="flex flex-wrap items-baseline justify-between gap-1.5">
                        <span className="text-[11px] font-semibold" style={{ color: toneColor[e.tone] }}>{L.ui.exchange} {e.turn + 1} · {L.sig[e.sig]}</span>
                        <span className="font-mono text-[10px] font-semibold" style={{ color: toneColor[e.tone] }}>{L.dims[e.dim]} {e.delta > 0 ? "+" : ""}{e.delta}</span>
                      </div>
                      <p className="mt-1 border-l-2 pl-2.5 text-[13px] italic text-white/95" style={{ borderColor: toneColor[e.tone] }}>"{e.quote}"</p>
                      <p className="mt-1 text-[11px] leading-4 text-white/60">{L.ana[e.ana]}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-2.5 text-[10px] italic leading-4 text-white/50">{L.ui.evidenceQuote}</p>
                <div className="mt-2.5 rounded-xl border p-3 text-[12px] text-white/85" style={{ borderColor: `${vMeta.color}40`, background: `${vMeta.color}0D` }}>{vMeta.note}</div>
                <div className="mt-2.5 rounded-xl border p-3" style={{ borderColor: "rgba(245,197,24,.4)", background: "rgba(245,197,24,.07)" }}>
                  <span className="text-[8px] font-semibold uppercase tracking-[.2em]" style={{ color: BRAND.regYellow }}>{L.ui.regSees}</span>
                  <p className="mt-1 text-[11px] leading-4 text-white/80">{L.ui.regBody(verdict === "certified" ? L.ui.regPassed : evidence[2] && evidence[2].tone === "risky" ? L.ui.regFailed : L.ui.regCoached)}</p>
                </div>
                <div className="mt-3.5 flex flex-wrap gap-2">
                  <button onClick={rehearseAgain} className="rounded-full px-4 py-2 text-[13px] font-semibold" style={{ background: BRAND.lime, color: BRAND.graphite }}>{L.ui.rehearseAgain}</button>
                  <button onClick={restart} className="rounded-full border px-4 py-2 text-[13px] font-semibold text-white/90" style={{ borderColor: "rgba(247,248,250,.3)" }}>{L.ui.restart}</button>
                </div>
              </div>
            );
            return null;
          })}
        </div>
      </div>

      {inputBar}
    </main>
  );
}
