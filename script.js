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
  EVENT.galleryImages.forEach((src) => {
    const img = document.createElement("img");
    img.src = src;
    img.loading = "lazy";
    img.alt = "Foto de Camila";
    img.addEventListener("click", () => openLightbox(src));
    gallery.appendChild(img);
  });
}

function openLightbox(src) {
  $("#lightboxImg").src = src;
  $("#lightbox").classList.add("show");
}

$("#closeLightbox").addEventListener("click", () => $("#lightbox").classList.remove("show"));
$("#lightbox").addEventListener("click", (event) => {
  if (event.target.id === "lightbox") $("#lightbox").classList.remove("show");
});

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
      ? "Camila tiene un lugar especial reservado para ustedes."
      : "Me encantará compartir esta noche contigo."
    : "Gracias por acompañarme en esta noche tan especial.";

  $("#guestPasses").textContent = guest ? `${guest.passes} pases asignados` : "";

  const message = guest
    ? `${EVENT.rsvpMessage} Soy ${guest.displayName}. Pases asignados: ${guest.passes}.`
    : EVENT.rsvpMessage;

  const url = `https://wa.me/${EVENT.whatsapp}?text=${encodeURIComponent(message)}`;
  $("#guestRsvp").href = url;
  $("#mainRsvp").href = url;
}

function updateCountdown() {
  const target = new Date(EVENT.dateISO).getTime();
  const now = Date.now();
  const diff = Math.max(0, target - now);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  $("#days").textContent = days;
  $("#hours").textContent = hours;
  $("#minutes").textContent = minutes;
  $("#seconds").textContent = seconds;
}

function setupReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.16 }
  );

  $$(".reveal").forEach((el) => observer.observe(el));
}

function setupModals() {
  $$("[data-modal]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const modal = document.getElementById(btn.dataset.modal);
      modal.classList.add("show");
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
      "PRODID:-//DUMOSTUDIO//Camila XV//ES",
      "BEGIN:VEVENT",
      "UID:camila-xv-20271027@dumostudio",
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
setupReveal();
setupModals();
setupSaveDate();
setupCopy();
updateCountdown();
setInterval(updateCountdown, 1000);
