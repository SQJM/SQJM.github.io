(function () {
  //网页鼠标点击特效
  var a_idx = 0;
  window.onclick = function (event) {
    var a = new Array("W💖S");
    var heart = document.createElement("b");
    heart.id = "effect_0";
    //创建b元素
    heart.onselectstart = new Function("event.returnValue=false");
    //防止拖动
    document.body.appendChild(heart).innerHTML = a[a_idx];
    //将b元素添加到页面上
    a_idx = (a_idx + 1) % a.length;
    heart.style.cssText = "position: fixed;left:-100%;";
    //给p元素设置样式
    var f = 16,
      // 字体大小
      x = event.clientX - f / 2,
      // 横坐标
      y = event.clientY - f,
      // 纵坐标
      c = randomColor(),
      // 随机颜色
      a = 1,
      // 透明度
      s = 1.2;
    // 放大缩小
    var timer = setInterval(function () {
      //添加定时器
      if (a <= 0) {
        document.body.removeChild(heart);
        clearInterval(timer);
      } else {
        heart.style.cssText =
          "z-index:99;font-size:16px;cursor: default;position: fixed;color:" +
          c +
          ";left:" +
          x +
          "px;top:" +
          y +
          "px;opacity:" +
          a +
          ";transform:scale(" +
          s +
          ");";
        y--;
        a -= 0.016;
        s += 0.002;
      }
    }, 15);
  };
  // 随机颜色
  function randomColor() {
    return (
      "rgba(" +
      ~~(Math.random() * 255) +
      "," +
      ~~(Math.random() * 255) +
      "," +
      ~~(Math.random() * 255) +
      "," +
      180 +
      ")"
    );
  }
})();

(function () {
  if (
    typeof WeixinJSBridge == "object" &&
    typeof WeixinJSBridge.invoke == "function"
  ) {
    handleFontSize();
  } else {
    if (document.addEventListener) {
      document.addEventListener("WeixinJSBridgeReady", handleFontSize, false);
    } else if (document.attachEvent) {
      document.attachEvent("WeixinJSBridgeReady", handleFontSize);
      document.attachEvent("onWeixinJSBridgeReady", handleFontSize);
    }
  }
  function handleFontSize() {
    // 设置网页字体为默认大小
    WeixinJSBridge.invoke("setFontSizeCallback", { fontSize: 0 });
    // 重写设置网页字体大小的事件
    WeixinJSBridge.on("menu:setfont", function () {
      WeixinJSBridge.invoke("setFontSizeCallback", { fontSize: 0 });
    });
  }
})();
function date() {
  let oDate = new Date();
  let y = oDate.getFullYear();
  let M = oDate.getMonth() + 1;
  let day = oDate.getDate();
  let h = oDate.getHours();
  let m = oDate.getMinutes();
  let s = oDate.getSeconds() + 1;
  var d = y + "年" + M + "月" + day + "号" + h + "点" + m + "分" + s + "秒";
  document.getElementById("WorldStudio_Copyright").innerHTML =
    "WorldStudio @ " + y;
  return d;
}
date();
setInterval(() => {
  fromGetBoundingRect_0();
}, 1);
function fromGetBoundingRect_0() {
  var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
  {
    if (scrollY <= 0) {
      document.getElementById("Official_Web_Home_Page_tagBox").style.top =
        -300 + "px";
      document.getElementById("Official_Web_Home_Page_backimg").style.top =
        0 + "px";
      document.getElementById("Official_Web_Home_Page_caihong").style.top =
        -110 + "px";
      document.getElementById("Official_Web_Home_Page_tagBox").style.animation =
        "Official_Web_Home_Page_tagBox_s 1s";
      document.getElementById(
        "Official_Web_Home_Page_caihong"
      ).style.animation = "Official_Web_Home_Page_caihong_s 2s";
      document.getElementById(
        "Official_Web_Home_Page_tagBox"
      ).style.animationFillMode = "";
      return;
    }
    document.getElementById("Official_Web_Home_Page_backimg").style.top =
      -scrollY + "px";
    document.getElementById("Official_Web_Home_Page_tagBox").style.animation =
      "Official_Web_Home_Page_tagBox_ 3s";
    document.getElementById(
      "Official_Web_Home_Page_tagBox"
    ).style.animationFillMode = "forwards";
    document.getElementById("Official_Web_Home_Page_caihong").style.animation =
      "Official_Web_Home_Page_caihong_ 3s";
    document.getElementById(
      "Official_Web_Home_Page_caihong"
    ).style.animationFillMode = "forwards";
  }
}


