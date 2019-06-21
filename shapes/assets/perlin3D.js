var gridOn = true;
$(document).ready(function() {
    $('.gridToggle').click(function() {
        if ($('.gridToggle').text() == 'Turn Off Grid') {
            // turn off
            gridOn = false;
            $('.gridToggle').text('Turn On Grid');
        } else {
            // turn on
            gridOn = true;
            $('.gridToggle').text('Turn Off Grid');
        }
    });
});

var cols, rows;
var myScale = 25;
var wid = 3000;
var hei = 1000;
var pg;
var flyingCons = 0;
var terrainArr = [];

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  cols = wid / myScale;
  rows = hei / myScale;

  pg = createGraphics(0, 0);

  for (var x = 0; x < cols; x++) {
    terrainArr[x] = [];
    for (var y = 0; y < rows; y++) {
      terrainArr[x][y] = 0;
    }
  }
  texture(pg);

}

function draw() {

  flyingCons -= 0.1;
  var yoff = flyingCons;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      terrainArr[x][y] = map(noise(xoff, yoff), 0, 1, -100, 100);
      xoff += 0.2;
    }
    yoff += 0.2;
  }
  background(31, 141, 186);
  translate(0, 50);
  rotateX(PI / 3);
  fill(86, 176, 0, 150);
  translate(-wid / 2, -hei / 2);
  if (gridOn)
    stroke(6, 100, 100);
  else
    stroke(6, 86, 176, 0);
  strokeWeight(1);
  for (var y = 0; y < rows - 1; y++) {
    beginShape(TRIANGLE_STRIP);
    for (var x = 0; x < cols; x++) {
      vertex(x * myScale, y * myScale, terrainArr[x][y]);
      vertex(x * myScale, (y + 1) * myScale, terrainArr[x][y + 1]);
    }
    endShape();
  }
}
