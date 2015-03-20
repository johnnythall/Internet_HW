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
		var id = splitUrl[2];
		if(games[id]){
			if(!(games[id].won)){
				playAt(post.playat, id);
			}
			if(!(games[id].won)){
				compAI(id);
			}
			GSjson = games[id];
		    res.end(JSON.stringify(GSjson, null, 2));
		}
	}
	if(req.method == "DELETE"){
		var id = splitUrl[2];
		if(games[id]){
			deleteGame(id);
			res.end(req.method + "\n" +
		    req.url + "\n" +
		    JSON.stringify(req.headers, null, 2) + "\n");
		}
	}
	if(req.method == "GET"){
		var id = splitUrl[2];
	    var GSjson = games[id];
		res.end(JSON.stringify(GSjson, null, 2));
	}
  });
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');

//var GAMESTATE = createGame();
var games = {};
var GAMESTATE = {};

function createGame(new_id, new_symbol){
	var gs = {board:[false,false,false,false,false,false,false,false,false], id:new_id, symbol:new_symbol, turn:0, won:false};
	games[new_id] = gs;
}
function deleteGame(id){
	games[id] = {};
}
function playAt(space, id){
	currSym = currentTurn(id);
	getGAMESTATE(id).board[space] = currSym;
	if(checkWin(id)){
		console.log(currSym + " is the winner!");
		getGAMESTATE(id).won = currSym;
		return
	}
	getGAMESTATE(id).turn += 1;
}
function getGAMESTATE(id){
	var gs = games[id];
	return gs
}
function currentTurn(id){
	var gs = getGAMESTATE(id);
	if(gs.turn % 2 == 0){
		return gs.symbol
	}
	else{
		if(gs.symbol == "X"){
			return "O"
		}
		else{
			return "X"
		}
	}
}
function compAI(id){
	while(true){
		var i = Math.floor(Math.random() * 9);
		if(!(getGAMESTATE(id).board[i])){
			playAt(i, id);
			return
		}
	}
}
function checkWin(id){
	//Horizontal Wins
	if((getGAMESTATE(id).board[0] != false) && (getGAMESTATE(id).board[0] == getGAMESTATE(id).board[1]) && (getGAMESTATE(id).board[1] == getGAMESTATE(id).board[2]) && (getGAMESTATE(id).board[0] == "X" || "O")){
		return getGAMESTATE(id).board[0]
	}
	if((getGAMESTATE(id).board[3] != false) && (getGAMESTATE(id).board[3] == getGAMESTATE(id).board[4]) && (getGAMESTATE(id).board[4] == getGAMESTATE(id).board[5]) && (getGAMESTATE(id).board[3] == "X" || "O")){
		return getGAMESTATE(id).board[3]
	}
	if((getGAMESTATE(id).board[6] != false) && (getGAMESTATE(id).board[6] == getGAMESTATE(id).board[7]) && (getGAMESTATE(id).board[7] == getGAMESTATE(id).board[8]) && (getGAMESTATE(id).board[6] == "X" || "O")){
		return getGAMESTATE(id).board[6]
	}

	//Vertical Wins
	if((getGAMESTATE(id).board[0] != false) && (getGAMESTATE(id).board[0] == getGAMESTATE(id).board[3]) && (getGAMESTATE(id).board[3] == getGAMESTATE(id).board[6]) && (getGAMESTATE(id).board[0] == "X" || "O")){
		return getGAMESTATE(id).board[0]
	}	
	if((getGAMESTATE(id).board[1] != false) && (getGAMESTATE(id).board[1] == getGAMESTATE(id).board[4]) && (getGAMESTATE(id).board[4] == getGAMESTATE(id).board[7]) && (getGAMESTATE(id).board[1] == "X" || "O")){
		return getGAMESTATE(id).board[1]
	}
	if((getGAMESTATE(id).board[2] != false) && (getGAMESTATE(id).board[2] == getGAMESTATE(id).board[5]) && (getGAMESTATE(id).board[5] == getGAMESTATE(id).board[8]) && (getGAMESTATE(id).board[2] == "X" || "O")){
		return getGAMESTATE(id).board[2]
	}

	//Diagonal Wins
	if((getGAMESTATE(id).board[0] != false) && (getGAMESTATE(id).board[0] == getGAMESTATE(id).board[4]) && (getGAMESTATE(id).board[4] == getGAMESTATE(id).board[8]) && (getGAMESTATE(id).board[0] == "X" || "O")){
		return getGAMESTATE(id).board[0]
	}
	if((getGAMESTATE(id).board[2] != false) && (getGAMESTATE(id).board[2] == getGAMESTATE(id).board[4]) && (getGAMESTATE(id).board[4] == getGAMESTATE(id).board[6]) && (getGAMESTATE(id).board[2] == "X" || "O")){
		return getGAMESTATE(id).board[2]
	}

	else{
		for(i = 0; i < getGAMESTATE(id).board.length; i++){
			if(!(getGAMESTATE(id).board[i])){
				return false
			}	
		}
		console.log("Cat's Game");
		return
	}
}












