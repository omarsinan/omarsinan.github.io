var koches = [];
var genSlider;
var angleSlider;
var gen = undefined;
var angle;
function setup() {
    createCanvas($('.cont').width(), windowHeight);
    genSlider = createSlider(0, 5, 0);
    genSlider.input(updateGen);
    genSlider.addClass("gen");
    genSlider.parent('genParent');
    angleSlider = createSlider(-PI, PI, -PI/3, PI/6);
    angleSlider.input(updateAngle);
    angleSlider.parent('angleParent');
    angleSlider.addClass("angle")
    koches.push(new koch(createVector(20, 200), createVector(width - 20, 200)));
    gen = genSlider.value();
    angle = angleSlider.value();
}

function updateGen() {
    gen = genSlider.value();
    koches = [];
    koches.push(new koch(createVector(20, 200), createVector(width - 20, 200)));
    for (var i = 0; i < gen; i++) {
        create();
    }
}

function updateAngle() {
    angle = angleSlider.value();
}

function draw() {
    background(255);
    translate(0, windowHeight / 2);
    // if (gen != genSlider.value()) {
    //     koches = [];
    //     console.log(typeof(gen), typeof(genSlider.value()))
    // }
    updateGen();
    for (var i = 0; i < koches.length; i++) {
         koches[i].show();
    }
    frameRate(10);
}

function create() {
  var next = [];
  for (var i = 0; i < koches.length; i++) {
    var a = koches[i].koch1();
    var b = koches[i].koch2();
    var c = koches[i].koch3();
    var d = koches[i].koch4();
    var e = koches[i].koch5();
    next.push(new koch(a, b));
    next.push(new koch(b, c));
    next.push(new koch(c, d));
    next.push(new koch(d, e));
  }
  koches = next;
}

function koch(a, b) {
    this.s = a.copy();
    this.e = b.copy();

    this.show = function() {
        stroke(0);
        line(this.s.x, this.s.y, this.e.x, this.e.y);
    }

    this.koch1 = function() {
        return this.s.copy();
    }

    this.koch2 = function() {
        var v = p5.Vector.sub(this.e, this.s);
        v.div(3);
        v.add(this.s);
        return v;
    }

    this.koch3 = function() {
        var a = this.s.copy();
        var v = p5.Vector.sub(this.e, this.s);
        v.div(3);
        a.add(v);
        v.rotate(angle);
        a.add(v);
        return a;
    }

    this.koch4 = function() {
        let v = p5.Vector.sub(this.e, this.s);
        v.mult(2/3.0);
        v.add(this.s);
        return v;
    }

    this.koch5 = function() {
        return this.e.copy();
    }
}
