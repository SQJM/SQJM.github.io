/*!
 * bottomPagePreviewProgress
 * 版本号: 1.0.0
 * 作者: SQJM
 * 创建日期: 2023-07-31
 *
 * MIT
 */

/**
 * 底部页面预览进度
 * @param {HTMLElement} control - 加载动画的容器，默认为 $("#SQBlog_view")
 * @returns {object} - 返回一个对象
 */
const bottomPagePreviewProgress = (control = $("#SQBlog_view")) => {
    const info = {
        name: "bottomPagePreviewProgress",
        version: "1.0.0",
        author: "SQJM",
        date: "2023-07-31",
        permission: "MIT"
    };

    const div = document.createElement("div");
    div.id = "SQBlog_pagePreviewProgress";
    div.setStyle({
        opacity: "0.6",
        position: "fixed",
        zIndex: "998",
        width: "100 ;",
        maxHeight: "5px",
        backgroundColor: "#00ffbf",
        bottom: "0px",
    });

    const pagePreview = new _WebGUIJsPro_ProgressBar(div);
    pagePreview.maxValue = 100;
    $("#MainWindow").addEventListener('scroll', function (event) {
        const scrollPosition = event.target.scrollTop;
        const totalHeight = event.target.scrollHeight - event.target.clientHeight;
        const scrollPercentage = (scrollPosition / totalHeight) * 100;

        pagePreview.setValue(scrollPercentage);
    });

    control.appendChild(div);

    return {
        info
    };
};
