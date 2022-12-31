

var n = true;
setInterval(() => {
    if (n) {
        document.getElementById('btn').focus();
    } else {
        document.getElementById('btn1').focus();
    }
}, 10);

function appT(T, M, F,I, n,m) {
    var k = "<div id=\"" + n + "\" class=\"Abo"+m+"\"><p class=\"break\">-</p><p class=\"BT\">" + T + "</p><p class=\"break\">-</p><div class=\"Am\"><input class=\"Aimg\" type=\"image\" src=\""+I+"\"></div><p class=\"TM\">" + M + "</p><button class=\"AboxM\" onclick=\"" + F + "\">前往➠</button></div>";
    return k;
}

var brk = "<p class=\"break\">-</p><p class=\"break\">-</p><p class=\"break\">-</p>";

function btn() {
    n = true;

    if (document.getElementById('appBox')) {
        document.getElementById('appBox').remove();
        document.getElementById('bodyM').innerHTML += "<div id=\"appBox\"><p class=\"break\">-</p><p class=\"break\">-</p><p class=\"break\">-</p></div>";
    }


    var t = document.getElementById('appBox');

    t.innerHTML += brk;

}
btn();

function btn1() {
    n = false;

    if (document.getElementById('appBox')) {
        document.getElementById('appBox').remove();
        document.getElementById('bodyM').innerHTML += "<div id=\"appBox\"><p class=\"break\">-</p><p class=\"break\">-</p><p class=\"break\">-</p></div>";
    }

    var t = document.getElementById('appBox');

    t.innerHTML += brk;
}

//appT("随机抽号", "想不出","b();","./img/1.png","0","xb")