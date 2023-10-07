const W_Import_Widget = function () {
    const {
        importHTML
    } = WebUtilPro();

    const ControlName = "w-import-widget";

    class WImportWidget extends HTMLElement {
        _init(Element = this) {
            if (Element.getAttribute("path") !== null) {
                importHTML(Element.getAttribute("path"), (h) => {
                    const d = document.createElement("div");
                    d.innerHTML = h;
                    const fragment = document.createDocumentFragment();
                    fragment.appendChild(d);
                    Element.innerHTML = "";
                    Element.appendChild(fragment);
                });
            }
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

    const Contro = WImportWidget;
    return {
        ControlName,
        Contro,
    };
};

_WebGUIPro_control_core.add(W_Import_Widget);
