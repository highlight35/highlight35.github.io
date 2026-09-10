/* Lucy Buddy — 官網 Q 版導覽角色 + 聊天 */
(function () {
  const API = "https://161-118-248-184.nip.io/portfolio-chat";
  const DISMISS_KEY = "lucyBuddyDismissed";

  try { if (sessionStorage.getItem(DISMISS_KEY) === "1") return; } catch (e) {}

  const AVATAR_IMG = `<img src="assets/img/lucy-avatar.png" alt="Lucy" draggable="false">`;
  const MINI_SVG = AVATAR_IMG;

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
    <button class="lb-avatar" id="lbAvatar" aria-label="跟 Lucy 聊聊">${AVATAR_IMG}</button>
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
