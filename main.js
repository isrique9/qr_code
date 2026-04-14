// --------------------------------------------------------------
// 1. MATRIX RAIN (CASCATA INTENSA)
// --------------------------------------------------------------
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

let width = window.innerWidth;
let height = window.innerHeight;

const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワンABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const charArray = chars.split('');

let columns;
let drops = [];

const fontSize = 14;
let speed = 0.3;
const TAIL_LENGTH = 8;

function initMatrix() {
  columns = Math.floor(width / fontSize);
  drops = [];
  for (let i = 0; i < columns; i++) {
    drops[i] = Math.random() * -80;
  }
}

function drawMatrix() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.07)';
  ctx.fillRect(0, 0, width, height);
  ctx.font = `${fontSize}px 'Courier New', monospace`;

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
    if (drops[i] > (height / fontSize) + 2 && Math.random() > 0.99) {
      drops[i] = Math.random() * -20;
    }
  }
  ctx.shadowBlur = 0;
}

function resizeCanvas() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
  initMatrix();
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function animateMatrix() {
  drawMatrix();
  requestAnimationFrame(animateMatrix);
}
animateMatrix();

// --------------------------------------------------------------
// 2. CARTA INTERATIVA COM MENSAGENS E IMAGENS VARIÁVEIS
// --------------------------------------------------------------
const envelope = document.getElementById('envelope');
const messageEl = document.getElementById('dynamic-message');
const imageEl = document.getElementById('dynamic-image');

// 📚 Banco de dados romântico: cada item tem uma frase e uma URL de imagem
const romanticContent = [
  {
    text: "Feliz 3 meses, meu amor! 💖<br>Cada dia com você é um presente.",
    image: "./img/mes5.png"
  },
  {
    text: "Você ilumina minha vida 🌟<br>Te amo infinitamente!",
    image: "./img/mes1.jpeg"
  },
  {
    text: "3 meses de pura alegria ao seu lado.<br>Você é minha pessoa favorita.",
    image: "./img/mes2.jpeg"
  },
  {
    text: "Meu coração bate mais forte por você 💓<br>Obrigado por existir.",
    image: "./img/mes3.jpeg"
  },
  {
    text: "Que venham muitos outros meses juntos!<br>Você é tudo para mim.",
    image: "./img/mes4.jpeg"
  }
];

let currentIndex = 0;

function updateLetterContent(index) {
  const content = romanticContent[index];
  if (!content) return;

  // Suave fade out/in para texto e imagem
  messageEl.style.opacity = '0';
  imageEl.style.opacity = '0';

  setTimeout(() => {
    messageEl.innerHTML = content.text;
    imageEl.src = content.image;
    messageEl.style.opacity = '1';
    imageEl.style.opacity = '1';
  }, 200);
}

// Alterna automaticamente a cada 5 segundos apenas se a carta estiver ABERTa
let intervalId = null;

function startRotation() {
  if (intervalId) clearInterval(intervalId);
  intervalId = setInterval(() => {
    // só troca se o envelope estiver aberto
    if (envelope.classList.contains('open')) {
      currentIndex = (currentIndex + 1) % romanticContent.length;
      updateLetterContent(currentIndex);
    }
  }, 5000);
}

function stopRotation() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
}

// Ao clicar no envelope, abre/fecha e controla a rotação
envelope.addEventListener('click', () => {
  const wasOpen = envelope.classList.contains('open');
  envelope.classList.toggle('open');

  if (!wasOpen) {
    // acabou de abrir: inicia a rotação
    startRotation();
  } else {
    // fechou: para a rotação
    stopRotation();
  }
});

// Inicializa com o primeiro conteúdo
updateLetterContent(0);