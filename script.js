// --- ANIMAZIONE MATRIX CUORI ---
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const hearts = ['💖', "💜", "💙", "🧡", '💘', '💝', '💗', '💓', '💕'];
const fontSize = 20;
let columns = Math.floor(canvas.width / fontSize);
let drops = Array(columns).fill(1);

function drawMatrix() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.font = `${fontSize}px serif`;

  for (let i = 0; i < drops.length; i++) {
    const text = hearts[Math.floor(Math.random() * hearts.length)];
    ctx.fillStyle = 'rgba(255, 105, 180, 0.4)';
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height || Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i]++;
  }
}

setInterval(drawMatrix, 50);

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  columns = Math.floor(canvas.width / fontSize);
  drops.length = 0;
  for (let i = 0; i < columns; i++) {
    drops[i] = 1;
  }
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas(); // chiamala anche all'inizio per sicurezza


// --- SCRITTE PRINCIPALI + PULSANTE CUORE ---
const words = ["Buon", "Anniversario", "Amore"];
const textContainer = document.getElementById('text');
const revealBtn = document.getElementById('revealBtn');
const mapContainer = document.getElementById('mapContainer');
const mapVideo = document.getElementById('mapVideo');

function showWord(index) {
  if (index >= words.length) {
    textContainer.innerHTML = '';
    showHeartButton();
    return;
  }

  textContainer.innerHTML = `<span class="fade">${words[index]}</span>`;
  setTimeout(() => showWord(index + 1), 4000);
}

function createHeartButton() {
  // Pulisce contenuto precedente
  revealBtn.innerHTML = '';

  // Crea SVG cuore
  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('viewBox', '0 0 100 100');
  svg.setAttribute('class', 'heart-svg');
  svg.style.width = '100%';
  svg.style.height = '100%';
  svg.style.cursor = 'pointer';

  // Path cuore
  const path = document.createElementNS(svgNS, 'path');
  path.setAttribute('d', "M50 15 C50 0, 0 0, 0 30 C0 55, 50 85, 50 90 C50 85, 100 55, 100 30 C100 0, 50 0, 50 15 Z");
  path.setAttribute('fill', '#ff4d88');
  svg.appendChild(path);

  // Testo "Premimi"
const text = document.createElementNS(svgNS, 'text');
text.setAttribute('x', '50');
// Abbassiamo il valore Y per alzare il testo
text.setAttribute('y', '45');  // <-- da 55 a 50
text.setAttribute('fill', 'white');
text.setAttribute('font-family', "'Great Vibes', cursive");
text.setAttribute('font-size', '16');
text.setAttribute('text-anchor', 'middle');
text.setAttribute('dominant-baseline', 'middle');
text.style.userSelect = 'none';
text.textContent = 'Premimi';
svg.appendChild(text);

  revealBtn.appendChild(svg);

  // Stili pulsante cuore
  revealBtn.style.display = 'block';
  revealBtn.style.position = 'absolute';
  revealBtn.style.top = '50%';
  revealBtn.style.left = '50%';
  revealBtn.style.transform = 'translate(-50%, -50%)';
  revealBtn.style.width = '40vw';
  revealBtn.style.maxWidth = '300px';
  revealBtn.style.height = 'auto';
  revealBtn.style.padding = '0';
  revealBtn.style.border = 'none';
  revealBtn.style.background = 'transparent';
  revealBtn.style.cursor = 'pointer';
  revealBtn.style.zIndex = '2';
  revealBtn.style.animation = 'pulse 2s infinite';
}

function showHeartButton() {
  createHeartButton();
}

setTimeout(() => showWord(0), 2000); // Avvia animazione scritte dopo 2 secondi

revealBtn.addEventListener('click', () => {
  revealBtn.style.display = 'none';
  mapContainer.style.display = 'block';
  mapVideo.play();
});
