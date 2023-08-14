var page_SQBlog_pigeonhole = function () {
    { // init
        $("#SQBlog_openCentent_placeholder").setVisibility(false);
        $("#SQBlog_closeView").style.display = "none";
        $("#SQBlog_ArticleListBox").setStyle({
            display: "none"
        });
        $("#SQBlog_informationBar").setStyle({
            display: "block"
        });
        $("#SQBlog_informationBar").$(">div").forItems((e) => {
            e.setStyle({
                display: "block"
            });
        });
        $("#SQBlog_openCentent_placeholder").$("img")[0].click();
        $("#SQBlog_elesPage").innerHTML = `
        <div class="pigeonhole">
            <span>归档</span>
            <div>
            </div>
        </div>
        `;
        $("#SQBlog_elesPage").setStyle({
            display: "block",
            opacity: "1",
            width: "75%",
        });
    }


}