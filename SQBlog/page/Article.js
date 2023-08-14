var page_SQBlog_Article = function (ArticleId) {
    { // init
        $("#SQBlog_elesPage").innerHTML = "";
        const t = loadingAnimation_1($("#SQBlog_elesPage"));
        $("#SQBlog_openCentent_placeholder").setVisibility(false);
        $("#SQBlog_closeView").style.display = "none";
        $("#SQBlog_ArticleListBox").setStyle({
            display: "none",
        });
        $("#SQBlog_informationBar").setStyle({
            display: "none",
        });
        $("#SQBlog_selectPage").setVisibility(false);
        $("#SQBlog_openCentent_placeholder").$("img")[0].click();

        // showdown
        const converter = new showdown.Converter();
        const Article = document.createElement("div");

        includeJsFile(`./Article/${ArticleId}/article.js`, () => {
            const htmlText = converter.makeHtml(SQBlogCentralControlSystem_Article.content);

            Article.classList.add("Article");
            const sidebar = document.createElement("div");
            sidebar.classList.add("sidebar");
            sidebar.setVisibility(false);
            const main = document.createElement("div");
            main.classList.add("main");
            const header = document.createElement("div");
            header.classList.add("header");

            header.innerHTML = `
            <h1 class="title">${SQBlogCentralControlSystem_Article.title}</h1>
            <span class="date">${SQBlogCentralControlSystem_Article.date}</span>
            <span class="classify">${SQBlogCentralControlSystem_Article.classify}</span>
            <span class="author">${SQBlogCentralControlSystem_Article.author}</span>
            `;
            const header_tags = document.createElement("div");
            const tags = SQBlogCentralControlSystem_Article.tag.split("[&]");
            tags.forItems((e) => {
                const span = document.createElement("span");
                span.classList.add("tag");
                span.innerText = e;
                header_tags.appendChild(span);
            });
            header.appendChild(header_tags);

            const body = document.createElement("div");
            body.classList.add("body");
            const bottom = document.createElement("div");
            bottom.classList.add("bottom");

            body.innerHTML = htmlText
                + "<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>";

            const copyrights = [
                SQBlogCentralControlSystem_Article.copyright.split("[&]")[0],
                SQBlogCentralControlSystem_Article.copyright.split("[&]")[1]
            ];
            bottom.innerHTML = `
            <b>创建日期:${SQBlogCentralControlSystem_Article.createDate} </b>
            <b>版权协议:<a href="https://${copyrights[1]}">${copyrights[0]}</a></b>
            `;
            const share = document.createElement("button");
            const img = document.createElement("img");
            img.src = "./res/icon/ico/share.svg";
            share.appendChild(img);
            share.onclick = function () {
                // 检查浏览器是否支持 Clipboard API
                if (navigator.clipboard) {
                    const text = `{"aid":"${SQBlogCentralControlSystem_Article.aid}"}`;
                    // 将内容添加到粘贴板
                    navigator.clipboard.writeText(text)
                        .then(() => {
                            new _WebGUIJsPro_DiaLogs({
                                type: "succeed",
                                title: "分享",
                                text: `已成功将文章id添加到粘贴板`,
                            });
                        })
                        .catch(err => {
                            new _WebGUIJsPro_DiaLogs({
                                type: "error",
                                title: "分享",
                                text: `无法添加文章id到粘贴板：${err}`,
                            });
                        });
                } else {
                    new _WebGUIJsPro_DiaLogs({
                        type: "error",
                        title: "分享",
                        text: `浏览器不支持 Clipboard API`,
                    });
                }
            }
            bottom.appendChild(share);

            main.appendChild(header);
            main.appendChild(body);
            main.appendChild(bottom);

            Article.appendChild(sidebar);
            Article.appendChild(main);

        }, true);
        $("#SQBlog_elesPage").setStyle({
            display: "block",
            opacity: "1",
            width: "100%",
        });
        setTimeout(() => {
            t.end();
            $("#SQBlog_elesPage").appendChild(Article);
            $("#SQBlog_navigationBar").style.display = "block";
            setTimeout(() => {
                $("#SQBlog_elesPage").$(".Article")[0].$(".main")[0].$("*").forItems((e) => {
                    e.style.userSelect = "text";
                });
            }, 500);
        }, 2000);
    }


}