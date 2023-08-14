var page_SQBlog_classify = function () {
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
        $("#SQBlog_classify").setStyle({
            display: "none"
        });
        $("#SQBlog_openCentent_placeholder").$("img")[0].click();
        $("#SQBlog_elesPage").innerHTML = `
        <div class="classify">
            <span>分类</span>
            <div>
            </div>
        </div>
        `;
        const classify = $(".classify", $("#SQBlog_elesPage"))[0].$("div")[0];
        const fragment = document.createDocumentFragment(); // 创建文档片段
        SQBlog_classifyData.forItems((e) => {
            const span = document.createElement("span");
            span.setAttribute("tag","classify");
            span.innerText = e;
            if (e == SQBlog_filtrate.classify){
                span.classList.add("on")
            }
            fragment.appendChild(span);
        });
        classify.appendChild(fragment);
        $("#SQBlog_elesPage").setStyle({
            display: "block",
            opacity: "1",
            width: "75%",
        });
    }


}