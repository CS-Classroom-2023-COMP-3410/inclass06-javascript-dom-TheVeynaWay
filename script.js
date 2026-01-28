const board = document.getElementById("board");
const movesSpan = document.getElementById("moves");
const timeSpan = document.getElementById("time");
const restartBtn = document.getElementById("restart");

//'&#127144;', '&#127145;', '&#127146;', '&#127147;', '&#127148;', '&#127149;', '&#127150;'
let allCards = ['&#127136;', '&#127137;','&#127138;', '&#127139;', '&#127140;', '&#127141;', '&#127142;', '&#127143;']

let gameDeck = [];
let flipped = [];
let moves = 0;
let time = 0;
let timer;
let matchedCount = 0;

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

function startGame() {
    board.innerHTML = "";
    moves = 0;
    time = 0;
    flipped = [];
    movesSpan.textContent = moves;
    timeSpan.textContent = time;
    clearInterval(timer);

    gameDeck = [...allCards, ...allCards];
    shuffle(gameDeck);

    gameDeck.forEach(val => {
        let card = document.createElement("span");
        card.className = "card";
        card.dataset.value = val;
        card.innerHTML = "?";
        card.onclick = () => flipCard(card);
        board.appendChild(card);
    });

    timer = setInterval(() => {
        time++;
        timeSpan.textContent = time;
    }, 1000);
}

function flipCard(card) {
    if (flipped.length === 2 || card.innerHTML !== "?") return;

    card.innerHTML = card.dataset.value;
    flipped.push(card);

    if (flipped.length === 2) {
        moves++;
        movesSpan.textContent = moves;

        if (flipped[0].dataset.value === flipped[1].dataset.value) {
            matchedCount += 2;
            flipped = [];
            if(matchedCount === gameDeck.length){
                clearInterval(timer);
                alert(`You won in ${moves} moves and ${time} seconds! 🎉`);
            }
        } else {
            setTimeout(() => {
                flipped[0].innerHTML = "?";
                flipped[1].innerHTML = "?";
                flipped = [];
            }, 500);
        }
    }
}

restartBtn.onclick = startGame;

startGame();