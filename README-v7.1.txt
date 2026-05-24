KOMOREBI V7.1

Cambios realizados sobre komorebi-v7:

1.  Amazon
- Se integró el logo real proporcionado en SVG como asset:
  assets/logos/logo_amazon.svg
- Se eliminó el logo simulado construido con texto/CSS en la tarjeta de Amazon.
- El botón conserva el enlace de la mesa de regalos y el texto "Ver regalos".

2. Invitado personalizado
- Se mantiene la lógica existente de data/guests.js y el parámetro URL ?guest=...
- Ahora el invitado también se muestra visualmente en:
  a) Pantalla inicial de apertura.
  b) Nueva sección personalizada después de padrinos.
- El botón de RSVP conserva el mensaje personalizado de WhatsApp con nombre y pases.

Ejemplo de prueba:
index.html?guest=familia-montemayor
index.html?guest=mariana

Si el sitio se abre sin parámetro ?guest=..., las secciones personalizadas no se muestran y la invitación funciona normal.
