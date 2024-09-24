let gameState = 'setup';
let nickname = '';
let startTime = null;
let reactionTime = null;
let worldRecords = [];

const gameArea = document.getElementById('game-area');
const nicknameForm = document.getElementById('nickname-form');
const nicknameInput = document.getElementById('nickname-input');
const startButton = document.getElementById('start-button');
const recordsList = document.getElementById('records-list');

function startGame() {
    gameState = 'ready';
    gameArea.style.backgroundColor = 'blue';
    gameArea.textContent = '초록색을 기다리세요...';
    const changeTime = Math.floor(Math.random() * 4000) + 1000; // 1-5 seconds
    setTimeout(() => {
        gameState = 'go';
        gameArea.style.backgroundColor = 'green';
        gameArea.textContent = '클릭하세요!';
        startTime = Date.now();
    }, changeTime);
}

function handleClick() {
    if (gameState === 'waiting') {
        startGame();
    } else if (gameState === 'ready') {
        gameState = 'early';
        gameArea.style.backgroundColor = 'red';
        gameArea.textContent = '너무 빨랐어요! 다시 시도하세요.';
        setTimeout(() => {
            gameState = 'waiting';
            gameArea.style.backgroundColor = 'blue';
            gameArea.textContent = '클릭하여 시작';
        }, 1000);
    } else if (gameState === 'go') {
        const endTime = Date.now();
        reactionTime = endTime - startTime;
        gameState = 'result';
        gameArea.style.backgroundColor = 'yellow';
        gameArea.textContent = `반응 시간: ${reactionTime}ms`;
        updateWorldRecords(reactionTime);
        setTimeout(() => {
            gameState = 'waiting';
            gameArea.style.backgroundColor = 'blue';
            gameArea.textContent = '클릭하여 시작';
        }, 1000);
    }
}

function updateWorldRecords(newScore) {
    worldRecords.push({ name: nickname, score: newScore });
    worldRecords.sort((a, b) => a.score - b.score);
    worldRecords = worldRecords.slice(0, 4);
    updateRecordsList();
}

function updateRecordsList() {
    recordsList.innerHTML = '';
    worldRecords.forEach((record, index) => {
        const li = document.createElement('li');
        let medal = '';
        if (index === 0) medal = '🥇';
        else if (index === 1) medal = '🥈';
        else if (index === 2) medal = '🥉';
        li.textContent = `${medal} ${record.name}: ${record.score}ms`;
        recordsList.appendChild(li);
    });
}

startButton.addEventListener('click', (e) => {
    e.preventDefault();
    nickname = nicknameInput.value.trim();
    if (nickname) {
        gameState = 'waiting';
        nicknameForm.style.display = 'none';
        gameArea.style.display = 'flex';
        gameArea.style.backgroundColor = 'blue';
        gameArea.textContent = '클릭하여 시작';
    }
});

gameArea.addEventListener('click', handleClick);

// 초기 상태 설정
gameArea.style.display = 'none';
