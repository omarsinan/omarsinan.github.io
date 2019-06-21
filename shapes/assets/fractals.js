$(document).ready(function() {
    $('<span class="angleLabel"></span>').appendTo('#angleParent');
    $('<span class="lengthLabel"></span>').appendTo('#lengthParent');
});

var angleSlider;
var lenSlider;
var angle;
var len;
var angleText;

function createFractalTreeBranch(leng) {
    if (leng < 10) {
        strokeWeight(1);
        stroke(0, 150, 0);
    } else {
        strokeWeight(2);
        stroke(100, 70, 30);
    }
    line(0, 0, 0, -leng);
    translate(0, -leng);
    if (leng > 3) {
        push();
        rotate(random(angle - 0.008, angle + 0.008));
        createFractalTreeBranch(leng * 0.7);
        pop();
        push();
        rotate(-random(angle - 0.008, angle + 0.008));
        createFractalTreeBranch(leng * 0.7);
        pop();
    }
}

function createFractalTree() {
    strokeWeight(3);
    line(width / 2, height - len, width / 2, height - 2 * len);
    translate(width / 2, height - len);
    createFractalTreeBranch(len);
}

function setup() {
    createCanvas($('.cont').width(), windowHeight);
    angleSlider = createSlider(0, PI, PI / 4, 0.01);
    angleSlider.addClass('angle');
    angleSlider.parent("angleParent");
    angleSlider.input(updateParams);
    lenSlider = createSlider(0, 200, 100, 0.01);
    lenSlider.addClass('length');
    lenSlider.input(updateParams);
    lenSlider.parent("lengthParent");
    frameRate(5);
}

function updateParams() {
    console.log('im here');
    $('.angleLabel').text(angleSlider.value());
    $('.lengthLabel').text(lenSlider.value());
}

function draw() {
    background(255);
    angle = angleSlider.value();
    len = lenSlider.value();
    updateParams();
    createFractalTree(len);
}
