//document.cookie = "homepage = ";
function setCookie(name, value) {
    var exp = new Date();
    exp.setTime(exp.getTime() + 1 * 60 * 60 * 1000); //有效期
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

if (document.getElementById('cssload_box')) {
    document.getElementById('bodyMain').style.display = "none";
    document.getElementById('footerN').style.display = "none";

    setTimeout(() => {
        document.getElementById('cssload_box').style.display = "none";
        document.getElementById('bodyMain').style.display = "block";
        document.getElementById('footerN').style.display = "block";

    }, 0);
}

/*版权信息*/
function Copyright() {
    var x = document.getElementById("Copyright");
    x.innerHTML = "WStudio © 2022";
}
Copyright();

//官网
var WS_Web = "https://worldstudio-com.github.io/worldstudio.github.io/";//http://192.168.0.105:5500/WStudio-web/index-WStudio.html
//使用条款
var WS_use = "WStudio-web/termsForUsage.html";
//关于我们
var WS_Us = "";
//qq群
var WS_QQ = "https://jq.qq.com/?_wv=1027&k=z4n6aad1";

/*设置*/

function setFooterBox(addqq, addDesktop, addThis) {

    //底部
    function dl_friend() {
        const dl_Friend = document.getElementById('dl_friend');
        dl_Friend.innerHTML += "<dd><button onclick=\" window.location.href = " + WS_Web + " \">WStudio</button></dd>";
    }

    function dl_help() {
        const dl_Help = document.getElementById('dl_help');
        dl_Help.innerHTML += "<dd><button onclick=\" window.location.href =  \">使用条款</button></dd>";
        dl_Help.innerHTML += "<dd><button onclick=\" window.location.href =  \">关于我们</button></dd>";
    }


    function div_footerTagBox() {
        var g = "<span style=\" font-size: 10px; \">║</span>";
        const div_footerTagBox = document.getElementById('footerTagBox');
        var b = "<span><button class=\" footerTag \"";

        div_footerTagBox.innerHTML += b + "onclick=\"goWS();\">官网</button></span>" + g +
            b + "onclick=\"" + addqq + "\">交流群</button></span>" + g +
            b + "onclick=\"" + addDesktop + "\">添加到桌面</button></span>" + g +
            b + "onclick=\"" + addThis + "\">收藏本站</button></span>";
    }

    dl_friend();
    dl_help();

    div_footerTagBox();
}

/*底部*/
function goWS() { //官网

    if (window.location.pathname == "/WStudio-web/index-WStudio.html") {
        cout("WStudio提示您", "您当前已经在此了.");
    } else {
        window.location.href = WS_Web;
    }

}

function addqq() {
    window.open("https://jq.qq.com/?_wv=1027&k=z4n6aad1");
}

function AddFavorite() { //网站收藏
    var title = "WStudio";
    var url = "https://github.com/WorldStudio-com/worldstudio.github.io.git";
    try {
        window.external.addFavorite(url, title);
    } catch (e) {
        try {
            window.sidebar.addPanel(title, url, "WStudio");
        } catch (e) {
            cout("WStudio提示您", "加入收藏失败，请使用Ctrl+D进行添加或手动添加.");
        }
    }
}

function toDesktop() { //添加桌面
    var sUrl = "https://github.com/WorldStudio-com/worldstudio.github.io.git";
    var sName = "WStudio";
    try {
        var WshShell = new ActiveXObject("WScript.Shell");
        var oUrlLink = WshShell.CreateShortcut(WshShell.SpecialFolders("Desktop") + "\\" + sName + ".url");
        oUrlLink.TargetPath = sUrl;
        oUrlLink.Save();
    } catch (e) {
        cout("WStudio提示您", "添加桌面失败.请您手动添加.");
    }
}


//网站判断设备
function browserRedirect() {
    var sUserAgent = navigator.userAgent.toLowerCase();
    if (/ipad|iphone|midp|rv:1.2.3.4|ucweb|android|windows ce|windows mobile/.test(sUserAgent)) {
        //移动端
        /*设置*/
        setFooterBox("addqq();", "toDesktop();", "AddFavorite();");
        rel = "external nofollow";
    } else {
        //pc端
        /*设置*/
        setFooterBox("addqq();", "toDesktop();", "AddFavorite();");
        rel = "external nofollow";
    }
}
browserRedirect();

/*cout*/
function closeCout() {
    if (document.getElementById('cout')) {
        var Cout = document.getElementById('cout');

        Cout.style.left = 100 + "%";
        setTimeout(() => {
            document.getElementById('coutBj').remove();
            document.getElementById('cout').remove();
            //location.reload();
        }, 750);

    }

    if (document.getElementById('effect_0')) {
        var effect = document.getElementById('effect_0');
        body.removeChild(effect);
    }
}

function cout(title, text) {

    closeCout();

    const temp = document.getElementById('Fcout');


    temp.innerHTML += "<div id=\"cout\" class=\"cout\" style=\"width: 60%;max-width: 520px;\"><p class=\"break\">-</p><div id=\"coutM\"><center><div class=\"coutT\">" + title + "</div><p class=\"break\">-</p><div class=\"coutE\">" + text + "</div><p class=\"break\">-</p><button id=\"coutBtn\" onclick=\"closeCout();\">确定</button></center></div><p class=\"break\">-</p></div>";
    temp.innerHTML += "<div id=\"coutBj\" class=\"coutBj\"><img id=\"coutIMG\" src=\"img/coutBj.png\"></div>";
    var w = document.body.scrollWidth;
    var coutW = document.getElementById('cout').offsetWidth;
    var C_W_ = (w - coutW) / 2;
    var coutA = document.getElementById('cout');
    coutA.style.left = Math.abs(C_W_) + "px";



}

function date() { //获取时间
    let oDate = new Date();
    let y = oDate.getFullYear();
    //获取当前年份
    let M = oDate.getMonth() + 1;
    //获取当前月份，由于获取的是0~11，所以还应该再+1
    let day = oDate.getDate();
    //获取当前日份
    let h = oDate.getHours();
    //获取当前小时
    let m = oDate.getMinutes();
    //获取当前分钟
    let s = oDate.getSeconds() + 1;
    //获取当前秒数
    let week = oDate.getDay() + 1;
    //获取今天星期
    var x = document.getElementById("Date");
    x.innerHTML = "Date time:" + y + "年" + M + "月" + day + "号" + h + "点" + m + "分" + s + "秒";
}
date();
//实时时间获取
setInterval(() => {
    date();
}, 1 * 1000);

/*网站设置*/
var lastTouchEnd = 0;
document.documentElement.addEventListener('touchend', function(event) {
    var now = Date.now();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, {
    passive: false
});

document.body.onselectstart = function() { //禁止文字选中
    return false;
}