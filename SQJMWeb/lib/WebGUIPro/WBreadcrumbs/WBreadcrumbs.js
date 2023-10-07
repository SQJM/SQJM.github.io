const W_Breadcrumbs = function () {
    const {
        $
    } = WebUtilPro();

    const ControlName = "w-breadcrumbs";

    class WBreadcrumbs extends HTMLElement {

        render() {
            if (this.content !== "") {
                this.innerHTML = "";
                const arr = this.content.split(this.unit);
                arr.forEach((e, i) => {
                    const span = document.createElement("span");
                    span.innerText = e;
                    span.setAttribute("index", i);
                    span.className = "w-breadcrumbs-span";
                    const spans = document.createElement("span");
                    spans.innerText = this.unit;
                    spans.className = "w-breadcrumbs-split";
                    this.appendChild(span);
                    if (i < arr.length - 1) {
                        this.appendChild(spans);
                    }
                });
            }
        }

        _init(Element = this) {
            Element.content = "";
            Element.unit = "/";
            Element.callback = () => { };
            if (Element.getAttribute("unit") !== null) {
                Element.unit = Element.getAttribute("unit");
            }
            if (Element.innerText !== "") {
                Element.content = Element.innerText;
                this.render();
            }
            Element.onclick = (event) => {
                const e = event.target;
                if (e.getAttribute("index") !== null) {
                    Element.callback(parseInt(e.getAttribute("index")));
                }
            }
        }

        Content(c = "") {
            if (c !== "") {
                this.render();
            }
            return this.content;
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

    const Contro = WBreadcrumbs;
    return {
        ControlName,
        Contro,
    };
};

_WebGUIPro_control_core.add(W_Breadcrumbs);
