/* 中英切換 i18n */
(function () {
  const KEY = "lucySiteLang";
  const DEFAULT = "en";

  const T = {
    en: {
      "meta.desc": "Lucy Kao — AI Engineer & Product Builder based in Taiwan",
      "nav.experience": "Experience",
      "nav.education": "Education",
      "nav.practice": "In Practice",
      "nav.projects": "Side Projects",
      "nav.interests": "Interests",

      "hero.badge": "Available for opportunities",
      "hero.title": "AI Engineer · Product Builder",
      "hero.bio": "Building end-to-end AI systems — from computer vision models in smart manufacturing to LLM-powered products. Based in Taiwan, open to AI engineering roles.",
      "hero.contact": "Get in touch",
      "hero.resume": "Resume",

      "sec.experience": "Experience",
      "sec.education": "Education",
      "sec.practice": "In Practice",
      "sec.projects": "Side Projects",
      "sec.interests": "Interests",

      "exp.1.role": "Senior Computer Vision / Software Engineer",
      "exp.1.company": "AU Optronics (AUO · 友達光電) · Taichung, Taiwan",
      "exp.1.date": "Oct 2020 – May 2026",
      "exp.1.b1": "<strong>Computer Vision &amp; Model Deployment</strong> — Led end-to-end vision pipelines; trained and fine-tuned custom deep learning models (YOLO series) alongside OpenCV image preprocessing to achieve real-time defect detection and high-precision classification.",
      "exp.1.b2": "<strong>Backend &amp; Data Architecture</strong> — Architected high-performance backend services using FastAPI; managed structured and unstructured production datasets across MySQL and MongoDB.",
      "exp.1.b3": "<strong>Requirement Scoping &amp; Agile Delivery</strong> — Translated complex operational pain points into clear system specs. Collaborated cross-functionally to rapidly adapt inspection logic and resolve edge cases with high agility.",

      "exp.2.role": "Software Engineer",
      "exp.2.company": "SIMIS (科展資訊) · Taichung, Taiwan",
      "exp.2.date": "Aug 2016 – Sep 2017",
      "exp.2.b1": "<strong>ERP Customization &amp; Data Integration</strong> — Customized enterprise ERP modules, tailored quotation/order formats, and integrated data flows across inventory and accounting systems.",
      "exp.2.b2": "<strong>Requirement Scoping &amp; UI Tuning</strong> — Translated cross-industry client workflows into technical specs, optimizing UI interactions and business logic for stable delivery.",

      "exp.3.role": "FinTech Research Intern",
      "exp.3.company": "Institute for Information Industry (資策會) · Taipei, Taiwan",
      "exp.3.date": "Feb 2016 – Jun 2016",
      "exp.3.b1": "<strong>Market Research &amp; Trend Analysis</strong> — Researched and benchmarked emerging FinTech startups, analyzing core business models, innovative technologies, and industry trends to identify key success drivers.",
      "exp.3.b2": "<strong>Publication &amp; Case Studies</strong> — Co-authored and edited the industry casebook “FINTECH66” (金融科技創新精選個案), synthesizing in-depth case studies on innovative FinTech applications.",

      "edu.1.degree": "M.B.A. in Information Management",
      "edu.1.school": "National Central University · Taoyuan, Taiwan",
      "edu.1.date": "2018 – 2022",
      "edu.1.b1": "Research: LSTM-CNN model for autonomous vehicle trajectory prediction (PyTorch)",
      "edu.1.b2": "Research: CNN, Neuro-Fuzzy, PSO optimization algorithms",
      "edu.1.b3": "Teaching Assistant for Online Creative Marketing",
      "edu.2.degree": "B.B.A. in Information Management",
      "edu.2.school": "Shih Hsin University · Taipei, Taiwan",
      "edu.2.date": "2012 – 2016",
      "edu.2.b1": "Developed an Android mobile application in Java",

      "practice.title": "AOI + AI Defect Detection",
      "practice.meta": "AU Optronics · 友達光電 · Taichung",
      "practice.p1": "Defect inspection for display panels has long relied on AOI machines — expensive, stable, and deeply embedded in the production line. Our goal wasn't to replace them, but to make them smarter without touching the hardware.",
      "practice.p2": "The technical work splits in two: object detection to locate defect regions, and image classification to judge type and severity. Factory data is never as clean or abundant as a textbook — pushing accuracy to a trustworthy level with limited labeled samples was the core engineering challenge.",
      "practice.p3": "But the tech is only half of it. Every iteration meant aligning across teams — confirming the physical meaning of defects with process engineers, wiring up data flow with the integration team, coordinating with production so the line never stops. Keeping every stakeholder's needs met while iterating fast took more stamina than the modeling itself.",
      "practice.p4": "Once live, the system had to handle a high volume of real-time inspection requests and frequent DB writes, staying stable under real production pressure. Designing the concurrency architecture to survive that load was, in a way, the most satisfying part of the whole project.",

      "proj.1.title": "Muchun Tea — LINE Bot + Threads Marketing",
      "proj.1.desc": "An end-to-end AI toolkit for a tea brand. The LINE bot lets customers order in natural language; orders flow into Notion automatically, with shipping synced to Google Calendar. The same project also runs daily automated Threads posts — content generated by AI and scheduled via GitHub Actions.",
      "proj.2.title": "Australia Receipt Tracker",
      "proj.2.desc": "Built while living in Australia to make expense tracking less tedious: photograph a receipt, use macOS's built-in OCR to parse items and prices, and log them into Notion. An exploration of reliable information extraction from messy, inconsistent real-world receipts.",

      "interest.1.title": "Coffee & Cooking",
      "interest.1.desc": "Pour-over coffee and cooking are both ways to slow my thoughts down. I like wandering between cafés too, taking in the mood of different spaces.",
      "interest.2.title": "Workout & Running",
      "interest.2.desc": "I like the sense of progress that training brings — and that stretch of time spent only in conversation with myself.",
      "interest.3.title": "Travel & Photography",
      "interest.3.desc": "I love going places and just looking around, using the camera to keep the scenery and small everyday moments along the way.",
      "interest.4.title": "Music & Anime",
      "interest.4.desc": "Music and anime are where I unwind — I sink into them properly, not just watch to the end for the sake of it.",

      "buddy.l1": "Hi, I'm Lucy 👋 welcome to my portfolio!",
      "buddy.l2": "Scroll down to see my experience and projects",
      "buddy.l3": "Looking for my resume? Tap here",
      "buddy.l4": "Pretty happy with these side projects — take a look",
      "buddy.l5": "Want to ask me something directly? Tap me",
      "buddy.cta": "Sure →",
      "buddy.greet": "Hi! I'm Lucy's AI double — I can walk you through her background. Ask me anything 😊",
      "buddy.title": "Lucy's AI double",
      "buddy.sub": "Ask about Lucy's experience, projects, skills",
      "buddy.s1q": "介紹一下 Lucy 的電腦視覺經驗",
      "buddy.s1": "Her computer vision experience?",
      "buddy.s2q": "Lucy 做過哪些個人專案？",
      "buddy.s2": "Her side projects?",
      "buddy.s3q": "Lucy 現在在找工作嗎？想找什麼職缺？",
      "buddy.s3": "Is she job hunting?",
      "buddy.placeholder": "Type a question…",
      "buddy.send": "Send",

      "resume.contact": "Contact",
      "resume.title": "Resume",
      "resume.lead": "Chinese and English versions, kept in sync. Preview below, or download the PDF to keep.",
      "resume.card.en.h": "Lucy Kao — Resume (English)",
      "resume.card.en.sub": "Senior AI / Software Engineer",
      "resume.card.zh.h": "Lucy Kao — Résumé (Chinese)",
      "resume.card.zh.sub": "Senior AI / Software Engineer",
      "resume.download": "Download PDF",
      "resume.mobile": "Preview isn't available on small screens. Use the download button above to view the PDF.",
    },

    zh: {
      "meta.desc": "高明郁 Lucy Kao — AI 工程師，位於台灣",
      "nav.experience": "工作經歷",
      "nav.education": "學歷",
      "nav.practice": "實戰紀錄",
      "nav.projects": "個人專案",
      "nav.interests": "興趣",

      "hero.badge": "開放工作機會中",
      "hero.title": "AI 工程師 · 產品開發",
      "hero.bio": "打造端到端的 AI 系統——從智慧製造的電腦視覺模型，到 LLM 驅動的產品。人在台灣，開放 AI 工程師職缺。",
      "hero.contact": "聯絡我",
      "hero.resume": "履歷",

      "sec.experience": "工作經歷",
      "sec.education": "學歷",
      "sec.practice": "實戰紀錄",
      "sec.projects": "個人專案",
      "sec.interests": "興趣",

      "exp.1.role": "資深電腦視覺 / 軟體工程師",
      "exp.1.company": "友達光電（AUO）· 台中",
      "exp.1.date": "2020/10 – 2026/05",
      "exp.1.b1": "<strong>電腦視覺與模型部署</strong> — 主導端到端視覺 pipeline，訓練並微調客製深度學習模型（YOLO 系列），搭配 OpenCV 影像前處理，達成即時瑕疵檢測與高精度分類。",
      "exp.1.b2": "<strong>後端與資料架構</strong> — 以 FastAPI 建構高效能後端服務，管理 MySQL、MongoDB 上的結構化與非結構化產線資料。",
      "exp.1.b3": "<strong>需求訪談與敏捷交付</strong> — 將複雜的產線痛點轉化為清楚的系統規格，跨部門協作快速調整檢測邏輯、處理各種邊界情況。",

      "exp.2.role": "軟體工程師",
      "exp.2.company": "科展資訊 · 台中",
      "exp.2.date": "2016/08 – 2017/09",
      "exp.2.b1": "<strong>ERP 客製與資料整合</strong> — 客製化企業 ERP 模組，調整報價／訂單格式，串接庫存與會計系統之間的資料流。",
      "exp.2.b2": "<strong>需求訪談與介面優化</strong> — 將跨產業客戶的作業流程轉成技術規格，優化介面互動與業務邏輯，確保穩定交付。",

      "exp.3.role": "FinTech 研究實習生",
      "exp.3.company": "資策會 · 台北",
      "exp.3.date": "2016/02 – 2016/06",
      "exp.3.b1": "<strong>市場研究與趨勢分析</strong> — 研析並比較新興 FinTech 新創，剖析核心商業模式、創新技術與產業趨勢，找出關鍵成功因素。",
      "exp.3.b2": "<strong>出版與個案研究</strong> — 共同撰寫並編輯產業個案書《FINTECH66 金融科技創新精選個案》，整理創新金融科技應用的深度個案。",

      "edu.1.degree": "資訊管理學系 碩士",
      "edu.1.school": "國立中央大學 · 桃園",
      "edu.1.date": "2018 – 2022",
      "edu.1.b1": "碩論：自駕車軌跡預測的 LSTM-CNN 模型（PyTorch）",
      "edu.1.b2": "研究：CNN、Neuro-Fuzzy、PSO 最佳化演算法",
      "edu.1.b3": "「網路創意行銷」課程助教",
      "edu.2.degree": "資訊管理學系 學士",
      "edu.2.school": "世新大學 · 台北",
      "edu.2.date": "2012 – 2016",
      "edu.2.b1": "以 Java 開發 Android 行動應用程式",

      "practice.title": "AOI + AI 瑕疵檢測",
      "practice.meta": "友達光電（AUO）· 台中",
      "practice.p1": "Display panel 的瑕疵檢測，長期倚靠 AOI 機台——昂貴、穩定、深度嵌入產線。我們的任務不是換掉它，而是在不動硬體的前提下，讓它變得更聰明。",
      "practice.p2": "技術面分兩塊：object detection 定位瑕疵區域，image classification 判斷類型與嚴重程度。工廠資料從來不像教科書那樣乾淨充裕——在 limited labeled samples 的條件下把準確度拉到可以信任的水準，是這個專案最核心的工程挑戰。",
      "practice.p3": "但技術只是一半。每次迭代都要跨部門對齊——與製程工程師確認瑕疵的物理意義、與整合團隊對接資料流、與生產單位協調讓產線不停擺。在快速迭代的同時讓各方需求都有人接住，是比 modeling 本身更需要耐力的事。",
      "practice.p4": "上線後，系統要同時處理大量即時檢測請求與高頻 DB 寫入，在真實生產壓力下保持穩定。把 concurrency 架構設計好、撐過那個壓力——某種程度上是整個專案最有成就感的部分。",

      "proj.1.title": "沐春選茶 — LINE Bot + Threads 行銷",
      "proj.1.desc": "為茶葉品牌打造的一套 AI 工具。LINE Bot 讓顧客用說話方式下單，訂單自動進 Notion、出貨同步行事曆；同一個專案也包含每日 Threads 自動發文，由 AI 生成內容、排程上線。",
      "proj.2.title": "澳洲收據追蹤",
      "proj.2.desc": "旅居澳洲期間想解決記帳麻煩，用 macOS 內建 OCR 拍照辨識收據，自動解析品項與金額存進 Notion。探索如何在資料雜亂、格式不統一的真實收據上做出可靠的資訊擷取。",

      "interest.1.title": "咖啡與烹飪",
      "interest.1.desc": "手沖咖啡跟下廚都是讓思緒慢下來的方式，也喜歡四處探咖啡廳，感受不同空間的氣氛。",
      "interest.2.title": "健身與跑步",
      "interest.2.desc": "喜歡健身和運動帶來的成效感，還有那段只跟自己對話的時間。",
      "interest.3.title": "旅遊與攝影",
      "interest.3.desc": "喜歡出遊到處走走看看，用鏡頭記錄沿途的風景和日常片段。",
      "interest.4.title": "音樂與動畫",
      "interest.4.desc": "音樂和動畫是卸下的出口，會認真沉浸、不隨便看完就算。",

      "buddy.l1": "嗨，我是 Lucy 👋 歡迎來我的作品集！",
      "buddy.l2": "往下滑可以看我的經歷跟專案～",
      "buddy.l3": "想找我的履歷嗎？點這裡直接看",
      "buddy.l4": "這幾個 Side Project 我還蠻得意的，可以點進去看",
      "buddy.l5": "有問題想直接問我？點我聊聊",
      "buddy.cta": "好啊 →",
      "buddy.greet": "嗨！我是 Lucy 的 AI 分身，可以幫你介紹她的背景。想知道什麼都可以問 😊",
      "buddy.title": "Lucy 的 AI 分身",
      "buddy.sub": "問我關於 Lucy 的經歷、專案、技能",
      "buddy.s1q": "介紹一下 Lucy 的電腦視覺經驗",
      "buddy.s1": "電腦視覺經驗？",
      "buddy.s2q": "Lucy 做過哪些個人專案？",
      "buddy.s2": "個人專案？",
      "buddy.s3q": "Lucy 現在在找工作嗎？想找什麼職缺？",
      "buddy.s3": "在找工作嗎？",
      "buddy.placeholder": "打字問問看…",
      "buddy.send": "送出",

      "resume.contact": "聯絡",
      "resume.title": "履歷",
      "resume.lead": "中英文版本內容同步。下方可預覽，也可以下載 PDF 留存。",
      "resume.card.en.h": "Lucy Kao — Resume (English)",
      "resume.card.en.sub": "資深 AI／軟體工程師",
      "resume.card.zh.h": "高明郁（Lucy）— 履歷",
      "resume.card.zh.sub": "資深 AI／軟體工程師",
      "resume.download": "下載 PDF",
      "resume.mobile": "小螢幕無法預覽，請點上方按鈕下載 PDF 查看。",
    },
  };

  let lang = DEFAULT;
  try {
    const saved = localStorage.getItem(KEY);
    if (saved === "en" || saved === "zh") lang = saved;
  } catch (e) {}

  function t(key) {
    return (T[lang] && T[lang][key]) || (T.en[key]) || key;
  }

  function apply() {
    document.documentElement.lang = lang === "zh" ? "zh-Hant" : "en";
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      el.textContent = t(el.getAttribute("data-i18n"));
    });
    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      el.innerHTML = t(el.getAttribute("data-i18n-html"));
    });
    document.querySelectorAll("[data-i18n-attr]").forEach((el) => {
      el.getAttribute("data-i18n-attr").split(",").forEach((pair) => {
        const [attr, key] = pair.split(":");
        el.setAttribute(attr.trim(), t(key.trim()));
      });
    });
    const btn = document.getElementById("langToggle");
    if (btn) btn.textContent = lang === "zh" ? "EN" : "中";
    document.dispatchEvent(new CustomEvent("langchange", { detail: { lang } }));
  }

  window.i18n = {
    get lang() { return lang; },
    t: t,
    set(next) {
      lang = next === "zh" ? "zh" : "en";
      try { localStorage.setItem(KEY, lang); } catch (e) {}
      apply();
    },
    toggle() { this.set(lang === "zh" ? "en" : "zh"); },
  };

  document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("langToggle");
    if (btn) btn.addEventListener("click", () => window.i18n.toggle());
    apply();
  });
})();
