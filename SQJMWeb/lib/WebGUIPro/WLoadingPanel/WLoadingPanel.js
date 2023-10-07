
const WLoadingPanel = function ({
    path = "",
    content = "",
    time = 0,
    EventID = "",
    container = MainWindow
}) {

    const {
        $,
        elementAnEndDel
    } = WebUtilPro();

    const Fragment = document.createDocumentFragment();
    const Back = document.createElement("div");
    const Content = document.createElement("div");

    Back.className = "w-loading-panel-back " + EventID;
    Content.className = "w-loading-panel-content";

    const CloseFn = function (back = Back) {
        let timeId;
        elementAnEndDel(back, {
            timeID: timeId,
            time: 300,
            transition: "all 0.2s",
            opacity: "0"
        });
    }

    if (EventID !== "") {
        $("." + EventID).forEach(e => {
            CloseFn(e);
        });
    }

    if (time !== 0) {
        setTimeout(() => {
            CloseFn();
        }, time);
    }

    if (path.length > 1) {
        const Iframe = document.createElement("iframe");
        Iframe.className = "w-loading-panel-content-iframe";
        Iframe.src = `${path}.htm`;
        Content.appendChild(Iframe);
    } else {
        if (content instanceof HTMLElement) {
            Content.appendChild(content);
        } else {
            Content.innerHTML = content;
        }
    }

    Back.appendChild(Content);
    Fragment.appendChild(Back);
    container.appendChild(Fragment);

    return {
        CloseFn
    }


}