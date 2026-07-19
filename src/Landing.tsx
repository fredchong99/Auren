// @ts-nocheck
import { HalfBody } from "./Mvp";

/**
 * AUREN — product landing (RoleFit-style editorial page)
 * Wraps the live demo with the full company story: challenge,
 * platform, scorecard engine, focus area, who we are.
 * Content sourced from the AUREN Concept Paper v2, Full Project
 * Paper, and Project Paper Deck v2.
 */

const SERIF = "Didot, 'Didot LT STD', 'Bodoni MT', 'Playfair Display', Georgia, 'Times New Roman', serif";
const INK = "#101114";
const MUT = "#6E7076";
const LINE = "#E4E4E0";
const PAPER = "#F7F7F4";
const LIME = "#B8E600";

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
function NumCard({ icon, num, total, title, body, serifTitle = false }) {
  return (
    <div className="border-t px-6 py-8 first:border-t-0 sm:px-8" style={{ borderColor: LINE }}>
      <div className="flex items-start justify-between">
        <div className="grid h-12 w-12 place-items-center rounded-full border text-lg" style={{ borderColor: LINE, color: INK }}>{icon}</div>
        <span className="text-sm" style={{ color: MUT }}>{num}{total ? ` / ${total}` : ""}</span>
      </div>
      <h3 className="mt-8 text-[24px] leading-tight" style={serifTitle ? { fontFamily: SERIF, color: INK, fontWeight: 500 } : { color: INK, fontWeight: 600 }}>{title}</h3>
      <p className="mt-3 text-[16px] leading-6" style={{ color: MUT }}>{body}</p>
    </div>
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

export default function Landing({ onTry }) {
  return (
    <main className="min-h-screen" style={{ background: PAPER, color: INK, fontFamily: "-apple-system, 'SF Pro Text', 'Segoe UI', system-ui, sans-serif" }}>
      {/* nav */}
      <header className="sticky top-0 z-40 border-b" style={{ background: "rgba(247,247,244,.92)", backdropFilter: "blur(10px)", borderColor: LINE }}>
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-2.5">
            <div className="grid h-10 w-10 place-items-center rounded-2xl border-2" style={{ borderColor: INK }}>
              <div className="h-4 w-4 rounded-full border-2 relative" style={{ borderColor: INK }}>
                <span className="absolute left-[-6px] right-[-6px] top-1/2 h-[2px] -translate-y-1/2" style={{ background: INK }} />
              </div>
            </div>
            <div className="leading-none">
              <span className="text-xl font-bold tracking-[.14em]">AUREN</span>
              <div className="mt-0.5 text-[9px] uppercase tracking-[.22em]" style={{ color: MUT }}>Investor Intelligence Academy</div>
            </div>
          </div>
          <button onClick={onTry} className="rounded-full px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-85" style={{ background: INK }}>
            Try the demo →
          </button>
        </div>
      </header>

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
          <a href="#platform" className="text-[15px] font-medium" style={{ color: INK }}>See how it works →</a>
        </div>

        {/* product preview — phone frame with the digital human */}
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
          <p className="mt-3 text-center text-[13px]" style={{ color: MUT }}>Live interactive demo · ~3 minutes · type anything, she listens</p>
        </div>
      </section>

      {/* ── THE CHALLENGE ── */}
      <section className="border-t" style={{ borderColor: LINE }}>
        <div className="mx-auto max-w-5xl px-5 py-16">
          <Eyebrow>The Challenge</Eyebrow>
          <H2>Knowledge does not survive <Em>contact with pressure.</Em></H2>
          <Sub>
            “Investors who can correctly define loss aversion in a quiz still panic-sell in a crash. Investors who have
            read about romance scams still transfer funds to persuasive strangers.” — and AI has made the pressure
            industrial. <span style={{ color: INK }}>Fraud is no longer a craft. It is a manufactured product.</span>
          </Sub>
          <div className="mt-10 overflow-hidden rounded-[2rem] border bg-white" style={{ borderColor: LINE }}>
            <NumCard icon="⚠︎" num="01" total="04" serifTitle title="Fraud at manufacturing scale"
              body="$12.5B lost to digital fraud in 2023 — investment fraud the costliest category at $4.57B, up 38% year-on-year. Generative AI compresses time-to-fraud from weeks to minutes. (FBI IC3)" />
            <NumCard icon="◎" num="02" total="04" serifTitle title="The old tells are gone"
              body="Deepfake incidents grew ~10× in a single year. Poor spelling and implausible claims no longer identify fraud — AI produces scams with none of those tells. (Sumsub)" />
            <NumCard icon="✎" num="03" total="04" serifTitle title="Education arrives too late"
              body="Static courses test memorization, and feedback comes after the module ends — not at the moment of decision, where behavior is actually formed." />
            <NumCard icon="✳" num="04" total="04" serifTitle title="AI is trusted blindly"
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
            <div className="text-[15px]" style={{ color: MUT }}>Operating flow</div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {[
                ["⌾", "01", "Onboard & interview", "AUREN meets the investor in conversation — eKYC-ready, no forms, no quiz."],
                ["𝄃𝄃", "02", "AILS score", "A five-dimension literacy score generated from the conversation itself."],
                ["⚉", "03", "AI roleplay", "The investor converses with realistic scam personas — deepfakes, recruiters, panic."],
                ["✎", "04", "Real-time coaching", "Risky phrasing and missed verification surface live, mid-conversation."],
                ["✦", "05", "Evidential scorecard", "Quote-level evidence: what was said, why it mattered, what to say instead."],
                ["▦", "06", "Regulator dashboard", "Anonymized cohort analytics — an early-warning sensor network for emerging fraud."],
              ].map(([icon, n, t, b]) => (
                <div key={n} className="rounded-2xl border p-5" style={{ borderColor: LINE }}>
                  <div className="flex items-start justify-between">
                    <span className="text-lg" style={{ color: INK }}>{icon}</span>
                    <span className="text-sm" style={{ color: MUT }}>{n}</span>
                  </div>
                  <div className="mt-4 text-[17px] font-semibold" style={{ color: INK }}>{t}</div>
                  <p className="mt-1.5 text-[14px] leading-5" style={{ color: MUT }}>{b}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SCORECARD ENGINE ── */}
      <section className="border-t" style={{ borderColor: LINE }}>
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
          </div>
        </div>
      </section>

      {/* ── FIRST TARGET ── */}
      <section className="border-t" style={{ borderColor: LINE }}>
        <div className="mx-auto max-w-5xl px-5 py-16">
          <Eyebrow>First Target</Eyebrow>
          <H2>Our first focus area: <Em>retail investors in the AI-scam era.</Em></H2>
          <Sub>
            Six rehearsal categories, one engine — each mapped to a documented vulnerability, each localized per
            jurisdiction: “a UK deepfake scenario looks different from a Brazilian pump-and-dump, and both differ
            from a Malaysian WhatsApp investment group.”
          </Sub>
          <div className="mt-10 overflow-hidden rounded-[2rem] border bg-white" style={{ borderColor: LINE }}>
            <NumCard icon="▣" num="01" serifTitle title="Deepfake & voice-clone recognition"
              body="Rehearse fabricated CEO endorsements and cloned advisor calls — coached on lip-sync, blink-rate, and audio artifacts, on the exact asset being judged." />
            <NumCard icon="✆" num="02" serifTitle title="Social-media pressure"
              body="Live roleplay against WhatsApp recruiters, Telegram pump-and-dump rings, and synthetic finfluencers — resistance built through repetition." />
            <NumCard icon="✳" num="03" serifTitle title="AI-tool literacy"
              body="Dialogues with chatbots that hallucinate, guarantee returns, or blur education into advice — building calibrated trust, not blind trust." />
            <NumCard icon="𝄢" num="04" serifTitle title="Market-panic discipline"
              body="Simulated crashes and FOMO cycles — practicing the discipline of returning to a written plan under fear and greed." />
          </div>
          <p className="mt-6 max-w-2xl text-[15px] leading-6" style={{ color: MUT }}>
            Deployment pathways: <span style={{ color: INK }}>B2C subscription · bank & broker licensing · university curriculum ·
            regulator national rollouts · compliance-training vertical.</span>
          </p>
        </div>
      </section>

      {/* ── WHO WE ARE ── */}
      <section className="border-t" style={{ borderColor: LINE }}>
        <div className="mx-auto max-w-5xl px-5 py-16">
          <Eyebrow>Who We Are</Eyebrow>
          <H2>Built for regulators. <Em>Designed for the moment.</Em></H2>
          <Sub>
            AUREN — the Investor Intelligence Academy — is our submission to the IOSCO TechSprint 2026, answering both
            problem statements: AI-enabled fraud, and AI literacy for capital markets. Multilingual from day one
            (EN · 中文 · العربية · Bahasa · ES) and architected to serve IOSCO's 130+ member jurisdictions without
            bespoke rebuilds — auditable at every layer.
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

      {/* footer */}
      <footer className="border-t" style={{ borderColor: LINE }}>
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-5 py-8 text-[12px]" style={{ color: MUT }}>
          <span>AUREN · Investor Intelligence Academy · v2.0</span>
          <span>IOSCO TechSprint · Demo Day 8 Oct 2026 · Madrid</span>
          <span>Educational platform — not financial advice</span>
        </div>
      </footer>

      {/* floating Try Now — always available, like the reference */}
      <button onClick={onTry} className="fixed bottom-5 right-5 z-50 rounded-full px-6 py-3.5 text-[15px] font-semibold text-white shadow-2xl transition hover:opacity-90" style={{ background: INK }}>
        Try Now →
      </button>
    </main>
  );
}
