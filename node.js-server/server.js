var qs = require('querystring');
 
var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  var body = '';
  req.on('data', function (data) {
    body += data;
    
    // Too much POST data, kill the connection!
    if (body.length > 1e6)
        req.connection.destroy();
  });
  

  req.on('end', function () {
    
	var post = qs.parse(body);
	var splitUrl = req.url.split("/");
	
	if(req.method == "POST"){
		if(splitUrl[2] == "create"){
			createGame(post.id, post.symbol);
		    res.end(req.method + "\n" +
		    req.url + "\n" +
		    JSON.stringify(req.headers, null, 2) + "\n"
		    + JSON.stringify(post, null, 2) + "\n");
		}
	}
	if(req.method == "PUT"){
		if(splitUrl[2] == GAMESTATE.id){
			playAt(post.playat);
			compAI();
			GSjson = GAMESTATE;
		    res.end(req.method + "\n" +
		    req.url + "\n" +
		    JSON.stringify(req.headers, null, 2) + "\n"
		    + JSON.stringify(GSjson, null, 2) + "\n");
		}
	}
	if(req.method == "DELETE"){
		if(splitUrl[2] == GAMESTATE.id){
			deleteGame();
			res.end(req.method + "\n" +
		    req.url + "\n" +
		    JSON.stringify(req.headers, null, 2) + "\n");
		}
	}
	if(req.method == "GET"){
		//I imagine this will eventually be an object or array of games
		//that we can filter by the provided GAMESTATE id
	    GSjson = GAMESTATE;
		res.end(req.method + "\n" +
	    req.url + "\n" +
	    JSON.stringify(req.headers, null, 2) + "\n"
	    + JSON.stringify(GSjson, null, 2) + "\n");
	}
  });
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');

//var GAMESTATE = createGame();
var GAMESTATE = {};

function createGame(new_id, new_symbol){
	var gs = {board:[false,false,false,false,false,false,false,false,false], id:new_id, symbol:new_symbol, turn:0};
	GAMESTATE = gs;
}
function deleteGame(){
	GAMESTATE = {};
}
function playAt(space){
	currSym = currentTurn();
	GAMESTATE.board[space] = currSym;
	if(checkWin()){
		console.log(currSym + " is the winner!");
		deleteGame();
		return
	}
	GAMESTATE.turn += 1;
}
function findGameState(id){
	//for now just returning the only GS
	return GAMESTATE
}
function currentTurn(){
	if(GAMESTATE.turn % 2 == 0){
		return GAMESTATE.symbol
	}
	else{
		if(GAMESTATE.symbol == "X"){
			return "O"
		}
		else{
			return "X"
		}
	}
}
function compAI(){
	while(true){
		var i = Math.floor(Math.random() * 9);
		if(!(GAMESTATE.board[i])){
			playAt(i);
			return
		}
	}
}
function checkWin(){
	//Horizontal Wins
	if((GAMESTATE.board[0] != false) && (GAMESTATE.board[0] == GAMESTATE.board[1]) && (GAMESTATE.board[1] == GAMESTATE.board[2]) && (GAMESTATE.board[0] == "X" || "O")){
		return GAMESTATE.board[0]
	}
	if((GAMESTATE.board[3] != false) && (GAMESTATE.board[3] == GAMESTATE.board[4]) && (GAMESTATE.board[4] == GAMESTATE.board[5]) && (GAMESTATE.board[3] == "X" || "O")){
		return GAMESTATE.board[3]
	}
	if((GAMESTATE.board[6] != false) && (GAMESTATE.board[6] == GAMESTATE.board[7]) && (GAMESTATE.board[7] == GAMESTATE.board[8]) && (GAMESTATE.board[6] == "X" || "O")){
		return GAMESTATE.board[6]
	}

	//Vertical Wins
	if((GAMESTATE.board[0] != false) && (GAMESTATE.board[0] == GAMESTATE.board[3]) && (GAMESTATE.board[3] == GAMESTATE.board[6]) && (GAMESTATE.board[0] == "X" || "O")){
		return GAMESTATE.board[0]
	}	
	if((GAMESTATE.board[1] != false) && (GAMESTATE.board[1] == GAMESTATE.board[4]) && (GAMESTATE.board[4] == GAMESTATE.board[7]) && (GAMESTATE.board[1] == "X" || "O")){
		return GAMESTATE.board[1]
	}
	if((GAMESTATE.board[2] != false) && (GAMESTATE.board[2] == GAMESTATE.board[5]) && (GAMESTATE.board[5] == GAMESTATE.board[8]) && (GAMESTATE.board[2] == "X" || "O")){
		return GAMESTATE.board[2]
	}

	//Diagonal Wins
	if((GAMESTATE.board[0] != false) && (GAMESTATE.board[0] == GAMESTATE.board[4]) && (GAMESTATE.board[4] == GAMESTATE.board[8]) && (GAMESTATE.board[0] == "X" || "O")){
		return GAMESTATE.board[0]
	}
	if((GAMESTATE.board[2] != false) && (GAMESTATE.board[2] == GAMESTATE.board[4]) && (GAMESTATE.board[4] == GAMESTATE.board[6]) && (GAMESTATE.board[2] == "X" || "O")){
		return GAMESTATE.board[2]
	}

	else{
		for(i = 0; i < GAMESTATE.board.length; i++){
			if(!(GAMESTATE.board[i])){
				return false
			}	
		}
		console.log("Cat's Game");
		return
	}
}












