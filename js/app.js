// Enemies our player must avoid
var Enemy = function(x, y) {
    this.x = x;
	this.y = y + 55;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
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
		this.startingY = 415 - 25;
		this.x = this.startingX;
		this.y = this.startingY;
	}
	render() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}
	handleInput(input) {
		switch(input) {
			case 'left':
				this.x -= 101;
				break;
			case 'right':
				this.x += 101;
				break;
			case 'up':
				this.y -= 83;
				break;
			case 'down':
				this.y += 83;
				break;
		}
	}
}

const player = new Player();
const enemy1 = new Enemy(0, 0);
const enemy2 = new Enemy(0, 83);
const enemy3 = new Enemy(0, 166)
const allEnemies = [];
allEnemies.push(enemy1, enemy2, enemy3);


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
