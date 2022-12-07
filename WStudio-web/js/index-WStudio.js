//成员列表

function ers(A, B, C, D) {
  var list_0 =
    '<div id="MeB"><p class="break">-</p><p class="break">-</p><div class="memberBox"><div><p class="break">-</p><img class="memberHeader" style=" position: relative;left: 3px; " src="';
  //img/memberHeadr/1.png
  var list_1 =
    '"><div class="memberData"><div><p style=" position: relative;left: 6px; ">';
  //名字
  var list_2 =
    '</p><hr style="line-height: 0.3em;position: relative;left: 6px;"></div><button style="font-size: 11px;position: relative;left: 6px;" onclick=\""+D+"\">';
  //介绍
  var list_3 =
    '</button></div><p class="break">-</p></div></div><p class="break">-</p><p class="break">-</p></div>';

  var m = list_0 + A + list_1 + B + list_2 + C + list_3;
  return m;
}

function memberList() {
  const temp = document.getElementById("memberList");
  temp.innerHTML += ers("img/memberHeadr/1.png", "WStudio", "全栈工程师");
}
memberList();

/*图片自动切换*/
var imgAmount = 1;
var imgMax = 2; //展示图片数量

setInterval(() => {
  var temp = document.getElementById("imgMain");
  var path = "img/MainShow/" + imgAmount + ".png";
  temp.src = path;
  imgAmount += 1;
  //alert(path);
  if (imgAmount > imgMax) {
    imgAmount = 1;
  }
}, 3 * 1000);

//修改levelBox高
//var levelBoxH = document.getElementById('levelBoxM');

//document.getElementById("levelBox").style.height = levelBoxH.offsetHeight + 10 + "px";
