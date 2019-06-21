let circles = 1500;
let goldenRatio = (Math.sqrt(5) + 1) / 2 + 3;
let goldenAngle = goldenRatio * (33 + Math.PI);


function setup() {
	createCanvas($('.cont').width(), windowHeight);
	rectMode(CENTER);
	noCursor();
}

function draw() {
    background (255);
	let pos = createVector(width >> 1, height >> 1);
	let circle_rad = (windowWidth * .2);
	let spiral = createVector(map(mouseX, 0, width, 0.003, 0.005), map(mouseY, 0, height, 0.003, 0.005));
	for (let i = 0; i <= circles; ++i) {
		let r = spiral.x * i;
		let ratio = i / circles;
		let angle = i * goldenAngle;
		let spiral_rad = ratio * circle_rad;
		let x = pos.x + cos(angle) * spiral_rad;
		let y = pos.y + sin(angle) * spiral_rad;
		fill((r + mouseX / 2) % 255, (r + mouseY / 4) % 255, (r + mouseX / 2 + mouseY / 4) % 255);
		noStroke();
		ellipse(x + 2, y + 2, r + 2);
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}
