# AUREN — The AI Investor Readiness Platform · v4.0

**A digital human mentor preparing retail investors for the risks of the AI era.** Built by BYOND Asia — The Physical AI Interface Company · Powered by the HoloMe Platform. Submission to the IOSCO TechSprint 2026 · Demo Day 8 October 2026 · Madrid.

> *"AUREN is not a course. It is where investors rehearse the moment before it happens — so that when it happens, they are ready."*
> — Full Project Paper, Executive Summary

## Live demos

| Demo | Link | Use it for |
|---|---|---|
| **Product site + working MVP** (hero: AUREN, the digital human mentor) | https://claude.ai/code/artifact/8b03ed81-fd7c-475a-8433-c813fda01646 | The complete investor-facing product site (RoleFit-style): hero, challenge, **Meet AUREN (her four roles: Mentor · Coach · Assessor · Protector)**, platform, AI persona library, scorecard engine (AIRS), first target, security & governance, deployment, who we are, contact form, and company footer — with a hamburger sitemap menu navigating every section, every card clickable, and the live ~3-min demo behind every "Try Now". Also [`index.html`](index.html). Sources: [`src/Landing.tsx`](src/Landing.tsx), [`src/Root.tsx`](src/Root.tsx). |
| **Full investor walkthrough** (16 sections) | https://claude.ai/code/artifact/346384df-8930-4d0b-b820-3cb78e136acd | Deep-dive: problem, architecture, course, regulator dashboard, commercialization. Also [`walkthrough.html`](walkthrough.html). |

Both are fully self-contained HTML (no build, no dependencies, work offline). Sources: [`src/Mvp.tsx`](src/Mvp.tsx) and [`src/App.tsx`](src/App.tsx).

### The MVP — what it proves and why these features

The MVP is deliberately cut down to the core loop the papers define — the features that score against IOSCO's criteria as a *working product*, with the Digital Human as the interface the consumer actually talks to:

The MVP is one live session with AUREN in a three-layer layout: **the Digital Human floats at the top of the screen at all times on her own layer — nothing ever covers her.** Her words type out live in her window as she speaks; the conversation (her history, your replies, the simulated scam chat, the AIRS readiness card, the scorecard) is a scrollable feed beneath her; one fixed input bar at the bottom is the only way to interact (type anything; mic is mocked for the production voice build). No multiple-choice cards.

1. **She greets you and asks your name** — everything after is personalized in her speech (Innovation: the Digital Human IS the product surface).
2. **Conversational interview** — three open questions; her scripted brain classifies whatever you type and she reacts by echoing your own words back ("'I just ask ChatGPT' — thank you for the honesty…"). Observations appear as ambient toasts, not panels (Clarity & Relevance: "a conversation, not a questionnaire").
3. **Readiness profile reveal — the AUREN Investor Readiness Score (AIRS)** — she presents the five-dimension score as an overlay on the call, generated from the conversation (the "how outcomes are measured" answer).
4. **Roleplay rehearsal** — the session switches to full-screen roleplay: "Marcus", the scam persona, is himself a digital human occupying the main space (RoleFit-style roleplay view). AUREN shrinks to a picture-in-picture corner window, watching; her coaching lands as amber "Improvement" cards overlaid on the call; a live sentiment score (😐 0 → 😟 −3) and a Feedback on/off toggle sit in the top bar (Consumer Impact: behavioral change, demonstrated).
5. **Evidential scorecard + regulator glimpse** — she hands you your own typed words, turn-stamped with score deltas and a Certified / Needs review / Retrain verdict, plus the one anonymized data point a regulator receives (Cross-Jurisdictional value in 30 seconds).

Cut from the MVP (kept in the walkthrough): problem statistics, journey, 3-day course, AI memory, simulations, platform architecture, enterprise. Roadmap belongs in the deck, not the prototype.

> Prototype note: AUREN's replies are scripted. In production she runs on a live LLM with voice and a real avatar — same flow, real conversation.

### The full walkthrough — what it shows

A 16-section interactive walkthrough built on Fred's concept design (dark navy/graphite + lime identity, Digital Human host in every section — source in `src/App.tsx`, React + Tailwind, bundled to a single self-contained `index.html`):

1. **Overview · Problem · Journey** — the thesis, the $12.5B / $4.57B / 10× fraud stats, five vulnerabilities, IOSCO PS1/PS2 mapping.
2. **AUREN Interview** — click-through conversational assessment with live observations rail.
3. **Five-Dimension Assessment · Dashboard · 3-Day Course · AI Memory** — five-dimension score (42 → 76; the walkthrough predates the v4 reposition and shows the score under its earlier name), adaptive course, persistent-memory timeline.
4. **AI Literacy Lab** — the flag-vs-accept AI answer exercise on the three grounds from §10.
5. **Spot-the-Scam Lab** — four scenario walkthroughs; the deepfake scenario includes an interactive mock video that pauses mid-play ("What would you do next?") with the four detection signals annotated.
6. **Rehearsal Engine** — the playable WhatsApp scam rehearsal: AI persona pressure, live AUREN coaching, real-time Scam Resistance meter, and a quote-level evidential scorecard classified Certified / Needs review / Retrain.
7. **Simulation · Report** — decision scenarios; the Report shows "this session's live evidence" carried over from your actual rehearsal choices.
8. **Regulator View · Platform · Enterprise** — the C8 oversight dashboard, four-layer architecture, five revenue engines, and the IOSCO weighted-criteria scoring (8.5 → 9.0–9.4).

All quoted text in the demo is verbatim from the three source documents, cited inline.

## Source documents

| Document | Extracted text |
|---|---|
| **AUREN Full Project Paper v4.0 — The AI Investor Readiness Platform** (current) | [`docs/AUREN_Full_Project_Paper_v4_Readiness.md`](docs/AUREN_Full_Project_Paper_v4_Readiness.md) · [`docs/AUREN_Full_Project_Paper_v4_Readiness.docx`](docs/AUREN_Full_Project_Paper_v4_Readiness.docx) |
| AUREN Concept Paper v2.0 | [`docs/AUREN_Concept_Paper_v2.md`](docs/AUREN_Concept_Paper_v2.md) |
| AUREN Full Project Paper | [`docs/AUREN_Full_Project_Paper.md`](docs/AUREN_Full_Project_Paper.md) |
| AUREN Project Paper Deck v2 (20 slides) | [`docs/AUREN_Project_Paper_Deck_v2.md`](docs/AUREN_Project_Paper_Deck_v2.md) |

## Platform summary

- **Four capabilities, one platform:** lifelike Digital Human mentor (AUREN: Mentor · Coach · Assessor · Protector) · Rehearsal Engine (scenario → AI persona → live conversation → live coaching → evidential scorecard) · the AUREN Investor Readiness Score (AIRS) across five dimensions · certification + learner/institution/regulator dashboards.
- **Four interoperable layers:** Interaction · Intelligence · Trust (eKYC, liveness, audit logs) · Deployment (web, mobile, kiosk, widget, regulator API). *"Configuration, not code changes, is the localization mechanism."*
- **Six rehearsal categories** mapped to IOSCO PS1 and PS2, delivered by one content-agnostic engine.
- **Five deployment pathways:** B2C subscription · bank/broker licensing · universities · regulator national rollouts · compliance-training vertical extension.
- **Cross-jurisdictional by design:** serves IOSCO's 130+ member jurisdictions via configuration — multilingual (EN · 中文 · العربية · BM · ES) with culturally situated scenario libraries.
