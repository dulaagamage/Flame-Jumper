function startGame() {
  document.getElementById("guide").style.display = "none"; // Hide guide

  if (rw == 0) {
    fid = f();
    rw = setInterval(run, 100);
    rs.play();
    bw = setInterval(b, 100);
    sw = setInterval(score, 100);
    fw = setInterval(move, 100);
  }
}

function key(event) {
  event.preventDefault();

  if (event.which == 13) {
    if (rw == 0) {
      fid = f();
      rw = setInterval(run, 100);
      rs.play();
      bw = setInterval(b, 100);
      sw = setInterval(score, 100);
      fw = setInterval(move, 100);
    }
  }

  if (event.which == 32) {
    if (jw == 0) {
      clearInterval(rw);
      rs.pause();
      rw = -1;
      jw = setInterval(jump, 100);
      js.play();
    }
  }
}

var rs = new Audio("run.mp3");
rs.loop = true;
rs.volume = 1;

var js = new Audio("jump.mp3");
js.volume = 1;

var ds = new Audio("dead.mp3");
ds.volume = 1;

var fid = 0;
var m = 700;

function f() {
  for (var y = 0; y < 10; y++) {
    var i = document.createElement("img");

    i.src = "flame.gif";

    i.className = "i";

    i.style.marginLeft = m + "px";

    m = m + 500;

    i.id = "a" + y;

    document.getElementById("b").appendChild(i);
  }
}

var rw = 0;
var r = 1;

function run() {
  var rimg = document.getElementById("boy");

  r = r + 1;

  if (r == 9) {
    r = 1;
  }

  rimg.src = "Run (" + r + ").png";
}

var bw = 0;
var a = 0;

function b() {
  a = a - 20;

  document.getElementById("b").style.backgroundPositionX = a + "px";
}

var sw = 0;
var u = 0;

function score() {
  u = u + 10;

  document.getElementById("score").innerHTML = u;
}

var fw = 0;

function move() {
  for (var y = 0; y < 10; y++) {
    var d = document.getElementById("a" + y);

    var z = getComputedStyle(d);

    var p = parseInt(z.marginLeft);

    p = p - 20;

    d.style.marginLeft = p + "px";

    // alert(p);

    // 140   70

    // 300

    if ((p <= 130) & (p >= 70)) {
      if (mt >= 300) {
        clearInterval(rw);
        rs.pause();

        clearInterval(jw);
        jw = -1;

        clearInterval(sw);

        clearInterval(bw);

        clearInterval(fw);

        dw = setInterval(dead, 100);
        ds.play();
      }
    }
  }
}

var jw = 0;
var j = 1;
var mt = 360;

function jump() {
  var jimg = document.getElementById("boy");

  if (j <= 6) {
    // 1 - 6 Image
    mt = mt - 30;
  }

  if (j >= 7) {
    // 7 - 12 Image
    mt = mt + 30;
  }

  jimg.style.marginTop = mt + "px";

  j = j + 1;

  if (j == 13) {
    j = 1;

    clearInterval(jw); // Stop Jump
    jw = 0;

    rw = setInterval(run, 100); // Start Run
    rs.play();

    if (fid == 0) {
      fid = f();
    }

    if (fw == 0) {
      fw = setInterval(move, 100);
    }

    if (bw == 0) {
      bw = setInterval(b, 100);
    }

    if (sw == 0) {
      sw = setInterval(score, 100);
    }
  }

  jimg.src = "Jump (" + j + ").png";
}

var dw = 0;
var d = 0;

function dead() {
  var dimg = document.getElementById("boy");

  d = d + 1;

  if (d == 11) {
    d = 10;

    dimg.style.marginTop = "360px";

    document.getElementById("end").style.visibility = "visible";
    document.getElementById("end").style.opacity = "1";
    document.getElementById("endscore").innerHTML = u;
  }

  dimg.src = "Dead (" + d + ").png";
}

function re() {
  location.reload();
}
