let score = {
    Wins: 0,
    Loses: 0,
    Ties: 0,
};

const savedScore = JSON.parse(localStorage.getItem('score'));
if (savedScore) {
    score = savedScore;
}

updateScoreElement();

function pickComputerMove() {
    const randomNumber = Math.random();
    let computerMove;

    if (randomNumber < (1/3))
        computerMove = 'rock';
    else if (randomNumber < (2/3))
        computerMove = 'paper';
    else
        computerMove = 'scissors';

    return computerMove;
}

let isAutoPlaying = false;
let intervalId;

function autoPlay(){
    if(!isAutoPlaying){
        intervalId = setInterval(function(){
            const playerMove = pickComputerMove();
            pickPlayerMove(playerMove);
        }, 1000)
        isAutoPlaying = true;
    }
    else{
        clearInterval(intervalId);
        isAutoPlaying = false;
    }
}

function pickPlayerMove(playerMove) {
    const computerMove = pickComputerMove();
    const resultElement = document.querySelector('.result'); 

    if (playerMove === computerMove) {
        resultElement.innerHTML = 'Tie';
        score.Ties += 1;
    } else if (
        (playerMove === 'rock' && computerMove === 'scissors') ||
        (playerMove === 'scissors' && computerMove === 'paper') ||
        (playerMove === 'paper' && computerMove === 'rock')
    ) {
        resultElement.innerHTML = 'You Win';
        score.Wins += 1;
    } else {
        resultElement.innerHTML = 'You Lose';
        score.Loses += 1;
    }

    const movesElement = document.querySelector('.moves-chosen'); 
    movesElement.innerHTML = `
        You
        <img src="images/${playerMove}.png" class="emoji">
        <img src="images/${computerMove}.png" class="emoji">
        Computer
    `;

    updateScoreElement();
    localStorage.setItem('score', JSON.stringify(score));
}

function resetScore() {
    score = {
        Wins: 0,
        Loses: 0,
        Ties: 0,
    };

    updateScoreElement();
    localStorage.removeItem('score');
}

function updateScoreElement() {
    const scoreElement = document.querySelector('.js-score'); 
    scoreElement.innerHTML = `
        Wins: ${score.Wins}, Loses: ${score.Loses}, Ties: ${score.Ties}
    `;
}
