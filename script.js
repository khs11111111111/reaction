// game.js

let gameStartTime;
let gameEndTime;
let bestTime = Infinity;

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM content loaded');
    
    const startButton = document.getElementById('start-button');
    const gameArea = document.getElementById('game-area');
    const result = document.getElementById('result');
    const bestTimeDisplay = document.getElementById('best-time');

    startButton.addEventListener('click', startGame);
    gameArea.addEventListener('click', endGame);

    function startGame() {
        console.log('Game started');
        document.getElementById('nickname-form').style.display = 'none';
        gameArea.style.display = 'block';
        result.textContent = '';
        gameStartTime = new Date().getTime();
    }

    function endGame() {
        console.log('Game ended');
        gameEndTime = new Date().getTime();
        const reactionTime = (gameEndTime - gameStartTime) / 1000;
        
        result.textContent = `반응 시간: ${reactionTime.toFixed(3)}초`;
        
        if (reactionTime < bestTime) {
            bestTime = reactionTime;
            updateLeaderboard();
        }

        gameArea.style.display = 'none';
        document.getElementById('nickname-form').style.display = 'block';
    }

    function updateLeaderboard() {
        console.log('Updating leaderboard');
        bestTimeDisplay.textContent = `${bestTime.toFixed(3)}초`;
    }

    console.log('Event listeners set up');
});

console.log('game.js loaded');
