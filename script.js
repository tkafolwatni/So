// script.js - المنطق العام للواجهة السرية

// تحميل الصفحة المناسبة عند الضغط على زر في القائمة
const pages = document.querySelectorAll(".page");
const navButtons = document.querySelectorAll(".sidebar button");

navButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    navButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const pageId = btn.getAttribute("data-page");
    pages.forEach((p) => p.classList.remove("active"));
    document.getElementById(pageId).classList.add("active");
  });
});

// === نظام الصلاحيات ===
const user = JSON.parse(localStorage.getItem("tk_user")) || null;

function hasPrivilege(level) {
  if (!user) return false;
  if (user.rank === "رئيس الحزب") return true;
  if (level === "مساعد" && ["رئيس قسم العلاقات الخارجية", "أمين السر", "رئيس قسم العلاقات العامة", "المسؤول المالي"].includes(user.rank)) return true;
  return false;
}

// === واجهة الدردشة ===
const chatInput = document.getElementById("chatInput");
const chatBox = document.getElementById("chatBox");
const destroyCode = "ككك";

// تحميل الرسائل من localStorage
function loadMessages() {
  const messages = JSON.parse(localStorage.getItem("tk_chat") || "[]");
  chatBox.innerHTML = "";
  messages.forEach(msg => addMessage(msg));
}

// إضافة رسالة للصندوق
function addMessage({ rank, time, text }) {
  const div = document.createElement("div");
  div.classList.add("chat-message");
  div.innerHTML = `
    <div class="meta">${rank} • ${time}</div>
    <div>${text}</div>
  `;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// حفظ الرسالة
function saveMessage(text) {
  const now = new Date();
  const time = now.toLocaleString("ar-SY");
  const messages = JSON.parse(localStorage.getItem("tk_chat") || "[]");
  messages.push({ rank: user?.rank || "عضو", time, text });
  localStorage.setItem("tk_chat", JSON.stringify(messages));
  addMessage({ rank: user?.rank || "عضو", time, text });
}

// إرسال الرسالة أو تنفيذ كود التدمير
chatInput?.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && chatInput.value.trim() !== "") {
    const val = chatInput.value.trim();
    if (val === destroyCode) {
      localStorage.removeItem("tk_chat");
      chatBox.innerHTML = "<div style='color:red;'>تم مسح جميع الرسائل.</div>";
    } else {
      saveMessage(val);
    }
    chatInput.value = "";
  }
});

loadMessages();

// === واجهات مخصصة بصلاحيات ===
// منع عرض عناصر غير مصرح بها
window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-privilege='مساعد']").forEach(el => {
    if (!hasPrivilege("مساعد")) el.style.display = "none";
  });
  document.querySelectorAll("[data-privilege='مشرف']").forEach(el => {
    if (user?.rank !== "رئيس الحزب") el.style.display = "none";
  });
});