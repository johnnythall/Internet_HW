
$( document ).ready(function(){
	
	var gameID = 1;
	
	function newGame(){
		gameID = gameID + 1;
	}
	
	$.ajax("http://127.0.0.1:1337/game/create", {method: "POST", data: ("id=" + gameID + "&symbol=X")})
	
	$.ajax(("http://127.0.0.1:1337/game/" + gameID), {dataType: 'json', success:  function(data) {
		console.log(data.board);
		for(var i = 0; i<data.board.length; i++){
			if(data.board[i]){
				$(("#" + i.toString())).html(data.board[i]);
			}
		}
	}});
	
	
	$( "#reset"  ).click(function(){
		newGame();
		$.ajax("http://127.0.0.1:1337/game/create", {method: "POST", data: ("id=" + gameID + "&symbol=X")})
		
		$.ajax(("http://127.0.0.1:1337/game/" + gameID), {dataType: 'json', success:  function(data) {
			console.log(data.board);
			for(var i = 0; i<data.board.length; i++){
				if(data.board[i]){
					$(("#" + i.toString())).html(data.board[i]);
					
				}
				else{
					$(("#" + i.toString())).html("");
				}
			}
		}});
	})
	
	
	$(" td ").click(function(){
		var space = $( this ).attr('id');
		var state = {};
		
		$.ajax(("http://127.0.0.1:1337/game/" + gameID), {method: "PUT", data: ("playat=" + space), dataType: 'json', success:  function(data) {
			console.log(data);
			
		}});
		
		$.ajax(("http://127.0.0.1:1337/game/" + gameID), {dataType: 'json', success:  function(data) {
			console.log(data.board);
			for(var i = 0; i<data.board.length; i++){
				if(data.board[i]){
					$(("#" + i.toString())).html(data.board[i]);
				}
			}
			if(data.won){
				setTimeout(function() {alert(data.won + ' won the game!');},500);
			}
			
		}});	
	})	
});