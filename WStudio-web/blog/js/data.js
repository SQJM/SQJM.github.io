
function randomColor() {
  return (
    "rgba(" +
    ~~(Math.round(Math.random() * 255) + 175) +
    "," +
    ~~(Math.round(Math.random() * 255) + 155) +
    "," +
    ~~(Math.round(Math.random() * 255) + 155) +
    "," +
    180 +
    ")"
  );
}
function _BlogGratuito_Button(id, onclick, text) {
  var btn =
    '<button id="' + id + '" onclick="' + onclick + '">' + text + "</button>";
  return btn;
}
function _BlogGratuito_ArticleShow(id,title, date, tag, dataShow, fun, file) {
  var str =
    '\
    <div id="Article_'+id+'">\
      <h1>' +
    title +
    '</h1>\
      <div>\
        <p>'+date+'</p>\
        <span>'+tag+'</span>\
      </div>\
      <p>'+dataShow+'</p>\
      <div><div><div><button onclick=\"'+fun+'\"></button></div></div></div>\
      <div><div><span id="File_'+id+'">'+file+'</span></div></div>\
    </div>\
  ';
  return str;
}
function _BlogGratuito_Article_f(title, date, tag, data,file){
    var str =
      '\
      <div>\
        <h1>' +
      title +
      '</h1>\
        <div>\
          <p>'+date+'</p>\
          <span>'+tag+'</span>\
        </div>\
        <div><div><div><div>'+data+'</div></div></div></div>\
        <div><div><span>'+file+'</span></div></div>\
      </div>\
    ';
    document.getElementById("BlogGratuito_NavigationBarBtnBox").style.display = "none";
    document.getElementById("BlogGratuito_MainBoxL").style.display = "none";
    document.getElementById("BlogGratuito_MainBoxArticle").style.display = "block";
    document.getElementById("BlogGratuito_MainBoxArticle").innerHTML = str;
}
function _Blog_NavigationBarBtn(fun,text){
    return "<button onclick=\""+fun+"\">"+text+"</button>";
}
function Blog_btn_fun() {
  location.reload();
}
function BlogGratuito_HomePage(){
    document.getElementById("BlogGratuito_NavigationBarBtnBox").style.display = "block";
    document.getElementById("BlogGratuito_MainBoxL").style.display = "block";
    document.getElementById("BlogGratuito_MainBoxArticle").innerHTML = "";
    document.getElementById("BlogGratuito_MainBoxArticle").style.display = "none";
}
function _BlogGratuito_File_f(data){
    allArticle();
    for(var i = 0;i < article_num;i++){
        if(document.getElementById("File_"+i+"").innerHTML != data){
            document.getElementById("Article_"+i+"").style.display = "none";
        }
    }
}
function allArticle(){
    for(var i = 0;i < article_num;i++){
        document.getElementById("Article_"+i+"").style.display = "block";
    }
}


var article_num = 1;

function _BlogGratuito_File_0(){_BlogGratuito_File_f("日常");}

function _BlogGratuito_Article_0(){_BlogGratuito_Article_f("Hello BlogGratuito!👋","2023年01月03号 21时05分51秒","<span style=\"background-color: rgb(237,375,308);\">Hello</span><span style=\"background-color: rgb(173,293,180);\">👋</span>","<p><b>📋这是一个完全自由🏃的博客编写📝软件🖥.📋</b></p>\n<img src=\"img/WS.png\" alt=\"WS\" >\n<p>📋📋📋📋📋📋📋🌟🌟🌟🌟📋📋📋📋📋📋📋</p>\n<p>🌟🌟🌟🌟🌉🏷️📋🌎💬🌁🌱💻🌟🌟🌟🌟</p>","日常");}
document.getElementById("BlogGratuito_Title").innerHTML = "hi自由博客";
document.getElementById("BlogGratuito_Log").innerHTML = "自由博客";
document.getElementById("BlogGratuito_TagList").innerHTML = "<span style=\"background-color: rgb(237,375,308);\">Hello</span><span style=\"background-color: rgb(173,293,180);\">👋</span>";
document.getElementById("BlogGratuito_NavigationBarBtnBox").innerHTML += "<button onclick=\"allArticle();\"><b>全部</b></button>"+_Blog_NavigationBarBtn("_BlogGratuito_File_0();","日常")+"";
document.getElementById("BlogGratuito_Motto").innerHTML = "世界皆在脚下.";
document.getElementById("BlogGratuito_Copyright").innerHTML = "WStudio © 2023";
document.getElementById("BlogGratuito_MainBoxL").innerHTML += _BlogGratuito_ArticleShow("0","Hello BlogGratuito!👋","2023年01月03号 21时05分51秒","<span style=\"background-color: rgb(237,375,308);\">Hello</span><span style=\"background-color: rgb(173,293,180);\">👋</span>","📋这是一个完全自由🏃的博客编写📝软件🖥.📋","_BlogGratuito_Article_0();","日常")+"";
