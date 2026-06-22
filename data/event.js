const EVENT = {

  /* ============================================================
     DATOS GENERALES
     ============================================================ */
  shortName:     "Camila",
  fullName:      "Camila Garcia Monreal",
  initials:      "C",
  eventType:     "XV años",                          // XV años | Boda | Cumpleaños | Graduación

  /* ============================================================
     FECHA Y HORA
     ============================================================ */
  dateISO:       "2027-10-27T18:00:00-06:00",        // formato ISO, no cambiar estructura
  displayDate:   "27 · 10 · 2027",
  saveDateLabel: "Miércoles, 27 de octubre de 2027",

  /* ============================================================
     CONTACTO Y RSVP
     ============================================================ */
  whatsapp:      "528110314514",                      // sin espacios, sin guiones, con código de país
  rsvpDeadline:  "10 de octubre de 2027",
  rsvpMessage:   "Hola, quiero confirmar mi asistencia al XV de Camila.",

  /* ============================================================
     TEXTOS DE LA INVITACIÓN
     ============================================================ */
  introMessage:  "Hola!! Me encantaría que me acompañaras a celebrar mis XV años.",
  personalMessage: "Quiero invitarte a uno de los momentos más importantes de mi vida. Será un honor compartir esta noche con las personas que han acompañado mi camino y han sido parte de mi historia. Con cariño, Camila",
  countdownLabel: "Celebra conmigo esta noche especial",

  quote:         "\"Encomienda al Señor tu camino; confía en Él, y Él actuará.\"",
  quoteAuthor:   "— Salmos 37:5",

  familyMessage: "Con profundo agradecimiento a mis padres, por su amor, sus valores y por acompañarme en cada paso que me ha traído hasta aquí.",
  parentA:       { firstName: "Alejandro", lastName: "García" },
  parentB:       { firstName: "Daniela",   lastName: "Monreal" },

  galleryTitle:  "Instantes de Camila",
  galleryText:   "Con alegría y emoción quiero compartir con todos el inicio de una nueva etapa llena de sueños, esperanza y momentos que guardaré siempre en mi corazón.",

  /* ============================================================
     PADRINOS (agregar o quitar objetos según el evento)
     ============================================================ */
  godparents: [
    { role: "Padrinos de vestido",       name: "Familia Villarreal Salinas" },
    { role: "Padrinos de tiara",         name: "Familia Garza Monreal" },
    { role: "Padrinos de Biblia y Rosario", name: "Carolina López" },
    { role: "Padrinos de pastel",        name: "José Luis Monreal García" }
  ],

  /* ============================================================
     UBICACIONES
     ============================================================ */
  ceremony: {
    label:    "Ceremonia religiosa",
    name:     "Parroquia de Santiago Apóstol",
    address:  "Juárez S/N, Santiago, 67310 Santiago, N.L.",
    time:     "27 octubre 2027 · 6:00 p.m.",
    mapsUrl:  "https://maps.google.com/?q=Parroquia+de+Santiago+Apóstol+Santiago+NL",
    photo:    "assets/photos/church.jpg"
  },
  reception: {
    label:    "Recepción",
    name:     "Las Nubes Eventos",
    address:  "Carr Nacional, Los Rodríguez, 67318 Santiago, N.L.",
    time:     "27 octubre 2027 · 8:00 p.m.",
    mapsUrl:  "https://maps.google.com/?q=Las+Nubes+Eventos+Santiago+NL",
    photo:    "assets/photos/venue.jpg"
  },

  /* ============================================================
     PROGRAMA DEL DÍA (timeline)
     ============================================================ */
  timeline: [
    { time: "06:00 p.m.", title: "Ceremonia religiosa",  description: "Parroquia de Santiago Apóstol, Santiago, N.L.", mapsUrl: "https://maps.google.com/?q=Parroquia+de+Santiago+Apóstol+Santiago+NL" },
    { time: "08:00 p.m.", title: "Cóctel de bienvenida", description: "Las Nubes Eventos · Carr Nacional, Los Rodríguez, Santiago, N.L.", mapsUrl: "https://maps.google.com/?q=Las+Nubes+Eventos+Santiago+NL" },
    { time: "09:00 p.m.", title: "Cena de gala",         description: "Una cena especial para compartir con familia y amigos." },
    { time: "10:00 p.m.", title: "Fiesta y baile",       description: "El vals, la música y los recuerdos más bonitos de la noche." }
  ],

  /* ============================================================
     MENÚ
     ============================================================ */
  menu: [
    { course: "Entrada",      description: "Crema de elote dulce con toque de trufa y crujiente de prosciutto.", photo: "assets/photos/menu-entrada.jpg" },
    { course: "Plato fuerte", description: "Filete de res en reducción de vino tinto, acompañado de puré de papa rústico y vegetales al grill.", photo: "assets/photos/menu-fuerte.jpg" },
    { course: "Postre",       description: "Mousse de chocolate oscuro con corazón de frutos rojos.", photo: "assets/photos/menu-postre.jpg" }
  ],
  menuAllergiesNote: "Si tienes alguna alergia o requerimiento especial en tu alimentación, agradeceré nos lo hagas saber al confirmar tu asistencia.",

  /* ============================================================
     HOSPEDAJE (dejar vacío [] si no aplica)
     ============================================================ */
  hotels: [
    {
      name:        "Gamma Monterrey Rincón de Santiago",
      description: "Hotel muy bonito con vista a la presa y ambiente natural. Tiene alberca, spa y es de los favoritos en la zona.",
      mapsUrl:     "https://maps.google.com/?q=Gamma+Monterrey+Rincón+de+Santiago",
      photo:       "assets/photos/hotel.jpg"
    }
  ],

  /* ============================================================
     MESA DE REGALOS (dejar amazonUrl vacío "" si no aplica)
     ============================================================ */
  amazonUrl: "https://www.amazon.com.mx/registries/gl/guest-view/34KX2H43I1U15?ref_=cm_sw_r_apann_ggr-subnav-share_N85725YDTNPRMCP5SEXR_3&language=en-US",

  /* ============================================================
     SOBRE VIRTUAL / CLABE (dejar clabe vacío "" si no aplica)
     ============================================================ */
  clabe: {
    banco:    "BBVA",
    titular:  "Camila García Monreal",
    concepto: "Regalo XV Camila",
    numero:   "012345678901234567"
  },

  /* ============================================================
     CLIMA (coordenadas de la ciudad del evento)
     ============================================================ */
  weather: {
    city:      "Santiago, Nuevo León",
    latitude:  25.425,
    longitude: -100.152,
    timezone:  "America/Monterrey"
  },

  /* ============================================================
     SITIOS QUE VISITAR (dejar vacío [] si no aplica)
     ============================================================ */
  visits: [
    { name: "Cola de Caballo",    description: "Una visita clásica para quienes vienen de fuera.",                                    photo: "assets/photos/visit-cola-caballo.jpg", mapsUrl: "https://maps.google.com/?q=Cola+de+Caballo+Santiago+NL" },
    { name: "Presa La Boca",      description: "Perfecta para pasear y tomar fotos antes del evento.",                               photo: "assets/photos/visit-presa.jpg",         mapsUrl: "https://maps.google.com/?q=Presa+La+Boca+Santiago+NL" },
    { name: "Centro de Santiago", description: "Ideal para caminar, tomar café y disfrutar el ambiente de Pueblo Mágico.",           photo: "assets/photos/visit-centro.jpg",        mapsUrl: "https://maps.google.com/?q=Centro+de+Santiago+Nuevo+Leon" }
  ],

  /* ============================================================
     REDES Y HASHTAG
     ============================================================ */
  hashtag: "#XVCamila",

  /* ============================================================
     PALETA DE COLORES DEL EVENTO
     Cambia estos valores para cada quinceañera.
     No tocar el CSS — solo estos hex codes.
     ============================================================ */
  palette: {
    mauve:      "#b98f9b",   // color principal (botones, acentos)
    rose:       "#cfa3ad",   // color secundario (gradientes)
    gold:       "#b99761",   // color dorado (títulos de sección, citas)
    champagne:  "#ead8ca",   // fondo suave
    blush:      "#d9b8b0"    // detalles sutiles
  },

  /* ============================================================
     TIPOGRAFÍA DEL EVENTO
     Nombres de Google Fonts. Cambiar aquí y en el <link> del HTML.
     serif   = tipografía elegante para nombres y títulos grandes
     script  = tipografía manuscrita para el nombre de la quinceañera
     sans    = tipografía de cuerpo para textos largos
     ============================================================ */
  fonts: {
    serif:  "Cormorant Garamond",
    script: "Great Vibes",
    sans:   "Inter"
  },

  /* ============================================================
     FOTOS
     ============================================================ */
  introPhoto:  "assets/photos/intro.jpg",
  heroImages:  ["assets/photos/hero-1.jpg","assets/photos/hero-2.jpg","assets/photos/hero-3.jpg","assets/photos/hero-4.jpg"],
  galleryImages: ["assets/photos/gallery-1.jpg","assets/photos/gallery-2.jpg","assets/photos/gallery-3.jpg","assets/photos/gallery-4.jpg","assets/photos/gallery-5.jpg","assets/photos/gallery-6.jpg","assets/photos/gallery-7.jpg","assets/photos/gallery-8.jpg"],

  /* ============================================================
     MÚSICA
     ============================================================ */
  music: "assets/music/song.mp3"

};
