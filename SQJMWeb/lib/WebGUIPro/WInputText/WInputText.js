const W_Input_Text = function () {
    const ControlName = "w-input-text";

    class WInputText extends HTMLElement {

        _init(Element = this) {
            const Input = document.createElement("input");
            Input.type = "text";

            if (Element.getAttribute("name") !== null) {
                Input.name = Element.getAttribute("name");
            }

            if (Element.getAttribute("disabled") !== null) {
                Input.setAttribute("disabled", "");
            }

            if (Element.getAttribute("value") !== null) {
                Input.value = Element.getAttribute("value");
                Input.setAttribute("WValue", "");
            }

            if (Element.getAttribute("pro") !== null) {
                Element.innerHTML = "";
            } else if (Element.getAttribute("ph") !== null) {
                Input.placeholder = Element.getAttribute("ph");
            }

            Element.appendChild(Input);
            
            if (Element.getAttribute("type") !== null) {
                const type = Element.getAttribute("type");
                Input.type = type;
                if (type === "number") {
                    Element.innerHTML = "";
                    Element.value = void 0;
                    Element.setAttribute("WTriggerSon", "click=1");
                    const remove = document.createElement("i");
                    const add = document.createElement("i");

                    const operation = (m = "++") => {
                        if (Element.getAttribute("disabled") !== null) {
                            return;
                        }
                        remove.classList.remove("no");
                        add.classList.remove("no");
                        if (m == "++") {
                            Input.value++;
                            if (Input.value > parseInt(Element.getAttribute("max"))) {
                                Input.value = Element.getAttribute("max");
                                add.classList.add("no");
                            }
                        } else if (m == "--") {
                            Input.value--;
                            if (Input.value < parseInt(Element.getAttribute("min"))) {
                                Input.value = Element.getAttribute("min");
                                remove.classList.add("no");
                            }
                        }
                        Element.value = Input.value;
                    }

                    Input.oninput = () => {
                        if (Input.value === "") {
                            Element.value = Input.value;
                            return;
                        }
                        if (Input.value < parseInt(Element.getAttribute("min"))) {
                            Input.value = Element.getAttribute("min");
                            remove.classList.add("no");
                        }
                        if (Input.value > parseInt(Element.getAttribute("max"))) {
                            Input.value = Element.getAttribute("max");
                            add.classList.add("no");
                        }
                        Element.value = Input.value;
                    }

                    remove.className = "w-input-text-icon material-icons remove";
                    remove.innerHTML = "&#xe314;";
                    remove.onclick = () => { operation("--") }

                    add.className = "w-input-text-icon material-icons add";
                    add.innerHTML = "&#xe315;";
                    add.onclick = () => { operation() }

                    Element.appendChild(remove);
                    Element.appendChild(Input);
                    Element.appendChild(add);
                } else if (type === "texts") {
                    Element.innerHTML = "";
                    const texts = document.createElement("textarea");
                    if (Element.getAttribute("disabled") !== null) {
                        texts.setAttribute("disabled", "");
                    }
                    Element.appendChild(texts);
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

    const Contro = WInputText;

    return {
        ControlName,
        Contro,
    }
}
_WebGUIPro_control_core.add(W_Input_Text);