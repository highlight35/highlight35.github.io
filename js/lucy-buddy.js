/* Lucy Buddy — 官網 Q 版導覽角色 + 聊天（支援中英切換） */
(function () {
  const API = "https://161-118-248-184.nip.io/portfolio-chat";
  const DISMISS_KEY = "lucyBuddyDismissed";

  try { if (sessionStorage.getItem(DISMISS_KEY) === "1") return; } catch (e) {}

  const FALLBACK = {
    "buddy.l1": "Hi, I'm Lucy 👋 welcome to my portfolio!",
    "buddy.l2": "Scroll down to see my experience and projects",
    "buddy.l3": "Looking for my resume? Tap here",
    "buddy.l4": "Pretty happy with these side projects — take a look",
    "buddy.l5": "Want to ask me something directly? Tap me",
    "buddy.cta": "Sure →",
    "buddy.greet": "Hi! I'm Lucy's AI double — ask me anything about her 😊",
    "buddy.title": "Lucy's AI double",
    "buddy.sub": "Ask about Lucy's experience, projects, skills",
    "buddy.s1q": "介紹一下 Lucy 的電腦視覺經驗", "buddy.s1": "Her computer vision experience?",
    "buddy.s2q": "Lucy 做過哪些個人專案？", "buddy.s2": "Her side projects?",
    "buddy.s3q": "Lucy 現在在找工作嗎？想找什麼職缺？", "buddy.s3": "Is she job hunting?",
    "buddy.placeholder": "Type a question…",
    "buddy.send": "Send",
    "buddy.thinking": "thinking…",
    "buddy.err": "Something went wrong just now, try again 🙏",
    "buddy.offline": "Can't reach the server, ask me again in a bit 🙏",
  };
  function t(key) {
    if (window.i18n && window.i18n.t) {
      const v = window.i18n.t(key);
      if (v && v !== key) return v;
    }
    return FALLBACK[key] || key;
  }

  const AVATAR_IMG = `<img src="assets/img/lucy-avatar.png" alt="Lucy" draggable="false">`;

  const LINES = [
    { k: "buddy.l1", cta: null },
    { k: "buddy.l2", cta: null },
    { k: "buddy.l3", cta: () => location.href = "resume.html" },
    { k: "buddy.l4", cta: () => location.hash = "#projects" },
    { k: "buddy.l5", cta: () => openChat() },
  ];

  // ---- build DOM ----
  const root = document.createElement("div");
  root.id = "lucy-buddy";
  root.innerHTML = `
    <div class="lb-bubble" id="lbBubble"></div>
    <button class="lb-avatar" id="lbAvatar" aria-label="Lucy"><img src="assets/img/lucy-avatar.png" alt="Lucy" draggable="false"></button>
    <button class="lb-close" id="lbClose" aria-label="close">✕</button>`;
  document.body.appendChild(root);

  const chat = document.createElement("div");
  chat.className = "lb-chat";
  chat.id = "lbChat";
  chat.innerHTML = `
    <div class="lb-chat-head">
      <span class="lb-mini">${AVATAR_IMG}</span>
      <div>
        <div class="lb-title" id="lbHeadTitle"></div>
        <div class="lb-sub" id="lbHeadSub"></div>
      </div>
      <button class="lb-x" id="lbX" aria-label="close">✕</button>
    </div>
    <div class="lb-log" id="lbLog"></div>
    <div class="lb-suggest" id="lbSuggest">
      <button data-qk="buddy.s1q" data-lk="buddy.s1"></button>
      <button data-qk="buddy.s2q" data-lk="buddy.s2"></button>
      <button data-qk="buddy.s3q" data-lk="buddy.s3"></button>
    </div>
    <div class="lb-input-row">
      <input id="lbInput" type="text" maxlength="500" autocomplete="off">
      <button id="lbSend"></button>
    </div>`;
  document.body.appendChild(chat);

  const bubble = document.getElementById("lbBubble");
  const avatar = document.getElementById("lbAvatar");
  const log = document.getElementById("lbLog");
  const input = document.getElementById("lbInput");
  const sendBtn = document.getElementById("lbSend");
  const suggest = document.getElementById("lbSuggest");

  function applyStaticText() {
    document.getElementById("lbHeadTitle").textContent = t("buddy.title");
    document.getElementById("lbHeadSub").textContent = t("buddy.sub");
    input.placeholder = t("buddy.placeholder");
    sendBtn.textContent = t("buddy.send");
    suggest.querySelectorAll("button").forEach(b => {
      b.textContent = t(b.dataset.lk);
      b.dataset.q = t(b.dataset.qk);
    });
  }

  // ---- bubble rotation ----
  let lineIdx = 0, bubbleTimer = null, currentLine = 0;

  function showLine(i) {
    currentLine = i;
    const line = LINES[i];
    bubble.innerHTML = t(line.k) + (line.cta ? ` <span class="lb-bubble-cta" id="lbCta">${t("buddy.cta")}</span>` : "");
    bubble.classList.add("show");
    if (line.cta) document.getElementById("lbCta").addEventListener("click", line.cta);
    clearTimeout(bubbleTimer);
    bubbleTimer = setTimeout(() => bubble.classList.remove("show"), 6500);
  }

  function nextLine() {
    if (chat.classList.contains("open")) return;
    showLine(lineIdx % LINES.length);
    lineIdx++;
  }

  setTimeout(nextLine, 1200);
  setInterval(nextLine, 13000);

  const projects = document.getElementById("projects");
  if (projects) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting && !chat.classList.contains("open")) {
          clearTimeout(bubbleTimer);
          showLine(3);
        }
      });
    }, { threshold: 0.3 });
    io.observe(projects);
  }

  // 語言切換時，即時更新
  document.addEventListener("langchange", () => {
    applyStaticText();
    if (bubble.classList.contains("show")) showLine(currentLine);
  });

  // ---- dismiss ----
  document.getElementById("lbClose").addEventListener("click", () => {
    root.classList.add("hidden");
    try { sessionStorage.setItem(DISMISS_KEY, "1"); } catch (e) {}
  });

  // ---- chat ----
  const history = [];
  let busy = false;

  function openChat() {
    chat.classList.add("open");
    bubble.classList.remove("show");
    if (!log.children.length) addMsg("bot", t("buddy.greet"));
    input.focus();
  }
  function closeChat() { chat.classList.remove("open"); }

  avatar.addEventListener("click", () => chat.classList.contains("open") ? closeChat() : openChat());
  document.getElementById("lbX").addEventListener("click", closeChat);

  function addMsg(who, text) {
    const el = document.createElement("div");
    el.className = "lb-msg " + (who === "me" ? "me" : "bot");
    el.textContent = text;
    log.appendChild(el);
    log.scrollTop = log.scrollHeight;
    return el;
  }

  async function send(text) {
    text = (text || input.value).trim();
    if (!text || busy) return;
    busy = true;
    sendBtn.disabled = true;
    input.value = "";
    suggest.style.display = "none";
    addMsg("me", text);
    history.push({ role: "user", text });

    const typing = addMsg("bot", t("buddy.thinking"));
    typing.classList.add("typing");

    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history: history.slice(0, -1) }),
      });
      const data = await res.json();
      typing.remove();
      if (res.ok && data.reply) {
        addMsg("bot", data.reply);
        history.push({ role: "model", text: data.reply });
      } else {
        addMsg("bot", data.detail || t("buddy.err"));
      }
    } catch (e) {
      typing.remove();
      addMsg("bot", t("buddy.offline"));
    } finally {
      busy = false;
      sendBtn.disabled = false;
      input.focus();
    }
  }

  sendBtn.addEventListener("click", () => send());
  input.addEventListener("keydown", (e) => { if (e.key === "Enter") send(); });
  suggest.querySelectorAll("button").forEach(b =>
    b.addEventListener("click", () => send(b.dataset.q))
  );

  applyStaticText();
})();
