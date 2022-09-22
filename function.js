let cell = document.querySelectorAll(".cell");
let statusText = document.querySelector("#statusText");
let restartButton = document.querySelector("#restartbtn");

let  winCondition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
]

let option = ["","","","","","","","",""];

let currentPlayer = "X";
let running = false;
initializeGame();

function initializeGame(){
    cell.forEach( cell => cell.addEventListener("click" ,cellClicked)); 

    restartButton.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s Turn`;
    running = true;

}

function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");

    if(option[cellIndex] != "" || !running){
        return;
    }
    
    UpdatedCell(this, cellIndex);
    checkWinner();
}

function UpdatedCell(cell ,index){
    option[index] = currentPlayer;
    cell.textContent = currentPlayer;

}

function changePlayer(){
    currentPlayer = (currentPlayer == "X")? "O" : "X";
    statusText.textContent = `${currentPlayer}'s Turn!`;
}

function checkWinner(){
    let roundwon = false;

    for(let i = 0; i < winCondition.length; i++){
        const condition = winCondition[i];

        const cell_A = option[condition[0]];
        const cell_B = option[condition[1]];
        const cell_C = option[condition[2]];

        if(cell_A == "" || cell_B == "" || cell_C ==""){
            continue;
        }
        if(cell_A == cell_B && cell_B == cell_C){
            roundwon = true;
            break;
        }
    }

    if(roundwon){
        statusText.textContent = `${currentPlayer}'s Win`;
        running = false;
    }
    else if(!option.includes("")){
        statusText.textContent = `Draw!`;
        running = false;
    }
    else{
        changePlayer();
    }
}

function restartGame(){
    currentPlayer = "X";
    let option = ["","","","","","","","",""];
    statusText.textContent = `${currentPlayer}'s Turn`;
    cell.forEach(cell => cell.textContent ="");
    running = true
}