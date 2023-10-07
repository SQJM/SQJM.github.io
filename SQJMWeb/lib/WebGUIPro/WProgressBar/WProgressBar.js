const W_Progress_Bar = function () {
    const {
        $
    } = WebUtilPro();
    const ControlName = "w-progress-bar";

    class WProgressBar extends HTMLElement {
        _init(Element = this) {
            const Bar = document.createElement("div");
            const Slider = document.createElement("span");
            const Input = document.createElement("input");
            const Unit = document.createElement("span");

            Element.value = 50;

            Input.type = "range";

            Bar.id = Element.SoleID + "Bar_range";
            Input.id = Element.SoleID + "Input_range";

            Bar.className = "w-progress-bar-bar";
            Slider.className = "w-progress-bar-bar-slider";
            Unit.className = "w-progress-bar-unit";

            if (Element.getAttribute("width") !== null) {
                Element.style.width = `${Element.getAttribute("width")}px`;
                Element.removeAttribute("width");
            }

            if (Element.getAttribute("value") !== null) {
                Element.value = Element.getAttribute("value");
                Input.value = Element.value;
                Element.removeAttribute("value");
            }

            Bar.appendChild(Slider);
            Element.appendChild(Bar);

            if (Element.getAttribute("pro") !== null) {
                Element.appendChild(Input);
            }

            if (Element.getAttribute("unit") !== null) {
                Unit.innerText = Input.value + (Element.getAttribute("unit") || "%");
                Element.appendChild(Unit);
            }

            Bar.style.width = `${Input.value}%`;

            const fn_1 = function (n1, num) {
                if (n1) {
                    return parseInt(n1);
                } else {
                    return num;
                }
            }

            Input.oninput = () => {
                if (Element.getAttribute("space") !== null) {
                    Input.step = Element.getAttribute("space");
                }

                if (Input.value > fn_1(Element.getAttribute("max"), 100)) {
                    Input.value = fn_1(Element.getAttribute("max"), 100)
                } else if (Input.value < fn_1(Element.getAttribute("min"), 0)) {
                    Input.value = fn_1(Element.getAttribute("min"), 0);
                }

                Element.value = Input.value;
                Bar.style.width = `${Input.value}%`;

                if (Element.getAttribute("unit") !== null) {
                    Unit.innerText = Input.value + (Element.getAttribute("unit") || "%");
                }
            }
        }

        setValue(value) {
            this.value = value;
            if (this.getAttribute("pro") !== null) {
                $("#" + this.SoleID + "Input_range").value = value;
            }
            $("#" + this.SoleID + "Bar_range").style.width = `${value}%`;
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

    const Contro = WProgressBar;
    return {
        ControlName,
        Contro,
    };
};

_WebGUIPro_control_core.add(W_Progress_Bar);
