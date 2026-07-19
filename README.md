# AUREN — Investor Intelligence Academy · v2.0

**Investor education as AI rehearsal.** Submission to the IOSCO TechSprint 2026 · Demo Day 8 October 2026 · Madrid.

> *"AUREN is not a course. It is where investors rehearse the moment before it happens — so that when it happens, they are ready."*
> — Full Project Paper, Executive Summary

## Live demos

| Demo | Link | Use it for |
|---|---|---|
| **MVP — the working product** (hero: the Digital Human) | https://claude.ai/code/artifact/8b03ed81-fd7c-475a-8433-c813fda01646 | Live demos to judges, investors, consumers. One continuous ~3-min session: Meet AUREN → Interview → AILS → Rehearsal → Scorecard. Also [`index.html`](index.html). |
| **Full investor walkthrough** (16 sections) | https://claude.ai/code/artifact/346384df-8930-4d0b-b820-3cb78e136acd | Deep-dive: problem, architecture, course, regulator dashboard, commercialization. Also [`walkthrough.html`](walkthrough.html). |

Both are fully self-contained HTML (no build, no dependencies, work offline). Sources: [`src/Mvp.tsx`](src/Mvp.tsx) and [`src/App.tsx`](src/App.tsx).

### The MVP — what it proves and why these features

The MVP is deliberately cut down to the core loop the papers define — the features that score against IOSCO's criteria as a *working product*, with the Digital Human as the interface the consumer actually talks to:

1. **Meet AUREN** — she greets you and asks your name; you type it and she uses it for the rest of the session (Innovation: the Digital Human IS the product surface).
2. **Conversational interview** — 3 questions, tap a reply or type your own; observations are logged live and seed the score (Clarity & Relevance: "a conversation, not a questionnaire").
3. **AILS reveal** — five-dimension score generated from the conversation; every later reply moves it live (the "how outcomes are measured" answer).
4. **Rehearsal with live coaching** — the WhatsApp scam scenario; AUREN interrupts mid-conversation when you slip (Consumer Impact: behavioral change, demonstrated).
5. **Evidential scorecard + regulator glimpse** — your own quotes, turn-stamped, with score deltas and a Certified / Needs review / Retrain verdict; one card shows the anonymized data point a regulator receives (Cross-Jurisdictional value in 30 seconds).

Cut from the MVP (kept in the walkthrough): problem statistics, journey, 3-day course, AI memory, simulations, platform architecture, enterprise. Roadmap belongs in the deck, not the prototype.

> Prototype note: AUREN's replies are scripted. In production she runs on a live LLM with voice and a real avatar — same flow, real conversation.

### The full walkthrough — what it shows

A 16-section interactive walkthrough built on Fred's concept design (dark navy/graphite + lime identity, Digital Human host in every section — source in `src/App.tsx`, React + Tailwind, bundled to a single self-contained `index.html`):

1. **Overview · Problem · Journey** — the thesis, the $12.5B / $4.57B / 10× fraud stats, five vulnerabilities, IOSCO PS1/PS2 mapping.
2. **AUREN Interview** — click-through conversational assessment with live observations rail.
3. **AILS Assessment · Dashboard · 3-Day Course · AI Memory** — five-dimension score (42 → 76), adaptive course, persistent-memory timeline.
4. **AI Literacy Lab** — the flag-vs-accept AI answer exercise on the three grounds from §10.
5. **Spot-the-Scam Lab** — four scenario walkthroughs; the deepfake scenario includes an interactive mock video that pauses mid-play ("What would you do next?") with the four detection signals annotated.
6. **Rehearsal Engine** — the playable WhatsApp scam rehearsal: AI persona pressure, live AUREN coaching, real-time Scam Resistance meter, and a quote-level evidential scorecard classified Certified / Needs review / Retrain.
7. **Simulation · Report** — decision scenarios; the Report shows "this session's live evidence" carried over from your actual rehearsal choices.
8. **Regulator View · Platform · Enterprise** — the C8 oversight dashboard, four-layer architecture, five revenue engines, and the IOSCO weighted-criteria scoring (8.5 → 9.0–9.4).

All quoted text in the demo is verbatim from the three source documents, cited inline.

## Source documents

| Document | Extracted text |
|---|---|
| AUREN Concept Paper v2.0 | [`docs/AUREN_Concept_Paper_v2.md`](docs/AUREN_Concept_Paper_v2.md) |
| AUREN Full Project Paper | [`docs/AUREN_Full_Project_Paper.md`](docs/AUREN_Full_Project_Paper.md) |
| AUREN Project Paper Deck v2 (20 slides) | [`docs/AUREN_Project_Paper_Deck_v2.md`](docs/AUREN_Project_Paper_Deck_v2.md) |

## Platform summary

- **Four capabilities, one platform:** hyper-realistic Digital Human host · Rehearsal Engine (scenario → AI persona → live conversation → live coaching → evidential scorecard) · AILS five-dimension cognitive assessment · certification + learner/institution/regulator dashboards.
- **Four interoperable layers:** Interaction · Intelligence · Trust (eKYC, liveness, audit logs) · Deployment (web, mobile, kiosk, widget, regulator API). *"Configuration, not code changes, is the localization mechanism."*
- **Six rehearsal categories** mapped to IOSCO PS1 and PS2, delivered by one content-agnostic engine.
- **Five deployment pathways:** B2C subscription · bank/broker licensing · universities · regulator national rollouts · compliance-training vertical extension.
- **Cross-jurisdictional by design:** serves IOSCO's 130+ member jurisdictions via configuration — multilingual (EN · 中文 · العربية · BM · ES) with culturally situated scenario libraries.
