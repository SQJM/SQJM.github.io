
if (document.readyState != 'complete'){
    document.getElementById("BlogGratuito_Window").innerHTML = "no";
}
window.onload = function(){
    document.getElementById("BlogGratuito_Window").innerHTML = "ok";
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
    function _BlogGratuito_ArticleShow(id,title, date, tag, dataShow, fun, file,idd) {
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
      <var id=uid_"'+idd+'"></var>\
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
    function _goPage(num){}
    function _HomePage(){
        document.getElementById("BlogGratuito_MainBoxL").innerHTML = "";
        _goPage(1);
    }
    function _EndPage(){
        document.getElementById("BlogGratuito_MainBoxL").innerHTML = "";
        _goPage(article_num);
    }
    document.getElementById("BlogGratuito_SearchBox").innerHTML = "<input id=\"BlogGratuito_Search\" type=\"text\" placeholder=\"搜索框\" oninput=\"_BlogGratuito_Search();\">";
    function setBlogGratuito_PageMainBoxArticle_btn(n){
        return '<button><b>[-'+n+'-]</b></button>';
    }
    var Max_A;
    function setBlogGratuito_PageMainBoxArticle(e){
        Max_A = e;
        var t = article_num;
        var i = 1;
        while(true){
            if(t <= e) break;
            t -= e;
            i++;
        }
        for(var j = 0;j < i;){
            j++;
            document.getElementById("BlogGratuito_PageMainBoxArticleNum").innerHTML += setBlogGratuito_PageMainBoxArticle_btn(j);
        }
    }


var article_num = 7;

function _BlogGratuito_File_0(){_BlogGratuito_File_f("日常");}function _BlogGratuito_File_1(){_BlogGratuito_File_f("C++");}

function _BlogGratuito_Article_0(){_BlogGratuito_Article_f("4354","2023年01月04号 12时51分14秒","<span style=\"background-color: rgb(254,374,389);\">34536</span>","3453","日常");}function _BlogGratuito_Article_1(){_BlogGratuito_Article_f("test","2023年01月03号 22时27分31秒","<span style=\"background-color: rgb(254,374,389);\">test</span>","test","日常");}function _BlogGratuito_Article_2(){_BlogGratuito_Article_f("test","2023年01月03号 22时27分26秒","<span style=\"background-color: rgb(254,374,389);\">test</span>","test","日常");}function _BlogGratuito_Article_3(){_BlogGratuito_Article_f("test","2023年01月03号 22时27分19秒","<span style=\"background-color: rgb(254,374,389);\">test</span>","test","日常");}function _BlogGratuito_Article_4(){_BlogGratuito_Article_f("test","2023年01月03号 22时27分13秒","<span style=\"background-color: rgb(254,374,389);\">test</span>","test","日常");}function _BlogGratuito_Article_5(){_BlogGratuito_Article_f("test","2023年01月03号 22时26分59秒","<span style=\"background-color: rgb(254,374,389);\">test</span>","test","日常");}function _BlogGratuito_Article_6(){_BlogGratuito_Article_f("Hello BlogGratuito!👋","2023年01月03号 21时05分51秒","<span style=\"background-color: rgb(254,374,389);\">Hello</span><span style=\"background-color: rgb(309,252,323);\">👋</span>","<p><b>📋这是一个完全自由🏃的博客编写📝软件🖥.📋</b></p>\n<img src=\"img/WS.png\" alt=\"WS\" >\n<p>📋📋📋📋📋📋📋🌟🌟🌟🌟📋📋📋📋📋📋📋</p>\n<p>🌟🌟🌟🌟🌉🏷️📋🌎💬🌁🌱💻🌟🌟🌟🌟</p>","日常");}

setBlogGratuito_PageMainBoxArticle(5);
document.getElementById("BlogGratuito_Title").innerHTML = "hi WStudio";
document.getElementById("BlogGratuito_Log").innerHTML = "WStudioBlog";
document.getElementById("BlogGratuito_TagList").innerHTML = "<span style=\"background-color: rgb(254,374,389);\">34536</span><span style=\"background-color: rgb(309,252,323);\">test</span><span style=\"background-color: rgb(415,294,156);\">Hello</span><span style=\"background-color: rgb(222,282,253);\">👋</span>";
document.getElementById("BlogGratuito_NavigationBarBtnBox").innerHTML += "<button onclick=\"allArticle();\"><b>全部</b></button>"+_Blog_NavigationBarBtn("_BlogGratuito_File_0();","日常")+_Blog_NavigationBarBtn("_BlogGratuito_File_1();","C++")+"";
document.getElementById("BlogGratuito_Motto").innerHTML = "世界皆在脚下.";
document.getElementById("BlogGratuito_Copyright").innerHTML = "WStudio © 2023";
document.getElementById("BlogGratuito_MainBoxL").innerHTML += _BlogGratuito_ArticleShow("0","4354","2023年01月04号 12时51分14秒","<span style=\"background-color: rgb(254,374,389);\">34536</span>","5345","_BlogGratuito_Article_0();","日常","7")+_BlogGratuito_ArticleShow("1","test","2023年01月03号 22时27分31秒","<span style=\"background-color: rgb(254,374,389);\">test</span>","test","_BlogGratuito_Article_1();","日常","6")+_BlogGratuito_ArticleShow("2","test","2023年01月03号 22时27分26秒","<span style=\"background-color: rgb(254,374,389);\">test</span>","test","_BlogGratuito_Article_2();","日常","5")+_BlogGratuito_ArticleShow("3","test","2023年01月03号 22时27分19秒","<span style=\"background-color: rgb(254,374,389);\">test</span>","test","_BlogGratuito_Article_3();","日常","4")+_BlogGratuito_ArticleShow("4","test","2023年01月03号 22时27分13秒","<span style=\"background-color: rgb(254,374,389);\">test</span>","test","_BlogGratuito_Article_4();","日常","3")+_BlogGratuito_ArticleShow("5","test","2023年01月03号 22时26分59秒","<span style=\"background-color: rgb(254,374,389);\">test</span>","test","_BlogGratuito_Article_5();","日常","2")+_BlogGratuito_ArticleShow("6","Hello BlogGratuito!👋","2023年01月03号 21时05分51秒","<span style=\"background-color: rgb(254,374,389);\">Hello</span><span style=\"background-color: rgb(309,252,323);\">👋</span>","📋这是一个完全自由🏃的博客编写📝软件🖥.📋","_BlogGratuito_Article_6();","日常","1")+"";
function removeA(){for(var i = (Max_A);i < article_num;i++){            var d = document.getElementById("Article_"+i+"");                                             d.parentNode.removeChild(d);}}removeA();}