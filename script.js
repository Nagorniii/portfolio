/*
  НАЛАШТУВАННЯ ПОРТФОЛІО:
  1. Заміни demo-проєкти нижче на свої.
  2. Для thumbnail вкажи шлях до обкладинки, наприклад "assets/video-01.jpg".
  3. Для video встав посилання YouTube у форматі https://www.youtube.com/embed/VIDEO_ID
     або пряме посилання на mp4-файл.
  4. Якщо відео ще не готове, залиш video порожнім — картка працюватиме як заглушка.
*/
const projects = [
  {title:"Product story", category:"product", categoryLabel:"PRODUCT VIDEO", description:"Предметна зйомка · Демонстрація продукту", thumbnail:"", video:"https://www.youtube.com/embed/oGxb71zGkzM", color:"#d8c4b1", mark:"product<br>story"},
  {title:"Beauty details", category:"beauty", categoryLabel:"BEAUTY", description:"Beauty-контент · Деталі та текстури", thumbnail:"", video:"https://youtu.be/embed/mUrrP_iiV8c", color:"#d9bcb6", mark:"beauty<br>details"},
  {title:"A day in my life", category:"lifestyle", categoryLabel:"LIFESTYLE", description:"Lifestyle · Атмосферне відео", thumbnail:"", video:"", color:"#c6c9b7", mark:"a day<br>in my life"},
  {title:"UGC review", category:"ugc", categoryLabel:"UGC / AD", description:"Огляд продукту · Нативна інтеграція", thumbnail:"", video:"", color:"#d8c9a9", mark:"ugc<br>review"},
  {title:"Visual mood", category:"product", categoryLabel:"PRODUCT VIDEO", description:"Креативна концепція · Відеомонтаж", thumbnail:"", video:"", color:"#c8c2ba", mark:"visual<br>mood"},
  {title:"Soft routine", category:"beauty", categoryLabel:"BEAUTY", description:"Рутина · Естетична подача", thumbnail:"", video:"", color:"#c9b8b0", mark:"soft<br>routine"}
];

const grid = document.querySelector("#projectGrid");
const filters = document.querySelector("#filters");
const modal = document.querySelector("#videoModal");
const frame = document.querySelector("#videoFrame");

function renderProjects(filter="all") {
  const visible = projects.filter(p => filter === "all" || p.category === filter);
  grid.innerHTML = visible.map((p) => {
    const originalIndex = projects.indexOf(p);
    const thumb = p.thumbnail
      ? `<img src="${p.thumbnail}" alt="${p.title}" loading="lazy">`
      : `<span class="thumb-placeholder">${p.mark}</span>`;
    return `<button class="project-card" type="button" data-index="${originalIndex}" aria-label="Переглянути ${p.title}">
      <div class="project-thumb" style="--tile:${p.color}">${thumb}<span class="play-icon">▶</span></div>
      <div class="project-meta"><div><h3>${p.title}</h3><p>${p.categoryLabel} · ${p.description}</p></div><span class="project-index">0${originalIndex+1}</span></div>
    </button>`;
  }).join("");
}
function openProject(index) {
  const p = projects[index];
  document.querySelector("#modalCategory").textContent = p.categoryLabel;
  document.querySelector("#modalTitle").textContent = p.title;
  frame.innerHTML = "";
  if (p.video) {
    if (p.video.toLowerCase().endsWith(".mp4") || p.video.toLowerCase().includes(".mp4?")) {
      const video = document.createElement("video");
      video.src = p.video; video.controls = true; video.playsInline = true;
      frame.appendChild(video);
    } else {
      const iframe = document.createElement("iframe");
        iframe.src = p.video;
        iframe.title = p.title;
        iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
        iframe.allowFullscreen = true;
        iframe.referrerPolicy = "origin";
        frame.appendChild(iframe);
    }
  } else {
    frame.innerHTML = '<div class="video-empty">Тут буде твоє відео ✳<br>Додай посилання на нього в масив projects у файлі script.js.</div>';
  }
  modal.classList.add("open"); modal.setAttribute("aria-hidden","false");
  document.body.style.overflow = "hidden";
}
function closeModal() {
  modal.classList.remove("open"); modal.setAttribute("aria-hidden","true");
  frame.innerHTML = ""; document.body.style.overflow = "";
}
grid.addEventListener("click", e => {
  const card = e.target.closest("[data-index]");
  if (card) openProject(Number(card.dataset.index));
});
filters.addEventListener("click", e => {
  const btn = e.target.closest("[data-filter]");
  if (!btn) return;
  filters.querySelectorAll(".filter").forEach(b => b.classList.toggle("active", b === btn));
  renderProjects(btn.dataset.filter);
});
document.querySelector("#modalClose").addEventListener("click", closeModal);
modal.addEventListener("click", e => { if (e.target.hasAttribute("data-close")) closeModal(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });
const menuToggle = document.querySelector("#menuToggle");
const nav = document.querySelector("#nav");
menuToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));
renderProjects();
