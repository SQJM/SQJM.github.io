const WMessage = function ({
    parentElement = MainWindow,
    path = "",
    content = "",
    time = 2000,
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

    Back.className = "w-message-back " + EventID;
    Content.className = "w-message-content";

    if (_WebUtilPro_isNumber(place)) {
        Back.setAttribute(_WebUtilPro_analysisPlace(), "");
    } else if (_WebUtilPro_isString(place)) {
        Back.setAttribute(place, "");
    }

    const CloseFn = function (back = Back) {
        let timeId;
        elementAnEndDel(back, {
            timeID: timeId,
            time: 200,
            transition: "all 0.2s",
            opacity: "0"
        });
    }

    if (EventID !== "") {
        $("." + EventID).forEach(e => {
            CloseFn(e);
            //e.removePro();
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

    Back.onclick = (event) => {
        if (event.target.SoleID === Back.SoleID) {
            CloseFn()
        }
    }

    Back.appendChild(Content);
    Fragment.appendChild(Back);
    parentElement.appendChild(Fragment);

    setTimeout(() => { CloseFn(); }, time);

    return {
        CloseFn
    }
}