var page_SQBlog_tag = function () {
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
        $("#SQBlog_tag").setStyle({
            display: "none"
        });
        $("#SQBlog_openCentent_placeholder").$("img")[0].click();
        $("#SQBlog_elesPage").innerHTML = `
        <div class="tag">
            <span>标签</span>
            <div>
            </div>
        </div>
        `;
        const tag = $(".tag", $("#SQBlog_elesPage"))[0].$("div")[0];
        const fragment = document.createDocumentFragment(); // 创建文档片段
        SQBlog_tagData.forItems((e) => {
            const span = document.createElement("span");
            span.setAttribute("tag", "tag");
            span.innerText = e;
            SQBlog_filtrate.tag.forItems((_e) => {
                if (e == _e) {
                    span.classList.add("on")
                }
            });
            fragment.appendChild(span);
        });
        tag.appendChild(fragment);
        $("#SQBlog_elesPage").setStyle({
            display: "block",
            opacity: "1",
            width: "75%",
        });
    }


}