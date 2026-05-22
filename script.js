
// ===== KOMOREBI BETA 2 =====

// Invitados refinados
function updateGuestCopy(){
  const guest = getGuest();
  const isFamily = guest?.type === "family";

  document.querySelector("#guestTitle").textContent =
    guest ? `Bienvenida ${guest.displayName}` : "Bienvenida";

  document.querySelector("#guestMessage").textContent =
    guest
      ? isFamily
        ? "Qué alegría que nos acompañen en esta noche tan especial."
        : "Me encantará compartir esta noche contigo."
      : "Gracias por acompañarme en esta noche tan especial.";

  document.querySelector("#guestPasses").textContent =
    guest
      ? isFamily
        ? `Hemos reservado ${guest.passes} lugares para ustedes.`
        : `Hemos reservado ${guest.passes} lugares para ti.`
      : "";
}

updateGuestCopy();

// Sakura particles
const sakura = document.createElement("div");
sakura.className = "sakura";
document.body.appendChild(sakura);

for(let i=0;i<18;i++){
  const petal = document.createElement("span");
  petal.className = "petal";
  petal.style.left = Math.random()*100 + "vw";
  petal.style.animationDuration = (10 + Math.random()*10) + "s";
  petal.style.animationDelay = Math.random()*8 + "s";
  petal.style.opacity = .2 + Math.random()*.5;
  sakura.appendChild(petal);
}

// Galería stack tipo Mia
const gallery = document.querySelector("#gallery");

if(gallery){
  const imgs = [...gallery.querySelectorAll("img")];
  gallery.innerHTML = "";

  const stack = document.createElement("div");
  stack.className = "gallery-stack";

  imgs.forEach((img, index)=>{
    const card = document.createElement("div");
    card.className = "gallery-card";
    card.style.zIndex = imgs.length - index;

    const clone = img.cloneNode(true);
    card.appendChild(clone);

    card.addEventListener("click", ()=>{
      card.classList.add("moved");

      setTimeout(()=>{
        stack.appendChild(card);
        card.classList.remove("moved");
      },800);
    });

    stack.appendChild(card);
  });

  gallery.appendChild(stack);
}
