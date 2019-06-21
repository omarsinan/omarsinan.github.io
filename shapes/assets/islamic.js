$(document).ready(function() {
    $('<span class="sizeLabel"></span>').appendTo('#sizeParent');
    $('<span class="angleLabel"></span>').appendTo('#angleParent');
});

var polys = [];

var angle = 50;
var size = 20;

var sizeSlider;
var angleSlider;

function Polygon() {
  this.vertices = [];
  this.edges = [];

  this.addVertex = function(x, y) {
    var a = createVector(x, y);
    var total = this.vertices.length;
    if (total > 0) {
      var prev = this.vertices[total - 1];
      var edge = new Edge(prev, a);
      this.edges.push(edge);
    }
    this.vertices.push(a);
  }

  this.close = function() {
    var total = this.vertices.length;
    var last = this.vertices[total - 1];
    var first = this.vertices[0];
    var edge = new Edge(last, first);
    this.edges.push(edge);
  }

  this.hankin = function() {
    for (var i = 0; i < this.edges.length; i++) {
      this.edges[i].hankin();
    }

    for (var i = 0; i < this.edges.length; i++) {
      for (var j = 0; j < this.edges.length; j++) {
        if (i !== j) {
          this.edges[i].findEnds(this.edges[j]);
        }
      }
    }
  }

  this.show = function() {
    for (var i = 0; i < this.edges.length; i++) {
      this.edges[i].showLine();
    }
  }
}

function retRan(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let cr = retRan(0, 200);
let cg = retRan(0, 200);
let cb = retRan(0, 200);

function Hankin(a, v) {
  this.a = a;
  this.v = v;
  this.b = p5.Vector.add(a, v);
  this.end;
  this.prevD;

  this.showLine = function() {
    stroke(cr, cg, cb);
    line(this.a.x, this.a.y, this.end.x, this.end.y);
  }

  this.retEnd = function(other) {
    var den = (other.v.y * this.v.x) - (other.v.x * this.v.y);
    if (!den) {
      return;
    }
    var numa = (other.v.x * (this.a.y - other.a.y)) - (other.v.y * (this.a.x - other.a.x));
    var numb = (this.v.x * (this.a.y - other.a.y)) - (this.v.y * (this.a.x - other.a.x));
    var ua = numa / den;
    var ub = numb / den;
    var x = this.a.x + (ua * this.v.x);
    var y = this.a.y + (ua * this.v.y);

    if (ua > 0 && ub > 0) {
      var candidate = createVector(x, y);
      var d1 = p5.Vector.dist(candidate, this.a);
      var d2 = p5.Vector.dist(candidate, other.a);
      var d = d1 + d2;
      var diff = abs(d1 - d2);
      if (diff < 0.001) {
        if (!this.end) {
          this.end = candidate;
          this.prevD = d;
        } else if (d < this.prevD) {
          this.prevD = d;
          this.end = candidate;
        }
      }
    }
  }
}

function Edge(a, b) {
  this.a = a;
  this.b = b;
  this.h1;
  this.h2;

  this.showLine = function() {
    stroke(255, 50);
    this.h1.showLine();
    this.h2.showLine();
  }

  this.hankin = function() {
    var mid = p5.Vector.add(this.a, this.b);
    mid.mult(0.5);

    var v1 = p5.Vector.sub(this.a, mid);
    var v2 = p5.Vector.sub(this.b, mid);
    var offset1 = mid;
    var offset2 = mid;
    if (size > 0) {
      v1.setMag(size);
      v2.setMag(size);
      offset1 = p5.Vector.add(mid, v2);
      offset2 = p5.Vector.add(mid, v1);
    }
    v1.normalize();
    v2.normalize();


    v1.rotate(radians(-angle));
    v2.rotate(radians(angle));

    this.h1 = new Hankin(offset1, v1);
    this.h2 = new Hankin(offset2, v2);

  }

  this.findEnds = function(edge) {
    this.h1.retEnd(edge.h1);
    this.h1.retEnd(edge.h2);
    this.h2.retEnd(edge.h1);
    this.h2.retEnd(edge.h2);
  }


}


function setup() {
  createCanvas($('.cont').width(), windowHeight);
  background(255);
  sizeSlider = createSlider(0, 25, 0);
  sizeSlider.parent('sizeParent');
  angleSlider = createSlider(0, 90, 60);
  angleSlider.parent('angleParent');
  sizeSlider.addClass("size")
  angleSlider.addClass("angle")

  var inc = 100;
  for (var x = 0; x < width; x += inc) {
    for (var y = 0; y < height; y += inc) {
      var poly = new Polygon();
      poly.addVertex(x, y);
      poly.addVertex(x + inc, y);
      poly.addVertex(x + inc, y + inc);
      poly.addVertex(x, y + inc);
      poly.close();
      polys.push(poly);
    }
  }
}

function draw() {
  background(255);
  angle = angleSlider.value();
  size = sizeSlider.value();
  $('.angleLabel').text(angle);
  $('.sizeLabel').text(size);
  for (var i = 0; i < polys.length; i++) {
    polys[i].hankin();
    polys[i].show();
  }
}
