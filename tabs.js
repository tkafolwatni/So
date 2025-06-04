// tabs.js

function openSection(sectionId) {
    const sections = document.querySelectorAll(".internal-section");
    sections.forEach(sec => {
        sec.style.display = "none";
    });

    const active = document.getElementById(sectionId);
    if (active) {
        active.style.display = "block";
    }

    const links = document.querySelectorAll(".sidebar a");
    links.forEach(link => link.classList.remove("active-tab"));

    const activeLink = document.querySelector(`.sidebar a[data-target='${sectionId}']`);
    if (activeLink) {
        activeLink.classList.add("active-tab");
    }
}

// تحديد القسم الافتراضي عند الدخول
document.addEventListener("DOMContentLoaded", () => {
    openSection("chat");
});