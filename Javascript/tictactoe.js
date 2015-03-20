

function State(){
	this.state = [];
	this.spaces = 9
	
}

State.prototype.newGameState = function(){
	var x;
	for(x = 0; x < this.spaces; x++){
		this.state[x] = false;
	}
}

State.prototype.play = function(space, token){
	this.state[space] = token;
}

State.prototype.printState = function(){
	var prettyboard = [];
	var i;
	for(i=0; i<this.spaces; i++){
		if(this.state[i]){
			prettyboard.push(this.state[i]);
		}
		else{
			prettyboard.push(" ");
		}
	}
	console.log("\n")
	console.log(prettyboard[0] + " | " + prettyboard[1] + " | " + prettyboard[2]);
	console.log('- * - * -');
	console.log(prettyboard[3] + " | " + prettyboard[4] + " | " + prettyboard[5]);
	console.log('- * - * -')
	console.log(prettyboard[6] + " | " + prettyboard[7] + " | " + prettyboard[8]);
}




function Player(token){
	this.token = token;
}

Player.prototype.computerAI = function(current_board){
	while(true){
		var i = Math.floor(Math.random() * 9);
		if(!(current_board[i])){
			return i;
		}
	}
}




function Game(){
	this.board = new State();
	this.board.newGameState();
	this.players = [];
	this.over = false;
	
}
//This is from the python tic tac toe lab
Game.prototype.checkWin = function(){
	//Horizontal Wins
	if((this.board.state[0] != false) && (this.board.state[0] == this.board.state[1]) && (this.board.state[1] == this.board.state[2]) && (this.board.state[0] == "X" || "O")){
		return true
	}
	if((this.board.state[3] != false) && (this.board.state[3] == this.board.state[4]) && (this.board.state[4] == this.board.state[5]) && (this.board.state[3] == "X" || "O")){
		console.log("this one!")
		return true
	}
	if((this.board.state[6] != false) && (this.board.state[6] == this.board.state[7]) && (this.board.state[7] == this.board.state[8]) && (this.board.state[6] == "X" || "O")){
		return true
	}
	
	//Vertical Wins
	if((this.board.state[0] != false) && (this.board.state[0] == this.board.state[3]) && (this.board.state[3] == this.board.state[6]) && (this.board.state[0] == "X" || "O")){
		return true
	}	
	if((this.board.state[1] != false) && (this.board.state[1] == this.board.state[4]) && (this.board.state[4] == this.board.state[7]) && (this.board.state[1] == "X" || "O")){
		return true
	}
	if((this.board.state[2] != false) && (this.board.state[2] == this.board.state[5]) && (this.board.state[5] == this.board.state[8]) && (this.board.state[2] == "X" || "O")){
		return true
	}
	
	//Diagonal Wins
	if((this.board.state[0] != false) && (this.board.state[0] == this.board.state[4]) && (this.board.state[4] == this.board.state[8]) && (this.board.state[0] == "X" || "O")){
		return true
	}
	if((this.board.state[2] != false) && (this.board.state[2] == this.board.state[4]) && (this.board.state[4] == this.board.state[6]) && (this.board.state[2] == "X" || "O")){
		return true
	}
	
	else{
		return false
	}
}

Game.prototype.checkCats = function(){
	for(i = 0; i < this.board.state.length; i++){
		if(!(this.board.state[i])){
			return false
		}	
	}
	console.log("Cat's Game!")
	return true
}



function getInput(question) {
	var stdin = process.stdin, stdout = process.stdout;
 
	stdin.resume();
	game.board.printState();
	stdout.write(question + ": ");
	
 
	stdin.once('data', function(data) {
		data = data.toString().trim();
		data = Number(data);
		
		if(data>=0 && data<=9){
			if(!(game.board.state[data])){
				game.board.play(data, game.players[0].token);
				if(game.checkWin()){
					game.board.printState();
					stdout.write("Player 1 Wins!");
					process.exit();
				}
				if(game.checkCats()){
					process.exit();
				}
				game.board.play(game.players[1].computerAI(game.board.state), game.players[1].token);
				if(game.checkWin()){
					game.board.printState();
					stdout.write("Player 2 Wins!");
					process.exit();
				}
				if(game.checkCats()){
					process.exit();
				}	
				getInput(question);
			}
			else {
				stdout.write("That space has already been played in. Try again.\n");
				getInput(question);
			}
		} 
		else {
			stdout.write("It should be a number between 0 and 9" + "\n");
			getInput(question);
		
		}
		
	});
}



var game = new Game;
var human = new Player("X");
var computer = new Player("O");
game.players.push(human, computer);

getInput("Play Where");



