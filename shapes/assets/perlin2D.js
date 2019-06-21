let yoffset = 0.0;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(31, 141, 186);

  fill(86, 176, 0, 150);
  beginShape();

  let xoffset = 0;
  for (let x = 0; x <= width; x += 10) {
    let y = map(noise(xoffset, yoffset), 0, 1, 500, 400);
    vertex(x, y);
    xoffset += 0.05;
  }
  yoffset += 0.01;
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);
}
