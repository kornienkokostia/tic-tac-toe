const player1 = prompt('Player 1 name: ')
const player2 = prompt('Player 2 name: ')

document.querySelector('.player-one-name').innerHTML = player1
document.querySelector('.player-two-name').innerHTML = player2


let gameActive = true;
let currentPlayer = 'XO'.charAt(Math.floor(Math.random() * 2));
let gameState = ['', '', '', '', '', '', '', '', ''];
let player1Won = 0;
let player2Won = 0;

const winningMessage = () => {
    if (currentPlayer === 'X') {
        alert(`${player1} won!`)
    }
    if (currentPlayer === 'O') {
        alert(`${player2} won!`)
    }
};
const drawMessage = () => alert(`Draw!`);
const currentPlayerTurn = () => {
    if (currentPlayer === 'X') {
        document.querySelector('.player-one-name').classList.add('highlight1')
        document.querySelector('.player-two-name').classList.remove('highlight2')
    } 
    if (currentPlayer === 'O') {
        document.querySelector('.player-two-name').classList.add('highlight2')
        document.querySelector('.player-one-name').classList.remove('highlight1')
    }
};

currentPlayerTurn()

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    if (currentPlayer === 'X') {
        clickedCell.style.color = '#f2ebd3'
        clickedCell.innerHTML = currentPlayer;
    } 
    if (currentPlayer === 'O') {
        clickedCell.style.color = '#545454'
        clickedCell.innerHTML = currentPlayer;
    }
    
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    currentPlayerTurn();
}

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }

    if (roundWon) {
        let one = document.querySelector('.one').textContent
        let two = document.querySelector('.two').textContent
        let three = document.querySelector('.three').textContent
        let four = document.querySelector('.four').textContent
        let five = document.querySelector('.five').textContent
        let six = document.querySelector('.six').textContent
        let seven = document.querySelector('.seven').textContent
        let eight = document.querySelector('.eight').textContent
        let nine = document.querySelector('.nine').textContent
        if (one === two && two === three && one !== '' && two !== '' && three !== '') {
            document.querySelector('.two').classList.add('win-line')
        }
        if (four === five && five === six && four !== '' && five !== '' && six !== '') {
            document.querySelector('.five').classList.add('win-line')
        }
        if (seven === eight && eight === nine && seven !== '' && eight !== '' && nine !== '') {
            document.querySelector('.eight').classList.add('win-line')
        }

        if (one === four && four === seven && one !== '' && four !== '' && seven !== '') {
            document.querySelector('.four').classList.add('win-column')
        }
        if (two === five && five === eight && two !== '' && five !== '' && eight !== '') {
            document.querySelector('.five').classList.add('win-column')
        }
        if (three === six && six === nine && three !== '' && six !== '' && nine !== '') {
            document.querySelector('.six').classList.add('win-column')
        }

        if (one === five && five === nine && one !== '' && five !== '' && nine !== '') {
            document.querySelector('.five').classList.add('win-diagonal-l-r')
        }
        if (three === five && five === seven && three !== '' && five !== '' && seven !== '') {
            document.querySelector('.five').classList.add('win-diagonal-r-l')
        }
        
        setTimeout(() => {
 winningMessage() 
}, 2000);
        if (currentPlayer === 'X') {
            player1Won ++
            setTimeout(() => {
 document.querySelector('.one-score').innerHTML = player1Won 
}, 2500)
        } 
        if (currentPlayer === 'O') {
            player2Won ++
            setTimeout(() => {
 document.querySelector('.two-score').innerHTML = player2Won 
}, 2500)
        } 
        gameActive = false;
        return;
    }

    let roundDraw = !gameState.includes('');
    if (roundDraw) {
        player1Won ++;
        player2Won ++;     
        setTimeout(() => {
 drawMessage() 
}, 250);
        setTimeout(() => {
 document.querySelector('.one-score').innerHTML = player1Won 
}, 1000)
        setTimeout(() => {
 document.querySelector('.two-score').innerHTML = player2Won 
}, 1000)
        gameActive = false;
        return;
    }

    handlePlayerChange();
}

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }  

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
    
}

function handleRestartGame() {
    gameActive = true;
    currentPlayer = 'XO'.charAt(Math.floor(Math.random() * 2));
    gameState = ['', '', '', '', '', '', '', '', ''];
    currentPlayerTurn();
    document.querySelectorAll('.field-cell').forEach(cell => {
        cell.innerHTML = '';
        cell.classList.remove('win-line');
        cell.classList.remove('win-column');
        cell.classList.remove('win-diagonal-l-r');
        cell.classList.remove('win-diagonal-r-l');
        cell.style.color = '#ffffff00'
    });
}
function handleClearGame() {
    gameActive = true;
    currentPlayer = 'XO'.charAt(Math.floor(Math.random() * 2));
    gameState = ['', '', '', '', '', '', '', '', ''];
    player1Won = 0;
    player2Won = 0;
    document.querySelector('.one-score').innerHTML = player1Won
    document.querySelector('.two-score').innerHTML = player2Won
    currentPlayerTurn();
    document.querySelectorAll('.field-cell').forEach(cell => {
        cell.innerHTML = '';
        cell.classList.remove('win-line');
        cell.classList.remove('win-column');
        cell.classList.remove('win-diagonal-l-r');
        cell.classList.remove('win-diagonal-r-l');
        cell.style.color = '#ffffff00'
    });
}

document.querySelectorAll('.field-cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.new-game').addEventListener('click', handleRestartGame);
document.querySelector('.clear').addEventListener('click', handleClearGame);