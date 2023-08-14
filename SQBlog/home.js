var page_SQBlog_home = function () {
    { // init
        $("#SQBlog_openCentent_placeholder").setVisibility(true);
        $("#SQBlog_closeView").style.display = "block";
        $("#SQBlog_ArticleListBox").setStyle({
            display: "block"
        });
        if (!SQBlog_pageSizeMin) {
            $("#SQBlog_informationBar").setStyle({
                display: "block"
            });
            $("#SQBlog_informationBar").$(">div").forItems((e) => {
                e.setStyle({
                    display: "block"
                });
            });
        }
        $("#SQBlog_selectPage").setVisibility(true);
        $("#SQBlog_closeView").$("img")[0].click();
        $("#SQBlog_elesPage").innerHTML = null;
        $("#SQBlog_elesPage").setStyle({
            display: "none",
            opacity: "0",
            width: "75%",
        });
    }


}