
$( document ).ready(function(){
	var gameOver = false;
	var gameState = [false, false, false, false, false, false, false, false, false];
	
	function checkWin(){
		//Horizontal Wins
		if((gameState[0] != false) && (gameState[0] == gameState[1]) && (gameState[1] == gameState[2]) && (gameState[0] == "X" || "O")){
			return gameState[0]
		}
		if((gameState[3] != false) && (gameState[3] == gameState[4]) && (gameState[4] == gameState[5]) && (gameState[3] == "X" || "O")){
			return gameState[3]
		}
		if((gameState[6] != false) && (gameState[6] == gameState[7]) && (gameState[7] == gameState[8]) && (gameState[6] == "X" || "O")){
			return gameState[6]
		}
	
		//Vertical Wins
		if((gameState[0] != false) && (gameState[0] == gameState[3]) && (gameState[3] == gameState[6]) && (gameState[0] == "X" || "O")){
			return gameState[0]
		}	
		if((gameState[1] != false) && (gameState[1] == gameState[4]) && (gameState[4] == gameState[7]) && (gameState[1] == "X" || "O")){
			return gameState[1]
		}
		if((gameState[2] != false) && (gameState[2] == gameState[5]) && (gameState[5] == gameState[8]) && (gameState[2] == "X" || "O")){
			return gameState[2]
		}
	
		//Diagonal Wins
		if((gameState[0] != false) && (gameState[0] == gameState[4]) && (gameState[4] == gameState[8]) && (gameState[0] == "X" || "O")){
			return gameState[0]
		}
		if((gameState[2] != false) && (gameState[2] == gameState[4]) && (gameState[4] == gameState[6]) && (gameState[2] == "X" || "O")){
			return gameState[2]
		}
	
		else{
			for(i = 0; i < gameState.length; i++){
				if(!(gameState[i])){
					return false
				}	
			}
			gameOver = true;
			alert("Cat's Game!");
			return
		}
	}
	
	function finishTurn(){
		var winner = checkWin();
		if(winner && !(gameOver)){
			gameOver = true;
			alert(winner + " is the winner!");
		}
		
		compMove();
		
		var winner = checkWin();
		if(winner && !(gameOver)){
			gameOver = true;
			alert(winner + " is the winner!");
		}
		return
	}
	
	function compMove(){
		while(!(gameOver)){
			var i = Math.floor(Math.random() * 9);
			if(!(gameState[i])){
				$('#' + i.toString()).html("O");
				gameState[i] = "O";
				return
			}
		}
	}
	
	
	function playMove(space){
		var space_id = parseInt(space.attr('id'));
		if(!(gameState[space_id])){
			$(space).html("X");
			gameState[space_id] = $(space).html();
			finishTurn();
			return	
		}	
	}
	if(!(gameOver)){
		$( "td" ).click(function(){
			playMove($(this));
		})
	}
	
	$( "#reset" ).click(function(){
		gameOver = false;
		gameState = [false, false, false, false, false, false, false, false, false];
		$("td").html("")
	})
	
	
});