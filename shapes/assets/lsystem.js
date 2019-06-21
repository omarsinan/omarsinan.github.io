$(document).ready(function() {
    $('#addRule').click(function() {
        var cp = $('.rule:last():lt(1)').clone();
        var ruleNum = cp.find('.ruleNum').text();
        console.log(ruleNum.split(" "));
        var newRuleNum = ruleNum.split(" ")[1];
        newRuleNum = newRuleNum.substring(0, newRuleNum.length - 1);
        newRuleNum = parseInt(newRuleNum) + 1;
        cp.find('.ruleNum').text('Rule ' + newRuleNum + ":");
        cp.appendTo('.rules');
    });
    $(document).on('click', '.delete', function() {
        console.log($('.rules').length);
        if ($('.rules > .rule').length > 1) {
            $(this).parent().remove();
        }
    });
});

var angle;
var axiom;
var sentence;
var len;
var firstTime = true;
var lenMult;

var rules = [];

function printParams() {
    console.log("len:", len);
    console.log("axiom:", axiom);
    console.log("angle:", angle);
    console.log("lenMult:", lenMult);
    console.log("rules:", rules);
}

function updateParams() {
    // fix len
    len = parseFloat($('#lineWidth').val());

    // fix axiom
    axiom = $('#axiom').val();
    sentence = axiom;

    // fix angle
    angle = radians(parseFloat($('#angle').val()));

    // fix length multiplier
    lenMult = parseFloat($('#lenMult').val());

    // clean rules
    rules = [];
    $(".rule").each(function(){
        rules.push({a: $(this).find(".from").val(), b:$(this).find(".to").val()})
    });

    printParams();
}

function generate() {
    if (firstTime) {

        firstTime = false;
        updateParams();
        turtle();
        // return;
    }
    printParams();
  len *= lenMult;
  var nextSentence = "";
  for (var i = 0; i < sentence.length; i++) {
    var current = sentence.charAt(i);
    var found = false;
    for (var j = 0; j < rules.length; j++) {
      if (current == rules[j].a) {
        found = true;
        nextSentence += rules[j].b;
        break;
      }
    }
    if (!found) {
      nextSentence += current;
    }
  }
  sentence = nextSentence;
  // createP(sentence);
  turtle();

}

function turtle() {
  background(51);
  resetMatrix();
  translate(width / 2, height - 200);
  stroke(255, 100);
  for (var i = 0; i < sentence.length; i++) {
    var current = sentence.charAt(i);

    if (current == "F") {
      line(0, 0, 0, -len);
      translate(0, -len);
    } else if (current == "+") {
      rotate(angle);
    } else if (current == "-") {
      rotate(-angle)
    } else if (current == "[") {
      push();
    } else if (current == "]") {
      pop();
    }
  }
}

function setup() {
  createCanvas($(".cont").width(), displayHeight - 190);
  updateParams();
  background(51);
  // createP(axiom);
  // turtle();
  var button = createButton("Generate");
  button.parent("#generate");
  button.mousePressed(generate);
}
