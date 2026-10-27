// LÓGICA DE NAVEGAÇÃO ENTRE ABAS
function switchTab(tabId) {
  // Esconde todas as seções
  const contents = document.querySelectorAll('.tab-content');
  contents.forEach(el => el.classList.add('hidden'));

  // Mostra a seção selecionada
  const activeTab = document.getElementById(`tab-${tabId}`);
  if (activeTab) {
    activeTab.classList.remove('hidden');
  }

  // Atualiza os estilos dos botões da sidebar
  const buttons = document.querySelectorAll('.nav-btn');
  buttons.forEach(btn => {
    btn.classList.remove('bg-orange-500/20', 'text-orange-400', 'border', 'border-orange-500/30');
    btn.classList.add('text-emerald-300');
  });

  const activeBtn = document.getElementById(`btn-${tabId}`);
  if (activeBtn) {
    activeBtn.classList.add('bg-orange-500/20', 'text-orange-400', 'border', 'border-orange-500/30');
    activeBtn.classList.remove('text-emerald-300');
  }
}

// CÓPIA DE CÓDIGO
function copyCode(elementId) {
  const codeText = document.getElementById(elementId).innerText;
  navigator.clipboard.writeText(codeText).then(() => {
    alert('Código copiado para a área de transferência!');
  });
}

// ALERTA DE DOWNLOAD SIMULADO
function downloadAlert(filename) {
  alert(`Iniciando download simulado de: ${filename}`);
}

// JOGO DA MEMÓRIA JCLIC
const memoryItems = [
  { name: 'CPU', icon: 'fa-microchip' },
  { name: 'RAM', icon: 'fa-memory' },
  { name: 'HD/SSD', icon: 'fa-hard-drive' },
  { name: 'Rede', icon: 'fa-network-wired' }
];

let cards = [];
let flippedCards = [];
let moves = 0;
let matchedPairs = 0;

function initMemoryGame() {
  const grid = document.getElementById('memory-grid');
  grid.innerHTML = '';
  moves = 0;
  matchedPairs = 0;
  document.getElementById('game-moves').innerText = moves;
  document.getElementById('game-status').innerText = 'Clique nas cartas para jogar!';

  // Duplicar e embaralhar
  cards = [...memoryItems, ...memoryItems]
    .sort(() => Math.random() - 0.5);

  cards.forEach((item, index) => {
    const cardEl = document.createElement('div');
    cardEl.className = 'memory-card';
    cardEl.innerHTML = `
      <div class="memory-card-inner">
        <div class="memory-card-front">
          <i class="fa-solid fa-question text-xl"></i>
        </div>
        <div class="memory-card-back flex-col gap-1">
          <i class="fa-solid ${item.icon} text-2xl"></i>
          <span class="text-[10px]">${item.name}</span>
        </div>
      </div>
    `;
    cardEl.addEventListener('click', () => flipCard(cardEl, item, index));
    grid.appendChild(cardEl);
  });
}

function flipCard(cardEl, item, index) {
  if (flippedCards.length === 2 || cardEl.classList.contains('flipped')) return;

  cardEl.classList.add('flipped');
  flippedCards.push({ cardEl, item });

  if (flippedCards.length === 2) {
    moves++;
    document.getElementById('game-moves').innerText = moves;
    checkMatch();
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;

  if (card1.item.name === card2.item.name) {
    matchedPairs++;
    flippedCards = [];
    if (matchedPairs === memoryItems.length) {
      document.getElementById('game-status').innerText = '🎉 Parabéns! Você concluiu a atividade JClic!';
    }
  } else {
    setTimeout(() => {
      card1.cardEl.classList.remove('flipped');
      card2.cardEl.classList.remove('flipped');
      flippedCards = [];
    }, 1000);
  }
}

// Inicializar o jogo ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
  initMemoryGame();
});