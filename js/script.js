const canvas = document.querySelector('#game');
const ctx = canvas.getContext('2d');

const ground = new Image();
ground.src = "img/snake_area.jpg";

const foodImg = new Image();
foodImg.src = "img/food.png";

const text = document.querySelector('p');


let box = 32;

let score = 0;

const body = document.querySelector('body');

let sound = new Audio('img/song.mp3');


let food = {
	x: Math.floor(Math.random() * 16 + 1) * box,
	y: Math.floor(Math.random() * 16 + 3) * box,
};

let snake = [];
snake[0] = {
	x: 8 * box,
	y: 10 * box
}

document.addEventListener('keydown', direction);

let dir;

function direction(event){
	if((event.keyCode == 65 || event.keyCode == 37) && dir != 'right'){
		dir = 'left';
	} else if((event.keyCode == 87 || event.keyCode == 38) && dir != 'down'){
		dir = 'up';
	}else if((event.keyCode == 68 || event.keyCode == 39) && dir != 'left'){
		dir = 'right';
	}else if((event.keyCode == 83 || event.keyCode == 40) && dir != 'up'){
		dir = 'down';
	}
}


function draw_game(){
	ctx.drawImage(ground, 0, 0);

	ctx.drawImage(foodImg, food.x, food.y);

	for (let i = 0; i < snake.length; i++){
		ctx.fillStyle= i == 0 	? 'orange' : "#444"	;
		ctx.fillRect(snake[i].x, snake[i].y, box, box);
	}

	ctx.fillStyle = "#eee";
	ctx.font = "50px Arial";
	ctx.fillText(score, box * 2.5, box * 1.5)

	let snakeX = snake[0].x;
	let snakeY = snake[0].y;

	if(snakeX == food.x && snakeY == food.y){
		score += 1;
		food = {
			x: Math.floor(Math.random() * 16 + 1) * box,
			y: Math.floor(Math.random() * 16 + 3) * box,
		};

	} else{
		snake.pop();
	}

	if(snakeX < box || snakeX > box * 16
		|| snakeY < 3 * box || snakeY > box * 18){
		clearInterval(game);
		console.log('проиграл')
		body.style.backgroundImage = 'url("img/photo_2022-11-13_01-41-47.jpg")';
		body.style.backgroundPosition = '-100px -120px';
		body.style.backgroundRepeat = 'no-repeat';
		body.style.backgroundSize = '2000px 1000px';
		canvas.style.display = 'none';
		sound.play();
		text.style.display = 'block';



	}

	if(dir == 'left') snakeX -= box;
	if(dir == 'right') snakeX += box;
	if(dir == 'up') snakeY -= box;
	if(dir == 'down') snakeY += box;

	let newHead = {
		x: snakeX,
		y: snakeY
	};

	eatTail(newHead, snake);

	function eatTail(head, arr) {
		for (let i = 0; i < arr.length; i++){
			if (head.x == arr[i].x && head.y == arr[i].y){
				clearInterval(game);
				console.log('проиграл')
				body.style.backgroundImage = 'url("img/photo_2022-11-13_01-41-47.jpg")';
				body.style.backgroundPosition = '-100px -120px';
				body.style.backgroundRepeat = 'no-repeat';
				body.style.backgroundSize = '2000px 1000px';
				canvas.style.display = 'none';
				sound.play();
				text.style.display = 'block';
			}
		}
	}

	snake.unshift(newHead);


};

let game = setInterval(draw_game, 100);
