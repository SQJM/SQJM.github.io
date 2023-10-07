
const W_Drop_Menu = function () {

    const {
        $
    } = WebUtilPro();

    const ControlName = "w-drop-menu";

    class WDropMenu extends HTMLElement {

        _init(Element = this) {
            Element.checked = false;

            const Title = Element.$(".w-title")[0];
            const Content = Element.$(".w-list")[0];

            const icon = document.createElement("i");
            {
                icon.className = "w-drop-menu-title-icon material-icons";
                icon.innerHTML = "&#xe5ce;";
                if (Element.getAttribute("iconR") !== null) {
                    Title.appendChild(icon);
                } else if (Element.getAttribute("iconL") !== null) {
                    Title.appendChild(icon);
                    Title.insertBefore(icon, Title.firstElementChild);
                }
            }

            Title.onclick = () => {
                if (Element.getAttribute("disabled") !== null) {
                    return;
                }
                if (Element.checked) {
                    icon.innerHTML = "&#xe5ce;";
                    Element.checked = false;
                    Element.removeAttribute("checked");
                } else {
                    icon.innerHTML = "&#xe5cf;";
                    $("w-drop-menu").forEach(e => {
                        if (e.getAttribute("disabled") !== null) { } else if (e.checked) {
                            e.$(">.w-title")[0].click();
                        }
                    });
                    Element.checked = true;
                    Element.setAttribute("checked", "");
                }
            }

            if (Element.getAttribute("checked") !== null) {
                Title.click();
            }

            Content.onclick = (event) => {
                if (Element.getAttribute("change") !== null) {
                    const Element_ = event.target;
                    if (Element_.innerText.trim() !== "") {
                        const span = Title.$("span")[0];
                        if (Element_.classList.contains("content")) {
                            span.innerText = Element_.innerText;
                        } else if (Element_.classList.contains("left")) {
                            span.innerText = Element_.parentNode.$(".content")[0].innerText;
                        } else if (Element_.classList.contains("right")) {
                            span.innerText = Element.parentNode.$(".content")[0].innerText;
                        } else if (Element_.classList.contains("w-item")) {
                            span.innerText = Element_.$(".content")[0].innerText;
                        }
                    }
                }
                Title.click();
            };
        }

        constructor() {
            super();
            this._init();
        }

        connectedCallback() {
            // 元素被添加到文档时调用
            this.setAttribute(WElement, ControlName);
        }

        disconnectedCallback() {
            // 元素从文档中移除时调用
        }

        adoptedCallback() {
            // 元素被移动到新的文档时调用
        }
    }

    const Contro = WDropMenu;

    return {
        ControlName,
        Contro
    }
}
_WebGUIPro_control_core.add(W_Drop_Menu);
