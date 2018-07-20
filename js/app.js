// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    this.x = x;
	this.y = y + 55;
	this.speed = speed;
	this.boundary = 505;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
	
	//Enemy keeps moving until it hits the boundary, then its position resets and keeps moving
	if (this.x < this.boundary) {
		this.x += (this.speed * dt);
	} else {
		this.x = -101;
	}
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
	constructor() {
		this.sprite = 'images/char-boy.png';
		//Player's X and Y positions when game starts
		this.startingX = 202;
		this.startingY = 332 + 55;
		//Set player position to starting position
		this.x = this.startingX;
		this.y = this.startingY;
	}
	render() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}
	handleInput(input) {
		switch(input) {
			case 'left':
				if (this.x > 0) {
					this.x -= 101;
				}
				break;
			case 'right':
				if (this.x < 404) {
					this.x += 101;
				}
				break;
			case 'up':
				if (this.y === 55) {
					alert("You win!"); //Good job!
					gameReset();
				} else if (this.y > 55) {
					this.y -= 83;
				}
				break;
			case 'down':
				if (this.y < 387) {
					this.y += 83;
				}
				break;
		}
	}
	update() {
		//Player-enemy collision
		for (let enemy of allEnemies) {
			if (this.y === enemy.y && (enemy.x + 101/1.75 > this.x && enemy.x < this.x + 101/1.75)) {
				gameReset();
			}
		}
	}
}

//The following code allows certain enemies (in this case, enemy4) to spawn in a random row each time the game starts
let enemyRows = [0, 83, 166]; //Rows with enemies
let randomRow = enemyRows[Math.floor(Math.random() * enemyRows.length)];

//Initialize player & enemy objects
let player = new Player();
let enemy1 = new Enemy(-101, 0, 425);
let enemy2 = new Enemy(0, 83, 300);
let enemy3 = new Enemy(404, 166, 350)
let enemy4 = new Enemy(202, randomRow, 250);

//Store enemy instances inside allEnemies array
let allEnemies = [];
allEnemies.push(enemy1, enemy2, enemy3, enemy4);

//Reset the game when gameReset is called
function gameReset() {
	//Reset player's position
	player.x = player.startingX;
	player.y = player.startingY;
	//Clear all enemy instances and create new ones
	allEnemies.length = 0;
	enemy1 = new Enemy(-101, 0, 425);
	enemy2 = new Enemy(0, 83, 300);
	enemy3 = new Enemy(404, 166, 350)
	enemy4 = new Enemy(202, randomRow, 250);
	allEnemies.push(enemy1, enemy2, enemy3, enemy4);
}


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
