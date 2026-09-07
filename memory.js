const symbols = ['🍕', '🍕', '🚀', '🚀', '🐱', '🐱', '🎮', '🎮', '🎈', '🎈', '🎨', '🎨', '⚽', '⚽', '💎', '💎'];

// 1. Shuffle
symbols.sort(() => Math.random() - 0.5);

// 2. Tracking Variables
let firstCard = null;
let secondCard = null;
let score = 0;
let turnsLeft = 5; // Twist: Total 5 wrong chances
let lockBoard = false;

const cards = document.querySelectorAll('.card');

cards.forEach((card, index) => {
    card.dataset.symbol = symbols[index];
    card.addEventListener('click', flipCard);
});

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.innerText = this.dataset.symbol;

    if (!firstCard) {
        firstCard = this;
    } else {
        secondCard = this;
        checkMatch();
    }
}

function checkMatch() {
    let isMatch = firstCard.dataset.symbol === secondCard.dataset.symbol;

    if (isMatch) {
        score += 10;
        document.getElementById('score').innerText = score;

        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);

        resetBoard();
    } else {
      
        turnsLeft--;
        document.getElementById('turns').innerText = turnsLeft;

        lockBoard = true;
        
        setTimeout(() => {
            firstCard.innerText = '?';
            secondCard.innerText = '?';
            resetBoard();

            // Game Over Check
            if (turnsLeft === 0) {
                alert("Game Over! . ❌");
                lockBoard = true; // permanently lock board
            }
        }, 1000);
    }
}

function resetBoard() {
    firstCard = null;
    secondCard = null;
    if (turnsLeft > 0) {
        lockBoard = false;
    }
}
