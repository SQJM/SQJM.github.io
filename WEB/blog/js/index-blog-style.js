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
  return d;
}
date();
setInterval(() => {
  document.getElementById("Blog_Date").innerHTML = date();
  fromGetBoundingRect_0();
  fromGetBoundingRect_1();
}, 1);
function fromGetBoundingRect_0() {
  var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
  {
    var th = document.getElementById("Blog_HeadM").offsetHeight;
    if (scrollY > th) {
      if (document.getElementById("Blog_HeadM").style.position == "fixed")
        return;
      document.getElementById("Blog_NavigationBar").style.top = th + 10 + "px";
      document.getElementById("Blog_MainBoxRM").style.top = th + 10 + "px";
      Blog_NavigationBar;
      document.getElementById("Blog_NavigationBar").style.position = "fixed";
      document.getElementById("Blog_NavigationBar").style.width = "70%";
      document.getElementById("Blog_HeadM").style.position = "fixed";
      document.getElementById(
        "BlogGratuito_NavigationBarBtnBox"
      ).style.borderStyle = "solid";
    } else {
      if (document.getElementById("Blog_HeadM").style.position == "") return;
      document.getElementById("Blog_MainBoxRM").style.top = th + 10 + "px";
      document.getElementById(
        "BlogGratuito_NavigationBarBtnBox"
      ).style.borderStyle = "";
      document.getElementById("Blog_NavigationBar").style.width = "100%";
      document.getElementById("Blog_NavigationBar").style.position = "";
      document.getElementById("Blog_HeadM").style.position = "";
    }
  }
}

function fromGetBoundingRect_1() {
  var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
  {
    var th = document.getElementById("Blog_MainBoxRM").offsetHeight;
    var w = document.getElementById("Blog_MainBoxRM").offsetWidth;
    if (scrollY > th - 20) {
      if (document.getElementById("Blog_MainBoxRM").style.position == "fixed")
        return;
      document.getElementById("Blog_MainBoxLM").style.left = -(w / 1.86) + "px";
      document.getElementById("Blog_MainBoxRM").style.right = w / 15 + "px";
      document.getElementById("Blog_MainBoxRM").style.position = "fixed";
    } else {
      if (document.getElementById("Blog_MainBoxRM").style.position == "")
        return;
      document.getElementById("Blog_MainBoxLM").style.left = 0 + "px";
      document.getElementById("Blog_MainBoxRM").style.right = 0 + "px";
      document.getElementById("Blog_MainBoxRM").style.position = "";
    }
  }
}

function go_up() {
  window.location.hash = "#BlogGratuito_Body";
  window.location.hash = "";
}

//网站判断设备
function browserRedirect() {
  var sUserAgent = navigator.userAgent.toLowerCase();
  if (
    /ipad|iphone|midp|rv:1.2.3.4|ucweb|android|windows ce|windows mobile/.test(
      sUserAgent
    )
  ) {
    //移动端
    document.body.style.zoom = 1;
  } else {
    //pc端
    document.body.style.zoom = 1;
  }
}
browserRedirect();
