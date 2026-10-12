const hiLoValues = {
  '2': 1,
  '3': 1,
  '4': 1,
  '5': 1,
  '6': 1,
  '7': 0,
  '8': 0,
  '9': 0,
  '10': -1,
  J: -1,
  Q: -1,
  K: -1,
  A: -1,
};

const runningCountEl = document.getElementById('running-count');
const trueCountEl = document.getElementById('true-count');
const betLevelEl = document.getElementById('bet-level');
const deckCountEl = document.getElementById('deck-count');
const historyListEl = document.getElementById('history-list');
const tableReadEl = document.getElementById('table-read');
const countSummaryEl = document.getElementById('count-summary');

const state = {
  runningCount: 0,
  history: [],
};

function getDecksRemaining() {
  const value = Number(deckCountEl.value) || 1;
  return Math.max(0.5, value);
}

function getTrueCount() {
  const decks = getDecksRemaining();
  if (decks <= 0) return 0;
  return state.runningCount / decks;
}

function updateSummary() {
  runningCountEl.textContent = state.runningCount;

  const trueCount = getTrueCount();
  trueCountEl.textContent = trueCount.toFixed(2);

  const betLevel = Math.max(1, Math.ceil(Math.max(0, trueCount)));
  betLevelEl.textContent = `${betLevel}x`;

  if (trueCount > 2) {
    tableReadEl.textContent = 'Strong player edge';
    tableReadEl.className = 'table-read positive';
  } else if (trueCount < -1) {
    tableReadEl.textContent = 'Dealer edge';
    tableReadEl.className = 'table-read negative';
  } else {
    tableReadEl.textContent = 'Neutral shoe';
    tableReadEl.className = 'table-read neutral';
  }

  countSummaryEl.textContent = `${state.history.length} card${state.history.length === 1 ? '' : 's'} tracked`;
}

function drawHistory() {
  historyListEl.innerHTML = '';

  state.history.forEach((card) => {
    const chip = document.createElement('span');
    chip.className = `history-chip ${card.value > 0 ? 'positive' : card.value < 0 ? 'negative' : 'neutral'}`;
    chip.textContent = card.label;
    historyListEl.appendChild(chip);
  });
}

function addCard(cardLabel) {
  const value = hiLoValues[cardLabel] ?? 0;
  state.runningCount += value;
  state.history.push({ label: cardLabel, value });
  updateSummary();
  drawHistory();
}

function undoLastCard() {
  const last = state.history.pop();
  if (!last) return;
  state.runningCount -= last.value;
  updateSummary();
  drawHistory();
}

function clearHistory() {
  state.runningCount = 0;
  state.history = [];
  updateSummary();
  drawHistory();
}

function setupListeners() {
  document.querySelectorAll('.card-btn').forEach((button) => {
    button.addEventListener('click', () => addCard(button.dataset.card));
  });

  deckCountEl.addEventListener('input', updateSummary);

  document.getElementById('undo-btn').addEventListener('click', undoLastCard);
  document.getElementById('clear-btn').addEventListener('click', clearHistory);
  document.getElementById('reset-btn').addEventListener('click', clearHistory);
}

setupListeners();
updateSummary();
