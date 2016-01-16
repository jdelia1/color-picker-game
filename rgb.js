// Core Vars
var num_squares = 6;
var colors;
var pick_color;

// Document Selector Vars
var container = document.querySelector("#container");
var msg_span = document.querySelector("#message");
var squares = document.querySelectorAll(".square");
var h1 = document.querySelector("h1");
var rgb_span = document.querySelector("#rgb");
var restart = document.querySelector("#reset");
var mode_buttons = document.querySelectorAll(".mode");

// Initializer
init();

// Listeners
restart.addEventListener("click", function(){
	restart_game();
});

// Functions
function you_win(color){
	for (var i=0; i<num_squares; i++){
		squares[i].style.background = color;
	}
}

function rand_colors(c){
	var colors = [];
	for (var i=0; i<c; i++){
		var r = Math.floor(Math.random() * 256);
		var g = Math.floor(Math.random() * 256);
		var b = Math.floor(Math.random() * 256);
		var rgb_str = "rgb(" + r + ", " + g + ", " + b + ")";
		colors.push(rgb_str);
	}
	
	return colors;
}

function pick_winning_color(color_arr){
	var index = Math.floor(Math.random() * color_arr.length)
	return color_arr[index];
}

function restart_game(){
	restart.textContent = "New Colors";
	colors = rand_colors(num_squares);
	pick_color = pick_winning_color(colors);
	rgb_span.textContent = pick_color.toUpperCase();
	h1.style.background = "";
	msg_span.textContent = "";

	for (var i=0; i<squares.length; i++){
		if (colors[i]){
			squares[i].style.background = colors[i];
			squares[i].style.display = "block";
		}else{
			squares[i].style.display = "none";
		}
	}
}

function init(){
	// Mode Buttons Listeners
	for (var i=0; i<mode_buttons.length; i++){
		mode_buttons[i].addEventListener("click", function(){
			for (var j=0; j<mode_buttons.length; j++){
				if (j !== i){
					mode_buttons[j].classList.remove("active");
				}
			}
			this.classList.add("active");
			this.textContent === "Easy" ? num_squares = 3 : num_squares = 6;
			
			restart_game();
		});
	}
	
	for (var i=0; i<squares.length; i++){
		squares[i].addEventListener("click", function(){
			var message;
			if (this.style.background === pick_color){
				message = "You Win!";
				you_win(pick_color);
				h1.style.background = pick_color;
				restart.textContent = "Play Again?";
			}else{
				this.style.background = "#232323";
				message = "Try Again";
			}
			msg_span.textContent = message;
		});
	}
	
	restart_game();
}