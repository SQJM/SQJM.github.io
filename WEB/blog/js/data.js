
if (document.readyState != 'complete'){
    document.getElementById("BlogGratuito_Window").innerHTML = "加载中...";
    document.getElementById("BlogGratuito_Body").style.display = "none";
}
window.onload = function(){
    document.getElementById("BlogGratuito_Window").innerHTML = "";
    document.getElementById("BlogGratuito_Body").style.display = "block";
}
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
function _BlogGratuito_ArticleShow(id,title, date, tag, dataShow, fun, file,idd,pageId) {
    var str =
            '\
    <div id="Article_'+id+'" class="Page_'+pageId+'">\
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
      <var id="uid_'+idd+'"></var>\
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
    document.getElementById("BlogGratuito_PageMainBoxArticle").style.display = "none";
    document.getElementById("BlogGratuito_SearchBox").style.display = "none";
    document.getElementById("BlogGratuito_MainBoxL").style.display = "none";
    document.getElementById("BlogGratuito_MainBoxArticle").style.display = "block";
    document.getElementById("BlogGratuito_MainBoxArticle").innerHTML = str;
}
var xz_File = "";
function _Blog_NavigationBarBtn(fun,text){
    return "<button onclick=\""+fun+"\">"+text+"</button>";
}
function Blog_btn_fun() {
    location.reload();
}
function BlogGratuito_HomePage(){
    document.getElementById("BlogGratuito_NavigationBarBtnBox").style.display = "block";
    document.getElementById("BlogGratuito_PageMainBoxArticle").style.display = "block";
    document.getElementById("BlogGratuito_SearchBox").style.display = "block";
    document.getElementById("BlogGratuito_MainBoxL").style.display = "block";
    document.getElementById("BlogGratuito_MainBoxArticle").innerHTML = "";
    document.getElementById("BlogGratuito_MainBoxArticle").style.display = "none";
}
function _BlogGratuito_File_f(data){
    allArticle();
    xz_File = data;
    for(var i = 0;i < article_num;i++){
        if(document.getElementById("File_"+i+"").innerHTML != data){
            document.getElementById("Article_"+i+"").style.display = "none";
        }
    }
    _goPage(1);
}
function allArticle(){
    xz_File = "";
    for(var i = 0;i < article_num;i++){
        document.getElementById("Article_"+i+"").style.display = "block";
    }
    _goPage(1);
}
function _BlogGratuito_Search(){
    var data = document.getElementById("BlogGratuito_Search").value;
    if(data == ""){
        allArticle();
        return;
    }
    for(var i = 0;i < article_num;i++){
        var s = document.getElementById("Article_"+i+"").innerHTML;
        if(s.indexOf(data) != -1){
            document.getElementById("Article_"+i+"").style.display = "block";
        }else{
            document.getElementById("Article_"+i+"").style.display = "none";
        }
    }

}
function _goPage(num){
    for(var i = 0;i < article_num;i++){
        if(document.getElementById("Article_"+i+"").className != "Page_" + num){
            document.getElementById("Article_"+i+"").style.display = "none";
        }else{
            document.getElementById("Article_"+i+"").style.display = "block";
            if(xz_File != "" && document.getElementById("File_"+i+"").innerHTML != xz_File){
                document.getElementById("Article_"+i+"").style.display = "none";
            }
        }
    }
}
function BlogGratuito_HomePage_(){
    _goPage(1);
    document.getElementById("BlogGratuito_PageMainBoxArticleNumn").innerHTML = 1;
}
function BlogGratuito_EndPage_(){
    _goPage(BlogGratuito_PageMainBoxArticle__Max);
    document.getElementById("BlogGratuito_PageMainBoxArticleNumn").innerHTML = BlogGratuito_PageMainBoxArticle__Max;
}
function BlogGratuito_UpPage() {
    var t = document.getElementById("BlogGratuito_PageMainBoxArticleNumn").innerHTML;
    t--;
    if(t <= 0){
        return;
    }
    document.getElementById("BlogGratuito_PageMainBoxArticleNumn").innerHTML = t;
    _goPage(t);
}
function BlogGratuito_DownPage() {
    var t = document.getElementById("BlogGratuito_PageMainBoxArticleNumn").innerHTML;
    t++;
    if(t > BlogGratuito_PageMainBoxArticle__Max){
        return;
    }
    document.getElementById("BlogGratuito_PageMainBoxArticleNumn").innerHTML = t;
    _goPage(t);
}
document.getElementById("BlogGratuito_SearchBox").innerHTML = "<input id=\"BlogGratuito_Search\" type=\"text\" placeholder=\"搜索框\" oninput=\"_BlogGratuito_Search();\">";


var article_num = 1;

function _BlogGratuito_File_0(){_BlogGratuito_File_f("日常");}

function _BlogGratuito_Article_0(){_BlogGratuito_Article_f("Hello BlogGratuito!👋","2023年01月06号 19时30分50秒","<span style=\"background-color: rgb(188,240,299);\">Hello</span><span style=\"background-color: rgb(373,342,214);\">👋</span>","<p>📋📋📋📋📋📋📋🌟🌟🌟🌟📋📋📋📋📋📋📋</p>\n<p><b>📋这是一个完全自由🏃的博客编写📝软件🖥.📋</b></p>\n<p>📋📋📋📋📋📋📋🌟🌟🌟🌟📋📋📋📋📋📋📋</p>","日常");}

var BlogGratuito_PageMainBoxArticle__Max = 1;

var page_max_num = 10;
document.getElementById("BlogGratuito_PageMainBoxArticleNum").innerHTML = "<span id=\"BlogGratuito_PageMainBoxArticleNumn\">1</span>/1";
document.getElementById("BlogGratuito_Title").innerHTML = "hi BlogGratuito!";
document.getElementById("BlogGratuito_Log").innerHTML = "<b>BlogGratuito</b>";
document.getElementById("BlogGratuito_TagList").innerHTML = "<p style=\"background-color: rgb(188,240,299);\">Hello</p><p style=\"background-color: rgb(373,342,214);\">👋</p>";
document.getElementById("BlogGratuito_NavigationBarBtnBox").innerHTML += "<button onclick=\"allArticle();\"><b>全部</b></button>"+_Blog_NavigationBarBtn("_BlogGratuito_File_0();","日常")+"";
document.getElementById("BlogGratuito_Motto").innerHTML = "世界.";
document.getElementById("BlogGratuito_Copyright").innerHTML = "BlogGratuito © 2023";
function _addArticle_(){document.getElementById("BlogGratuito_MainBoxL").innerHTML += _BlogGratuito_ArticleShow("0","Hello BlogGratuito!👋","2023年01月06号 19时30分50秒","<span style=\"background-color: rgb(188,240,299);\">Hello</span><span style=\"background-color: rgb(373,342,214);\">👋</span>","📋这是一个完全自由🏃的博客编写📝软件🖥.📋","_BlogGratuito_Article_0();","日常","1",1)+"";}_addArticle_();
_goPage(1);