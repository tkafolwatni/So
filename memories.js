let userRole = localStorage.getItem("user_role") || "عضو";

function showPage(pageId) {
  document.querySelectorAll(".page").forEach(p => p.classList.add("hidden"));
  document.getElementById(pageId).classList.remove("hidden");
  if (pageId === "memories") loadMemories();
}

function uploadMemory() {
  const fileInput = document.getElementById("memory-image");
  const file = fileInput.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    const dataUrl = reader.result;
    let memories = JSON.parse(localStorage.getItem("memories") || "[]");
    memories.push(dataUrl);
    localStorage.setItem("memories", JSON.stringify(memories));
    loadMemories();
  };
  reader.readAsDataURL(file);
}

function loadMemories() {
  const gallery = document.getElementById("memories-gallery");
  gallery.innerHTML = "";
  const memories = JSON.parse(localStorage.getItem("memories") || "[]");
  memories.forEach(dataUrl => {
    const img = document.createElement("img");
    img.src = dataUrl;
    img.className = "memory-image";
    gallery.appendChild(img);
  });

  const uploadControls = document.getElementById("upload-controls");
  if (
    userRole === "رئيس الحزب" ||
    userRole === "رئيس قسم العلاقات العامة" ||
    userRole === "أمين السر" ||
    userRole === "رئيس قسم العلاقات الخارجية" ||
    userRole === "عضو (قديم)" ||
    userRole === "عضو (مؤسس)" ||
    userRole === "أحد العشرين الأوائل"
  ) {
    uploadControls.classList.remove("hidden");
  } else {
    uploadControls.classList.add("hidden");
  }
}