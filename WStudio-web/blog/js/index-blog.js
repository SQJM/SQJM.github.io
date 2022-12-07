
function noM(){
    document.getElementById('bkT').style.display = "none";
}

function mainMF(imgP, T, D, TE) {
    var temp = "<div id=\"bk\" class=\"mainMbox\"><div class=\"mainMboxA\"><img src=\"" + imgP + "\" style=\"width: 100%;height: 100%;display: block;\"><button class=\"mainMBtn\">前往</button></div><div class=\"mainMboxB\"><p class=\"mainMboxBT\">" + T + "</p><p class=\"mainMboxBD\">" + D + "</p><p class=\"mainMboxBM\">" + TE + "</p></div></div>";

    return temp;
}


function rt() {
    document.getElementById('mainM').remove();
    document.getElementById('mainL').innerHTML += "<div id=\"mainM\" class=\"mainM\"></div>";
}

function a1() { //官方
    noM();
    rt();
    var temp = document.getElementById('mainM');
    var a = "";
    temp.innerHTML += a;
}

function b1() { //C++
    noM();
    rt();
    var temp = document.getElementById('mainM');
    temp.innreHTML = "";
    var a = "";

    temp.innerHTML += a;
}

function b2() { //QT
    noM();
    rt();
    var temp = document.getElementById('mainM');
    temp.innreHTML = "";
    var a ="";

    temp.innerHTML += a;
}


setTimeout(() => {
    var temp = document.getElementById('imgT');
    temp.src = "img/title/imgBj.png";//https://bing.img.run/rand.php
}, 100);



/////////////
a1();

function tagF() {
    var temp = document.getElementById('Tag').innerHTML;
    if (temp == "官方") {
        a1();
    }
    if (temp == "教程") {
        b1();
    }
}

function tagF1() {
    var temp = document.getElementById('Tag').innerHTML;
    if (temp == "官方") {

    }
    if (temp == "教程") {
        b2();
    }
}


//官方
function official() {
    document.getElementById('Tag').innerHTML = "官方";

    document.getElementById('taG1').innerHTML = "全部文章";
    document.getElementById('taG2').innerHTML = "";
a1();
}


//教程
function courseOfStudy() {
    document.getElementById('Tag').innerHTML = "教程";

    document.getElementById('taG1').innerHTML = "C++";
    document.getElementById('taG2').innerHTML = "QT";
a2();
}

//audio
var jsAudio = document.getElementById('jsAudio');
var audioM = document.getElementById('audioM');
var muisN = 0;
var muisL = ["rain.mp3", "Lonely_Together.mp3", "Dancin.mp3", "Discover_Love.mp3"];
setInterval(() => {
    if (!jsAudio.ended) {
        var temp = jsAudio.src;
        var t = temp.split('/');
        var e = t.pop();
        audioM.innerHTML = e;
    }

}, 1);

function model() {
    if (jsAudio.loop) {
        jsAudio.loop = false;

    } else {
        jsAudio.loop = true;
    }
    if (jsAudio.loop) {
        document.getElementById('Amodel').src = "img/icon/循环.png";
    } else {
        document.getElementById('Amodel').src = "img/icon/顺序.png";
    }
}

function audioUp() {
    var i = 0;
    while (i < muisL.length) {
        var temp = jsAudio.src;
        var t = temp.split('/');
        var e = t.pop();
        if (e == muisL[i]) {
            if (muisL[i - 1]) {
                var m = jsAudio.src;
                jsAudio.src = m.replace(muisL[i], muisL[i - 1]);
                jsAudio.load();
                jsAudio.play();
                break;
            } else {
                var m = jsAudio.src;
                jsAudio.src = m.replace(muisL[i], muisL[muisL.length-1]);
                jsAudio.load();
                jsAudio.play();
                break;
            }

        }
        i++;
    }
}

function audioDown() {
    var i = 0;
    while (i < muisL.length) {
        var temp = jsAudio.src;
        var t = temp.split('/');
        var e = t.pop();
        if (e == muisL[i]) {
            if (muisL[i + 1]) {
                var m = jsAudio.src;
                jsAudio.src = m.replace(muisL[i], muisL[i + 1]);
                jsAudio.load();
                jsAudio.play();
                break;
            } else {
                var m = jsAudio.src;
                jsAudio.src = m.replace(muisL[i], muisL[0]);
                jsAudio.load();
                jsAudio.play();
                break;
            }

        }
        i++;
    }
}

function listM(t, e) {
    var a1 = "<dd><button onclick=\"" + t + "\">" + e + "</button></dd>";
    return a1;
}


var audioRLB = false;

function audioRL() {
    if (audioRLB) {
        audioRLB = false;
        document.getElementById('jsAo').style.left = -100 + "%";
        document.getElementById('audioT').style.left = -92 + "px";
        audioM.style.left = -120 + "%";
    } else {
        audioRLB = true;
        document.getElementById('jsAo').style.left = 0 + "%";
        document.getElementById('audioT').style.left = 20 + "px";
        audioM.style.left = 0 + "%";
    }
}
document.getElementById('jsAo').style.left = -100 + "%";
document.getElementById('audioT').style.left = -92 + "px";
audioM.style.left = -120 + "%";