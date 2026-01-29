const movesElement = document.getElementById('moves');
const timeElement = document.getElementById('time');
const restartButton = document.getElementById('restart');
const cardGrid = document.getElementById('cardGrid');

const allCards = [ 
    "&#127136;", "&#127137;", "&#127138;", "&#127139;", "&#127140;", "&#127141;",
    "&#127142;", "&#127143;", "&#127144;", "&#127145;", "&#127146;", "&#127147;",
    "&#127148;", "&#127149;", "&#127150;", "&#127153;", "&#127154;", "&#127155;",
    "&#127156;", "&#127157;", "&#127158;", "&#127159;", "&#127160;", "&#127161;",
    "&#127162;", "&#127163;", "&#127164;", "&#127165;", "&#127166;", "&#127167;",
    "&#127169;", "&#127170;", "&#127171;", "&#127172;", "&#127173;", "&#127174;",
    "&#127175;", "&#127176;", "&#127177;", "&#127178;", "&#127179;", "&#127180;",
    "&#127181;", "&#127182;", "&#127183;", "&#127185;", "&#127186;", "&#127187;",
    "&#127188;", "&#127189;", "&#127190;", "&#127191;", "&#127192;", "&#127193;",
    "&#127194;", "&#127195;", "&#127196;", "&#127197;", "&#127198;", "&#127199;" 
];

let moves = 0;
let time = 0;
let timer = null;
let flippedCards = [];
let matchedPairs = 0;
let canClick = true;

function randIndex(lastIndex) {
    return Math.floor(Math.random() * (lastIndex + 1));
}

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

function initGame() {
    moves = 0;
    time = 0;
    flippedCards = [];
    matchedPairs = 0;
    canClick = true;
    
    if (timer) clearInterval(timer);
    timer = null;
    
    movesElement.textContent = '0';
    timeElement.textContent = '0';
    cardGrid.innerHTML = '';
    
    let availableCards = [...allCards];
    let cardBack = availableCards[0];
    availableCards.shift();
    
    let gameDeck = [];
    
    for(let i = 0; i < 8; i++) {
        let lastIndex = availableCards.length - 1;
        let r = randIndex(lastIndex);
        gameDeck.push(availableCards[r]);
        availableCards.splice(r, 1);
    }
    
    gameDeck = [...gameDeck, ...gameDeck];
    shuffle(gameDeck);
    
    gameDeck.forEach((symbol, index) => {
        let card = document.createElement('div');
        card.className = 'card';
        card.dataset.index = index;
        card.dataset.symbol = symbol;
        card.innerHTML = cardBack;
        
        card.onclick = function() {
            if (!canClick || this.classList.contains('flipped') || this.classList.contains('matched')) return;
            
            if (flippedCards.length === 0 && !timer) {
                timer = setInterval(() => {
                    time++;
                    timeElement.textContent = time;
                }, 1000);
            }
            
            this.classList.add('flipped');
            this.innerHTML = symbol;
            flippedCards.push(this);
            
            if (flippedCards.length === 2) {
                moves++;
                movesElement.textContent = moves;
                canClick = false;
                
                let card1 = flippedCards[0];
                let card2 = flippedCards[1];
                
                if (card1.dataset.symbol === card2.dataset.symbol) {
                    setTimeout(() => {
                        card1.classList.add('matched');
                        card2.classList.add('matched');
                        flippedCards = [];
                        canClick = true;
                        matchedPairs++;
                        
                        if (matchedPairs === 8) {
                            clearInterval(timer);
                        }
                    }, 500);
                } else {
                    setTimeout(() => {
                        card1.classList.remove('flipped');
                        card2.classList.remove('flipped');
                        card1.innerHTML = cardBack;
                        card2.innerHTML = cardBack;
                        flippedCards = [];
                        canClick = true;
                    }, 1000);
                }
            }
        };
        
        cardGrid.appendChild(card);
    });
}

restartButton.onclick = initGame;
initGame();
//why is this not working