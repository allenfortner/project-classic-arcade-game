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
		this.startingX = 202;
		this.startingY = 332 + 55;
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
				if (this.y > 58) {
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
		for (let enemy of allEnemies) {
			if (this.y === enemy.y && (enemy.x + 101/1.5 > this.x && enemy.x < this.x + 101/1.5)) {
				gameReset();
			}
		}
	}
}

let player = new Player();
let enemy1 = new Enemy(-101, 0, 150);
let enemy2 = new Enemy(0, 83, 200);
let enemy3 = new Enemy(101, 166, 300)
let allEnemies = [];
allEnemies.push(enemy1, enemy2, enemy3);

function gameReset() {
	player.x = player.startingX;
	player.y = player.startingY;
	allEnemies.length = 0;
	enemy1 = new Enemy(-101, 0, 150);
	enemy2 = new Enemy(0, 83, 200);
	enemy3 = new Enemy(101, 166, 300)
	allEnemies.push(enemy1, enemy2, enemy3);
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
