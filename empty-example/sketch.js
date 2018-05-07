var fft, bass, treble, mid, button, mySound, set_timer, timer, div, p, classname;

window.onload = function() {

    classname = document.getElementsByClassName("start-wav");

    for (var i = 0; i < classname.length; i++) {
        classname[i].addEventListener('click', function() {
        	document.getElementById("device-list").style.display = "none";
        	document.getElementById("info").innerHTML = "Loading Sound...";
            timer = this.dataset.time;
            mySound = loadSound(this.dataset.wav, playwav);
        });
    }
}

function touchStarted() {
  getAudioContext().resume();
}

function secondsTimeSpanToHMS(s) {
    var h = Math.floor(s / 3600); //Get whole hours
    s -= h * 3600;
    var m = Math.floor(s / 60); //Get remaining minutes
    s -= m * 60;
    return (m < 10 ? '0' + m : m) + ":" + (s < 10 ? '0' + s : s); //zero padding on minutes and seconds
}

function playwav() {
    //mySound.play();
    mySound.setVolume(0.1);
    mySound.loop();
    loop();

    time_down = (timer / 1000);
    document.getElementById("timer").style.display = "block";
    document.getElementById("sketch-holder").style.display = "block";
    document.getElementById("info").style.display = "none";
    document.getElementById("timer").innerHTML = secondsTimeSpanToHMS(time_down);

    set_timer = setInterval(function() {
        time_down--;
        console.log(secondsTimeSpanToHMS(time_down));
        document.getElementById("timer").innerHTML = secondsTimeSpanToHMS(time_down);
    }, 1000);

    setTimeout(function() {
        clearInterval(set_timer);
        check();
    }, timer);

}

function preload(m) {
    soundFormats('mp3', 'ogg');
}

function setup() {
    // put setup code here
    var canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('sketch-holder');

    //mySound.play();
    //mySound.loop();
    fft = new p5.FFT();
    frameRate(50);

}

function draw() {
    // put drawing code here

    background(0);
    fft.analyze();
    bass = fft.getEnergy("bass") * 3;
    treble = fft.getEnergy("highMid") * 3;
    mid = fft.getEnergy("mid") * 2.5;
    noFill();

    stroke('#0275d8');
    boom(bass);
    stroke('#5cb85c');
    boom(mid);
    stroke('#FFFFFF');
    boom(treble);
}

function boom(n) {
    p = 0;
    beginShape();
    strokeWeight(2);
    for (var a = 0; a < 5; a++) {
        ellipse(windowWidth / 2, windowHeight / 2, n - p, n - p);
        p = p + 15;
    }
    endShape(CLOSE);
}


function check() {
    document.getElementById("timer").style.display = "none";
    document.getElementById("sketch-holder").style.display = "none";
   	document.getElementById("info").innerHTML = "Select Time Below";
    document.getElementById("info").style.display = "block";
    document.getElementById("device-list").style.display = "block";

    mySound.stop();
    noLoop();
    clear();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
