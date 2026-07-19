// @ts-nocheck
import { useEffect, useState } from "react";
import { HalfBody } from "./Mvp";

/**
 * AUREN — product site (RoleFit-style editorial page)
 * Complete investor-facing wrapper around the live demo:
 * hero · challenge · platform · persona library · scorecard engine ·
 * first target · security & governance · deployment · who we are ·
 * contact (form) · company footer — plus a hamburger sitemap menu.
 * Content sourced from the AUREN papers.
 */

const SERIF = "Didot, 'Didot LT STD', 'Bodoni MT', 'Playfair Display', Georgia, 'Times New Roman', serif";
const INK = "#101114";
const MUT = "#6E7076";
const LINE = "#E4E4E0";
const PAPER = "#F7F7F4";
const LIME = "#B8E600";

const SITEMAP = [
  ["overview", "Overview"],
  ["challenge", "The Challenge"],
  ["platform", "The Platform"],
  ["personas", "AI Persona Library"],
  ["scorecard", "Scorecard Engine"],
  ["target", "First Target"],
  ["governance", "Security & Governance"],
  ["deployment", "Deployment"],
  ["who", "Who We Are"],
  ["contact", "Contact"],
];


// Inline SVG icons — consistent stroke set, no Unicode-glyph fallback risk
function Icon({ name, size = 20 }) {
  const P = {
    alert: <><path d="M12 3.5 21 19H3L12 3.5Z" /><line x1="12" y1="10" x2="12" y2="14" /><circle cx="12" cy="16.6" r=".9" fill="currentColor" stroke="none" /></>,
    eye: <><path d="M2.5 12S6 5.8 12 5.8 21.5 12 21.5 12 18 18.2 12 18.2 2.5 12 2.5 12Z" /><circle cx="12" cy="12" r="2.6" /></>,
    pencil: <><path d="M4 20l1-4L16.5 4.5a2.1 2.1 0 0 1 3 3L8 19l-4 1Z" /><line x1="14.5" y1="6.5" x2="17.5" y2="9.5" /></>,
    sparkle: <path d="M12 3l1.8 6.2L20 11l-6.2 1.8L12 19l-1.8-6.2L4 11l6.2-1.8L12 3Z" />,
    person: <><circle cx="12" cy="8" r="3.4" /><path d="M4.8 20c1.2-4 4-5.6 7.2-5.6s6 1.6 7.2 5.6" /></>,
    bars: <><line x1="5" y1="20" x2="5" y2="12" /><line x1="12" y1="20" x2="12" y2="6" /><line x1="19" y1="20" x2="19" y2="9" /></>,
    chat: <path d="M4 5.5h16v10.5H9L4 20V5.5Z" />,
    grid: <><rect x="4" y="4" width="6.5" height="6.5" rx="1" /><rect x="13.5" y="4" width="6.5" height="6.5" rx="1" /><rect x="4" y="13.5" width="6.5" height="6.5" rx="1" /><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1" /></>,
    phone: <path d="M6 3.5h4l1.5 4.5-2.4 1.8a12.5 12.5 0 0 0 5.1 5.1l1.8-2.4L20.5 14v4c0 1.4-1.1 2.6-2.5 2.4C10.5 19.5 4.5 13.5 3.6 6 3.4 4.6 4.6 3.5 6 3.5Z" />,
    video: <><rect x="3" y="6" width="13" height="12" rx="2" /><path d="M16 10.5 21 8v8l-5-2.5" /></>,
    chartDown: <><path d="M4 6l5 5 3.5-3.5L20 15" /><path d="M20 10.5V15h-4.5" /></>,
    monitor: <><rect x="3.5" y="4.5" width="17" height="11.5" rx="1.6" /><line x1="9" y1="20" x2="15" y2="20" /><line x1="12" y1="16" x2="12" y2="20" /></>,
    tablet: <><rect x="6" y="3.5" width="12" height="17" rx="2" /><circle cx="12" cy="17.6" r=".8" fill="currentColor" stroke="none" /></>,
    code: <><path d="m8.5 8-4 4 4 4" /><path d="m15.5 8 4 4-4 4" /></>,
    api: <><circle cx="12" cy="12" r="3" /><line x1="12" y1="3" x2="12" y2="7" /><line x1="12" y1="17" x2="12" y2="21" /><line x1="3" y1="12" x2="7" y2="12" /><line x1="17" y1="12" x2="21" y2="12" /></>,
    mic: <><rect x="9.5" y="3.5" width="5" height="10" rx="2.5" /><path d="M6 11.5a6 6 0 0 0 12 0" /><line x1="12" y1="17.5" x2="12" y2="21" /></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {P[name] || P.sparkle}
    </svg>
  );
}

function Eyebrow({ children }) {
  return <div style={{ color: MUT }} className="text-[15px]">{children}</div>;
}
function H2({ children }) {
  return <h2 className="mt-3 text-[34px] leading-[1.08] sm:text-5xl" style={{ fontFamily: SERIF, color: INK, fontWeight: 500 }}>{children}</h2>;
}
function Em({ children }) {
  return <em style={{ fontStyle: "italic", fontWeight: 600 }}>{children}</em>;
}
function Sub({ children }) {
  return <p className="mt-5 max-w-xl text-[17px] leading-7" style={{ color: "#4A4C52" }}>{children}</p>;
}
function NumCard({ icon, num, total, title, body, serifTitle = false, onClick }) {
  return (
    <button onClick={onClick} className="block w-full border-t px-6 py-8 text-left transition hover:bg-black/[.02] first:border-t-0 sm:px-8" style={{ borderColor: LINE }}>
      <div className="flex items-start justify-between">
        <div className="grid h-12 w-12 place-items-center rounded-full border text-lg" style={{ borderColor: LINE, color: INK }}>{icon}</div>
        <span className="text-sm" style={{ color: MUT }}>{num}{total ? ` / ${total}` : ""}</span>
      </div>
      <h3 className="mt-8 text-[24px] leading-tight" style={serifTitle ? { fontFamily: SERIF, color: INK, fontWeight: 500 } : { color: INK, fontWeight: 600 }}>{title}</h3>
      <p className="mt-3 text-[16px] leading-6" style={{ color: MUT }}>{body}</p>
    </button>
  );
}
function ScoreRow({ label, chip, tone = "neutral" }) {
  const style = tone === "pass" ? { borderColor: "#B7C9B4", color: "#2F6B3C" }
    : tone === "warn" ? { borderColor: "#E6B24A", color: "#B07500" }
    : tone === "risk" ? { borderColor: "#E08A85", color: "#C0392B" }
    : { borderColor: LINE, color: INK };
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border bg-white px-5 py-4" style={{ borderColor: LINE }}>
      <span className="text-[16px]" style={{ color: INK }}>{label}</span>
      <span className="shrink-0 rounded-full border px-3.5 py-1 font-mono text-[13px]" style={{ ...style, background: "#FFFFFF" }}>{chip}</span>
    </div>
  );
}
function Field({ label, required, placeholder, textarea, value, onChange }) {
  return (
    <label className="block">
      <span className="text-[16px] font-medium" style={{ color: INK }}>{label} {required && <span style={{ color: "#C0392B" }}>*</span>}</span>
      {textarea ? (
        <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={4}
          className="mt-2 w-full border-b bg-transparent pb-3 text-[17px] outline-none placeholder:text-black/30 focus:border-black"
          style={{ borderColor: LINE, color: INK }} />
      ) : (
        <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
          className="mt-2 w-full border-b bg-transparent pb-3 text-[17px] outline-none placeholder:text-black/30 focus:border-black"
          style={{ borderColor: LINE, color: INK }} />
      )}
    </label>
  );
}

export default function Landing({ onTry }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({ name: "", company: "", email: "", msg: "" });
  const [sent, setSent] = useState(false);
  useEffect(() => { document.body.style.overflow = menuOpen ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [menuOpen]);
  const goTo = (id) => {
    setMenuOpen(false);
    setTimeout(() => { const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: "smooth", block: "start" }); }, 60);
  };
  const submitForm = () => { if (form.name.trim() && form.email.trim() && form.msg.trim()) setSent(true); };

  return (
    <main id="overview" className="min-h-screen" style={{ background: PAPER, color: INK, fontFamily: "-apple-system, 'SF Pro Text', 'Segoe UI', system-ui, sans-serif" }}>
      {/* ── nav ── */}
      <header className="sticky top-0 z-40 border-b" style={{ background: "rgba(247,247,244,.92)", backdropFilter: "blur(10px)", borderColor: LINE }}>
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3.5">
          <button onClick={() => goTo("overview")} className="flex items-center gap-2.5 text-left">
            <div className="grid h-10 w-10 place-items-center rounded-2xl border-2" style={{ borderColor: INK }}>
              <div className="h-4 w-4 rounded-full border-2 relative" style={{ borderColor: INK }}>
                <span className="absolute left-[-6px] right-[-6px] top-1/2 h-[2px] -translate-y-1/2" style={{ background: INK }} />
              </div>
            </div>
            <div className="leading-none">
              <span className="text-xl font-bold tracking-[.14em]">AUREN</span>
              <div className="mt-0.5 text-[9px] uppercase tracking-[.22em]" style={{ color: MUT }}>Investor Intelligence Academy</div>
            </div>
          </button>
          <div className="flex items-center gap-2.5">
            <button onClick={onTry} className="hidden rounded-full px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-85 sm:block" style={{ background: INK }}>
              Try the demo →
            </button>
            <button onClick={() => setMenuOpen(true)} aria-label="Open menu" className="grid h-12 w-12 place-items-center rounded-full border bg-white transition hover:bg-black/[.03]" style={{ borderColor: LINE }}>
              <div className="space-y-1.5">
                <span className="block h-[2px] w-5" style={{ background: INK }} />
                <span className="block h-[2px] w-5" style={{ background: INK }} />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* ── sitemap menu overlay ── */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto" style={{ background: PAPER }}>
          <div className="mx-auto max-w-5xl px-5 py-4">
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold tracking-[.14em]">AUREN</span>
              <button onClick={() => setMenuOpen(false)} aria-label="Close menu" className="grid h-12 w-12 place-items-center rounded-full border bg-white text-lg" style={{ borderColor: LINE }}>✕</button>
            </div>
            <nav className="mt-10 space-y-1">
              {SITEMAP.map(([id, label], i) => (
                <button key={id} onClick={() => goTo(id)} className="flex w-full items-baseline justify-between border-b py-4 text-left transition hover:pl-2" style={{ borderColor: LINE }}>
                  <span className="text-[30px] leading-tight sm:text-4xl" style={{ fontFamily: SERIF, color: INK }}>{label}</span>
                  <span className="font-mono text-sm" style={{ color: MUT }}>{String(i + 1).padStart(2, "0")}</span>
                </button>
              ))}
            </nav>
            <button onClick={() => { setMenuOpen(false); onTry(); }} className="mt-8 w-full rounded-full px-7 py-4 text-[16px] font-semibold text-white" style={{ background: INK }}>
              Try the live demo →
            </button>
            <p className="mt-6 pb-8 text-center text-[12px]" style={{ color: MUT }}>IOSCO TechSprint 2026 · Demo Day 8 October · Madrid</p>
          </div>
        </div>
      )}

      {/* ── HERO ── */}
      <section className="mx-auto max-w-5xl px-5 pb-16 pt-14 sm:pt-20">
        <Eyebrow>IOSCO TechSprint 2026 · Demo Day 8 October · Madrid</Eyebrow>
        <h1 className="mt-4 max-w-3xl text-[42px] leading-[1.05] sm:text-6xl" style={{ fontFamily: SERIF, fontWeight: 500 }}>
          Rehearse every investment scam <Em>before it happens.</Em>
        </h1>
        <Sub>
          AUREN is an AI rehearsal platform where retail investors practice — with a hyper-realistic digital human —
          the exact situations that determine their outcomes: deepfake endorsements, misleading AI tools,
          social-media pressure, and market panic. Every session is scored with quote-level evidence.
        </Sub>
        <div className="mt-8 flex flex-wrap items-center gap-5">
          <button onClick={onTry} className="rounded-full px-7 py-4 text-[15px] font-semibold text-white transition hover:opacity-85" style={{ background: INK }}>
            Try the live demo →
          </button>
          <button onClick={() => goTo("platform")} className="text-[15px] font-medium" style={{ color: INK }}>See how it works →</button>
        </div>

        <div className="mx-auto mt-14 w-full max-w-sm">
          <button onClick={onTry} className="block w-full overflow-hidden rounded-[2.4rem] border-[10px] text-left shadow-2xl" style={{ borderColor: "#111", background: "#05070B" }}>
            <div className="relative" style={{ aspectRatio: "9/13" }}>
              <HalfBody variant="auren" speaking={true} />
              <div className="absolute top-3 left-3 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: LIME }} />
                <span className="rounded-full border px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[.16em]" style={{ color: LIME, borderColor: "rgba(184,230,0,.5)", background: "rgba(5,7,11,.6)" }}>AUREN · live</span>
              </div>
              <div className="absolute inset-x-3 bottom-3 rounded-xl p-3" style={{ background: "rgba(5,7,11,.78)" }}>
                <div className="text-[9px] font-semibold uppercase tracking-[.18em]" style={{ color: LIME }}>AUREN speaks</div>
                <p className="mt-1 text-[13px] leading-snug text-white/95">"Before I teach you anything, I'd like to understand how you think about risk, AI, and money."</p>
              </div>
              <div className="absolute bottom-24 right-3 rounded-full px-4 py-2 text-[13px] font-semibold" style={{ background: "#FFFFFF", color: INK }}>Try Now →</div>
            </div>
          </button>
          <p className="mt-3 text-center text-[13px]" style={{ color: MUT }}>Live interactive demo · ~3 minutes · she speaks — working English · Bahasa Melayu · Español toggle (中文 · العربية in production)</p>
        </div>
      </section>

      {/* ── THE CHALLENGE ── */}
      <section id="challenge" className="border-t" style={{ borderColor: LINE }}>
        <div className="mx-auto max-w-5xl px-5 py-16">
          <Eyebrow>The Challenge</Eyebrow>
          <H2>Knowledge does not survive <Em>contact with pressure.</Em></H2>
          <Sub>
            “Investors who can correctly define loss aversion in a quiz still panic-sell in a crash. Investors who have
            read about romance scams still transfer funds to persuasive strangers.” — and AI has made the pressure
            industrial. <span style={{ color: INK }}>Fraud is no longer a craft. It is a manufactured product.</span>
          </Sub>
          <div className="mt-10 overflow-hidden rounded-[2rem] border bg-white" style={{ borderColor: LINE }}>
            <NumCard onClick={onTry} icon={<Icon name="alert" />} num="01" total="04" serifTitle title="Fraud at manufacturing scale"
              body="$12.5B lost to digital fraud in 2023 — investment fraud the costliest category at $4.57B, up 38% year-on-year. Generative AI compresses time-to-fraud from weeks to minutes. (FBI IC3)" />
            <NumCard onClick={onTry} icon={<Icon name="eye" />} num="02" total="04" serifTitle title="The old tells are gone"
              body="Deepfake incidents grew ~10× in a single year. Poor spelling and implausible claims no longer identify fraud — AI produces scams with none of those tells. (Sumsub)" />
            <NumCard onClick={onTry} icon={<Icon name="pencil" />} num="03" total="04" serifTitle title="Education arrives too late"
              body="Static courses test memorization, and feedback comes after the module ends — not at the moment of decision, where behavior is actually formed." />
            <NumCard onClick={onTry} icon={<Icon name="sparkle" />} num="04" total="04" serifTitle title="AI is trusted blindly"
              body="Retail investors treat AI answers as authoritative — hallucinated statistics, delivered with the fluency of a trusted advisor, drive real losses." />
          </div>
        </div>
      </section>

      {/* ── THE PLATFORM ── */}
      <section id="platform" className="border-t" style={{ borderColor: LINE }}>
        <div className="mx-auto max-w-5xl px-5 py-16">
          <Eyebrow>The Platform</Eyebrow>
          <H2>AUREN turns investor education into <Em>trainable, measurable skill.</Em></H2>
          <Sub>
            One core platform — Digital Human host, AI personas, live rehearsal, real-time coaching, evidential
            scorecard, regulator dashboard — configurable for any jurisdiction. “Configuration, not code changes,
            is the localization mechanism.”
          </Sub>
          <div className="mt-10 rounded-[2rem] border bg-white p-5 sm:p-8" style={{ borderColor: LINE }}>
            <div className="text-[15px]" style={{ color: MUT }}>Operating flow — every card opens the live demo</div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {[
                ["person", "01", "Onboard & interview", "AUREN meets the investor in conversation — eKYC-ready, no forms, no quiz."],
                ["bars", "02", "AILS score", "A five-dimension literacy score generated from the conversation itself."],
                ["chat", "03", "AI roleplay", "The investor converses with realistic scam personas — deepfakes, recruiters, panic."],
                ["pencil", "04", "Real-time coaching", "Risky phrasing and missed verification surface live, mid-conversation."],
                ["sparkle", "05", "Evidential scorecard", "Quote-level evidence: what was said, why it mattered, what to say instead."],
                ["grid", "06", "Regulator dashboard", "Anonymized cohort analytics — an early-warning sensor network for emerging fraud."],
              ].map(([icon, n, t, b]) => (
                <button key={n} onClick={onTry} className="rounded-2xl border p-5 text-left transition hover:bg-black/[.02]" style={{ borderColor: LINE }}>
                  <div className="flex items-start justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-full border" style={{ borderColor: LINE, color: INK }}><Icon name={icon} /></span>
                    <span className="text-sm" style={{ color: MUT }}>{n}</span>
                  </div>
                  <div className="mt-4 text-[17px] font-semibold" style={{ color: INK }}>{t}</div>
                  <p className="mt-1.5 text-[14px] leading-5" style={{ color: MUT }}>{b}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── AI PERSONA LIBRARY ── */}
      <section id="personas" className="border-t" style={{ borderColor: LINE }}>
        <div className="mx-auto max-w-5xl px-5 py-16">
          <Eyebrow>AI Persona Library</Eyebrow>
          <H2>AI mentors, recruiters, and scammers <Em>that pressure like real people.</Em></H2>
          <Sub>
            AUREN personas hesitate, push back, invoke urgency, and exploit trust — the exact behavioral levers
            documented in retail-fraud research. Built to feel like the real event, not a chatbot. Tap any persona
            to meet them in the demo.
          </Sub>
          <div className="mt-10 overflow-hidden rounded-[2rem] border bg-white" style={{ borderColor: LINE }}>
            {[
              ["person", "AUREN — the mentor", "HOST · EVERY STEP OF THE JOURNEY"],
              ["chat", "“Marcus” — scam recruiter", "WHATSAPP · RECRUITMENT PATTERN"],
              ["video", "Deepfake CEO", "SOCIAL VIDEO · FAKE ENDORSEMENT"],
              ["phone", "Voice-clone “advisor”", "PHONE · URGENT TRANSFER"],
              ["mic", "Synthetic finfluencer", "TIKTOK · UNVERIFIABLE ADVICE"],
              ["chartDown", "Market-panic voice", "CRASH · LOSS AVERSION"],
            ].map(([icon, name, tag], i) => (
              <button key={name} onClick={onTry} className={`flex w-full items-center gap-5 px-6 py-6 text-left transition hover:bg-black/[.02] sm:px-8 ${i > 0 ? "border-t" : ""}`} style={{ borderColor: LINE }}>
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border" style={{ borderColor: LINE, color: INK }}><Icon name={icon} size={24} /></span>
                <span>
                  <span className="block text-[22px] leading-tight" style={{ fontFamily: SERIF, color: INK, fontWeight: 500 }}>{name}</span>
                  <span className="mt-1 block text-[12px] tracking-[.18em]" style={{ color: MUT }}>{tag}</span>
                </span>
                <span className="ml-auto text-lg" style={{ color: MUT }}>→</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── SCORECARD ENGINE ── */}
      <section id="scorecard" className="border-t" style={{ borderColor: LINE }}>
        <div className="mx-auto max-w-5xl px-5 py-16">
          <Eyebrow>Scorecard Engine · AILS</Eyebrow>
          <H2>Every rehearsal ends with <Em>a score and the evidence behind it.</Em></H2>
          <Sub>
            “The learner is not told ‘you scored 42.’ They are shown their own words, the exact moments those words
            revealed vulnerability or demonstrated skill, and the specific effect on each competency dimension.
            The evidence is the transcript.”
          </Sub>
          <div className="mt-10 rounded-[2rem] border bg-white p-5 sm:p-8" style={{ borderColor: LINE }}>
            <div className="flex items-baseline justify-between">
              <span className="text-[15px]" style={{ color: MUT }}>Sample scorecard · WhatsApp scam rehearsal</span>
              <span className="font-mono text-[15px]" style={{ color: INK }}>AILS 42 → 76</span>
            </div>
            <div className="mt-5 space-y-3">
              <ScoreRow label="Verification protocol" chip="Pass" tone="pass" />
              <ScoreRow label="Scam resistance" chip="82 / 100" />
              <ScoreRow label="Trust-transfer bias" chip="Needs Improvement" tone="warn" />
              <ScoreRow label="Urgency response" chip="1 risk detected" tone="risk" />
              <ScoreRow label="Session verdict" chip="Certified" tone="pass" />
            </div>
            <div className="mt-5 rounded-2xl border px-5 py-4 text-[14px] leading-6" style={{ borderColor: LINE, color: MUT }}>
              <span className="font-mono text-[12px] uppercase tracking-wide" style={{ color: INK }}>Evidence · Turn 6</span><br />
              <em style={{ color: INK }}>"I'm going to verify this offline before I do anything."</em> — verification protocol
              correctly applied under deadline pressure; certification criterion met. Scam Resistance +6.
            </div>
            <button onClick={onTry} className="mt-6 rounded-full px-6 py-3.5 text-[15px] font-semibold text-white" style={{ background: INK }}>Earn your own scorecard →</button>
          </div>
        </div>
      </section>

      {/* ── FIRST TARGET ── */}
      <section id="target" className="border-t" style={{ borderColor: LINE }}>
        <div className="mx-auto max-w-5xl px-5 py-16">
          <Eyebrow>First Target</Eyebrow>
          <H2>Our first focus area: <Em>retail investors in the AI-scam era.</Em></H2>
          <Sub>
            Six rehearsal categories, one engine — each mapped to a documented vulnerability, each localized per
            jurisdiction: “a UK deepfake scenario looks different from a Brazilian pump-and-dump, and both differ
            from a Malaysian WhatsApp investment group.”
          </Sub>
          <div className="mt-10 overflow-hidden rounded-[2rem] border bg-white" style={{ borderColor: LINE }}>
            <NumCard onClick={onTry} icon={<Icon name="video" />} num="01" serifTitle title="Deepfake & voice-clone recognition"
              body="Rehearse fabricated CEO endorsements and cloned advisor calls — coached on lip-sync, blink-rate, and audio artifacts, on the exact asset being judged." />
            <NumCard onClick={onTry} icon={<Icon name="chat" />} num="02" serifTitle title="Social-media pressure"
              body="Live roleplay against WhatsApp recruiters, Telegram pump-and-dump rings, and synthetic finfluencers — resistance built through repetition." />
            <NumCard onClick={onTry} icon={<Icon name="sparkle" />} num="03" serifTitle title="AI-tool literacy"
              body="Dialogues with chatbots that hallucinate, guarantee returns, or blur education into advice — building calibrated trust, not blind trust." />
            <NumCard onClick={onTry} icon={<Icon name="chartDown" />} num="04" serifTitle title="Market-panic discipline"
              body="Simulated crashes and FOMO cycles — practicing the discipline of returning to a written plan under fear and greed." />
          </div>
        </div>
      </section>

      {/* ── SECURITY & GOVERNANCE ── */}
      <section id="governance" className="border-t" style={{ borderColor: LINE }}>
        <div className="mx-auto max-w-5xl px-5 py-16">
          <Eyebrow>Security & Operations</Eyebrow>
          <H2>Regulator-grade trust, <Em>auditability built in.</Em></H2>
          <Sub>
            Built for the governance, control, and reliability that regulators and financial institutions require —
            the platform's Trust Layer is a qualifying condition, not a feature.
          </Sub>
          <div className="mt-10 overflow-hidden rounded-[2rem] border bg-white" style={{ borderColor: LINE }}>
            {[
              ["01", "Integrated eKYC + liveness detection", "Passport, national ID, or QR-to-phone — the credential is trustworthy from day one."],
              ["02", "Privacy by design", "Cohort analytics are anonymized; no personal data leaves the session."],
              ["03", "Audit logs at every layer", "Every score movement is anchored in transcript evidence — auditable by regulators, defensible to procurement."],
              ["04", "Per-jurisdiction configuration", "Language, compliance regime, escalation paths, and reporting formats — configured, not rebuilt."],
              ["05", "Regulator-updated scenario libraries", "UK FCA warnings, MAS typologies, SEBI alerts, CNMV advisories feed jurisdiction-specific rehearsals."],
              ["06", "Audit-ready exports", "Formatted for IOSCO C8 reporting and cross-jurisdictional comparison."],
            ].map(([n, t, b], i) => (
              <div key={n} className={`flex items-start gap-5 px-6 py-6 sm:px-8 ${i > 0 ? "border-t" : ""}`} style={{ borderColor: LINE }}>
                <span className="pt-1 font-mono text-sm" style={{ color: MUT }}>{n}</span>
                <div>
                  <div className="text-[19px] font-semibold" style={{ color: INK }}>{t}</div>
                  <p className="mt-1 text-[14px] leading-5" style={{ color: MUT }}>{b}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DEPLOYMENT ── */}
      <section id="deployment" className="border-t" style={{ borderColor: LINE }}>
        <div className="mx-auto max-w-5xl px-5 py-16">
          <Eyebrow>Deployment</Eyebrow>
          <H2>One platform. <Em>Every surface investors are on.</Em></H2>
          <div className="mt-10 overflow-hidden rounded-[2rem] border bg-white" style={{ borderColor: LINE }}>
            <NumCard onClick={onTry} icon={<Icon name="monitor" />} num="01" serifTitle title="Web & Mobile"
              body="Consumers rehearse anywhere — freemium B2C with premium scenarios and verified credentials." />
            <NumCard onClick={onTry} icon={<Icon name="tablet" />} num="02" serifTitle title="Kiosk & Branch"
              body="Onboarding-integrated rehearsal for bank and broker customers, particularly around high-risk products." />
            <NumCard onClick={onTry} icon={<Icon name="code" />} num="03" serifTitle title="Embedded Widget / SDK"
              body="Integrate AUREN into existing LMS, banking apps, university portals, and enterprise systems." />
            <NumCard onClick={onTry} icon={<Icon name="api" />} num="04" serifTitle title="Regulator API"
              body="National literacy programs with governed access to anonymized cohort analytics and vulnerability heatmaps." />
          </div>
        </div>
      </section>

      {/* ── WHO WE ARE ── */}
      <section id="who" className="border-t" style={{ borderColor: LINE }}>
        <div className="mx-auto max-w-5xl px-5 py-16">
          <Eyebrow>Who We Are</Eyebrow>
          <H2>Built for regulators. <Em>Designed for the moment.</Em></H2>
          <Sub>
            AUREN — the Investor Intelligence Academy — is our submission to the IOSCO TechSprint 2026, answering both
            problem statements: AI-enabled fraud, and AI literacy for capital markets. Multilingual from day one
            (EN · 中文 · العربية · Bahasa · ES) and architected to serve IOSCO's 130+ member jurisdictions without
            bespoke rebuilds — auditable at every layer. Avatar realism in production is delivered with our digital-human
            technology partner, Klleon.
          </Sub>
          <blockquote className="mt-10 max-w-2xl text-[24px] leading-9 sm:text-[28px]" style={{ fontFamily: SERIF, color: INK }}>
            “AUREN is not a course. It is where investors rehearse the moment before it happens — so that when it
            happens, they are ready.”
          </blockquote>
          <div className="mt-3 text-[13px] uppercase tracking-[.18em]" style={{ color: MUT }}>Full Project Paper · Executive Summary</div>
          <button onClick={onTry} className="mt-10 rounded-full px-7 py-4 text-[15px] font-semibold text-white transition hover:opacity-85" style={{ background: INK }}>
            Try the live demo →
          </button>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="border-t" style={{ borderColor: LINE }}>
        <div className="mx-auto max-w-5xl px-5 py-16">
          <Eyebrow>Contact</Eyebrow>
          <H2>Considering AUREN? <Em>Reach out</Em> directly.</H2>
          <Sub>
            Submit the form below — we respond within 1–2 business days. Regulators, banks, universities, and
            investors welcome.
          </Sub>
          <a href="mailto:team@auren.academy" className="mt-8 inline-flex items-center gap-3 rounded-full border bg-white px-6 py-4 font-mono text-[16px] transition hover:bg-black/[.02]" style={{ borderColor: LINE, color: INK }}>
            ✉ team@auren.academy <span style={{ color: MUT }}>↗</span>
          </a>
          {!sent ? (
            <div className="mt-10 max-w-xl space-y-8">
              <Field label="Name" required placeholder="Jane Doe" value={form.name} onChange={v => setForm(f => ({ ...f, name: v }))} />
              <Field label="Company" placeholder="Company name" value={form.company} onChange={v => setForm(f => ({ ...f, company: v }))} />
              <Field label="Email" required placeholder="you@company.com" value={form.email} onChange={v => setForm(f => ({ ...f, email: v }))} />
              <Field label="Message" required textarea placeholder="Tell us about your use case, jurisdiction, and timeline" value={form.msg} onChange={v => setForm(f => ({ ...f, msg: v }))} />
              <button onClick={submitForm} disabled={!(form.name.trim() && form.email.trim() && form.msg.trim())}
                className="rounded-full px-7 py-4 text-[15px] font-semibold text-white transition hover:opacity-85 disabled:opacity-40" style={{ background: INK }}>
                Send message →
              </button>
              <p className="text-[12px]" style={{ color: MUT }}>Prototype form — in production this delivers to the AUREN partnerships inbox.</p>
            </div>
          ) : (
            <div className="mt-10 max-w-xl rounded-[2rem] border bg-white p-8" style={{ borderColor: LINE }}>
              <div className="text-[26px]" style={{ fontFamily: SERIF, color: INK }}>Thank you, {form.name.split(" ")[0]}.</div>
              <p className="mt-2 text-[15px] leading-6" style={{ color: MUT }}>Your message has been received. We'll reply to {form.email} within 1–2 business days. In the meantime — try the live demo.</p>
              <button onClick={onTry} className="mt-6 rounded-full px-6 py-3.5 text-[15px] font-semibold text-white" style={{ background: INK }}>Try the live demo →</button>
            </div>
          )}
        </div>
      </section>

      {/* ── COMPANY FOOTER ── */}
      <footer className="border-t" style={{ borderColor: LINE }}>
        <div className="mx-auto max-w-5xl px-5 py-14">
          <div className="flex items-center gap-2.5">
            <div className="grid h-10 w-10 place-items-center rounded-2xl border-2" style={{ borderColor: INK }}>
              <div className="h-4 w-4 rounded-full border-2 relative" style={{ borderColor: INK }}>
                <span className="absolute left-[-6px] right-[-6px] top-1/2 h-[2px] -translate-y-1/2" style={{ background: INK }} />
              </div>
            </div>
            <span className="text-2xl font-bold tracking-[.12em]">AUREN</span>
          </div>
          <h3 className="mt-6 max-w-lg text-[30px] leading-tight sm:text-4xl" style={{ fontFamily: SERIF, fontWeight: 500 }}>
            Building <Em>trained instincts</Em> for the AI era.
          </h3>
          <p className="mt-4 max-w-xl text-[15px] leading-6" style={{ color: MUT }}>
            AUREN is an investor-education rehearsal platform built on AI digital-human technology, designed for
            regulators, financial institutions, and universities.
          </p>
          <div className="mt-10 grid gap-10 sm:grid-cols-3">
            <div>
              <div className="text-[14px]" style={{ color: MUT }}>Product</div>
              <div className="mt-4 space-y-3">
                {[["platform", "The Platform"], ["personas", "Persona Library"], ["scorecard", "Scorecard Engine"], ["deployment", "Deployment"]].map(([id, l]) => (
                  <button key={id} onClick={() => goTo(id)} className="block text-[17px]" style={{ color: INK }}>{l}</button>
                ))}
              </div>
            </div>
            <div>
              <div className="text-[14px]" style={{ color: MUT }}>Company</div>
              <div className="mt-4 space-y-3">
                {[["who", "About"], ["challenge", "Why now"], ["governance", "Security"], ["contact", "Contact"]].map(([id, l]) => (
                  <button key={id} onClick={() => goTo(id)} className="block text-[17px]" style={{ color: INK }}>{l}</button>
                ))}
              </div>
            </div>
            <div>
              <div className="text-[14px]" style={{ color: MUT }}>Contact</div>
              <div className="mt-4 space-y-3 text-[17px]" style={{ color: INK }}>
                <a className="block" href="mailto:team@auren.academy">team@auren.academy</a>
                <button onClick={onTry} className="block" style={{ color: INK }}>Try the live demo →</button>
              </div>
            </div>
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t pt-6 text-[12px]" style={{ borderColor: LINE, color: MUT }}>
            <span>AUREN · Investor Intelligence Academy · v2.0</span>
            <span>IOSCO TechSprint · Demo Day 8 Oct 2026 · Madrid</span>
            <span>Educational platform — not financial advice</span>
          </div>
        </div>
      </footer>

      {/* floating Try Now */}
      <button onClick={onTry} className="fixed bottom-5 right-5 z-40 rounded-full px-6 py-3.5 text-[15px] font-semibold text-white shadow-2xl transition hover:opacity-90" style={{ background: INK }}>
        Try Now →
      </button>
    </main>
  );
}
