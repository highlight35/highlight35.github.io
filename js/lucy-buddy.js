/* Lucy Buddy — 官網 Q 版導覽角色 + 聊天 */
(function () {
  const API = "https://161-118-248-184.nip.io/portfolio-chat";
  const DISMISS_KEY = "lucyBuddyDismissed";

  try { if (sessionStorage.getItem(DISMISS_KEY) === "1") return; } catch (e) {}

  const AVATAR_SVG = `
    <svg viewBox="0 0 100 100" aria-hidden="true">
      <ellipse cx="50" cy="96" rx="24" ry="4.5" fill="rgba(0,0,0,.10)"/>
      <!-- 頭髮後層 (順著肩膀垂下) -->
      <path d="M24 44 C24 18 76 18 76 44 C76 60 74 76 71 90 L64 90 C67 74 68 58 68 46 C68 28 32 28 32 46 C32 58 33 74 36 90 L29 90 C26 76 24 60 24 44 Z" fill="#2b2b33"/>
      <!-- 脖子 -->
      <rect x="45" y="62" width="10" height="10" rx="3" fill="#f6d9c2"/>
      <!-- 身體 -->
      <path d="M33 80 C33 69 67 69 67 80 L70 97 L30 97 Z" fill="#3b82f6"/>
      <!-- 手臂 (揮手) -->
      <g class="lb-arm"><path d="M63 78 q13 -5 13 -19" stroke="#f6d9c2" stroke-width="6.5" fill="none" stroke-linecap="round"/></g>
      <path d="M37 78 q-9 -3 -10 -12" stroke="#f6d9c2" stroke-width="6.5" fill="none" stroke-linecap="round"/>
      <!-- 臉 -->
      <ellipse cx="50" cy="46" rx="19" ry="20" fill="#fbe3cf"/>
      <!-- 瀏海 -->
      <path d="M31 40 C33 25 67 25 69 40 C64 32 57 30 50 30 C43 30 36 32 31 40 Z" fill="#2b2b33"/>
      <!-- 眼鏡 -->
      <circle cx="42.5" cy="46" r="7" fill="#fff" stroke="#33343a" stroke-width="2"/>
      <circle cx="57.5" cy="46" r="7" fill="#fff" stroke="#33343a" stroke-width="2"/>
      <line x1="49.5" y1="45" x2="50.5" y2="45" stroke="#33343a" stroke-width="2"/>
      <!-- 眼睛 -->
      <circle class="lb-eye" cx="42.5" cy="46" r="2.5" fill="#2b2b33"/>
      <circle class="lb-eye" cx="57.5" cy="46" r="2.5" fill="#2b2b33"/>
      <!-- 腮紅 + 嘴 -->
      <circle cx="36" cy="52" r="2.4" fill="#f7b3a4" opacity=".65"/>
      <circle cx="64" cy="52" r="2.4" fill="#f7b3a4" opacity=".65"/>
      <path d="M46.5 54 q3.5 3.5 7 0" stroke="#c96b5b" stroke-width="1.8" fill="none" stroke-linecap="round"/>
    </svg>`;

  const MINI_SVG = AVATAR_SVG;

  const LINES = [
    { t: "嗨，我是 Lucy 👋 歡迎來我的作品集！", cta: null },
    { t: "往下滑可以看我的經歷跟專案～", cta: null },
    { t: "想找我的履歷嗎？點這裡直接看", cta: () => location.href = "resume.html" },
    { t: "這幾個 Side Project 我還蠻得意的，可以點進去看", cta: () => location.hash = "#projects" },
    { t: "有問題想直接問我？點我聊聊", cta: openChat },
  ];

  // ---- build DOM ----
  const root = document.createElement("div");
  root.id = "lucy-buddy";
  root.innerHTML = `
    <div class="lb-bubble" id="lbBubble"></div>
    <button class="lb-avatar" id="lbAvatar" aria-label="跟 Lucy 聊聊">${AVATAR_SVG}</button>
    <button class="lb-close" id="lbClose" aria-label="關閉">✕</button>`;
  document.body.appendChild(root);

  const chat = document.createElement("div");
  chat.className = "lb-chat";
  chat.id = "lbChat";
  chat.innerHTML = `
    <div class="lb-chat-head">
      <span class="lb-mini">${MINI_SVG}</span>
      <div>
        <div class="lb-title">Lucy 的 AI 分身</div>
        <div class="lb-sub">問我關於 Lucy 的經歷、專案、技能</div>
      </div>
      <button class="lb-x" id="lbX" aria-label="關閉聊天">✕</button>
    </div>
    <div class="lb-log" id="lbLog"></div>
    <div class="lb-suggest" id="lbSuggest">
      <button data-q="介紹一下 Lucy 的電腦視覺經驗">電腦視覺經驗？</button>
      <button data-q="Lucy 做過哪些個人專案？">個人專案？</button>
      <button data-q="Lucy 現在在找工作嗎？想找什麼職缺？">在找工作嗎？</button>
    </div>
    <div class="lb-input-row">
      <input id="lbInput" type="text" placeholder="打字問問看…" maxlength="500" autocomplete="off">
      <button id="lbSend">送出</button>
    </div>`;
  document.body.appendChild(chat);

  const bubble = document.getElementById("lbBubble");
  const avatar = document.getElementById("lbAvatar");
  const log = document.getElementById("lbLog");
  const input = document.getElementById("lbInput");
  const sendBtn = document.getElementById("lbSend");
  const suggest = document.getElementById("lbSuggest");

  // ---- bubble rotation ----
  let lineIdx = 0, bubbleTimer = null;

  function showLine(i) {
    const line = LINES[i];
    bubble.innerHTML = line.t + (line.cta ? ` <span class="lb-bubble-cta" id="lbCta">好啊 →</span>` : "");
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

  // scroll trigger — 到 projects 區塊時講對應的話
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
    if (!log.children.length) {
      addMsg("bot", "嗨！我是 Lucy 的 AI 分身，可以幫你介紹她的背景。想知道什麼都可以問 😊");
    }
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

    const typing = addMsg("bot", "小郁思考中…");
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
        addMsg("bot", data.detail || "剛剛連線出了點問題，再試一次看看 🙏");
      }
    } catch (e) {
      typing.remove();
      addMsg("bot", "連不上伺服器，等一下再問我 🙏");
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
})();
