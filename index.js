const boxes=document.querySelectorAll('.box');
const gameInfo=document.querySelector('.game-info');
const resetButton=document.querySelector('.btn');

let currentPlayer;
let gameGrid;

const winningPositions=[
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function initGame() {
    currentPlayer = 'X';
    gameGrid = ['', '', '', '', '', '', '', '', ''];
    resetButton.classList.remove('active');
    gameInfo.innerText = `Current Player: ${currentPlayer}`;
}
initGame();

function swapTurn() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    gameInfo.innerText = `Current Player: ${currentPlayer}`;
}
function checkGameOver() {
    let answer="";
    winningPositions.forEach((position)=>{
        if(gameGrid[position[0]] === gameGrid[position[1]] && 
           gameGrid[position[1]] === gameGrid[position[2]] && 
           gameGrid[position[0]] !== "") {
            answer = gameGrid[position[0]];
            boxes[position[0]].classList.add('win');
            boxes[position[1]].classList.add('win');
            boxes[position[2]].classList.add('win');
        }
    });
    if(answer!=""){
        gameInfo.innerText=`WINNER : ${answer}`;
        resetButton.classList.add('active');
        boxes.forEach((box)=>{
            box.style.pointerEvents="none";
        });
        return;
    }
    let x=true;
    for(let i=0;i<9;++i){
        if(gameGrid[i]==""){
            x=false;
            break;
        }
    }
    if(x==true){
        resetButton.classList.add('active');
        gameInfo.innerText=`-- GAME TIE --`;
    }
}
function handleClick(index) {
    if(gameGrid[index] == "") {
        gameGrid[index] = currentPlayer;
        boxes[index].innerText = currentPlayer;
        boxes[index].style.pointerEvents = 'none';
        swapTurn();
        checkGameOver();
    }
}

boxes.forEach((box, index) => {
    box.addEventListener('click', ()=>handleClick(index));
});

resetButton.addEventListener('click', () => {
    initGame();
    boxes.forEach(box => {
        box.innerText = '';
        box.style.pointerEvents = 'auto';
        box.classList.remove('win');
    });
});