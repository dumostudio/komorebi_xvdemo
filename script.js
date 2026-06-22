/* ============================================================
   KOMOREBI — script.js
   Lee EVENT (data/event.js) y GUESTS (data/guests.js)
   y llena el HTML. No tocar para cambiar datos de cliente.
   ============================================================ */

const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

/* --- Helpers --- */
const loader  = $("#loader");
const intro   = $("#intro");
const site    = $("#site");
const enterBtn= $("#enterBtn");
const music   = $("#bgMusic");
const musicBtn= $("#musicBtn");

/* ============================================================
   1. APLICAR PALETA DE COLORES DEL EVENTO
   ============================================================ */
function applyPalette(){
  const p = EVENT.palette;
  const root = document.documentElement;
  if(p.mauve)     root.style.setProperty("--mauve",     p.mauve);
  if(p.rose)      root.style.setProperty("--rose",      p.rose);
  if(p.gold)      root.style.setProperty("--gold",      p.gold);
  if(p.champagne) root.style.setProperty("--champagne", p.champagne);
  if(p.blush)     root.style.setProperty("--blush",     p.blush);
}

/* ============================================================
   2. LLENAR TEXTOS SIMPLES
   ============================================================ */
function fillTexts(){
  document.title = `${EVENT.eventType} de ${EVENT.shortName}`;

  const set = (id, val) => { const el = $(id); if(el && val !== undefined) el.textContent = val; };
  const setHTML = (id, val) => { const el = $(id); if(el && val !== undefined) el.innerHTML = val; };

  set("#introName",       EVENT.shortName);
  set("#introMessage",    EVENT.introMessage);
  set("#heroName",        EVENT.shortName);
  set("#heroDate",        EVENT.displayDate);
  set("#countdownLabel",  EVENT.countdownLabel);
  set("#personalMessage", EVENT.personalMessage);
  set("#quoteText",       EVENT.quote);
  set("#quoteAuthor",     EVENT.quoteAuthor);
  set("#familyMessage",   EVENT.familyMessage);
  set("#galleryTitle",    EVENT.galleryTitle);
  set("#galleryText",     EVENT.galleryText);
  set("#menuNote",        EVENT.menuAllergiesNote);
  set("#rsvpDeadline",    `Confirma antes del ${EVENT.rsvpDeadline}`);
  set("#weatherCity",     EVENT.weather.city);
  set("#visitsCity",      `Para disfrutar ${EVENT.weather.city.split(",")[0]}`);
  set("#saveDateLabel",   EVENT.saveDateLabel);
  set("#footerHashtag",   EVENT.hashtag);

  // Foto intro
  const introPhoto = $("#introPhoto");
  if(introPhoto){ introPhoto.src = EVENT.introPhoto; introPhoto.alt = EVENT.shortName; }

  // Audio
  if(music) music.src = EVENT.music;
}

/* ============================================================
   3. PADRES
   ============================================================ */
function buildParents(){
  const container = $("#parentsNames");
  if(!container) return;
  container.setAttribute("aria-label", `Padres de ${EVENT.shortName}`);
  container.innerHTML = `
    <div><strong>${EVENT.parentA.firstName}</strong><span>${EVENT.parentA.lastName}</span></div>
    <em>y</em>
    <div><strong>${EVENT.parentB.firstName}</strong><span>${EVENT.parentB.lastName}</span></div>
  `;
}

/* ============================================================
   4. PADRINOS
   ============================================================ */
function buildGodparents(){
  const grid = $("#godparentsGrid");
  if(!grid || !EVENT.godparents?.length) return;
  grid.innerHTML = EVENT.godparents.map(g =>
    `<article><span>${g.role}</span><p>${g.name}</p></article>`
  ).join("");
}

/* ============================================================
   5. UBICACIONES
   ============================================================ */
function buildLocations(){
  const grid = $("#locationsGrid");
  if(!grid) return;
  const card = (loc) => `
    <article class="location-card">
      <img class="section-photo" src="${loc.photo}" alt="${loc.name}" loading="lazy">
      <p class="eyebrow">${loc.label}</p>
      <h3>${loc.name}</h3>
      <p>${loc.address}</p>
      <strong>${loc.time}</strong>
      <a class="btn ghost" href="${loc.mapsUrl}" target="_blank">Ver ubicación</a>
    </article>`;
  grid.innerHTML = card(EVENT.ceremony) + card(EVENT.reception);
}

/* ============================================================
   6. TIMELINE / PROGRAMA
   ============================================================ */
function buildTimeline(){
  const container = $("#timelineGrid");
  if(!container || !EVENT.timeline?.length) return;
  container.innerHTML = EVENT.timeline.map(item => `
    <article class="timeline-card">
      <span>${item.time}</span>
      <h3>${item.title}</h3>
      <p>${item.description}</p>
      ${item.mapsUrl ? `<a href="${item.mapsUrl}" target="_blank" rel="noopener">Ver ubicación</a>` : ""}
    </article>`
  ).join("");
}

/* ============================================================
   7. MENÚ
   ============================================================ */
function buildMenu(){
  const list = $("#menuList");
  if(!list || !EVENT.menu?.length) return;
  list.innerHTML = EVENT.menu.map(item => `
    <article class="menu-item">
      <div class="menu-title-line"><span></span><strong>${item.course}</strong><span></span></div>
      <div class="menu-dish">
        <img class="menu-thumb" src="${item.photo}" alt="${item.course}" loading="lazy">
        <p>${item.description}</p>
      </div>
    </article>`
  ).join("");
}

/* ============================================================
   8. HOSPEDAJE
   ============================================================ */
function buildHotels(){
  const grid = $("#hotelsGrid");
  if(!grid || !EVENT.hotels?.length) return;
  grid.innerHTML = EVENT.hotels.map(h => `
    <article class="wide-card">
      <img class="section-photo" src="${h.photo}" alt="${h.name}" loading="lazy">
      <div>
        <h3>${h.name}</h3>
        <p>${h.description}</p>
        <a class="btn ghost" href="${h.mapsUrl}" target="_blank">Ver ubicación</a>
      </div>
    </article>`
  ).join("");
}

/* ============================================================
   9. MESA DE REGALOS (Amazon)
   ============================================================ */
function buildAmazon(){
  const stack = $("#amazonGiftStack");
  if(!stack) return;
  if(!EVENT.amazonUrl){ stack.hidden = true; return; }
  stack.innerHTML = `
    <article class="gift-card amazon-gift-card">
      <div class="gift-card-copy">
        <span>Mesa de regalos</span>
        <p>Preparé una selección de detalles que reflejan mis gustos y sueños para esta nueva etapa.</p>
      </div>
      <a class="amazon-logo-link" href="${EVENT.amazonUrl}" target="_blank" rel="noopener" aria-label="Ver regalos en Amazon">
        <img class="amazon-logo-img" src="assets/logos/logo_amazon.svg" alt="Amazon" loading="lazy">
        <small>Ver regalos</small>
      </a>
    </article>`;
}

/* ============================================================
   10. SOBRE VIRTUAL / CLABE
   ============================================================ */
function buildClabe(){
  const stack = $("#clabeGiftStack");
  if(!stack) return;
  if(!EVENT.clabe?.numero){ stack.hidden = true; return; }

  stack.innerHTML = `
    <article class="gift-card virtual-envelope-card">
      <div class="gift-card-copy">
        <span>Sobre virtual</span>
        <h3>Un detalle a distancia</h3>
        <p>Si prefieres acompañarme con un detalle de manera digital, aquí podrás encontrar la información necesaria.</p>
      </div>
      <button class="btn secondary clabe-open" id="openClabe" type="button">📋 CLABE</button>
    </article>`;

  // Llenar el modal con los datos del event.js
  const clabeInfo = $("#clabeInfo");
  if(clabeInfo){
    clabeInfo.innerHTML = `
      <p><strong>Banco:</strong> ${EVENT.clabe.banco}</p>
      <p><strong>Titular:</strong> ${EVENT.clabe.titular}</p>
      <p><strong>Concepto sugerido:</strong> ${EVENT.clabe.concepto}</p>`;
  }
  const clabeText = $("#clabeText");
  if(clabeText) clabeText.textContent = EVENT.clabe.numero;

  setupClabe();
}

function setupClabe(){
  const modal     = $("#clabeModal");
  const openBtn   = $("#openClabe");
  const copyBtn   = $("#copyClabe");
  const clabeText = $("#clabeText");
  const copyStatus= $("#copyStatus");
  if(!modal || !openBtn) return;

  const closeModal = () => {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden","true");
    document.body.style.overflow = "";
  };
  const openModal = () => {
    modal.classList.add("active");
    modal.setAttribute("aria-hidden","false");
    document.body.style.overflow = "hidden";
  };

  openBtn.addEventListener("click", openModal);
  modal.querySelectorAll("[data-clabe-close]").forEach(el => el.addEventListener("click", closeModal));
  document.addEventListener("keydown", e => { if(e.key === "Escape" && modal.classList.contains("active")) closeModal(); });

  if(copyBtn && clabeText){
    copyBtn.addEventListener("click", async () => {
      try{
        await navigator.clipboard.writeText(clabeText.textContent.trim());
        if(copyStatus){ copyStatus.classList.add("show"); setTimeout(()=>copyStatus.classList.remove("show"),1800); }
      }catch{ alert("CLABE: " + clabeText.textContent); }
    });
  }
}

/* ============================================================
   11. SITIOS QUE VISITAR
   ============================================================ */
function buildVisits(){
  const grid = $("#visitsGrid");
  if(!grid || !EVENT.visits?.length) return;
  grid.innerHTML = EVENT.visits.map(v => `
    <article>
      <img class="section-photo" src="${v.photo}" alt="${v.name}" loading="lazy">
      <h3>${v.name}</h3>
      <p>${v.description}</p>
      <a class="btn ghost" href="${v.mapsUrl}" target="_blank">Ver ubicación</a>
    </article>`
  ).join("");
}

/* ============================================================
   12. HERO SLIDESHOW
   ============================================================ */
function buildHero(){
  const wrap = $("#heroSlideshow");
  if(!wrap) return;
  EVENT.heroImages.forEach((src,i) => {
    const slide = document.createElement("div");
    slide.className = `hero-slide ${i===0?"active":""}`;
    slide.style.backgroundImage = `url("${src}")`;
    wrap.appendChild(slide);
  });
  const slides = $$(".hero-slide");
  let active = 0;
  setInterval(()=>{
    slides[active].classList.remove("active");
    active = (active+1) % slides.length;
    slides[active].classList.add("active");
  }, 6500);
}

/* ============================================================
   13. GALERÍA POLAROID
   ============================================================ */
function buildGallery(){
  const stack = $("#galleryStack");
  if(!stack) return;
  $("#galleryTotal").textContent = EVENT.galleryImages.length;
  let current = 1;
  EVENT.galleryImages.forEach((src,i) => {
    const card = document.createElement("div");
    card.className = "polaroid-card";
    card.style.zIndex = EVENT.galleryImages.length - i;
    const img = document.createElement("img");
    img.src = src; img.alt = `Foto de ${EVENT.shortName}`; img.loading = "lazy";
    card.appendChild(img);
    card.addEventListener("click", () => {
      card.classList.add("moved");
      setTimeout(()=>{
        stack.appendChild(card);
        card.classList.remove("moved");
        [...stack.children].forEach((child,j) => child.style.zIndex = stack.children.length - j);
        current = current >= EVENT.galleryImages.length ? 1 : current + 1;
        $("#galleryCurrent").textContent = current;
      }, 780);
    });
    stack.appendChild(card);
  });
}

/* ============================================================
   14. INVITADO PERSONALIZADO POR LINK
   ============================================================ */
function getGuest(){
  const params = new URLSearchParams(location.search);
  const id = params.get("guest");
  return id && GUESTS[id] ? GUESTS[id] : null;
}

function setGuestSection(){
  const guest = getGuest();
  const message = guest
    ? `${EVENT.rsvpMessage} Soy ${guest.displayName}. Lugares reservados: ${guest.passes}.`
    : EVENT.rsvpMessage;
  const rsvpBtn = $("#mainRsvp");
  if(rsvpBtn) rsvpBtn.href = `https://wa.me/${EVENT.whatsapp}?text=${encodeURIComponent(message)}`;

  const introName    = $("#introGuestName");
  const guestSection = $("#invitado");
  const guestName    = $("#guestDisplayName");
  const guestPasses  = $("#guestPassesText");

  if(!guest){ if(introName) introName.textContent = "Invitación"; return; }
  const passText = guest.passes === 1 ? "1 pase" : `${guest.passes} pases`;
  if(introName)    introName.textContent = guest.displayName;
  if(guestSection) guestSection.hidden = false;
  if(guestName)    guestName.textContent = guest.displayName;
  if(guestPasses)  guestPasses.textContent = `Hemos reservado ${passText} para que me acompañen en esta noche tan especial.`;
}

/* ============================================================
   15. COUNTDOWN
   ============================================================ */
function updateCountdown(){
  const target = new Date(EVENT.dateISO).getTime();
  const diff   = Math.max(0, target - Date.now());
  $("#days").textContent    = Math.floor(diff / 86400000);
  $("#hours").textContent   = Math.floor(diff / 3600000 % 24);
  $("#minutes").textContent = Math.floor(diff / 60000 % 60);
  $("#seconds").textContent = Math.floor(diff / 1000 % 60);
}

/* ============================================================
   16. REVELAR SECCIONES AL HACER SCROLL
   ============================================================ */
function setupReveal(){
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => { if(entry.isIntersecting) entry.target.classList.add("visible"); });
  }, { threshold: .14 });
  $$(".reveal").forEach(el => observer.observe(el));
}

/* ============================================================
   17. SAVE THE DATE (.ics)
   ============================================================ */
function setupSaveDate(){
  const btn = $("#saveDateBtn");
  if(!btn) return;
  btn.addEventListener("click", () => {
    const ics = [
      "BEGIN:VCALENDAR","VERSION:2.0",
      `PRODID:-//Komorebi//${EVENT.eventType} ${EVENT.shortName}//ES`,
      "BEGIN:VEVENT",
      `UID:komorebi-${EVENT.shortName.toLowerCase().replace(/\s/g,"-")}-${EVENT.dateISO.slice(0,10)}@komorebi`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:.]/g,"").slice(0,15)}Z`,
      `DTSTART:${EVENT.dateISO.replace(/[-:]/g,"").replace(/\.\d+/,"").replace("T","T")}`,
      `SUMMARY:${EVENT.eventType} de ${EVENT.fullName}`,
      `DESCRIPTION:${EVENT.rsvpMessage}`,
      "END:VEVENT","END:VCALENDAR"
    ].join("\r\n");
    const blob = new Blob([ics],{type:"text/calendar;charset=utf-8"});
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `komorebi-${EVENT.shortName.toLowerCase().replace(/\s/g,"-")}.ics`;
    link.click();
    URL.revokeObjectURL(link.href);
  });
}

/* ============================================================
   18. HASHTAG
   ============================================================ */
function setupHashtag(){
  const btn = $("#copyHashtag");
  if(!btn) return;
  btn.addEventListener("click", async () => {
    try{
      await navigator.clipboard.writeText(EVENT.hashtag);
      btn.textContent = "Copiado";
      setTimeout(()=>btn.textContent="Copiar",1600);
    }catch{ alert(EVENT.hashtag); }
  });
}

/* ============================================================
   19. PARTÍCULAS DE SAKURA
   ============================================================ */
function buildSakura(){
  const layer = $("#sakuraLayer");
  if(!layer) return;
  const svg = `<svg viewBox="0 0 36 52" aria-hidden="true"><path d="M18 2 C28 11 34 23 29 35 C24 48 10 51 5 39 C0 27 7 11 18 2Z" fill="rgba(226,177,190,.68)"/><path d="M18 6 C19 18 17 34 11 46" fill="none" stroke="rgba(185,143,155,.22)" stroke-width="1.1" stroke-linecap="round"/></svg>`;
  for(let i=0;i<22;i++){
    const petal = document.createElement("span");
    petal.className = "sakura-petal";
    petal.innerHTML = svg;
    petal.style.left = `${Math.random()*100}%`;
    petal.style.top  = `${Math.random()*75}%`;
    petal.style.animationDuration = `${14+Math.random()*16}s`;
    petal.style.animationDelay   = `${Math.random()*12}s`;
    petal.style.opacity = `${.12+Math.random()*.26}`;
    petal.style.transform = `scale(${.45+Math.random()*.7})`;
    layer.appendChild(petal);
  }
}

/* ============================================================
   20. CLIMA (Open-Meteo, gratis, sin API key)
   ============================================================ */
async function setupWeather(){
  const eventDate = new Date(EVENT.dateISO);
  const daysAway  = Math.ceil((eventDate - new Date()) / 86400000);
  const tempEl    = $("#weatherTemp");
  if(!tempEl || daysAway > 16) return;
  try{
    const date = EVENT.dateISO.slice(0,10);
    const { weather } = EVENT;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${weather.latitude}&longitude=${weather.longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min,wind_speed_10m_max&timezone=${encodeURIComponent(weather.timezone)}&start_date=${date}&end_date=${date}`;
    const data = await (await fetch(url)).json();
    const daily = data.daily;
    if(!daily?.temperature_2m_max?.length) return;
    const max = Math.round(daily.temperature_2m_max[0]);
    const min = Math.round(daily.temperature_2m_min[0]);
    const wind= Math.round(daily.wind_speed_10m_max[0]);
    const map = {0:["☀","Cielo despejado"],1:["🌤","Mayormente despejado"],2:["⛅","Parcialmente nublado"],3:["☁","Nublado"],45:["〰","Neblina"],51:["🌦","Llovizna ligera"],61:["🌧","Lluvia ligera"],63:["🌧","Lluvia"],80:["🌦","Chubascos"],95:["⛈","Tormenta"]};
    const [icon,label] = map[daily.weather_code[0]] || ["—","Pronóstico disponible cerca de la fecha."];
    $("#weatherIcon").textContent  = icon;
    tempEl.textContent             = `${max}°`;
    $("#weatherLabel").textContent = `${label}. Máxima ${max}° / mínima ${min}°.`;
    $("#weatherFeels").textContent = `${min}°–${max}°`;
    $("#weatherWind").textContent  = `${wind} km/h`;
  }catch{}
}

/* ============================================================
   21. TIMELINE CARDS (animación al hacer scroll)
   ============================================================ */
function setupTimelineCards(){
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if(e.isIntersecting) e.target.classList.add("visible-card"); });
  }, { threshold: .35 });
  $$(".occasio-timeline .timeline-card").forEach(c => observer.observe(c));
}

/* ============================================================
   22. PINTEREST FALLBACKS
   ============================================================ */
function refreshPinterest(){
  if(window.PinUtils?.build) window.PinUtils.build();
  document.querySelectorAll(".pinterest-widget-shell").forEach(shell => {
    setTimeout(()=>{ if(shell.querySelector("iframe")) shell.classList.add("loaded"); }, 2500);
  });
}

/* ============================================================
   ENTRADA / MÚSICA
   ============================================================ */
window.addEventListener("load", () => setTimeout(()=>loader.classList.add("hide"), 650));

enterBtn.addEventListener("click", async () => {
  intro.classList.add("hide");
  site.classList.remove("hidden");
  try{ await music.play(); musicBtn.textContent="Ⅱ"; }catch{ musicBtn.textContent="♪"; }
  setTimeout(refreshPinterest, 1200);
});

musicBtn.addEventListener("click", async () => {
  if(music.paused){ await music.play(); musicBtn.textContent="Ⅱ"; }
  else{ music.pause(); musicBtn.textContent="♪"; }
});

/* ============================================================
   INICIALIZAR TODO
   ============================================================ */
applyPalette();
fillTexts();
buildParents();
buildGodparents();
buildLocations();
buildTimeline();
buildMenu();
buildHotels();
buildAmazon();
buildClabe();
buildVisits();
buildHero();
buildGallery();
setGuestSection();
setupReveal();
setupSaveDate();
setupHashtag();
buildSakura();
setupWeather();
setTimeout(setupTimelineCards, 500);
updateCountdown();
setInterval(updateCountdown, 1000);
setTimeout(refreshPinterest, 1200);
