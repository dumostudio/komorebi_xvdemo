const $=(s)=>document.querySelector(s);const $$=(s)=>document.querySelectorAll(s);const loader=$("#loader"),intro=$("#intro"),site=$("#site"),enterBtn=$("#enterBtn"),music=$("#bgMusic"),musicBtn=$("#musicBtn");window.addEventListener("load",()=>setTimeout(()=>loader.classList.add("hide"),650));function buildHero(){const wrap=$("#heroSlideshow");EVENT.heroImages.forEach((src,i)=>{const slide=document.createElement("div");slide.className=`hero-slide ${i===0?"active":""}`;slide.style.backgroundImage=`url("${src}")`;wrap.appendChild(slide)});const slides=$$(".hero-slide");let active=0;setInterval(()=>{slides[active].classList.remove("active");active=(active+1)%slides.length;slides[active].classList.add("active")},6500)}function getGuest(){const params=new URLSearchParams(location.search);const id=params.get("guest");return id&&GUESTS[id]?GUESTS[id]:null}function setGuestSection(){const guest=getGuest();const isFamily=guest?.type==="family";const message=guest?`${EVENT.rsvpMessage} Soy ${guest.displayName}. Lugares reservados: ${guest.passes}.`:EVENT.rsvpMessage;$("#mainRsvp").href=`https://wa.me/${EVENT.whatsapp}?text=${encodeURIComponent(message)}`}function buildGallery(){const stack=$("#galleryStack");$("#galleryTotal").textContent=EVENT.galleryImages.length;let current=1;EVENT.galleryImages.forEach((src,i)=>{const card=document.createElement("div");card.className="polaroid-card";card.style.zIndex=EVENT.galleryImages.length-i;const img=document.createElement("img");img.src=src;img.alt="Foto de Camila";img.loading="lazy";card.appendChild(img);card.addEventListener("click",()=>{card.classList.add("moved");setTimeout(()=>{stack.appendChild(card);card.classList.remove("moved");[...stack.children].forEach((child,j)=>child.style.zIndex=stack.children.length-j);current=current>=EVENT.galleryImages.length?1:current+1;$("#galleryCurrent").textContent=current},780)});stack.appendChild(card)})}function updateCountdown(){const target=new Date(EVENT.dateISO).getTime();const diff=Math.max(0,target-Date.now());$("#days").textContent=Math.floor(diff/86400000);$("#hours").textContent=Math.floor(diff/3600000%24);$("#minutes").textContent=Math.floor(diff/60000%60);$("#seconds").textContent=Math.floor(diff/1000%60)}function setupReveal(){const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add("visible")})},{threshold:.14});$$(".reveal").forEach(el=>observer.observe(el))}function setupModals(){$$("[data-modal]").forEach(btn=>btn.addEventListener("click",()=>document.getElementById(btn.dataset.modal).classList.add("show")));$$("[data-close]").forEach(btn=>btn.addEventListener("click",()=>btn.closest(".modal").classList.remove("show")));$$(".modal").forEach(modal=>modal.addEventListener("click",e=>{if(e.target===modal)modal.classList.remove("show")}))}function setupSaveDate(){$("#saveDateBtn").addEventListener("click",()=>{const ics=["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//Komorebi//XV Camila//ES","BEGIN:VEVENT","UID:xv-camila-20271027@komorebi","DTSTAMP:20260521T120000Z","DTSTART:20271028T000000Z","DTEND:20271028T060000Z","SUMMARY:XV años de Camila Garcia Monreal","LOCATION:Santiago, Nuevo León","DESCRIPTION:Ceremonia 6:00 p.m. Recepción 8:00 p.m.","END:VEVENT","END:VCALENDAR"].join("\r\n");const blob=new Blob([ics],{type:"text/calendar;charset=utf-8"});const link=document.createElement("a");link.href=URL.createObjectURL(blob);link.download="xv-camila-garcia-monreal.ics";link.click();URL.revokeObjectURL(link.href)})}function setupHashtag(){$("#copyHashtag").addEventListener("click",async()=>{try{await navigator.clipboard.writeText(EVENT.hashtag);$("#copyHashtag").textContent="Copiado";setTimeout(()=>$("#copyHashtag").textContent="Copiar",1600)}catch{alert(EVENT.hashtag)}})}function buildSakura(){const layer=$("#sakuraLayer");if(!layer)return;const petalSvg=`<svg viewBox="0 0 36 52" aria-hidden="true"><path d="M18 2 C28 11 34 23 29 35 C24 48 10 51 5 39 C0 27 7 11 18 2Z" fill="rgba(226,177,190,.68)"/><path d="M18 6 C19 18 17 34 11 46" fill="none" stroke="rgba(185,143,155,.22)" stroke-width="1.1" stroke-linecap="round"/></svg>`;for(let i=0;i<22;i++){const petal=document.createElement("span");petal.className="sakura-petal";petal.innerHTML=petalSvg;petal.style.left=`${Math.random()*100}%`;petal.style.top=`${Math.random()*75}%`;petal.style.animationDuration=`${14+Math.random()*16}s`;petal.style.animationDelay=`${Math.random()*12}s`;petal.style.opacity=`${.12+Math.random()*.26}`;petal.style.transform=`scale(${.45+Math.random()*.7})`;layer.appendChild(petal)}}enterBtn.addEventListener("click",async()=>{intro.classList.add("hide");site.classList.remove("hidden");try{await music.play();musicBtn.textContent="Ⅱ"}catch{musicBtn.textContent="♪"}});musicBtn.addEventListener("click",async()=>{if(music.paused){await music.play();musicBtn.textContent="Ⅱ"}else{music.pause();musicBtn.textContent="♪"}});buildHero();setGuestSection();buildGallery();updateCountdown();setupReveal();setupModals();setupSaveDate();setupHashtag();buildSakura();setInterval(updateCountdown,1000);
async function setupWeather(){
  const eventDate = new Date(EVENT.dateISO);
  const now = new Date();
  const daysAway = Math.ceil((eventDate - now) / 86400000);

  const tempEl = $("#weatherTemp");
  const labelEl = $("#weatherLabel");
  const feelsEl = $("#weatherFeels");
  const windEl = $("#weatherWind");
  const iconEl = $("#weatherIcon");

  if(!tempEl || daysAway > 16){
    return;
  }

  try{
    const date = EVENT.dateISO.slice(0,10);
    const url = `https://api.open-meteo.com/v1/forecast?latitude=25.425&longitude=-100.152&daily=weather_code,temperature_2m_max,temperature_2m_min,wind_speed_10m_max&timezone=America%2FMonterrey&start_date=${date}&end_date=${date}`;
    const response = await fetch(url);
    const data = await response.json();
    const daily = data.daily;
    if(!daily || !daily.temperature_2m_max?.length) return;

    const max = Math.round(daily.temperature_2m_max[0]);
    const min = Math.round(daily.temperature_2m_min[0]);
    const wind = Math.round(daily.wind_speed_10m_max[0]);
    const code = daily.weather_code[0];

    const map = {
      0:["☀","Cielo despejado"],1:["🌤","Mayormente despejado"],2:["⛅","Parcialmente nublado"],3:["☁","Nublado"],
      45:["〰","Neblina"],48:["〰","Neblina"],51:["🌦","Llovizna ligera"],53:["🌦","Llovizna"],55:["🌦","Llovizna intensa"],
      61:["🌧","Lluvia ligera"],63:["🌧","Lluvia"],65:["🌧","Lluvia intensa"],80:["🌦","Chubascos"],81:["🌦","Chubascos"],82:["⛈","Chubascos fuertes"],
      95:["⛈","Tormenta"]
    };

    const [icon,label] = map[code] || ["—","Pronóstico disponible cerca de la fecha."];
    iconEl.textContent = icon;
    tempEl.textContent = `${max}°`;
    labelEl.textContent = `${label}. Máxima ${max}° / mínima ${min}°.`;
    feelsEl.textContent = `${min}°–${max}°`;
    windEl.textContent = `${wind} km/h`;
  }catch(error){}
}
setupWeather();


function refreshPinterestWidgets(){
  if(window.PinUtils && typeof window.PinUtils.build === "function"){
    window.PinUtils.build();
  }
}
setTimeout(refreshPinterestWidgets, 1200);
document.addEventListener("click", (event)=>{
  if(event.target && event.target.id === "enterBtn"){
    setTimeout(refreshPinterestWidgets, 1200);
  }
});


function setupTimelineCards(){
  const cards = document.querySelectorAll(".occasio-timeline .timeline-card");
  if(!cards.length) return;

  const observer = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
      if(entry.isIntersecting){
        entry.target.classList.add("visible-card");
      }
    });
  }, {threshold:.35});

  cards.forEach((card)=>observer.observe(card));
}
setupTimelineCards();


function refreshPinterestFallbacks(){
  document.querySelectorAll(".pinterest-widget-shell").forEach((shell)=>{
    setTimeout(()=>{
      if(shell.querySelector("iframe")){
        shell.classList.add("loaded");
      }
    }, 2500);
  });
}
refreshPinterestFallbacks();
setTimeout(refreshPinterestFallbacks, 5000);


// ===== KOMOREBI V6.4 — CLABE POPUP =====
(function(){
  const modal = document.getElementById("clabeModal");
  const openBtn = document.getElementById("openClabe");
  const copyBtn = document.getElementById("copyClabe");
  const clabeText = document.getElementById("clabeText");
  const copyStatus = document.getElementById("copyStatus");

  if(!modal || !openBtn) return;

  const closeModal = () => {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
  };

  const openModal = () => {
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
  };

  openBtn.addEventListener("click", openModal);

  modal.querySelectorAll("[data-clabe-close]").forEach((el)=>{
    el.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", (event)=>{
    if(event.key === "Escape" && modal.classList.contains("active")) closeModal();
  });

  if(copyBtn && clabeText){
    copyBtn.addEventListener("click", async ()=>{
      const value = clabeText.textContent.trim();
      try{
        await navigator.clipboard.writeText(value);
        if(copyStatus){
          copyStatus.classList.add("show");
          setTimeout(()=>copyStatus.classList.remove("show"), 1800);
        }
      }catch(error){
        alert("CLABE: " + value);
      }
    });
  }
})();
