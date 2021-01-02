function loadTexture(path) {
	return new Promise((resolve) => {
		const img = new Image();
		img.src = path;
		img.onload = () => {
			resolve(img);
		};
	});
}

function createEnemies(ctx, canvas, enemyImg) {
	// draw enemies

	const MONSTER_TOTAL = 5;
	const MONSTER_WIDTH = MONSTER_TOTAL * 98;
	const START_X = (canvas.width - MONSTER_WIDTH) / 2;
	const STOP_X = START_X + MONSTER_WIDTH;

	for (let x = START_X; x < STOP_X; x += 98) {
		for (let y = 0; y < 50 * 5; y += 50) {
			ctx.drawImage(enemyImg, x, y);
		}
	}

}

window.onload = async () => {
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');
	// draw black background
	ctx.fillStyle = ("black");
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	// load textures
	const playerImg = await loadTexture("assets/player.png");
	const enemyImg = await loadTexture("assets/enemyShip.png");
	// draw hero
	ctx.drawImage(playerImg, canvas.width / 2 - 45, canvas.height - canvas.height / 4);
	// add enemies to screen
	createEnemies(ctx, canvas, enemyImg);

};

class GameObject {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.dead = false;
		this.type = "";
		this.width = 0;
		this.height = 0;
		this.img = undefined;
	}

	draw(ctx) {
		ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
	}
}

class Hero extends GameObject {
	constructor(x, y) {
		//to add
	}
}

class Enemy extends GameObject {
	constructor(x, y) {
		super(x, y);
		(this.width = 98), (this.height = 50);
		this.type = "Enemy";
		let id = setInterval(() => {
			if (this.y < canvas.height - this.height) {
				this.y += 5;
			} else {
				console.log('Stopped at', this.y)
				clearInterval(id);
			}
		}, 300)
	}
}

let onKeyDown = function(e) {
	console.log(e.keyCode);
	switch(e.keyCode) {
		case 37:
		case 38:
		case 39:
		case 40: //arrowKeys
		case 32:
			e.preventDefault();
			break;
		default:
			break; // don't block other keys
	}
};

window.addEventListener('keydown', onKeyDown);