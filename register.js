// register.js - توليد الحسابات الجديدة بواسطة المشرف أو المساعدين

const registerForm = document.getElementById("registerForm");
const codeOutput = document.getElementById("generatedCode");
const accountsKey = "tk_accounts";

// توليد كود عشوائي من 6 أرقام
function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// تحميل الحسابات السابقة
function loadAccounts() {
  return JSON.parse(localStorage.getItem(accountsKey) || "[]");
}

// حفظ الحساب الجديد
function saveAccount(account) {
  const accounts = loadAccounts();
  accounts.push(account);
  localStorage.setItem(accountsKey, JSON.stringify(accounts));
}

// عند توليد حساب جديد
registerForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.getElementById("newUsername").value.trim();
  const password = document.getElementById("newPassword").value.trim();
  const rank = document.getElementById("rankSelect").value;

  if (!username || !password || !rank) return;

  const code = generateCode();
  const createdAt = new Date().toLocaleString("ar-SY");

  const account = { username, password, rank, code, createdAt };
  saveAccount(account);

  codeOutput.innerHTML = `
    ✅ تم إنشاء الحساب بنجاح:<br>
    🔐 اسم المستخدم: <b>${username}</b><br>
    🔑 كلمة المرور: <b>${password}</b><br>
    🆔 الكود: <b>${code}</b><br>
    🪪 اللقب: <b>${rank}</b><br>
    🕓 الوقت: <b>${createdAt}</b>
  `;

  registerForm.reset();
});