var followMouse = true;

$(document).ready(function() {
    $('.mouse').click(function() {
        if ($('.mouse').attr('data-toggle') == "false") {
            // was false, make true
            followMouse = true;
            $('.mouse').attr('data-toggle', "true");
            $('.mouse').text('Influence by Mouse - YES');
        } else {
            followMouse = false;
            $('.mouse').attr('data-toggle', "false");
            $('.mouse').text('Influence by Mouse - NO');
        }
    });
});

var pos;
var prev;

function setup() {
    createCanvas($('.cont').width(), windowHeight);
    pos = createVector(200, 200)
    prev = pos.copy();

}

var r;
var xMouse;
var yMouse;

function draw() {
    stroke((mouseX / 2 + mouseY / 4) % 255, (mouseX / 4 + mouseY / 2) % 255, (mouseX + mouseY) % 255)
    strokeWeight(2);
    line(pos.x, pos.y, prev.x, prev.y)
    prev.set(pos);
    var step = p5.Vector.random2D();
    step.mult(random(5));
    pos.add(step);

    var R = random(100)
    if (R < 0.5) {
        step.mult(random(25, 200));
    } else {
        step.setMag(5);
    }

    xMouse = map(mouseX, 0, 500, 0, 2)
    yMouse = map(mouseY, 0, 500, 0, 2)

    r = floor(random(2.9));

    console.log(xMouse + ", " + yMouse + ", " + r)

    if (followMouse) {
        if (r < xMouse) {
            pos.x = pos.x + 1;
        } else {
            pos.x = pos.x - 1;

        }
        if (r < yMouse) {
            pos.y = pos.y + 1;
        } else {
            pos.y = pos.y - 1;
        }
    }
}
