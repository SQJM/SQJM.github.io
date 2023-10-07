const WDrawer = function ({
    parentElement = MainWindow,
    path = "",
    content = "",
    direction = _WebUtilPro_direction.Top,
    isMove = false,
    EventID = ""
}) {

    const {
        elementAnEndDel,
        importHTML
    } = WebUtilPro();

    const Fragment = document.createDocumentFragment();
    const Back = document.createElement("div");
    const Content = document.createElement("div");

    Back.className = "w-drawer-back " + EventID;
    Content.className = "w-drawer-content";

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

    const limit = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    };

    switch (direction) {
        case _WebUtilPro_direction.Top:
            {
                limit.bottom = void 0;
                Content.setAttribute("height", "");
            }
            break;
        case _WebUtilPro_direction.Bottom:
            {
                limit.top = void 0;
                Back.style.alignItems = "flex-end";
                Content.setAttribute("height", "");
            }
            break;
        case _WebUtilPro_direction.Left:
            {
                limit.right = void 0;
                Back.style.alignItems = "normal";
                Back.style.justifyContent = "flex-start";
                Content.setAttribute("width", "");
            }
            break;
        case _WebUtilPro_direction.Right:
            {
                limit.left = void 0;
                Back.style.alignItems = "normal";
                Back.style.justifyContent = "flex-end";
                Content.setAttribute("width", "");
            }
            break;
    }

    if (isMove) {
        WebUtilPro().addDraggable({
            element: Content,
            effectElement: Content,
            limit: limit
        });
    }

    Back.onclick = (event) => {
        if (event.target.SoleID === Back.SoleID) {
            CloseFn()
        }
    }

    Back.appendChild(Content);
    Fragment.appendChild(Back);
    parentElement.appendChild(Fragment);

    return {
        CloseFn
    }
}