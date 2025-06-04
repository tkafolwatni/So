// utils.js

// توليد كود مكون من 6 أرقام
function generateCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// تعريف الألقاب حسب الكود
const codeRoles = {
    // أمثلة: عند إنشاء كود جديد من قبل مشرف أو مساعد، يتم ربطه هكذا
    // "123456": "رئيس الحزب",
    // "234567": "رئيس قسم العلاقات الخارجية",
    // "345678": "عضو جديد",
};

// صلاحيات الألقاب
const roles = {
    "رئيس الحزب": "🛡️",
    "رئيس قسم العلاقات الخارجية": "⚙️",
    "أمين السر": "⚙️",
    "رئيس قسم العلاقات العامة": "⚙️",
    "المسؤول المالي": "⚙️",
    "عضو جديد": "👤",
    "عضو قديم": "👤",
    "عضو مؤسس": "👤",
    "أحد العشرين الأوائل": "👤"
};

// حفظ الحساب الجديد
function saveAccount(username, password, code, role) {
    const accounts = JSON.parse(localStorage.getItem("accounts") || "[]");
    accounts.push({
        username,
        password,
        code,
        role,
        timestamp: new Date().toISOString()
    });
    localStorage.setItem("accounts", JSON.stringify(accounts));
    // تحديث قائمة الأكواد والألقاب
    codeRoles[code] = role;
}

// التحقق من الحساب
function validateLogin(username, password) {
    const accounts = JSON.parse(localStorage.getItem("accounts") || "[]");
    return accounts.find(acc => acc.username === username && acc.password === password);
}

// استرجاع اللقب من الكود
function getRoleFromCode(code) {
    return codeRoles[code] || null;
}

// صلاحية الدور
function getRoleLevel(role) {
    if (role === "رئيس الحزب") return 3;
    if (["رئيس قسم العلاقات الخارجية", "أمين السر", "رئيس قسم العلاقات العامة", "المسؤول المالي"].includes(role)) return 2;
    return 1;
}

// استرجاع كل الحسابات (للمشرف والمساعدين فقط)
function getAllAccounts() {
    return JSON.parse(localStorage.getItem("accounts") || "[]");
}