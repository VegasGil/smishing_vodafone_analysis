// Datos editables ---------------------------------------------------------
const IOCS = [
  ["Dominio", "vodafone-one-09.cloudaccess.host", "Dominio de phishing", true],
  ["IP", "82.202.170.126", "Servidor del atacante (Rusia)", true],
  ["Acortador", "goo.su/-9Vodafone", "URL enviada en el SMS", true],
  ["Marca de tiempo", "1743587523957 (02/04/2025)", "Fecha de creación del recurso", true],
  ["Campo HTML", "payment_invoice[phone]", "Campo de captura del teléfono", true],
  ["Título 404", "Страница не найдена", "Página de error en ruso del servidor", true],
  ["Dominio", "mc.yandex.ru", "Yandex Metrica, plantilla del hosting", false],
  ["Dominio", "top-fwz1.mail.ru", "Mail.ru, plantilla del hosting", false],
  ["Dominio", "openfpcdn.io/botd", "BotD, plantilla del hosting", false],
  ["Dominio", "ads.digitalcaramel.com", "DigitalCaramel, plantilla del hosting", false],
  ["ID de etiqueta", "GTM-TRGNQBDL", "Google Tag Manager, plantilla del hosting", false],
];

// Cambia título y descripción de cada captura según su contenido real
const FIGS = [
  ["analisis1.png", "Análisis inicial", "Primera revisión de los archivos descargados."],
  ["analisis2.png", "Análisis de archivos", "Tamaños y contenido de los .js.descargar."],
  ["analisis3.png", "Contenido del HTML", "Formulario y campos de la página de phishing."],
  ["analisis4.png", "Búsqueda de indicadores", "Extracción de URLs y cadenas relevantes."],
  ["analisis5.png", "Verificación", "Comprobación de los resultados anteriores."],
  ["pageRusia.png", "Página 404 en ruso", "Respuesta del servidor ante rutas inexistentes."],
  ["reporte_auth_abuse_ch.png", "Reporte en abuse.ch", "Envío del indicador a la plataforma."],
  ["reporte_google.png", "Reporte a Google", "Notificación de la página fraudulenta."],
  ["resumnfinal.png", "Resumen final", "Síntesis del caso y conclusiones."],
];

// Gráfico de anillo --------------------------------------------------------
const ok = IOCS.filter(i => i[3]).length, no = IOCS.length - ok, total = ok + no;
const R = 70, C = 2 * Math.PI * R, NS = "http://www.w3.org/2000/svg";
const svg = document.getElementById("donut");
const arc = (len, off, color) => {
  const c = document.createElementNS(NS, "circle");
  c.setAttribute("cx", 100); c.setAttribute("cy", 100); c.setAttribute("r", R);
  c.setAttribute("fill", "none"); c.setAttribute("stroke", color);
  c.setAttribute("stroke-width", 26);
  c.setAttribute("stroke-dasharray", `${len} ${C - len}`);
  c.setAttribute("stroke-dashoffset", -off);
  c.setAttribute("transform", "rotate(-90 100 100)");
  svg.appendChild(c); return c;
};
const a1 = arc((ok / total) * C, 0, "#0F766E");
const a2 = arc((no / total) * C, (ok / total) * C, "#B9C1CD");
svg.insertAdjacentHTML("beforeend",
  `<text x="100" y="104" text-anchor="middle" font-size="34" fill="#14202E">${total}</text>
   <text x="100" y="124" text-anchor="middle" font-size="12" fill="#586476">indicadores</text>`);
if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
  [a1, a2].forEach(a => a.animate(
    [{ strokeDasharray: `0 ${C}` }, { strokeDasharray: a.getAttribute("stroke-dasharray") }],
    { duration: 900, easing: "ease-out" }));
}
document.getElementById("legend").innerHTML =
  `<li><span class="dot" style="background:#0F766E"></span><span><b>${ok} confirmados</b><br>Pertenecen al atacante y sirven para bloquear.</span></li>
   <li><span class="dot" style="background:#B9C1CD"></span><span><b>${no} no confirmados</b><br>Son de la plantilla del hosting; no bloquear por ellos.</span></li>`;

// Tabla filtrable ----------------------------------------------------------
const tbody = document.getElementById("rows");
const esc = s => s.replace(/[&<>]/g, m => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[m]));
function render(f) {
  tbody.innerHTML = IOCS.filter(i => f === "all" || (f === "ok") === i[3]).map(i =>
    `<tr><td>${i[0]}</td><td class="v">${esc(i[1])}</td><td>${i[2]}</td>
     <td><span class="tag ${i[3] ? "ok" : "no"}">${i[3] ? "Confirmado" : "No confirmado"}</span></td></tr>`).join("");
}
document.querySelectorAll(".filters button").forEach(b => b.addEventListener("click", () => {
  document.querySelectorAll(".filters button").forEach(x => x.setAttribute("aria-pressed", x === b));
  render(b.dataset.f);
}));
render("all");

// Galería con ampliación ---------------------------------------------------
const lb = document.getElementById("lb");
document.getElementById("gallery").innerHTML = FIGS.map(([src, t, d]) =>
  `<figure class="fig"><button type="button" data-src="${src}" data-t="${t}" aria-label="Ampliar: ${t}">
     <img src="${src}" alt="${t}" loading="lazy"></button>
   <figcaption><b>${t}</b>${d}</figcaption></figure>`).join("");
document.querySelectorAll(".fig img").forEach(img => img.addEventListener("error", () => {
  const fig = img.closest(".fig"); fig.classList.add("missing");
  img.replaceWith(document.createTextNode(img.getAttribute("src") + " no encontrada"));
}));
document.getElementById("gallery").addEventListener("click", e => {
  const b = e.target.closest("button"); if (!b || b.closest(".missing")) return;
  lb.querySelector("img").src = b.dataset.src; lb.querySelector("img").alt = b.dataset.t;
  lb.querySelector("p").textContent = b.dataset.t; lb.showModal();
});
lb.addEventListener("click", () => lb.close());

// Sección activa en la navegación -----------------------------------------
const links = [...document.querySelectorAll("nav a")];
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) links.forEach(l => l.classList.toggle("on", l.hash === "#" + e.target.id));
}), { rootMargin: "-40% 0px -55% 0px" });
document.querySelectorAll("main section").forEach(s => io.observe(s));
