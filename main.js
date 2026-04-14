// --------------------------------------------------------------
// 1. MATRIX RAIN (CASCATA INTENSA - MUITOS CARACTERES CAINDO)
// --------------------------------------------------------------
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

let width = window.innerWidth;
let height = window.innerHeight;

const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワンABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const charArray = chars.split('');

let columns;
let drops = [];

// Configurações da chuva
const fontSize = 14;
let speed = 0.3;
const TAIL_LENGTH = 8;

// Inicializa as colunas e as posições de queda
function initMatrix() {
  columns = Math.floor(width / fontSize);
  drops = [];
  for (let i = 0; i < columns; i++) {
    drops[i] = Math.random() * -80;
  }
}

// Função que desenha a chuva densa (com TRILHA de 5 caracteres por coluna)
function drawMatrix() {
  // Fundo preto com fade (cria o efeito de rastro clássico)
  ctx.fillStyle = 'rgba(0, 0, 0, 0.07)';
  ctx.fillRect(0, 0, width, height);

  // Define o estilo da fonte (mesmo tamanho em todas)
  ctx.font = `${fontSize}px 'Courier New', monospace`;

  // Percorre cada coluna
  for (let i = 0; i < drops.length; i++) {
    const x = i * fontSize;
    const headRow = drops[i];

    for (let t = 0; t < TAIL_LENGTH; t++) {
      const rowOffset = t;
      let yPos = (headRow - rowOffset) * fontSize;


      if (yPos > 0 && yPos < height + fontSize) {
        const randomChar = charArray[Math.floor(Math.random() * charArray.length)];

        if (t === 0) {
          ctx.fillStyle = '#ff80bf';
          ctx.shadowBlur = 6;
          ctx.shadowColor = '#ff3399';
        } else {
          const intensity = 0.5 + (1 - t / TAIL_LENGTH) * 0.4;
          ctx.fillStyle = `rgba(171, 48, 126, ${intensity})`;
          ctx.shadowBlur = 2;
          ctx.shadowColor = '#ab307e';
        }

        ctx.fillText(randomChar, x, yPos);
      }
    }

    drops[i] += speed;

    const maxRow = (height / fontSize) + TAIL_LENGTH;
    if (drops[i] > maxRow && Math.random() > 0.97) {
      drops[i] = Math.random() * -30;
    }

    // Pequena chance extra de resetar antes para dar aleatoriedade (efeito mais orgânico)
    if (drops[i] > (height / fontSize) + 2 && Math.random() > 0.99) {
      drops[i] = Math.random() * -20;
    }
  }

  // Reseta o shadow para não afetar outros desenhos (se houver)
  ctx.shadowBlur = 0;
}

// Ajusta canvas ao redimensionar a tela
function resizeCanvas() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
  initMatrix();
}

window.addEventListener('resize', () => {
  resizeCanvas();
});

resizeCanvas();

// Animar a matrix (60fps suave)
function animateMatrix() {
  drawMatrix();
  requestAnimationFrame(animateMatrix);
}
animateMatrix();

// --------------------------------------------------------------
// 2. MENSAGENS QUE ALTERAM A CADA 2 SEGUNDOS (ROMÂNTICO)
// --------------------------------------------------------------
const messages = ["Feliz 3 meses", "Eu te amo 💖"];
let index = 0;
const messageElement = document.getElementById('dynamic-message');

function rotateMessage() {
  index = (index + 1) % messages.length;
  messageElement.textContent = messages[index];
}

// Começa com a primeira mensagem já visível e alterna a cada 2 segundos
setInterval(rotateMessage, 2000);