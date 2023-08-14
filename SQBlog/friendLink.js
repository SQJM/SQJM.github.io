var page_SQBlog_friendLink = function () {
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
        <div class="friendLink">
            <span>友链</span>
            <div>
            </div>
        </div>
        `;
        const friendLink = $(".friendLink", $("#SQBlog_elesPage"))[0].$("div")[0];
        SQBlog_friendLink.forItems((e) => {
            const content = e.split("[=]");
            friendLink.innerHTML += `<span><a href="https://${content[1]}">${content[0]}</a></span>`;
        });
        $("#SQBlog_elesPage").setStyle({
            display: "block",
            opacity: "1",
            width: "75%",
        });
    } 


}