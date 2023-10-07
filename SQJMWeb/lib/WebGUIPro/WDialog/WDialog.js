const WDialog = function ({
    parentElement = MainWindow,
    title = "",
    path = "",
    content = "",
    btns = [],
    close = true,
    modal = true,
    isMove = false,
    EventID = ""
}) {

    const {
        elementAnEndDel,
        importHTML
    } = WebUtilPro();

    const Fragment = document.createDocumentFragment();
    const Back = document.createElement("div");
    const Box = document.createElement("div");
    const Title = document.createElement("div");
    const TitleText = document.createElement("h4");
    const Content = document.createElement("div");
    const BtnBox = document.createElement("div");

    Title.appendChild(TitleText);
    Box.appendChild(Title);
    Box.appendChild(Content);
    Box.appendChild(BtnBox);

    Back.className = "w-dialog-back " + EventID;
    Box.className = "w-dialog-box";
    Title.className = "w-dialog-title";
    Content.className = "w-dialog-content";
    BtnBox.className = "w-dialog-btn-box";

    TitleText.innerText = title;

    const CloseFn = function (box = Box, back = Back) {
        box.setStyle({
            transition: "all 0.3s",
            scale: "0"
        });
        let timeId;
        elementAnEndDel(back, {
            timeID: timeId,
            time: 300,
            transition: "all 0.3s",
            opacity: "0"
        });
    }

    if (EventID !== "") {
        $("." + EventID).forEach(e => {
            CloseFn(e.$(".w-dialog-box")[0], e);
        });
    }

    if (close) {
        const close = document.createElement("i");
        close.className = "w-dialog-title-close material-icons";
        close.innerHTML = "&#xe5cd";
        close.onclick = () => { CloseFn() };
        Title.appendChild(close);
    }

    if (path.length > 1) {
        importHTML(path,(h)=>{
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

    if (!modal) {
        Back.onclick = (event) => {
            if (event.target.SoleID === Back.SoleID) {
                CloseFn()
            }
        };
    }

    if (isMove) {
        WebUtilPro().addDraggable({
            element: TitleText,
            effectElement: Box,
        });
    }

    btns.forEach(e => {
        const btn = document.createElement("button");
        btn.innerText = e[0];
        btn.onclick = e[1];
        btn.style.float = e[2];
        BtnBox.appendChild(btn);
    });

    Back.appendChild(Box);
    Fragment.appendChild(Back);
    parentElement.appendChild(Fragment);

    return {
        CloseFn
    }
}