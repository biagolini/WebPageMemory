const modal = document.getElementById('modal')
const closeButton = document.getElementById('close-button')
const modalMessage = document.getElementById('modal-message')
const grid = document.getElementById('grid')
const cardsData = [
  'A',
  'A',
  'B',
  'B',
  'C',
  'C',
  'D',
  'D',
  'E',
  'E',
  'F',
  'F',
  'G',
  'G',
  'H',
  'H'
]

let cards = []
let flippedCards = []
let matchedPairs = 0

function shuffleCards(cards) {
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[cards[i], cards[j]] = [cards[j], cards[i]]
  }
  return cards
}

function createCard(value) {
  const card = document.createElement('div')
  card.classList.add('card')
  card.dataset.value = value
  card.innerText = value
  return card
}

function flipCard(card) {
  card.classList.add('flipped')
}

function unflipCards() {
  flippedCards.forEach(card => card.classList.remove('flipped'))
  flippedCards = []
}

function matchCards() {
  flippedCards.forEach(card => card.classList.add('matched'))
  flippedCards = []
  matchedPairs++

  if (matchedPairs === cardsData.length / 2) {
    setTimeout(() => {
      if (matchedPairs === cardsData.length / 2) {
        setTimeout(() => {
          showModal('Congratulations, you won!')
          startGame()
        }, 1000)
      }
      startGame()
    }, 1000)
  }
}

function onCardClick(event) {
  const card = event.target
  if (flippedCards.length < 2 && card !== flippedCards[0]) {
    flipCard(card)
    flippedCards.push(card)
    if (flippedCards.length === 2) {
      if (flippedCards[0].dataset.value === flippedCards[1].dataset.value) {
        matchCards()
      } else {
        setTimeout(unflipCards, 1000)
      }
    }
  }
}

function startGame() {
  matchedPairs = 0
  cards = shuffleCards(cardsData).map(createCard)
  grid.innerHTML = ''
  cards.forEach(card => {
    card.classList.remove('flipped', 'matched')
    card.addEventListener('click', onCardClick)
    grid.appendChild(card)
  })
}

function showModal(message) {
  modalMessage.textContent = message
  modal.style.display = 'block'
}

function closeModal() {
  modal.style.display = 'none'
}

closeButton.addEventListener('click', closeModal)

startGame()
