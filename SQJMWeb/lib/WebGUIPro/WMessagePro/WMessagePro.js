const WMessagePro = function ({
    parentElement = MainWindow,
    path = "",
    content = "",
    time = 10000,
    place = "CC",
    EventID = ""
}) {

    const {
        elementAnEndDel,
        importHTML
    } = WebUtilPro();

    const Fragment = document.createDocumentFragment();
    const Back = document.createElement("div");
    const Content = document.createElement("div");

    Back.className = "w-message-pro-back " + EventID;
    Content.className = "w-message-pro-content";
    Content.id = Content.SoleID;
    let ContentID = Content.id;

    if (_WebUtilPro_isNumber(place)) {
        Back.setAttribute(_WebUtilPro_analysisPlace(), "");
    } else if (_WebUtilPro_isString(place)) {
        Back.setAttribute(place, "");
    }

    const CloseFn = function (content = Content) {
        let timeId;
        elementAnEndDel(content, {
            timeID: timeId,
            time: 200,
            transition: "all 0.2s",
            opacity: "0"
        });
    }

    if (path.length > 1) {
        importHTML(path, (h) => {
            const d = document.createElement("div");
            d.innerHTML = h;
            const fragment = document.createDocumentFragment();
            fragment.appendChild(d);
            Content.appendChild(fragment);
        });
    } else {
        if (_WebUtilPro_isHTMLElement(content)) {
            Content.appendChild(content);
        } else {
            Content.innerHTML = content;
        }
    }

    Back.onclick = (event) => { if (event.target.SoleID === Back.SoleID) { CloseFn() } }

    const existingBack = parentElement.$(`.w-message-pro-back.${EventID}`)[0];
    if (existingBack) {
        existingBack.appendChild(Content);
    } else {
        Back.appendChild(Content);
        Fragment.appendChild(Back);
        parentElement.appendChild(Fragment);
    }

    if (time > 0) {
        setTimeout(() => { CloseFn() }, time);
    }

    const setContent = function (content) {
        if (_WebUtilPro_isHTMLElement(content)) {
            Content.appendChild(content);
        } else {
            Content.innerHTML = content;
        }
    }

    // 添加 MutationObserver
    const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList' && Back.childNodes.length <= 0) {
                observer.disconnect();
                Back.removePro();
            }
        }
    });

    observer.observe(Back, { childList: true, subtree: true });

    return {
        CloseFn,
        ContentID,
        setContent
    }
}