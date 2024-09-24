// game.js

let gameStartTime;
let gameEndTime;
let bestTime = Infinity;

document.addEventListener('DOMContentLoaded', () => {
    const nicknameForm = document.getElementById('nickname-form');
    const gameArea = document.getElementById('game-area');
    const result = document.getElementById('result');
    const leaderboard = document.getElementById('leaderboard');

    nicknameForm.addEventListener('click', startGame);
    gameArea.addEventListener('click', endGame);

    function startGame() {
        nicknameForm.style.display = 'none';
        gameArea.style.display = 'block';
        gameArea.textContent = '클릭하여 게임 종료';
        result.textContent = '';
        gameStartTime = new Date().getTime();
    }

    function endGame() {
        gameEndTime = new Date().getTime();
        const reactionTime = (gameEndTime - gameStartTime) / 1000;
        
        result.textContent = `반응 시간: ${reactionTime.toFixed(3)}초`;
        
        if (reactionTime < bestTime) {
            bestTime = reactionTime;
            updateLeaderboard();
        }

        gameArea.style.display = 'none';
        nicknameForm.style.display = 'block';
    }

    function updateLeaderboard() {
        leaderboard.innerHTML = `
            <h2>최고 기록</h2>
            <p>${bestTime.toFixed(3)}초</p>
        `;
    }
});
