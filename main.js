let restartBtn = document.getElementById('restartBtn')
var board;
const aiPlayer = 'O';
const humanPlayer = 'X';
const winCombos = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2]
]

const spaces = document.querySelectorAll('.box');
start();

function start() {
	document.querySelector(".end").style.display = "none";
	board = Array.from(Array(9).keys());
	for (var i = 0; i < spaces.length; i++) {
		spaces[i].innerText = '';
		spaces[i].style.removeProperty('background-color');
		spaces[i].addEventListener('click', turnClick, false);
	}
}

function turnClick(square) {
	if (typeof board[square.target.id] == 'number') {
		turn(square.target.id, humanPlayer)
		if (!checkWin(board, humanPlayer) && !checkTie()) turn(bestSpot(), aiPlayer);
	}
}

function turn(squareId, player) {
	board[squareId] = player;
	document.getElementById(squareId).innerText = player;
	let gameWon = checkWin(board, player)
	if (gameWon) gameOver(gameWon)
}

function checkWin(board, player) {
	let plays = board.reduce((a, e, i) =>
		(e === player) ? a.concat(i) : a, []);
	let gameWon = null;
	for (let [index, win] of winCombos.entries()) {
		if (win.every(elem => plays.indexOf(elem) > -1)) {
			gameWon = {index: index, player: player};
			break;
		}
	}
	return gameWon;
}

function gameOver(gameWon) {
	for (let index of winCombos[gameWon.index]) {
		document.getElementById(index).style.backgroundColor =
			gameWon.player == humanPlayer ? "orange" : "blue";
	}
	for (var i = 0; i < spaces.length; i++) {
		spaces[i].removeEventListener('click', turnClick, false);
	}
	declareWinner(gameWon.player == humanPlayer ? "You win!" : "AI win!");
}

function declareWinner(who) {
	document.querySelector(".end").style.display = "block";
	document.querySelector(".end .text").innerText = who;
}

function emptySquares() {
	return board.filter(s => typeof s == 'number');
}

function bestSpot() {
	return minimax(board, aiPlayer).index;
}

function checkTie() {
	if (emptySquares().length == 0) {
		for (var i = 0; i < spaces.length; i++) {
			spaces[i].style.backgroundColor = "yellow";
			spaces[i].removeEventListener('click', turnClick, false);
		}
		declareWinner("Tie Game!")
		return true;
	}
	return false;
}

function minimax(newBoard, player) {
	var availSpots = emptySquares();

	if (checkWin(newBoard, humanPlayer)) {
		return {score: -10};
	} else if (checkWin(newBoard, aiPlayer)) {
		return {score: 10};
	} else if (availSpots.length === 0) {
		return {score: 0};
	}
	var moves = [];
	for (var i = 0; i < availSpots.length; i++) {
		var move = {};
		move.index = newBoard[availSpots[i]];
		newBoard[availSpots[i]] = player;

		if (player == aiPlayer) {
			var result = minimax(newBoard, humanPlayer);
			move.score = result.score;
		} else {
			var result = minimax(newBoard, aiPlayer);
			move.score = result.score;
		}

		newBoard[availSpots[i]] = move.index;

		moves.push(move);
	}

	var bestMove;
	if(player === aiPlayer) {
		var bestScore = -100;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score > bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	} else {
		var bestScore = 100;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score < bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	}

	return moves[bestMove];
}

restartBtn.addEventListener('click', start)