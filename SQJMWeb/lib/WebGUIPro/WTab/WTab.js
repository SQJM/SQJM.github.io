const W_Tab = function () {
    const {
        $,
        getAppointParent
    } = WebUtilPro();
    const ControlName = "w-tab";

    class WTab extends HTMLElement {
        _init(Element = this) {
            const Title = Element.$(".w-tab-title")[0];

            let Index;

            const setContent = function (ele) {
                if (!ele) {
                    return;
                }
                if (Index !== ele.getAttribute("index")) {
                    Index = parseInt(ele.getAttribute("index"));
                    Title.$(">[checked]").forEach(e => {
                        e.removeAttribute("checked");
                    });
                    ele.setAttribute("checked", "");
                    let content;
                    let tab;
                    let targetView;
                    const fragment = document.createDocumentFragment();
                    if (Element.getAttribute("free") !== null) {
                        if (Title.getAttribute("tab") !== null) {
                            tab = Title.getAttribute("tab");
                            if (Element.$(".w-tab-content")[0] &&
                                Element.$(".w-tab-content")[0].getAttribute("tab") === tab) {
                                content = Element.$(".w-tab-content")[0].$(">.w-tab-data")[Index].cloneNode(true);
                            } else {
                                $(".w-tab-content").forEach(e => {
                                    if (e.getAttribute("tab") === tab) {
                                        content = e.$(">.w-tab-data")[Index].cloneNode(true);
                                    }
                                });
                            }
                        }
                        if (ele.getAttribute("tab") !== null) {
                            tab = ele.getAttribute("tab");
                            $(".w-tab-content").forEach(e => {
                                if (e.getAttribute("tab") === tab) {
                                    content = e.$(">.w-tab-data")[Index].cloneNode(true);
                                }
                            });
                        }
                        if (Element.$(".w-tab-view")[0] &&
                            Element.$(".w-tab-view")[0].getAttribute("tab") === tab) {
                            targetView = Element.$(".w-tab-view")[0];
                        } else {
                            $(".w-tab-view").forEach(e => {
                                if (e.getAttribute("tab") === tab) {
                                    targetView = e;
                                }
                            });
                        }
                    } else {
                        content = Element.$(".w-tab-content")[0].$(">.w-tab-data")[Index].cloneNode(true);
                        targetView = Element.$(".w-tab-view")[0];
                    }
                    targetView.innerHTML = "";
                    fragment.appendChild(content);
                    targetView.appendChild(fragment);
                }
            }

            Title.$(">[checked]").forEach(e => {
                if (e.getAttribute("index") !== null) {
                    setContent(e);
                    return;
                }
            });

            Title.onmousedown = (event) => {
                const element = event.target;
                let ele;
                if (element.getAttribute("index") !== null) {
                    ele = element;
                } else {
                    getAppointParent(element, (e) => {
                        if (e.getAttribute("index") !== null) {
                            ele = e;
                            return true;
                        }
                        return false;
                    });
                }
                setContent(ele);
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

    const Contro = WTab;
    return {
        ControlName,
        Contro,
    };
};

_WebGUIPro_control_core.add(W_Tab);
