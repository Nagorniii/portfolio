/*
  НАЛАШТУВАННЯ ПОРТФОЛІО:
  1. Заміни demo-проєкти нижче на свої.
  2. Для thumbnail вкажи шлях до обкладинки, наприклад "assets/video-01.jpg".
  3. Для video встав посилання YouTube у форматі https://www.youtube.com/embed/VIDEO_ID
     або пряме посилання на mp4-файл.
  4. Якщо відео ще не готове, залиш video порожнім — картка працюватиме як заглушка.
*/
const projects = [
  {title:"", category:"", categoryLabel:"", description:"", thumbnail:"", video:"https://www.youtube.com/embed/AsIYjDa1VXk", color:"#d8c4b1", mark:"product<br>story"},
  {title:"", category:"", categoryLabel:"", description:"", thumbnail:"", video:"https://www.youtube.com/embed/N1feAtS2MEw", color:"#d8c4b1", mark:"product<br>story"},
  {title:"", category:"", categoryLabel:"", description:"", thumbnail:"", video:"https://www.youtube.com/embed/FBks6EFzIHw", color:"#d8c4b1", mark:"product<br>story"},
  {title:"", category:"", categoryLabel:"", description:"", thumbnail:"", video:"https://www.youtube.com/embed/JKInKWmWWZ8", color:"#d8c4b1", mark:"product<br>story"},
  {title:"", category:"", categoryLabel:"", description:"", thumbnail:"", video:"https://www.youtube.com/embed/rfbcYMd0BNE", color:"#d8c4b1", mark:"product<br>story"},
  {title:"", category:"", categoryLabel:"", description:"", thumbnail:"", video:"https://www.youtube.com/embed/uRCpXrPTn20", color:"#d8c4b1", mark:"product<br>story"},
  {title:"", category:"", categoryLabel:"", description:"", thumbnail:"", video:"https://www.youtube.com/embed/qdxhAzWpI9o", color:"#d8c4b1", mark:"product<br>story"},
  {title:"", category:"", categoryLabel:"", description:"", thumbnail:"", video:"https://www.youtube.com/embed/twjAWJtIjqw", color:"#d8c4b1", mark:"product<br>story"},
  {title:"", category:"", categoryLabel:"", description:"", thumbnail:"", video:"https://www.youtube.com/embed/7e-hclfS970", color:"#d8c4b1", mark:"product<br>story"},
  {title:"", category:"", categoryLabel:"", description:"", thumbnail:"", video:"https://www.youtube.com/embed/I7plaigAiG8", color:"#d8c4b1", mark:"product<br>story"},
 /*{title:"Beauty details", category:"beauty", categoryLabel:"BEAUTY", description:"Beauty-контент · Деталі та текстури", thumbnail:"", video:"https://www.youtube.com/embed/", color:"#d9bcb6", mark:"beauty<br>details"},
  {title:"A day in my life", category:"lifestyle", categoryLabel:"LIFESTYLE", description:"Lifestyle · Атмосферне відео", thumbnail:"", video:"", color:"#c6c9b7", mark:"a day<br>in my life"},
  {title:"UGC review", category:"ugc", categoryLabel:"UGC / AD", description:"Огляд продукту · Нативна інтеграція", thumbnail:"", video:"", color:"#d8c9a9", mark:"ugc<br>review"},
  {title:"Visual mood", category:"product", categoryLabel:"PRODUCT VIDEO", description:"Креативна концепція · Відеомонтаж", thumbnail:"", video:"", color:"#c8c2ba", mark:"visual<br>mood"},
  {title:"Soft routine", category:"beauty", categoryLabel:"BEAUTY", description:"Рутина · Естетична подача", thumbnail:"", video:"", color:"#c9b8b0", mark:"soft<br>routine"}*/
];

const grid = document.querySelector("#projectGrid");
const filters = document.querySelector("#filters");

function getEmbedUrl(url) {
  if (!url) return "";
  try {
    const parsed = new URL(url);
    let videoId = "";
    if (parsed.hostname.includes("youtu.be")) {
      videoId = parsed.pathname.slice(1).split("/")[0];
    } else if (parsed.pathname.includes("/shorts/")) {
      videoId = parsed.pathname.split("/shorts/")[1].split("/")[0];
    } else if (parsed.pathname.includes("/embed/")) {
      videoId = parsed.pathname.split("/embed/")[1].split("/")[0];
    } else {
      videoId = parsed.searchParams.get("v") || "";
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  } catch {
    return url;
  }
}

function renderProjects(filter = "all") {
  const visible = projects.filter(p => filter === "all" || p.category === filter);
  grid.innerHTML = visible.map((p) => {
    const originalIndex = projects.indexOf(p);
    let media;

    if (p.video) {
      const isMp4 = p.video.toLowerCase().endsWith(".mp4") || p.video.toLowerCase().includes(".mp4?");
      if (isMp4) {
        media = `<video class="project-player" controls playsinline preload="none" aria-label="${p.title}">
          <source src="${p.video}" type="video/mp4">
          Твій браузер не підтримує відтворення відео.
        </video>`;
      } else {
        media = `<iframe class="project-player" src="${getEmbedUrl(p.video)}" title="${p.title}"
          loading="lazy" referrerpolicy="origin"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen></iframe>`;
      }
    } else {
      const thumb = p.thumbnail
        ? `<img src="${p.thumbnail}" alt="${p.title}" loading="lazy">`
        : `<span class="thumb-placeholder">${p.mark}</span>`;
      media = `<div class="project-placeholder" style="--tile:${p.color}">${thumb}<span class="placeholder-label">ВІДЕО ДОДАЄТЬСЯ</span></div>`;
    }

    return `<article class="project-card">
      <div class="project-thumb">${media}</div>
      <div class="project-meta">
        <div><h3>${p.title}</h3><p>${p.categoryLabel} · ${p.description}</p></div>
        <span class="project-index">0${originalIndex + 1}</span>
      </div>
    </article>`;
  }).join("");
}

filters.addEventListener("click", e => {
  const btn = e.target.closest("[data-filter]");
  if (!btn) return;
  filters.querySelectorAll(".filter").forEach(b => b.classList.toggle("active", b === btn));
  renderProjects(btn.dataset.filter);
});

const menuToggle = document.querySelector("#menuToggle");
const nav = document.querySelector("#nav");
menuToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));
renderProjects();
