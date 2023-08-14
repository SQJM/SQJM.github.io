
let SQBlog_nowPage; // 当前所在的页

const pagePath = "./page/"; // 页面资源路径

// 主页
$("#SQBlog_navigationBar").$(".home")[0].addEventListener("click", () => {
    includeJsFile(pagePath + "home.js", () => {
        page_SQBlog_home();
        SQBlog_nowPage = "主页";
    }, true);
});

// 分类
$("#SQBlog_navigationBar").$(".classify")[0].addEventListener("click", () => {
    includeJsFile(pagePath + "classify.js", () => {
        page_SQBlog_classify();
        SQBlog_nowPage = "分类";
    }, true);
});

// 标签
$("#SQBlog_navigationBar").$(".tag")[0].addEventListener("click", () => {
    includeJsFile(pagePath + "tag.js", () => {
        page_SQBlog_tag();
        SQBlog_nowPage = "标签";
    }, true);
});

// 归档
// $("#SQBlog_navigationBar").$(".pigeonhole")[0].addEventListener("click", () => {
//     includeJsFile(pagePath + "pigeonhole.js", () => {
//         page_SQBlog_pigeonhole();
//         SQBlog_nowPage = "归档";
//     }, true);
// });

// 友链
$("#SQBlog_navigationBar").$(".friendLink")[0].addEventListener("click", () => {
    includeJsFile(pagePath + "friendLink.js", () => {
        page_SQBlog_friendLink();
        SQBlog_nowPage = "友链";
    }, true);
});

// 关于
$("#SQBlog_navigationBar").$(".about")[0].addEventListener("click", () => {
    includeJsFile(pagePath + "about.js", () => {
        page_SQBlog_about();
        SQBlog_nowPage = "关于";
    }, true);
});

// 文章
$("#SQBlog_ArticleList").addEventListener("click", (e) => {
    const element = e.target;
    if (element.title == "我要看这个文章") {
        includeJsFile(pagePath + "Article.js", () => {
            page_SQBlog_Article(element.getAttribute("aid"));
            SQBlog_nowPage = "文章";
        }, true);
    }
});