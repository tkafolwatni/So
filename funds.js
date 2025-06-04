// funds.js

const fundsContainer = document.getElementById("funds-container");
const fundsForm = document.getElementById("funds-form");
const balanceDisplay = document.getElementById("balance");
const currentUser = JSON.parse(localStorage.getItem("currentUser")) || { role: "عضو جديد", username: "anonymous" };

const allowedRoles = ["رئيس الحزب", "المسؤول المالي"];

function loadFunds() {
    const funds = JSON.parse(localStorage.getItem("funds")) || [];
    fundsContainer.innerHTML = "";

    let total = {
        "ليرة سورية": 0,
        "دولار أمريكي": 0,
        "يورو": 0,
        "ليرة تركية": 0,
    };

    funds.forEach((entry, index) => {
        const div = document.createElement("div");
        div.className = "fund-entry";

        const sign = entry.type === "دخل" ? "+" : "-";
        div.innerHTML = `
            <strong>${entry.type}</strong>: ${sign}${entry.amount} ${entry.currency}
            <br /><span class="note">${entry.note} — (${entry.by})</span>
        `;

        // حساب الرصيد
        total[entry.currency] += entry.type === "دخل" ? entry.amount : -entry.amount;

        // حذف السطر (للمخولين فقط)
        if (allowedRoles.includes(currentUser.role)) {
            const delBtn = document.createElement("button");
            delBtn.textContent = "حذف";
            delBtn.onclick = () => {
                if (confirm("هل أنت متأكد؟")) {
                    funds.splice(index, 1);
                    localStorage.setItem("funds", JSON.stringify(funds));
                    loadFunds();
                }
            };
            div.appendChild(delBtn);
        }

        fundsContainer.appendChild(div);
    });

    balanceDisplay.innerHTML = `
        <h3>الرصيد الحالي</h3>
        <ul>
            <li>ل.س: ${total["ليرة سورية"]}</li>
            <li>$: ${total["دولار أمريكي"]}</li>
            <li>€: ${total["يورو"]}</li>
            <li>₺: ${total["ليرة تركية"]}</li>
        </ul>
    `;
}

if (fundsForm && allowedRoles.includes(currentUser.role)) {
    fundsForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const type = document.getElementById("fund-type").value;
        const amount = parseFloat(document.getElementById("fund-amount").value);
        const currency = document.getElementById("fund-currency").value;
        const note = document.getElementById("fund-note").value.trim();

        if (!type || isNaN(amount) || !currency || !note) return;

        const funds = JSON.parse(localStorage.getItem("funds")) || [];
        funds.push({ type, amount, currency, note, by: currentUser.role });

        localStorage.setItem("funds", JSON.stringify(funds));
        fundsForm.reset();
        loadFunds();
    });
}

if (fundsForm && !allowedRoles.includes(currentUser.role)) {
    fundsForm.style.display = "none";
}

document.addEventListener("DOMContentLoaded", loadFunds);