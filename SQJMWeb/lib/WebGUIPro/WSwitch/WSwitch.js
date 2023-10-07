const W_Switch = function () {
    const ControlName = "w-switch";

    class WSwitch extends HTMLElement {

        _init(Element = this) {
            Element.setAttribute("WTriggerSon", "click");
            Element.checked = false;
            const Input = document.createElement("input");
            Input.type = "checkbox";
            Element.appendChild(Input);

            if (Element.getAttribute("name") !== null) {
                Input.name = Element.getAttribute("name");
            }

            if (Element.getAttribute("checked") !== null) {
                Input.checked = true;
                Element.checked = true;
            }

            if (Element.getAttribute("disabled") !== null) {
                Input.disabled = true;
            }

            Input.onclick = () => {
                if (Element.getAttribute("disabled") !== null) {
                    return;
                }
                if (Input.checked) {
                    Element.checked = true;
                    Element.setAttribute("checked", "");
                } else {
                    Element.checked = false;
                    Element.removeAttribute("checked");
                }
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

    const Contro = WSwitch;

    return {
        ControlName,
        Contro,
    }
}
_WebGUIPro_control_core.add(W_Switch);