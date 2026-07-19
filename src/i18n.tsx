// @ts-nocheck
/**
 * AUREN demo i18n — full session strings, EN + Bahasa Melayu.
 * Demonstrates the papers' cross-jurisdictional claim: the same engine,
 * localized — "AUREN's own voice, the AI persona voices, transcripts,
 * coaching prompts, and rehearsal scenarios" all switch together.
 */

export const STR = {
  en: {
    ttsLang: "en-US",
    dims: { IR: "Investor Reasoning", AL: "AI Literacy", RA: "Risk Awareness", SR: "Scam Resistance", BS: "Behavioral Stability" },
    ui: {
      liveSession: "live session", notAdvice: "Not advice", speaking: "AUREN · speaking", listening: "AUREN · listening",
      tapToSkip: "tap to skip", send: "Send", orTry: "or try:", observed: "observed",
      introTitle: "One live session: interview → AILS score → roleplay rehearsal → evidential scorecard.",
      introSub: "She stays floating above — the conversation scrolls here, beneath her.",
      phName: "Tell AUREN your name…", phAnswer: "Answer AUREN in your own words…", phReady: `Say "ready" when you are…`,
      phMarcus: "Reply to Marcus…", phDone: "Session complete — restart below", phAurenSpeaking: "AUREN is speaking…", phMarcusSpeaking: "Marcus is speaking…",
      ailsTitle: "AILS · starting score", ailsNote: "Generated from your conversation — “not a snapshot, a trajectory.”",
      roleplaySys: "Roleplay connected · “Marcus” · AI persona · safe rehearsal",
      roleplayAgainSys: "Roleplay restarted with variations · you cannot pass by memorizing a script",
      personaTag: "AI persona · simulated · safe rehearsal", personaName: `"Marcus"`, personaRole: "Private Trading Group",
      watching: "AUREN · watching", improvement: "Improvement", feedback: "Feedback",
      scTitle: "Evidential scorecard", scOwnWords: "Your own words, scored.", before: "before", now: "now", session: "this session",
      exchange: "Exchange", evidenceQuote: "“They are shown their own words... The evidence is the transcript. Nothing is asserted that cannot be pointed to.” — Full Project Paper §13",
      regSees: "What the regulator sees",
      regBody: (outcome) => `One anonymized data point: cohort MY · “WhatsApp recruitment” · ${outcome}. At population scale: “an early-warning sensor network for emerging fraud.” No personal data leaves the session.`,
      regPassed: "passed", regFailed: "failed at urgency stage", regCoached: "coached mid-session",
      rehearseAgain: "Rehearse again ↻", restart: "Restart session", toMarcus: "→ Marcus", you: "You",
      voiceOn: "Voice on", voiceOff: "Voice off",
    },
    verdict: {
      certified: { label: "CERTIFIED", note: "Verification protocol demonstrated under pressure. The next rehearsal in your path unlocks." },
      review: { label: "NEEDS REVIEW", note: "Mixed signals. AUREN recommends one repeat with variations before certification." },
      retrain: { label: "RETRAIN REQUIRED", note: "AUREN will re-run this scenario with variations — you cannot pass by memorizing a script." },
    },
    greeting: "Hello — I'm AUREN, your investor intelligence mentor. This is a live session: you talk, I listen. First — what should I call you?",
    greetingAgain: "Hello again — I'm AUREN. Let's run it once more. What should I call you this time?",
    qs: [
      (n) => `Nice to meet you, ${n}. Let's talk — three questions, no wrong answers. First: have you invested before? Tell me in your own words.`,
      () => `And when you decide what to buy — what actually guides you? Friends, feeds, AI tools, your own research… tell me honestly.`,
      () => `Last one. Imagine the market drops twenty percent in a week and the headlines are screaming. What's your first instinct — what do you actually do?`,
    ],
    interviewDone: (n) => `That's all I need, ${n}. I'm putting your starting picture together — say "ready" when you want to see it.`,
    ailsLine: (n, score, weakest) => `There it is, ${n} — your starting AILS is ${score}. Not a verdict, a starting point. Most exposed: ${weakest}. So no lecture — next, you'll take a call with "Marcus", a real recruitment pattern played by an AI persona, completely safe. Treat it as real. Say "ready".`,
    weakestNone: "honestly, none — a strong start",
    watchToast: "I'm right here in the corner. Reply to him exactly as you would in real life — if I see a risky pattern, my note will appear like this.",
    watchToastAgain: (n) => `Again, ${n} — same recruiter, varied moves. Reply as yourself.`,
    postCoachNext: "He's typing again — watch the next move.",
    postExcellent: "That question is the strongest filter you have. Watch — he'll dodge it.",
    postGood: "Noted. Keep going — the pressure is about to increase.",
    closing: (n, strong) => `That's the scenario, ${n}. Every word you typed is now evidence — ${strong ? "and your instincts held better than most first-timers." : "and this is exactly why we rehearse here, not with your savings."} Here is your scorecard.`,
    marcus: [
      "Hey! Adam gave me your number 😊 He said you might be interested in our private trading group. We're up 40% this quarter using AI signals — limited spots left!",
      "Here's proof 📈 [screenshot: +RM12,400 this month]. Adam's already in. Everyone in the group is making money. You in?",
      "Spots close TONIGHT ⏰ Minimum RM2,000 to start. I'll send you the deposit link — takes 2 minutes. Don't miss out like last time!",
    ],
    reacts: {
      pre: (n, f) => `"${f}" — that's actually a good place to start, ${n}. No bad habits to unlearn.`,
      trader: (n, f) => `"${f}" — experienced, then. I'll be watching for overconfidence as much as gaps.`,
      selfTaught: (n, f) => `"${f}" — good, some real exposure to anchor on. Not a test, remember. Next question.`,
      aiTrust: (n, f) => `"${f}" — thank you for the honesty, ${n}. That trust in AI answers is exactly what we'll rehearse — confidence is not accuracy.`,
      social: (n, f) => `"${f}" — noted. Decisions that travel through friends and feeds are exactly where AI-era scams enter. We'll train for that.`,
      evidence: (n, f) => `"${f}" — evidence-led. Good. The question is whether that discipline survives pressure. We'll find out.`,
      mixed: (n, f) => `"${f}" — understood. I'm hearing instinct more than method. That's trainable.`,
      sell: (n, f) => `"${f}" — honest. That instinct to sell into fear is loss aversion, and most people share it. Knowing it is step one; rehearsing it is step two.`,
      plan: (n, f) => `"${f}" — plan first, action second. That's the strongest possible answer. Let's see if it holds when the pressure is personal.`,
      dip: (n, f) => `"${f}" — buying fear can be right, but I didn't hear a risk frame around it. We'll work on that.`,
      unclear: (n, f) => `"${f}" — alright. Your real answer will show up in rehearsal, not in words. Which is exactly why we rehearse.`,
    },
    obs: {
      pre: "Pre-investor. High teachability window — habits not yet formed.",
      trader: "Active trader. Overconfidence risk flagged for rehearsal path.",
      selfTaught: "Self-taught experience. Tactical exposure, no strategic framework detected yet.",
      aiTrust: "Uncritical AI trust. AI-tool literacy is the priority dimension.",
      social: "Socially mediated decisions. Low independent verification. Scam-vector exposure risk.",
      evidence: "Evidence-led reasoning present. Verify depth under pressure.",
      mixed: "Mixed decision inputs. Verification workflow not yet structured.",
      sell: "Pronounced loss aversion. Emotional response under simulated stress is high.",
      plan: "Plan-based discipline signal. Strongest volatility response.",
      dip: "Contrarian instinct without stated risk frame. Conviction unverified.",
      unclear: "Volatility response unclear — emotional pattern to be observed in rehearsal.",
    },
    sig: {
      vuln: "Scam-vulnerability signal", cert: "Certification signal", verif: "Verification signal", neutral: "Neutral engagement",
      trust: "Trust-transfer bias", socialProof: "Social-proof capitulation", urgency: "Urgency capitulation",
      resist: "Pressure resistance", resistPart: "Pressure resistance — partial",
    },
    ana: {
      vuln0: "Immediate agreement without verification — the exact pattern recruitment scams rely on.",
      cert0: "Registry-first response before any engagement — the single most effective scam filter available to a retail investor.",
      verif0: "Skepticism before engagement — identity or return-claim challenged. Correct first move.",
      neutral0: "No commitment made — but no verification question asked yet either. The registry question is the strongest move here.",
      trust1: "“Recruiter-driven scams specifically exploit trusted contacts — the friend sharing the scheme is often themselves a victim being used as a distribution channel.”",
      social1: "A fabricated screenshot plus 'everyone is in' was enough to move you. Profit screenshots are not evidence.",
      cert1: "Direct registry challenge under social proof — the exact behavior AUREN certifies.",
      verif1: "Evidence skepticism under social pressure. The verification instinct is engaging.",
      urgency2: "Funds committed inside an artificial deadline with zero verification steps completed. In the real event this money is unrecoverable.",
      cert2: "“Verification protocol correctly applied... the certification criterion for this scenario is met.”",
      resist2: "Broke the urgency lever — refused to act inside the countdown. One step remains: independent verification through official channels.",
      resistPart2: "No capitulation under deadline — but the exit line wasn't explicit. The certified close is: verify offline before anything moves.",
    },
    coach: {
      c0: "Pause. You just agreed before verifying anything. Before responding to any investment invitation, ask: who is this person — and can the claim be verified?",
      cTrust: "Careful — that's trust-transfer. Adam's sincerity is real, and irrelevant. He may himself be a victim. Verify the platform, not the friend.",
      cSocial: "That screenshot took thirty seconds to fabricate. Social proof is a pressure lever, not evidence. Ask for something verifiable — a regulator registration.",
      cUrgency: "Stop. In a live event, this is the moment the money leaves. Urgency is manufactured — legitimate investments do not expire tonight. Rehearse the exit line until it's automatic: 'I verify offline before I move anything.'",
    },
    chips: {
      name: ["Fred", "Aisha"],
      q0: ["A few ETFs and stocks, nothing structured", "Never — but I want to start", "I trade crypto actively"],
      q1: ["Mostly friends and what's trending on TikTok", "I ask ChatGPT and usually just go with it", "My own research — filings and fees"],
      q2: ["Honestly? I'd sell to stop the bleeding", "I'd check my written plan before doing anything", "Buy the dip"],
      r0: ["Sure, how do I sign up?", "Who are you? How do you know Adam?", "Is this platform registered with the regulator?"],
      r1: ["I trust Adam — he wouldn't send a scam", "Screenshots can be faked. Show me a license.", "What's the regulator registration number?"],
      r2: ["OK send me the link, I'll do it now", "I'm not deciding inside your countdown", "I'll verify this offline before I do anything"],
      ready: ["I'm ready", "Let's do it"],
    },
  },

  ms: {
    ttsLang: "ms-MY",
    dims: { IR: "Penaakulan Pelabur", AL: "Literasi AI", RA: "Kesedaran Risiko", SR: "Ketahanan Penipuan", BS: "Kestabilan Tingkah Laku" },
    ui: {
      liveSession: "sesi langsung", notAdvice: "Bukan nasihat", speaking: "AUREN · bercakap", listening: "AUREN · mendengar",
      tapToSkip: "tekan untuk langkau", send: "Hantar", orTry: "atau cuba:", observed: "diperhati",
      introTitle: "Satu sesi langsung: temu bual → skor AILS → latihan main peranan → kad skor berbukti.",
      introSub: "Dia kekal terapung di atas — perbualan bergerak di sini, di bawahnya.",
      phName: "Beritahu AUREN nama anda…", phAnswer: "Jawab AUREN dengan kata-kata anda sendiri…", phReady: `Sebut "sedia" apabila anda bersedia…`,
      phMarcus: "Balas kepada Marcus…", phDone: "Sesi selesai — mula semula di bawah", phAurenSpeaking: "AUREN sedang bercakap…", phMarcusSpeaking: "Marcus sedang bercakap…",
      ailsTitle: "AILS · skor permulaan", ailsNote: "Dijana daripada perbualan anda — “bukan gambaran sekali, tetapi trajektori.”",
      roleplaySys: "Main peranan disambungkan · “Marcus” · persona AI · latihan selamat",
      roleplayAgainSys: "Main peranan dimulakan semula dengan variasi · anda tidak boleh lulus dengan menghafal skrip",
      personaTag: "persona AI · simulasi · latihan selamat", personaName: `"Marcus"`, personaRole: "Kumpulan Trading Privet",
      watching: "AUREN · memerhati", improvement: "Penambahbaikan", feedback: "Maklum balas",
      scTitle: "Kad skor berbukti", scOwnWords: "Kata-kata anda sendiri, dinilai.", before: "sebelum", now: "kini", session: "sesi ini",
      exchange: "Pertukaran", evidenceQuote: "“Mereka ditunjukkan kata-kata mereka sendiri... Buktinya ialah transkrip. Tiada apa yang didakwa tanpa dapat ditunjukkan.” — Kertas Projek Penuh §13",
      regSees: "Apa yang dilihat pengawal selia",
      regBody: (outcome) => `Satu titik data tanpa nama: kohort MY · “rekrutmen WhatsApp” · ${outcome}. Pada skala populasi: “rangkaian penderia amaran awal untuk penipuan baru muncul.” Tiada data peribadi keluar dari sesi.`,
      regPassed: "lulus", regFailed: "gagal pada peringkat desakan", regCoached: "dibimbing semasa sesi",
      rehearseAgain: "Latih semula ↻", restart: "Mula semula sesi", toMarcus: "→ Marcus", you: "Anda",
      voiceOn: "Suara hidup", voiceOff: "Suara mati",
    },
    verdict: {
      certified: { label: "DISAHKAN", note: "Protokol pengesahan ditunjukkan di bawah tekanan. Latihan seterusnya dalam laluan anda dibuka." },
      review: { label: "PERLU SEMAKAN", note: "Isyarat bercampur. AUREN mengesyorkan satu ulangan dengan variasi sebelum pensijilan." },
      retrain: { label: "PERLU LATIH SEMULA", note: "AUREN akan mengulang senario ini dengan variasi — anda tidak boleh lulus dengan menghafal skrip." },
    },
    greeting: "Helo — saya AUREN, mentor kecerdasan pelabur anda. Ini sesi langsung: anda bercakap, saya mendengar. Pertama — apakah nama anda?",
    greetingAgain: "Helo sekali lagi — saya AUREN. Mari kita cuba sekali lagi. Apakah nama anda kali ini?",
    qs: [
      (n) => `Selamat berkenalan, ${n}. Tiga soalan sahaja — tiada jawapan salah. Pertama: pernahkah anda melabur? Ceritakan dengan kata-kata anda sendiri.`,
      () => `Apabila anda memilih pelaburan — apakah yang sebenarnya menjadi panduan anda? Kawan-kawan, media sosial, alat AI, kajian sendiri… jawab dengan jujur.`,
      () => `Soalan terakhir. Bayangkan pasaran jatuh dua puluh peratus dalam seminggu dan semua berita panik. Apakah naluri pertama anda — apa yang anda benar-benar buat?`,
    ],
    interviewDone: (n) => `Itu sahaja yang saya perlukan, ${n}. Saya sedang menyusun gambaran permulaan anda — sebut "sedia" apabila anda mahu melihatnya.`,
    ailsLine: (n, score, weakest) => `Ini dia, ${n} — skor AILS permulaan anda ialah ${score}. Bukan hukuman, hanya titik permulaan. Paling terdedah: ${weakest}. Jadi tiada syarahan — seterusnya, anda akan menerima panggilan daripada "Marcus", corak rekrutmen sebenar yang dimainkan oleh persona AI, selamat sepenuhnya. Anggap ia benar. Sebut "sedia".`,
    weakestNone: "sejujurnya, tiada — permulaan yang kukuh",
    watchToast: "Saya di sini, di penjuru, memerhati. Balas kepadanya seperti dalam kehidupan sebenar — jika saya nampak corak berisiko, nota saya akan muncul seperti ini.",
    watchToastAgain: (n) => `Sekali lagi, ${n} — perekrut yang sama, taktik berbeza. Balas sebagai diri anda sendiri.`,
    postCoachNext: "Dia sedang menaip lagi — perhatikan langkah seterusnya.",
    postExcellent: "Soalan itu penapis paling kuat yang anda ada. Perhatikan — dia akan mengelak.",
    postGood: "Baik. Teruskan — tekanan akan meningkat.",
    closing: (n, strong) => `Itulah senarionya, ${n}. Setiap perkataan yang anda taip kini menjadi bukti — ${strong ? "dan naluri anda bertahan lebih baik daripada kebanyakan orang kali pertama." : "dan inilah sebabnya kita berlatih di sini, bukan dengan simpanan anda."} Ini kad skor anda.`,
    marcus: [
      "Hei! Adam bagi nombor awak 😊 Katanya awak mungkin berminat dengan kumpulan trading privet kami. Kami untung 40% suku ini guna isyarat AI — slot terhad!",
      "Ini buktinya 📈 [tangkapan skrin: +RM12,400 bulan ini]. Adam dah masuk. Semua ahli untung. Awak nak join?",
      "Slot tutup MALAM INI ⏰ Minimum RM2,000 untuk mula. Saya hantar link deposit — 2 minit je. Jangan terlepas macam dulu!",
    ],
    reacts: {
      pre: (n, f) => `"${f}" — itu sebenarnya titik permulaan yang baik, ${n}. Tiada tabiat buruk untuk dibuang.`,
      trader: (n, f) => `"${f}" — berpengalaman rupanya. Saya akan perhatikan keyakinan berlebihan sama seperti kelemahan.`,
      selfTaught: (n, f) => `"${f}" — bagus, ada pengalaman sebenar sebagai asas. Ingat, ini bukan ujian. Soalan seterusnya.`,
      aiTrust: (n, f) => `"${f}" — terima kasih atas kejujuran anda, ${n}. Kepercayaan kepada jawapan AI itulah yang akan kita latih — keyakinan bukan ketepatan.`,
      social: (n, f) => `"${f}" — difahami. Keputusan yang datang melalui kawan dan media sosial ialah pintu masuk penipuan era AI. Kita akan berlatih untuk itu.`,
      evidence: (n, f) => `"${f}" — berasaskan bukti. Bagus. Persoalannya, adakah disiplin itu bertahan di bawah tekanan? Kita akan lihat.`,
      mixed: (n, f) => `"${f}" — difahami. Saya dengar naluri lebih daripada kaedah. Itu boleh dilatih.`,
      sell: (n, f) => `"${f}" — jujur. Naluri menjual ketika takut ialah 'loss aversion', dan ramai yang begitu. Menyedarinya langkah pertama; melatihnya langkah kedua.`,
      plan: (n, f) => `"${f}" — rancangan dahulu, tindakan kemudian. Itu jawapan paling kuat. Mari lihat sama ada ia bertahan apabila tekanan menjadi peribadi.`,
      dip: (n, f) => `"${f}" — membeli ketika takut boleh jadi betul, tetapi saya tidak dengar rangka risiko. Kita akan usahakan.`,
      unclear: (n, f) => `"${f}" — baiklah. Jawapan sebenar anda akan muncul dalam latihan, bukan dalam kata-kata. Sebab itulah kita berlatih.`,
    },
    obs: {
      pre: "Pra-pelabur. Tetingkap pembelajaran tinggi — tabiat belum terbentuk.",
      trader: "Pedagang aktif. Risiko keyakinan berlebihan ditanda untuk laluan latihan.",
      selfTaught: "Pengalaman belajar sendiri. Ada pendedahan taktikal, tiada rangka strategik dikesan.",
      aiTrust: "Kepercayaan AI tanpa kritis. Literasi alat AI ialah dimensi keutamaan.",
      social: "Keputusan dipengaruhi sosial. Pengesahan bebas rendah. Risiko pendedahan vektor penipuan.",
      evidence: "Penaakulan berasaskan bukti hadir. Sahkan kedalamannya di bawah tekanan.",
      mixed: "Input keputusan bercampur. Aliran kerja pengesahan belum tersusun.",
      sell: "Loss aversion ketara. Tindak balas emosi di bawah tekanan simulasi adalah tinggi.",
      plan: "Isyarat disiplin berasaskan rancangan. Tindak balas volatiliti paling kuat.",
      dip: "Naluri kontrarian tanpa rangka risiko. Keyakinan belum disahkan.",
      unclear: "Tindak balas volatiliti tidak jelas — corak emosi akan diperhati dalam latihan.",
    },
    sig: {
      vuln: "Isyarat kerentanan penipuan", cert: "Isyarat pensijilan", verif: "Isyarat pengesahan", neutral: "Penglibatan neutral",
      trust: "Bias pemindahan kepercayaan", socialProof: "Tunduk kepada bukti sosial", urgency: "Tunduk kepada desakan",
      resist: "Ketahanan tekanan", resistPart: "Ketahanan tekanan — separa",
    },
    ana: {
      vuln0: "Persetujuan serta-merta tanpa pengesahan — corak yang menjadi sandaran penipuan rekrutmen.",
      cert0: "Bertanya pendaftaran dahulu sebelum sebarang penglibatan — penapis penipuan paling berkesan untuk pelabur runcit.",
      verif0: "Keraguan sebelum penglibatan — identiti atau dakwaan pulangan dicabar. Langkah pertama yang betul.",
      neutral0: "Tiada komitmen dibuat — tetapi tiada soalan pengesahan diajukan lagi. Soalan pendaftaran ialah langkah paling kuat di sini.",
      trust1: "“Penipuan melalui perekrut sengaja mengeksploitasi kenalan yang dipercayai — rakan yang berkongsi skim itu sering kali mangsa yang dijadikan saluran pengedaran.”",
      social1: "Tangkapan skrin palsu dan 'semua orang dah masuk' cukup untuk menggerakkan anda. Tangkapan skrin keuntungan bukan bukti.",
      cert1: "Cabaran pendaftaran terus di bawah bukti sosial — tingkah laku yang AUREN sijilkan.",
      verif1: "Keraguan terhadap bukti di bawah tekanan sosial. Naluri pengesahan sedang terbentuk.",
      urgency2: "Wang dikomit dalam tarikh akhir buatan tanpa satu pun langkah pengesahan. Dalam kejadian sebenar, wang ini tidak dapat dipulihkan.",
      cert2: "“Protokol pengesahan digunakan dengan betul... kriteria pensijilan untuk senario ini dipenuhi.”",
      resist2: "Mematahkan tuil desakan — enggan bertindak dalam kiraan detik. Tinggal satu langkah: pengesahan bebas melalui saluran rasmi.",
      resistPart2: "Tidak tunduk kepada tarikh akhir — tetapi ayat keluar tidak jelas. Penutup yang disijilkan: sahkan di luar talian sebelum apa-apa bergerak.",
    },
    coach: {
      c0: "Berhenti sebentar. Anda bersetuju sebelum mengesahkan apa-apa. Sebelum membalas sebarang pelawaan pelaburan, tanya: siapa orang ini — dan bolehkah dakwaannya disahkan?",
      cTrust: "Hati-hati — itu pemindahan kepercayaan. Keikhlasan Adam memang benar, tetapi tidak relevan. Dia sendiri mungkin mangsa. Sahkan platformnya, bukan kawannya.",
      cSocial: "Tangkapan skrin itu mengambil masa tiga puluh saat untuk dipalsukan. Bukti sosial ialah tuil tekanan, bukan bukti. Minta sesuatu yang boleh disahkan — pendaftaran pengawal selia.",
      cUrgency: "Berhenti. Dalam kejadian sebenar, inilah saat wang keluar. Desakan itu dibuat-buat — pelaburan sah tidak luput malam ini. Latih ayat keluar sehingga automatik: 'Saya sahkan di luar talian sebelum saya gerakkan apa-apa.'",
    },
    chips: {
      name: ["Fred", "Aisha"],
      q0: ["Ada beberapa ETF dan saham, tiada rancangan", "Belum pernah — tapi saya nak mula", "Saya trade kripto secara aktif"],
      q1: ["Ikut kawan dan apa yang trending di TikTok", "Saya tanya ChatGPT dan biasanya terus ikut", "Kajian sendiri — penyata dan yuran"],
      q2: ["Jujurnya? Saya jual untuk hentikan kerugian", "Saya semak rancangan bertulis saya dulu", "Beli masa harga jatuh"],
      r0: ["Boleh, macam mana nak daftar?", "Siapa awak? Macam mana kenal Adam?", "Platform ini berdaftar dengan Suruhanjaya Sekuriti?"],
      r1: ["Saya percaya Adam — dia takkan hantar scam", "Tangkapan skrin boleh dipalsukan. Tunjuk lesen.", "Apa nombor pendaftaran pengawal selia?"],
      r2: ["OK hantar link, saya buat sekarang", "Saya takkan putuskan dalam kiraan detik awak", "Saya akan sahkan di luar talian dulu sebelum buat apa-apa"],
      ready: ["Saya sedia", "Jom mula"],
    },
  },
};

// ── locale-aware intent classification (EN + BM keywords) ──
const has = (t, words) => words.some(w => t.includes(w));

export function classifyInterview(qId, raw) {
  const t = raw.toLowerCase();
  if (qId === 0) {
    if (has(t, ["no", "never", "not yet", "thinking", "belum", "tak pernah", "nak mula"])) return { adj: { RA: +2 }, id: "pre" };
    if (has(t, ["trade", "trading", "often", "active", "daily", "crypto", "kripto", "aktif"])) return { adj: { IR: +4, BS: -3 }, id: "trader" };
    return { adj: { IR: +2 }, id: "selfTaught" };
  }
  if (qId === 1) {
    if (has(t, ["ai", "chatgpt", "gpt", "claude", "bot"])) return { adj: { AL: -5 }, id: "aiTrust" };
    if (has(t, ["friend", "social", "tiktok", "telegram", "whatsapp", "trend", "influencer", "group", "follow", "kawan", "ikut", "media sosial"])) return { adj: { SR: -4, BS: -2 }, id: "social" };
    if (has(t, ["research", "filing", "fundamental", "prospectus", "fee", "annual report", "own analysis", "kajian", "penyata", "yuran"])) return { adj: { IR: +5, SR: +3 }, id: "evidence" };
    return { adj: { BS: -1 }, id: "mixed" };
  }
  if (has(t, ["sell", "exit", "cut", "stop the bleed", "jual", "keluar"])) return { adj: { BS: -4, RA: -2 }, id: "sell" };
  if (has(t, ["plan", "hold", "stay", "nothing", "long term", "wait", "dca", "average", "rancangan", "semak", "tunggu", "pegang"])) return { adj: { BS: +5, RA: +3 }, id: "plan" };
  if (has(t, ["buy", "discount", "cheap", "opportunity", "beli", "murah", "peluang"])) return { adj: { RA: -1, IR: +1 }, id: "dip" };
  return { adj: { BS: -1 }, id: "unclear" };
}

export function classifyRehearsal(turn, raw) {
  const t = raw.toLowerCase();
  const neg = has(t, ["not", "no ", "don't", "dont", "scam", "fake", "verify", "regulator", "license", "tak", "tidak", "bukan", "penipuan", "sahkan", "lesen"]);
  const risky = has(t, ["sign up", "sign me", "how do i", "i'm in", "im in", "count me", "ok", "okay", "sure", "yes", "send me the link", "sending", "deposit", "pay", "interested", "let's go", "lets go", "daftar", "boleh", "nak join", "hantar link", "saya buat", "masuk"]) && !neg;
  const excellent = has(t, ["regulator", "registration", "registered", "license", "licence", "licensed", "sc ", "securities commission", "registry", "verify offline", "offline", "report", "authorities", "suruhanjaya", "berdaftar", "pendaftaran", "lesen", "luar talian", "sahkan di luar"]);
  const good = has(t, ["who are you", "who is this", "how do you know", "proof", "too good", "fake", "faked", "scam", "not interested", "no thanks", "verify", "check", "suspicious", "red flag", "guarantee", "siapa awak", "macam mana kenal", "bukti", "palsu", "penipuan", "sahkan", "semak", "jamin"]);

  if (turn === 0) {
    if (risky) return { tone: "risky", delta: -3, dim: "SR", sig: "vuln", ana: "vuln0", coach: "c0" };
    if (excellent) return { tone: "excellent", delta: 4, dim: "SR", sig: "cert", ana: "cert0" };
    if (good) return { tone: "good", delta: 3, dim: "SR", sig: "verif", ana: "verif0" };
    return { tone: "good", delta: 1, dim: "SR", sig: "neutral", ana: "neutral0" };
  }
  if (turn === 1) {
    if (has(t, ["trust", "adam", "friend", "percaya", "kawan"]) && !has(t, ["don't", "dont", "even", "still", "tak", "tidak"])) return { tone: "risky", delta: -2, dim: "BS", sig: "trust", ana: "trust1", coach: "cTrust" };
    if (risky) return { tone: "risky", delta: -2, dim: "SR", sig: "socialProof", ana: "social1", coach: "cSocial" };
    if (excellent) return { tone: "excellent", delta: 4, dim: "SR", sig: "cert", ana: "cert1" };
    return { tone: "good", delta: 3, dim: "SR", sig: "verif", ana: "verif1" };
  }
  if (risky) return { tone: "risky", delta: -5, dim: "SR", sig: "urgency", ana: "urgency2", coach: "cUrgency" };
  if (excellent) return { tone: "excellent", delta: 6, dim: "SR", sig: "cert", ana: "cert2" };
  if (good) return { tone: "good", delta: 4, dim: "SR", sig: "resist", ana: "resist2" };
  return { tone: "good", delta: 2, dim: "BS", sig: "resistPart", ana: "resistPart2" };
}
