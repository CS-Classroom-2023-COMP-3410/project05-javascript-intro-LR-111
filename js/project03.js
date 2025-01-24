document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const movesDisplay = document.getElementById('moves');
    const timeDisplay = document.getElementById('time');
    const restartButton = document.getElementById('restart');
  
    let cards = [];
    let firstCard = null;
    let secondCard = null;
    let moves = 0;
    let matchedPairs = 0;
    let timer = null;
    let time = 0;
  
    const symbols = ['🍎', '🍌', '🍇', '🍓', '🍒', '🍑', '🍍', '🥝'];
    const totalPairs = symbols.length;
  
    function initGame() {
      // Reset game variables
      cards = [];
      firstCard = null;
      secondCard = null;
      moves = 0;
      matchedPairs = 0;
      time = 0;
      movesDisplay.textContent = moves;
      timeDisplay.textContent = time;
  
      // Stop timer if running
      clearInterval(timer);
      timer = setInterval(() => {
        time++;
        timeDisplay.textContent = time;
      }, 1000);
  
      // Generate card data and shuffle
      const shuffledSymbols = [...symbols, ...symbols].sort(() => Math.random() - 0.5);
      cards = shuffledSymbols.map((symbol, index) => ({
        id: index,
        symbol,
        matched: false,
      }));
  
      // Render cards on the board
      renderBoard();
    }
  
    function renderBoard() {
      gameBoard.innerHTML = '';
      cards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.index = index;
  
        const cardInner = document.createElement('div');
        cardInner.classList.add('card-inner');
  
        const front = document.createElement('div');
        front.classList.add('card-front');
        front.textContent = card.symbol;
  
        const back = document.createElement('div');
        back.classList.add('card-back');
        back.textContent = '';
  
        cardInner.appendChild(front);
        cardInner.appendChild(back);
        cardElement.appendChild(cardInner);
  
        gameBoard.appendChild(cardElement);
        cardElement.addEventListener('click', handleCardClick);
      });
    }
  
    function handleCardClick(e) {
      const cardElement = e.target.closest('.card');
      const cardIndex = cardElement.dataset.index;
      const card = cards[cardIndex];
  
      // Ignore clicks on already matched cards or if two cards are flipped
      if (card.matched || firstCard && secondCard) return;
  
      flipCard(cardElement);
  
      if (!firstCard) {
        // First card flipped
        firstCard = { card, element: cardElement };
      } else if (!secondCard) {
        // Second card flipped
        secondCard = { card, element: cardElement };
        moves++;
        movesDisplay.textContent = moves;
  
        // Check for match
        if (firstCard.card.symbol === secondCard.card.symbol) {
          firstCard.card.matched = true;
          secondCard.card.matched = true;
          matchedPairs++;
  
          // Reset selection
          firstCard = null;
          secondCard = null;
  
          // Check if game is complete
          if (matchedPairs === totalPairs) {
            clearInterval(timer);
            setTimeout(() => alert(`Congratulations! You completed the game in ${moves} moves and ${time} seconds.`), 500);
          }
        } else {
          // Not a match, flip back after a short delay
          setTimeout(() => {
            flipCardBack(firstCard.element);
            flipCardBack(secondCard.element);
            firstCard = null;
            secondCard = null;
          }, 1000);
        }
      }
    }
  
    function flipCard(cardElement) {
      cardElement.classList.add('flipped');
    }
  
    function flipCardBack(cardElement) {
      cardElement.classList.remove('flipped');
    }
  
    restartButton.addEventListener('click', initGame);
  
    // Start the game initially
    initGame();
  });
  