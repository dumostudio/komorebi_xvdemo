const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const loader = $("#loader");
const intro = $("#intro");
const site = $("#site");
const enterBtn = $("#enterBtn");
const music = $("#bgMusic");
const musicBtn = $("#musicBtn");

window.addEventListener("load", () => {
  setTimeout(() => loader.classList.add("hide"), 700);
});

function buildHero() {
  const wrap = $("#heroSlideshow");
  EVENT.heroImages.forEach((src, index) => {
    const slide = document.createElement("div");
    slide.className = `hero-slide ${index === 0 ? "active" : ""}`;
    slide.style.backgroundImage = `url("${src}")`;
    wrap.appendChild(slide);
  });

  const slides = $$(".hero-slide");
  let active = 0;

  setInterval(() => {
    slides[active].classList.remove("active");
    active = (active + 1) % slides.length;
    slides[active].classList.add("active");
  }, 6500);
}

function buildGallery() {
  const gallery = $("#gallery");

  EVENT.galleryImages.forEach((src, index) => {
    const card = document.createElement("div");
    card.className = "gallery-card";
    card.style.zIndex = EVENT.galleryImages.length - index;

    const img = document.createElement("img");
    img.src = src;
    img.loading = "lazy";
    img.alt = "Foto de Camila";

    card.appendChild(img);

    card.addEventListener("click", () => {
      card.classList.add("moved");
      setTimeout(() => {
        gallery.appendChild(card);
        card.classList.remove("moved");
      }, 800);
    });

    gallery.appendChild(card);
  });
}

function getGuest() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("guest");
  return id && GUESTS[id] ? GUESTS[id] : null;
}

function setGuestSection() {
  const guest = getGuest();
  const isFamily = guest?.type === "family";

  $("#guestTitle").textContent = guest ? `Bienvenida ${guest.displayName}` : "Bienvenida";

  $("#guestMessage").textContent = guest
    ? isFamily
      ? "Qué alegría que nos acompañen en esta noche tan especial."
      : "Me encantará compartir esta noche contigo."
    : "Gracias por acompañarme en esta noche tan especial.";

  $("#guestPasses").textContent = guest
    ? isFamily
      ? `Hemos reservado ${guest.passes} lugares para ustedes.`
      : `Hemos reservado ${guest.passes} lugares para ti.`
    : "";

  const message = guest
    ? `${EVENT.rsvpMessage} Soy ${guest.displayName}. ${isFamily ? `Tenemos ${guest.passes} lugares reservados.` : `Tengo ${guest.passes} lugares reservados.`}`
    : EVENT.rsvpMessage;

  const url = `https://wa.me/${EVENT.whatsapp}?text=${encodeURIComponent(message)}`;
  $("#guestRsvp").href = url;
  $("#mainRsvp").href = url;
}

function buildGodparents() {
  const grid = $("#godparentsGrid");
  EVENT.godparents.forEach((item) => {
    const card = document.createElement("article");
    card.className = "godparent-card";
    card.innerHTML = `<span>${item.role}</span><p>${item.names}</p>`;
    grid.appendChild(card);
  });
}

function buildTimeline() {
  const timeline = $("#timeline");
  EVENT.timeline.forEach((item) => {
    const card = document.createElement("article");
    card.innerHTML = `<span>${item.time}</span><h3>${item.title}</h3><p>${item.detail}</p>`;
    timeline.appendChild(card);
  });
}

function buildMenu() {
  const list = $("#menuList");
  EVENT.menu.forEach((item) => {
    const card = document.createElement("article");
    card.className = "menu-card";
    card.innerHTML = `<span>${item.course}</span><h3>${item.dish}</h3>`;
    list.appendChild(card);
  });
}

function buildRecommendations() {
  const grid = $("#recommendations");
  EVENT.recommendations.forEach((item) => {
    const card = document.createElement("article");
    card.className = "recommendation-card";
    card.innerHTML = `<h3>${item.title}</h3><p>${item.text}</p><a class="btn ghost" href="${item.url}" target="_blank" rel="noopener">Ver ubicación</a>`;
    grid.appendChild(card);
  });
}

function updateCountdown() {
  const target = new Date(EVENT.dateISO).getTime();
  const now = Date.now();
  const diff = Math.max(0, target - now);

  $("#days").textContent = Math.floor(diff / (1000 * 60 * 60 * 24));
  $("#hours").textContent = Math.floor((diff / (1000 * 60 * 60)) % 24);
  $("#minutes").textContent = Math.floor((diff / (1000 * 60)) % 60);
  $("#seconds").textContent = Math.floor((diff / 1000) % 60);
}

function setupReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, { threshold: 0.16 });

  $$(".reveal").forEach((el) => observer.observe(el));
}

function setupModals() {
  $$("[data-modal]").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.getElementById(btn.dataset.modal).classList.add("show");
    });
  });

  $$("[data-close]").forEach((btn) => {
    btn.addEventListener("click", () => btn.closest(".modal").classList.remove("show"));
  });

  $$(".modal").forEach((modal) => {
    modal.addEventListener("click", (event) => {
      if (event.target === modal) modal.classList.remove("show");
    });
  });
}

function setupSaveDate() {
  $("#saveDateBtn").addEventListener("click", () => {
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Komorebi//Camila XV//ES",
      "BEGIN:VEVENT",
      "UID:camila-xv-20271027@komorebi",
      "DTSTAMP:20260521T120000Z",
      "DTSTART:20271028T010000Z",
      "DTEND:20271028T060000Z",
      "SUMMARY:XV años de Camila Garcia Monreal",
      "LOCATION:Monterrey, Nuevo León",
      "DESCRIPTION:Ceremonia 19:00 hrs. Recepción 21:00 hrs.",
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");

    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "xv-camila-garcia-monreal.ics";
    link.click();
    URL.revokeObjectURL(link.href);
  });
}

function setupCopy() {
  $("#copyClabe").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(EVENT.gifts.transfer.clabe);
      $("#copyClabe").textContent = "CLABE copiada";
      setTimeout(() => ($("#copyClabe").textContent = "Copiar CLABE"), 1800);
    } catch {
      alert("No se pudo copiar automáticamente. Puedes seleccionar la CLABE manualmente.");
    }
  });
}

function buildSakura() {
  const wrap = $("#sakura");
  for (let i = 0; i < 18; i++) {
    const petal = document.createElement("span");
    petal.className = "petal";
    petal.style.left = Math.random() * 100 + "vw";
    petal.style.animationDuration = 10 + Math.random() * 12 + "s";
    petal.style.animationDelay = Math.random() * 8 + "s";
    petal.style.opacity = .2 + Math.random() * .45;
    petal.style.transform = `scale(${.6 + Math.random()})`;
    wrap.appendChild(petal);
  }
}

enterBtn.addEventListener("click", async () => {
  intro.classList.add("hide");
  site.classList.remove("hidden");

  try {
    await music.play();
    musicBtn.textContent = "Ⅱ";
  } catch {
    musicBtn.textContent = "♪";
  }
});

musicBtn.addEventListener("click", async () => {
  if (music.paused) {
    await music.play();
    musicBtn.textContent = "Ⅱ";
  } else {
    music.pause();
    musicBtn.textContent = "♪";
  }
});

buildHero();
buildGallery();
setGuestSection();
buildGodparents();
buildTimeline();
buildMenu();
buildRecommendations();
setupReveal();
setupModals();
setupSaveDate();
setupCopy();
buildSakura();
updateCountdown();
setInterval(updateCountdown, 1000);
