$(document).ready (function(){
	game = new TicTacToeGame();
	$('.board-square').click(function(){ 
		game.takeTurn(event);
		game.checkForWinnerOrTie(event);
		game.switchPlayers();
	});
});

function Player(letter){
	this.letter = letter;
}

function TicTacToeGame(){

	var playerX = new Player('X');
	var playerY = new Player('O');
	this.turnCount = 0;
	this.players = [playerX, playerY];
	this.currentPlayerIndex = 0;

}

TicTacToeGame.prototype.switchPlayers = function(){
	this.currentPlayerIndex = (this.currentPlayerIndex == 0) ? 1 : 0;
	
}

TicTacToeGame.prototype.getCurrentPlayer = function(){
	return this.players[this.currentPlayerIndex];
}


TicTacToeGame.prototype.takeTurn = function (event) {

	if ($(event.target).html().length != 0){
		$(event.target).css({"background-color":"red"});
		window.setTimeout(function(){
			$(event.target).css({"background-color":"transparent"})
		}, 300);
		
	}else {
		$(event.target).html(this.getCurrentPlayer().letter);
		this.turnCount += 1;

	}
	
		
}



TicTacToeGame.prototype.checkForWinnerOrTie = function(event){
	var location = $(event.target).attr('id').split("-");
	var xPos = parseInt(location[0]);
	var yPos = parseInt(location[1]);
	var isWinner = (this.checkRow(xPos) || this.checkCol(yPos) || this.checkDiags());
	var isCatsGame = !isWinner && (this.turnCount == 9)
	if (isWinner){
		alert("Player " + this.getCurrentPlayer().letter + " won!");
		this.restart();
	}
	if (isCatsGame){
		alert("No one wins!");
		this.restart();
	}
}

TicTacToeGame.prototype.restart = function() {
	for (var x=0;x<=2;x++){
		for (var y=0; y<=2; y++){
			var squareId =  y+ "-" + x.toString();
			$("#"+squareId).empty();
		}
	}
	this.turnCount = 0;
	this.currentPlayerIndex = 0;


}

TicTacToeGame.prototype.checkRow =  function(rowIndex) {

	for (var i=0; i<=2; i++){
		var squareId = rowIndex + "-" + i.toString();

		var letter = $("#"+squareId).html()
		if ((letter == undefined)||(letter != this.getCurrentPlayer().letter)){

			return false;
		}
	}

	return true;

}

TicTacToeGame.prototype.checkCol = function(colIndex){

	for (var i=0; i<=2; i++){
		var squareId =  i.toString() + "-" + colIndex;
		var letter = $("#"+squareId).html()
		
		if ((letter == undefined)||(letter != this.getCurrentPlayer().letter)){
			return false;
		}
		
	}
	return true;

}

TicTacToeGame.prototype.checkDiags = function(){
	
	var firstDiagHasWinner = true;
	var secondDiagHasWinner = true;

	//top left to bottom right diagonal
	for (var i=0; i<=2; i++){
		var squareId =  i.toString() + "-" + i.toString();
		var letter = $("#"+squareId).html();
		if ((letter == undefined)||(letter != this.getCurrentPlayer().letter)){
			firstDiagHasWinner = false;
		}	
	}



	//top right to bottom left diagonal
	for (var i=0; i<=2; i++){
		var squareId =  i.toString() + "-" + (2-i).toString();
		var letter = $("#"+squareId).html()
		console.log(squareId)
		if ((letter == undefined)||(letter != this.getCurrentPlayer().letter)){
			secondDiagHasWinner = false;
		}
		
	}

	return (firstDiagHasWinner || secondDiagHasWinner)
}



