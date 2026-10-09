const mensajes = [
  "Aprendí como es tu forma de amar y ser 💛",
  "Contigo todo se siente más fácil, incluso los días difíciles... 🌟",
  "No digas que eres intensa, porque yo también lo soy 😌",
  "Estamos para mejorar juntos, no para juzgarnos 💕",
  "No quiero perderte, de verdad...",
  "Me importas muchísimo, más de lo que a veces sé decir 💕",
  "Tu sonrisa me alegra el día entero 🌷",
  "Gracias por existir en mi vida 🌟",
  "Aunque nos cueste hablar, vale la pena intentarlo 🤍",
  "Contigo quiero buenas conversaciones, aunque sean difíciles 💬",
  "Eres increíble, nunca lo dudes mi nena 💖",
  "Seré la persona con la que siempre puedas contar, pase lo que pase 💛",
];


const gifsRechazo = [
  "gifs/1.gif",
  "gifs/8.gif",
  "gifs/3.gif",
  "gifs/4.gif",
  "gifs/5.gif",
  "gifs/2.gif",
  "gifs/7.gif",
  "gifs/12.gif",
  "gifs/10.gif",
  "gifs/11.gif",

];

const corazones = ["💖", "💕", "💗", "💘", "💝", "🌸", "✨", "💛"];

const btnAceptar = document.getElementById("btnAceptar");
const btnRechazar = document.getElementById("btnRechazar");
const mensaje = document.getElementById("mensaje");
const pregunta = document.getElementById("pregunta");
const exito = document.getElementById("exito");
const fondo = document.getElementById("fondo");
const gifRechazo = document.getElementById("gifRechazo");

let contador = 0;
let tamano = 1;
let aceptarFijo = false;
let natW = 0, natH = 0;
const PASOS_MAX = 7; // en cuántos rechazos llega al tamaño máximo

// ---- Corazones flotantes de fondo ----
function crearFlotante() {
  const el = document.createElement("span");
  el.className = "flota";
  el.textContent = corazones[Math.floor(Math.random() * corazones.length)];
  el.style.left = Math.random() * 100 + "vw";
  el.style.fontSize = 16 + Math.random() * 28 + "px";
  el.style.animationDuration = 6 + Math.random() * 6 + "s";
  fondo.appendChild(el);
  setTimeout(() => el.remove(), 12000);
}
setInterval(crearFlotante, 450);

// ---- Explosión de corazones desde un punto ----
function explotar(x, y, cantidad = 12) {
  for (let i = 0; i < cantidad; i++) {
    const el = document.createElement("span");
    el.className = "chispa";
    el.textContent = corazones[Math.floor(Math.random() * corazones.length)];
    el.style.left = x + "px";
    el.style.top = y + "px";
    el.style.fontSize = 16 + Math.random() * 16 + "px";
    const angulo = Math.random() * Math.PI * 2;
    const distancia = 60 + Math.random() * 100;
    el.style.setProperty("--x", Math.cos(angulo) * distancia + "px");
    el.style.setProperty("--y", Math.sin(angulo) * distancia + "px");
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1000);
  }
}

// ---- Mover el botón de rechazar a un lugar aleatorio ----
function moverRechazar(escala) {
  // Medimos el tamaño original antes de encoger
  btnRechazar.style.transform = "scale(1)";
  const w = btnRechazar.offsetWidth * escala;
  const h = btnRechazar.offsetHeight * escala;

  const margen = 10;
  const maxX = window.innerWidth - w - margen;
  const maxY = window.innerHeight - h - margen;

  const x = margen + Math.random() * Math.max(maxX - margen, 0);
  const y = margen + Math.random() * Math.max(maxY - margen, 0);

  btnRechazar.classList.add("huyendo");
  btnRechazar.style.left = x + "px";
  btnRechazar.style.top = y + "px";
  btnRechazar.style.transform = `scale(${escala})`;
}

// ---- Hacer crecer el botón de aceptar hasta casi toda la pantalla ----
function crecerAceptar() {
  const botones = document.querySelector(".botones");

  if (!aceptarFijo) {
    // Primera vez: lo sacamos del flujo sin que salte
    const r = btnAceptar.getBoundingClientRect();
    natW = r.width;
    natH = r.height;
    botones.style.minHeight = natH + "px";
    btnAceptar.style.left = r.left + "px";
    btnAceptar.style.top = r.top + "px";
    btnAceptar.style.width = natW + "px";
    btnAceptar.style.height = natH + "px";
    btnAceptar.classList.add("gigante");
    void btnAceptar.offsetWidth; // reinicia para animar
    aceptarFijo = true;
  }

  const p = Math.min(contador / PASOS_MAX, 1);
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  const W = natW + (vw * 0.94 - natW) * p;
  const H = natH + (vh * 0.78 - natH) * p;
  const fuente = 16 + (Math.min(vw * 0.16, 64) - 16) * p;

  btnAceptar.style.width = W + "px";
  btnAceptar.style.height = H + "px";
  btnAceptar.style.fontSize = fuente + "px";
  btnAceptar.style.left = (vw - W) / 2 + "px";
  btnAceptar.style.top = vh - H - vh * 0.03 + "px";
}

// Si gira el celular, se reajusta
window.addEventListener("resize", () => {
  if (aceptarFijo) crecerAceptar();
});


// ---- Aceptar ----
btnAceptar.addEventListener("click", (e) => {
  pregunta.classList.add("oculto");
  btnRechazar.classList.add("oculto"); // se esconde el botón que anda suelto
  exito.classList.remove("oculto");

  explotar(e.clientX, e.clientY, 30);
  for (let i = 0; i < 40; i++) setTimeout(crearFlotante, i * 60);
});

// ---- Rechazar: bucle infinito de mensajes bonitos + gif ----
btnRechazar.addEventListener("click", (e) => {
  // Mensaje bonito
  mensaje.textContent = mensajes[contador % mensajes.length];
  mensaje.classList.remove("pop");
  void mensaje.offsetWidth;
  mensaje.classList.add("pop");

  // GIF distinto en cada rechazo
  gifRechazo.src = gifsRechazo[contador % gifsRechazo.length];
  gifRechazo.classList.remove("oculto", "pop");
  void gifRechazo.offsetWidth;
  gifRechazo.classList.add("pop");

  contador++;
  explotar(e.clientX, e.clientY);

  // Aceptar crece
  crecerAceptar();

  // Rechazar se achica (mínimo 25%) y salta a otro lugar
  const escala = Math.max(1 - contador * 0.1, 0.25);
  moverRechazar(escala);
});