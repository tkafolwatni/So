// chat.js

const chatBox = document.getElementById("chat-box");
const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");

let currentUser = JSON.parse(localStorage.getItem("currentUser")) || {
    role: "عضو جديد", // الاحتياطي
    registeredAt: new Date().toISOString()
};

// وظيفة لتنسيق التاريخ
function formatTime(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleDateString() + " - " + d.toLocaleTimeString();
}

// تحميل الرسائل من التخزين المحلي
function loadMessages() {
    chatBox.innerHTML = "";
    const messages = JSON.parse(localStorage.getItem("chatMessages")) || [];
    messages.forEach(msg => {
        appendMessage(msg.role, msg.text, msg.time);
    });
}

// إضافة رسالة إلى صندوق الدردشة
function appendMessage(role, text, time) {
    const msg = document.createElement("div");
    msg.className = "chat-message";
    msg.innerHTML = `<strong>${role}:</strong> ${text} <span class="timestamp">${formatTime(time)}</span>`;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// حفظ الرسائل في localStorage
function saveMessage(text) {
    const messages = JSON.parse(localStorage.getItem("chatMessages")) || [];
    const newMsg = {
        role: currentUser.role,
        text,
        time: new Date().toISOString()
    };
    messages.push(newMsg);
    localStorage.setItem("chatMessages", JSON.stringify(messages));
    appendMessage(newMsg.role, newMsg.text, newMsg.time);
}

// التحقق من كود التدمير الذاتي
function checkDestructionCode(text) {
    return text.trim() === "ككك";
}

// عند إرسال رسالة
chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = chatInput.value.trim();
    if (!text) return;
    
    if (checkDestructionCode(text)) {
        localStorage.removeItem("chatMessages");
        chatBox.innerHTML = "<p class='warning'>تم تفعيل كود التدمير الذاتي وحذف جميع الرسائل.</p>";
    } else {
        saveMessage(text);
    }

    chatInput.value = "";
});

document.addEventListener("DOMContentLoaded", () => {
    // التأكد من أن المستخدم من الهاتف فقط
    if (window.innerWidth > 768) {
        document.body.innerHTML = "<h2 style='color:red;text-align:center;'>هذا الموقع مخصص للهواتف فقط.</h2>";
        return;
    }

    loadMessages();
});