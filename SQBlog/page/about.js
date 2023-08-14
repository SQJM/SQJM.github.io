var page_SQBlog_about = function () {
    { // init
        $("#SQBlog_openCentent_placeholder").setVisibility(false);
        $("#SQBlog_closeView").setVisibility(false);
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
        <div class="about">
            <span>关于</span>
            <div>
            </div>
        </div>
        `;
        const about = $(".about", $("#SQBlog_elesPage"))[0].$("div")[0];
        about.innerHTML += `<p>${SQBlog_about}</p>`;
        $("#SQBlog_elesPage").setStyle({
            display: "block",
            opacity: "1",
            width: "75%",
        });
    }


}