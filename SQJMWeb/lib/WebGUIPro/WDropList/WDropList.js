
const W_Drop_List = function () {

    const {
        $
    } = WebUtilPro();

    const ControlName = "w-drop-list";

    class WDropList extends HTMLElement {

        _init(Element = this) {
            Element.checked = false;

            const Title = Element.$(".w-title")[0];
            const Content = Element.$(".w-list")[0];

            const icon = document.createElement("i");
            {
                icon.className = "w-drop-list-title-icon material-icons";
                icon.innerHTML = "&#xe5ce;";
                if (Element.getAttribute("iconR") !== null) {
                    Title.appendChild(icon);
                } else if (Element.getAttribute("iconL") !== null) {
                    Title.appendChild(icon);
                    Title.insertBefore(icon, Title.firstElementChild);
                }
            }

            if (Element.getAttribute("checked") !== null) {
                Element.checked = true;
            }

            const CloseFn = (is, is1 = true) => {
                if (Element.getAttribute("group") !== null) {
                    $(`[group="${Element.getAttribute("group")}"]`, document).forEach(e => {
                        if (is) {
                            e.$("[select]").forEach(_e => {
                                _e.removeAttribute("select");
                            });
                        }
                        if (e.getAttribute("disabled") !== null) { } else if (e.checked) {
                            if (is1) {
                                e.$(">.w-title")[0].click();
                            }
                        }
                    });
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
                    CloseFn(false, true);
                    Element.checked = true;
                    Element.setAttribute("checked", "");
                }
            }

            Content.onclick = (event) => {
                const Element_ = event.target;
                if (Element.getAttribute("change") !== null) {
                    if (Element_.innerText.trim() !== "") {
                        const span = Title.$("span")[0];
                        const Item = Element_.parentNode.$(".content")[0];
                        if (Element_.classList.contains("content")) {
                            span.innerText = Element_.innerText;
                        } else if (Element_.classList.contains("left")) {
                            span.innerText = Item.innerText;
                        } else if (Element_.classList.contains("right")) {
                            span.innerText = Item.innerText;
                        } else if (Element_.classList.contains("w-item")) {
                            span.innerText = Element_.$(".content")[0].innerText;
                        }
                    }
                }

                if (Element.getAttribute("select") !== null) {
                    CloseFn(true, false);
                    if (Element_.classList.contains("content")) {
                        Element_.parentNode.setAttribute("select", "");
                    } else if (Element_.classList.contains("left")) {
                        Element_.parentNode.setAttribute("select", "");
                    } else if (Element_.classList.contains("right")) {
                        Element_.parentNode.setAttribute("select", "");
                    } else if (Element_.classList.contains("w-item")) {
                        Element_.setAttribute("select", "");
                    }
                }

                if (Element.getAttribute("const") !== null) { } else {
                    Title.click();
                }
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

    const Contro = WDropList;

    return {
        ControlName,
        Contro
    }
}
_WebGUIPro_control_core.add(W_Drop_List);
