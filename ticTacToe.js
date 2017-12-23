let Player = function(name,symbol) {
  this.name = name;
  this.symbol = symbol;
  this.moves = [];
};

Player.prototype.registerMove = function(move){
  this.moves.push(move);
};

Player.prototype.getMoves = function() {
  return this.moves;
}

Player.prototype.getName = function(move){
  return this.name;
};

Player.prototype.getSymbol = function(move){
  return this.symbol;
};

let Game = function() {
  this.players = [];
  this.players.push(new Player("Player 1","X"));
  this.players.push(new Player("Player 2","O"));
  this.currentPlayerIndex=0;
  this.moves=[];
  this.state="inPlay";
  this.likelyWinner="";
};


Game.prototype.isInPlay = function() {
  return this.state == "inPlay";
};

Game.prototype.isMoveAlreadyMade = function(move) {
  return this.moves.includes(move);
};

Game.prototype.registerMove = function(move) {
  this.moves.push(move);
};

Game.prototype.getCurrPlayer = function() {
  return this.players[this.currentPlayerIndex];
};

Game.prototype.changeCurrentPlayer = function() {
  this.currentPlayerIndex = 1 - this.currentPlayerIndex;
};

Game.prototype.getWinner = function() {
  return this.likelyWinner;
}

Game.prototype.setProbableWinner = function(winner) {
  this.likelyWinner = winner;
}

Game.prototype.hasDrawn = function() {
  return this.moves.length == 9;
}

Game.prototype.hasWon = function() {
  let winningCombinations = [[1,2,3],[4,5,6],[7,8,9],
  [1,5,9],[3,5,7],[1,4,7],[2,5,8],[3,6,9]];
  let possiblyWinner = this.likelyWinner;
  let possiblyWinnerName = possiblyWinner.getName();
  let possiblyWinnerMoves = possiblyWinner.getMoves();
  return hasCurrPlWon = winningCombinations.some(function(currCombination) {
    return isSubResult = isSubset(possiblyWinnerMoves,currCombination);
  });
}

//-------------------------------------
//-------------------------------------
//-------------------------------------
//-------------------------------------
//-------------------------------------
//-------------------------------------
let game = new Game();

const isSubset = function(superset,subset) {
  return subset.every(function(element){
    return superset.includes(element);
  });
}

const displayWinner = function(player) {
  let display = document.getElementById("display");
  let name = player.getName();
  display.innerText = name + " Has Won";
}

const displayDraw = function() {
  let display = document.getElementById("display");
  display.innerText = "Match Draw";
}

const updateTable = function(event) {
  let cellID = getClickedCellId(event);
  if(game.isInPlay()) {
    processGameplay(game,cellID);
  }
  if(game.hasDrawn()) {
    game.state="draw";
    displayDraw();
  }
  if(game.hasWon()) {
    game.state="Won";
    displayWinner(game.getWinner());
  }
};

const processGameplay = function(game,cellID) {
  let cell = document.getElementById(cellID);
  let currentPlayer = game.getCurrPlayer();
  let currentPlayerName = currentPlayer.getName();
  let currentPlayerSymbol = currentPlayer.getSymbol();
  if(!game.isMoveAlreadyMade(+cellID)) {
    game.setProbableWinner(currentPlayer);
    updateClickedCell(cell,currentPlayerSymbol);
    currentPlayer.registerMove(+cellID);
    game.registerMove(+cellID);
    game.changeCurrentPlayer();
    displayPlayerTurn();
  }
};
const loadGame = function() {
  let table = document.getElementById("table");
  table.addEventListener("click",updateTable);
  displayPlayerTurn();
};

const updateClickedCell = function(cell,symbol) {
  cell.innerText = symbol;
};

const displayPlayerTurn = function() {
  let display = document.getElementById("display");//
  let currentPlayerName = game.getCurrPlayer().getName();
  display.innerText = currentPlayerName + "\'s Turn";
};


const getClickedCellId = function(event) {
  return event.target.id;
};

window.onload = loadGame;
