// polls.js

const pollsContainer = document.getElementById("polls-container");
const createPollForm = document.getElementById("create-poll-form");
const currentUser = JSON.parse(localStorage.getItem("currentUser")) || { role: "عضو جديد", username: "anonymous" };

// تحديد الصلاحيات
const isPrivileged = ["رئيس الحزب", "رئيس قسم العلاقات الخارجية", "أمين السر", "رئيس قسم العلاقات العامة", "المسؤول المالي"].includes(currentUser.role);

// تحميل الاستطلاعات
function loadPolls() {
    const polls = JSON.parse(localStorage.getItem("polls")) || [];
    pollsContainer.innerHTML = "";

    polls.forEach((poll, index) => {
        const wrapper = document.createElement("div");
        wrapper.className = "poll";

        const title = document.createElement("h3");
        title.textContent = poll.question;
        wrapper.appendChild(title);

        poll.options.forEach((opt, i) => {
            const btn = document.createElement("button");
            btn.textContent = `${opt.text} (${opt.votes})`;
            btn.onclick = () => vote(index, i);
            btn.disabled = poll.voters.includes(currentUser.username);
            wrapper.appendChild(btn);
        });

        if (poll.voters.includes(currentUser.username)) {
            const note = document.createElement("p");
            note.className = "voted-note";
            note.textContent = "لقد قمت بالتصويت.";
            wrapper.appendChild(note);
        }

        pollsContainer.appendChild(wrapper);
    });
}

// التصويت
function vote(pollIndex, optionIndex) {
    const polls = JSON.parse(localStorage.getItem("polls")) || [];
    const poll = polls[pollIndex];

    if (poll.voters.includes(currentUser.username)) return;

    poll.options[optionIndex].votes++;
    poll.voters.push(currentUser.username);

    localStorage.setItem("polls", JSON.stringify(polls));
    loadPolls();
}

// إنشاء استطلاع جديد
if (createPollForm && isPrivileged) {
    createPollForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const question = document.getElementById("poll-question").value.trim();
        const options = document.getElementById("poll-options").value
            .split(",")
            .map(opt => ({ text: opt.trim(), votes: 0 }));

        if (!question || options.length < 2) return alert("يجب إدخال سؤال وخيارين على الأقل.");

        const newPoll = {
            question,
            options,
            voters: []
        };

        const polls = JSON.parse(localStorage.getItem("polls")) || [];
        polls.push(newPoll);
        localStorage.setItem("polls", JSON.stringify(polls));
        createPollForm.reset();
        loadPolls();
    });
}

// إخفاء نموذج الإنشاء إن لم يكن المستخدم من المساعدين أو المشرف
if (createPollForm && !isPrivileged) {
    createPollForm.style.display = "none";
}

document.addEventListener("DOMContentLoaded", loadPolls);