var WebGUIJsPro = (function() {
    // 封装一个选择器函数
    const selectorType = {
        "#": "id",
        ".": "class",
        "[": "attr",
    };

    // web安全色
    const webSafeColor = [
        "#FF0000",
        "#00FF00",
        "#0000FF",
        "#FFFF00",
        "#00FFFF",
        "#FF00FF",
        "#C0C0C0",
        "#808080",
        "#000000",
    ];

    NodeList.prototype.forElements = function(callback) {
        for (let i = 0; i < this.length; i++) {
            callback(this[i], i);
        }
    };

    // 封装一个选择器函数
    function $(selector, obj = document) {
        const type = selectorType[selector.charAt(0)];

        if (type === "id") {
            // 如果是 ID 选择器
            return obj.getElementById(selector.substring(1));
        } else if (type === "class") {
            // 如果是 class 选择器
            return obj.querySelectorAll(selector);
        } else if (selector.charAt(0) === "[") {
            // 如果是属性选择器
            selector = selector.substring(1, selector.length - 1); // 去掉中括号
            const [attributeName, attributeValue] = selector.split("=");

            return obj.querySelectorAll(
                `[${attributeName}="${attributeValue.replace(/"/g, "")}"]`
            );
        } else {
            // 默认使用标签名选择器
            return obj.getElementsByTagName(selector);
        }
    }
    // 根据屏幕大小调整字体大小，value 是缩放比例
    function adjustFontSize(value) {
        document.documentElement.style.fontSize =
            document.documentElement.clientWidth / value + "px";
    }

    // 判断元素是否在视图可见
    function isInViewport(element) {
        let rect = element.getBoundingClientRect();

        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <=
            (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // 获取当前时间日期，返回字符串格式
    function getNowFormatDate(separator1 = "-", separator2 = ":") {
        if (!getNowFormatDate.template) {
            // 检查是否已缓存格式化字符串
            getNowFormatDate.template = `YYYY${separator1}MM${separator1}DD HH${separator2}mm${separator2}ss`;
        }

        const date = new Date();
        const year = date.getFullYear();
        const month = ("0" + (date.getMonth() + 1)).slice(-2);
        const day = ("0" + date.getDate()).slice(-2);
        const hour = ("0" + date.getHours()).slice(-2);
        const minute = ("0" + date.getMinutes()).slice(-2);
        const second = ("0" + date.getSeconds()).slice(-2);

        return getNowFormatDate.template
            .replace("YYYY", year)
            .replace("MM", month)
            .replace("DD", day)
            .replace("HH", hour)
            .replace("mm", minute)
            .replace("ss", second);
    }

    // 获取鼠标点击事件的索引
    function getEventIndex(event) {
        if (event.button != null) return event.button;
        else return -1;
    }

    // 获取物理屏幕宽高
    function getPhysicsWH() {
        return [
            screen.availWidth * window.devicePixelRatio,
            screen.availHeight * window.devicePixelRatio,
        ];
    }

    // 获取网页宽高
    function getWebPageWH() {
        return [
            window.document.body.offsetWidth,
            window.document.body.offsetHeight,
        ];
    }

    // 获取屏幕宽高
    function getScreenWH() {
        return [window.screen.width, window.screen.height];
    }

    // 获取元素宽高
    function getElementWH(object) {
        return [object.offsetWidth, object.offsetHeight];
    }

    // 获取元素矩形信息
    function getElementRect(object) {
        return object.getBoundingClientRect();
    }

    // 获取html滚动的偏移量
    function getHtmlScrollOffset() {
        if (window.pageXOffset) {
            return {
                x: window.pageXOffset,
                y: window.pageYOffset,
            };
        } else {
            return {
                x: document.body.scrollLeft + document.documentElement.scrollLeft,
                y: document.body.scrollTop + document.documentElement.scrollTop,
            };
        }
    }

    // 获取元素滚动的偏移量
    function getElementScrollOffset(element) {
        if (element.pageXOffset !== undefined) {
            return {
                x: element.pageXOffset,
                y: element.pageYOffset,
            };
        } else {
            return {
                x: element.scrollLeft,
                y: element.scrollTop,
            };
        }
    }

    // 元素完全居中
    function getCenterOffset(parent, child) {
        return (parent / 2) - (child / 2);
    }

    // 添加手势事件监听函数
    function addGestureListener(element, callback, threshold) {
        var startX, startY, endX, endY;
        element.addEventListener("touchstart", function(e) {
            startX = e.changedTouches[0].pageX;
            startY = e.changedTouches[0].pageY;
        });
        element.addEventListener("touchend", function(e) {
            endX = e.changedTouches[0].pageX;
            endY = e.changedTouches[0].pageY;
            var direction;
            var deltaX = endX - startX;
            var deltaY = endY - startY;
            var distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY); // 计算滑动距离
            if (distance < threshold) return; // 如果滑动距离不足阈值，则认为是无效手势，直接返回
            // 右0
            // 下2
            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                direction = deltaX > 0 ? 0 : 1;
            } else {
                direction = deltaY > 0 ? 2 : 3;
            }
            if (callback instanceof Function) {
                callback(direction);
            }
        });
    }

    // 添加可拖拽功能
    function addDraggable(element, effectElement = element, fn = () => {}, limit = {}) {
        let startX = 0;
        let startY = 0;
        let startTransformX = 0;
        let startTransformY = 0;
        let values = [];
        let timer = null;

        element.addEventListener("mousedown", onPointerDown);
        element.addEventListener("touchstart", onPointerDown);

        function onPointerDown(event) {
            event.preventDefault();

            startX = event.clientX || (event.touches && event.touches.length > 0 && event.touches[0].clientX) || 0;
            startY = event.clientY || (event.touches && event.touches.length > 0 && event.touches[0].clientY) || 0;

            const transform = getTransformXY();
            startTransformX = transform.x;
            startTransformY = transform.y;

            document.addEventListener("mousemove", onPointerMove);
            document.addEventListener("touchmove", onPointerMove);
            document.addEventListener("mouseup", onPointerUp);
            document.addEventListener("touchend", onPointerUp);

            timer = setTimeout(() => {
                fn("onMove");
                timer = null;
            }, 300);
        }

        function onPointerMove(event) {
            const offsetX = (event.clientX || event.touches[0].clientX) - startX;
            const offsetY = (event.clientY || event.touches[0].clientY) - startY;

            if (timer !== null) {
                // 判断是否移动超过阈值
                if (Math.abs(offsetX) > 10 || Math.abs(offsetY) > 10) {
                    clearTimeout(timer);
                    timer = null;
                    fn("onMove");
                }
            } else {
                setTransformXY(startTransformX + offsetX, startTransformY + offsetY);
            }
        }

        function onPointerUp() {
            document.removeEventListener("mousemove", onPointerMove);
            document.removeEventListener("touchmove", onPointerMove);
            document.removeEventListener("mouseup", onPointerUp);
            document.removeEventListener("touchend", onPointerUp);

            if (timer !== null) {
                clearTimeout(timer);
                timer = null;
                fn("onClick");
            } else {
                fn("endMove");
            }
        }

        function getTransformXY() {
            let transform;
            if (effectElement != element) {
                transform = window
                    .getComputedStyle(effectElement)
                    .getPropertyValue("transform");
            } else {
                transform = window
                    .getComputedStyle(element)
                    .getPropertyValue("transform");
            }
            const matrix = transform.match(/^matrix\((.+)\)$/);

            if (!matrix) {
                return {
                    x: 0,
                    y: 0,
                };
            }

            if (values.length === 0 || values.join("") !== matrix[1]) {
                values = matrix[1].split(", ");
            }

            return {
                x: parseInt(values[4] || "0"),
                y: parseInt(values[5] || "0"),
            };
        }

        function setTransformXY(x, y) {
            const {
                top = -Infinity,
                    bottom = Infinity,
                    left = -Infinity,
                    right = Infinity,
            } = limit;

            if (y <= top) {
                y = top;
            }
            if (y >= bottom) {
                y = bottom;
            }
            if (x <= left) {
                x = left;
            }
            if (x >= right) {
                x = right;
            }

            effectElement.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        }
    }
    // 页面初次加载
    function htmlPageOnLoad(t, fn) {
        window.onload = function() {
            $("#html").style.display = "block";
            setTimeout(function() {
                $("#html").style.opacity = 1; /* 将元素的不透明度设置为1，实现渐隐渐显的效果 */
                if (fn instanceof Function) {
                    fn();
                }
            }, t);
        };
    }

    // 转义 HTML 特殊字符函数
    function escapeHtml(str) {
        const escapeChars = {
            "<": "&lt;",
            ">": "&gt;",
            "&": "&amp;",
            '"': "&quot;",
            "'": "&#39;",
        };
        return str.replace(/[<>&"']/g, function(char) {
            return escapeChars[char] || char;
        });
    }

    // 图片懒加载功能
    function lazyLoadImg() {
        const images = document.querySelectorAll("img[data-src]");
        // 定义观察器选项
        const options = {
            rootMargin: "0px",
            threshold: 0.5,
        };

        // 实例化观察器对象
        const observer = new IntersectionObserver(onIntersection, options);

        // 对每个图片元素进行观察
        images.forEach((img) => {
            observer.observe(img);
        });

        // 观察器回调函数
        function onIntersection(entries) {
            // 遍历每个观察器入口
            entries.forEach((entry) => {
                // 如果元素可见
                if (entry.intersectionRatio > 0) {
                    // 停止观察该元素
                    observer.unobserve(entry.target);

                    // 加载真实图片
                    const img = entry.target;
                    const src = img.getAttribute("data-src");
                    img.setAttribute("src", src);
                }
            });
        }
    }

    // 元素出现动画
    function elementAppearAnimation(es) {
        // 定义观察器选项
        const options = {
            rootMargin: "0px",
            threshold: 0.5,
        };

        // 实例化观察器对象
        const observer = new IntersectionObserver(onIntersection, options);

        // 对每个图片元素进行观察
        es.forEach((e) => {
            observer.observe(e);
            e.style.opacity = "0";
            e.style.transition = "opacity 1s ease-in-out";
        });

        // 观察器回调函数
        function onIntersection(entries) {
            // 遍历每个观察器入口
            entries.forEach((entry) => {
                // 如果元素可见
                if (entry.intersectionRatio > 0) {
                    // 停止观察该元素
                    observer.unobserve(entry.target);

                    // 加载真实图片
                    const e = entry.target;
                    e.style.opacity = "1";
                    e.style.animation = "fadeInDown1 1s ease-out forwards reverse";
                }
            });
        }
    }

    // 图片加载失败就加载自定义图片
    function imgLoadFail(img, path = "./w-icon/图像.svg") {
        img.onerror = function() {
            img.src = path;
        };
    }

    // 元素高级循环
    function forElementsFn(e, fn) {
        for (let i = 0; i < e.length; i++) {
            if (fn instanceof Function) {
                fn(e[i], i);
            }
        }
    }

    // 更新网站图标
    function updateFavicon(newIconUrl) {
        // 获取 link 元素
        let linkElement =
            document.querySelector('link[rel="shortcut icon"]') ||
            document.querySelector('link[rel="icon"]');

        // 创建一个新 link 元素
        let newLinkElement = document.createElement("link");
        newLinkElement.rel = "shortcut icon";
        newLinkElement.href = newIconUrl;

        // 替换或添加 link 元素
        if (linkElement) {
            linkElement.parentNode.replaceChild(newLinkElement, linkElement);
        } else {
            document.head.appendChild(newLinkElement);
        }
    }

    // 网络请求
    function netRequest(url, options = {}) {
        // 默认选项
        const defaultOptions = {
            method: "GET", // 默认请求方法为 GET
            headers: {}, // 默认请求头为空对象
            data: null, // 默认请求数据为 null
            timeout: 0, // 默认请求超时时间为 0 毫秒
            responseType: "text", // 默认响应类型为文本
        };

        // 合并选项
        const mergedOptions = {
            ...defaultOptions,
            ...options,
        };

        // 创建 Promise 对象
        return new Promise((resolve, reject) => {
            // 创建 XMLHttpRequest 对象
            const xhr = new XMLHttpRequest();
            // 设置请求方法和 URL
            xhr.open(mergedOptions.method, url);

            // 设置请求头
            Object.keys(mergedOptions.headers).forEach((key) => {
                xhr.setRequestHeader(key, mergedOptions.headers[key]);
            });

            // 设置响应类型
            xhr.responseType = mergedOptions.responseType;

            // 监听 readyState 变化事件，处理响应结果
            xhr.onreadystatechange = () => {
                // 如果请求已完成
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    // 如果请求成功
                    if (xhr.status >= 200 && xhr.status < 300) {
                        resolve(xhr.response);
                    } else {
                        reject(new Error(`Request failed with status ${xhr.status}`));
                    }
                }
            };

            // 监听网络错误事件
            xhr.onerror = () => {
                reject(new Error("Request failed due to a network error"));
            };

            // 监听超时事件
            xhr.ontimeout = () => {
                reject(new Error("Request timed out"));
            };

            // 发送请求
            xhr.send(mergedOptions.data);
        });
    }

    // 获取用户输入键
    function captureKeyboardInput(callback, e = document) {
        function getKeyCode(event) {
            let keyCode = event.which || event.keyCode || event.charCode;
            return keyCode;
        }
        e.addEventListener("keydown", function(event) {
            let keyCode = getKeyCode(event);
            callback(keyCode, event.key);
        });
    }

    // 获取浏览器信息
    function getBrowserInfo() {
        const browserInfo = {
            userAgent: navigator.userAgent,
            platform: navigator.platform,
            language: navigator.language,
            isOnline: navigator.onLine,
            isCookieEnabled: navigator.cookieEnabled,
            geolocation: navigator.geolocation,
            colorScheme: function() {
                return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? "DarkMode" : "LightMode";
            }
        };

        return browserInfo;
    }

    // cookie工具
    var cookieUtil = function(cookieName) {
        return {
            set: function(name, value, days, path = "/") {
                var expires = "";
                if (days) {
                    var date = new Date();
                    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
                    expires = "; expires=" + date.toUTCString();
                }

                document.cookie =
                    cookieName +
                    "_" +
                    (name || cookieName) +
                    "=" +
                    value +
                    expires +
                    "; path=" +
                    path;
            },

            get: function(name) {
                var fullNameEQ = cookieName + "_" + (name || cookieName) + "=";
                var ca = document.cookie.split(";");
                for (var i = 0; i < ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0) == " ") c = c.substring(1, c.length);
                    if (c.indexOf(fullNameEQ) == 0)
                        return c.substring(fullNameEQ.length, c.length);
                }
                return null;
            },

            Delete: function(name, path = "/") {
                this.set(name, "", -1, path);
            },
        };
    };

    // 盒子视差
    function boxParallax(containerId) {
        var that = this;

        // 获取容器元素
        that.container = containerId;
        that.container.style.position = "relative";

        // 获取所有需要应用视差效果的元素
        that.items = $(".parallax-item", that.container);

        // 初始化位置
        that.initPosition = function() {
            that.centerX = that.container.offsetWidth / 2;
            that.centerY = that.container.offsetHeight / 2;
        };

        // 根据鼠标位置计算元素位置
        that.moveItems = function(event) {
            // 计算鼠标在容器中的位置
            var mouseX = event.clientX - that.container.getBoundingClientRect().left;
            var mouseY = event.clientY - that.container.getBoundingClientRect().top;

            // 计算每个元素的移动距离
            that.items.forEach(function(item) {
                var depth = parseFloat(item.getAttribute("data-depth"));
                var xMove = (mouseX - that.centerX) * depth;
                var yMove = (mouseY - that.centerY) * depth;

                // 绘制元素
                item.style.transform = "translate(" + xMove + "px, " + yMove + "px)";
            });
        };

        // 监听鼠标移动事件
        that.container.addEventListener("mousemove", that.moveItems);

        // 初始化位置
        that.initPosition();

        // 监听窗口大小改变事件
        window.addEventListener("resize", that.initPosition);
    }

    // 防抖
    function debounce(func, delay) {
        var timer;

        return function() {
            var context = this;
            var args = arguments;

            clearTimeout(timer);

            timer = setTimeout(function() {
                func.apply(context, args);
            }, delay);
        };
    }

    // 节流
    function throttle(func, delay) {
        var timer;
        var lastTime = 0;

        return function() {
            var context = this;
            var args = arguments;
            var now = Date.now();

            if (now - lastTime >= delay) {
                lastTime = now;
                func.apply(context, args);
            } else {
                clearTimeout(timer);
                timer = setTimeout(function() {
                    lastTime = now;
                    func.apply(context, args);
                }, delay - (now - lastTime));
            }
        };
    }

    // 绑定元素点击功能
    function bindElementClickFn(e, fn) {
        e.addEventListener("click", function(event) {
            // 获取鼠标点击的页面位置
            const coordinate = {
                x: event.clientX,
                y: event.clientY,
            };
            if (fn instanceof Function) {
                fn(coordinate, event.target);
            }
        });
    }

    // 根据xy创建元素
    function xyCreateElement(
        eName,
        coordinate,
        fn = () => {},
        fE = document.body
    ) {
        // 创建元素
        let element = document.createElement(eName);

        // 设置元素位置
        element.style.left = coordinate.x + "px";
        element.style.top = coordinate.y + getHtmlScrollOffset().y + "px";

        // 将元素添加到 body 中
        fE.appendChild(element);

        fn(element);

    }

    // 国际化支持
    function worldLangSupport(_lang_, e) {
        if (_lang_._info_.type == "lang" && _lang_._data_.length == e.length) {
            for (let i = 0; i < e.length; i++) {
                e[i].innerHTML = _lang_._data_[i];
            }
        } else return false;
    }

    // 使用 window.matchMedia() 方法检测设备的屏幕方向
    function getDeviceOrientation() {
        if (window.matchMedia("(orientation: portrait)").matches) {
            return 0; //竖
        } else if (window.matchMedia("(orientation: landscape)").matches) {
            return 1;
        } else {
            return -1;
        }
    }

    // 表单效验
    function formValidation(data, mode) {
        let is;
        if (mode != "") {
            if (mode == "password") {
                is = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
            } else if (mode == "idCard") {
                is = /^[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}[\dX]$/;
            } else if (mode == "phone") {
                is = /^[1][3-9]\d{9}$/;
            } else if (mode == "email") {
                is = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
            }
            return is.test(data);
        } else {
            return false;
        }
    }

    // 元素显示隐藏
    function elementShowHide(e) {
        if (e.style.display == "none") {
            e.style.display = "block";
        } else {
            e.style.display = "none";
        }
    }

    // 导入其它js文件
    function includeJsFile(path, fn = () => {}, endDelete = false) {
        let script = document.createElement("script");
        script.type = "text/javascript";
        script.src = path;

        script.onload = function() {
            fn();
        };

        document.head.appendChild(script);
        if (endDelete) {
            setTimeout(() => {
                document.head.removeChild(script);
            }, 100);
        }
    }

    // 头部导入css
    function includeCssFile(path, fn = () => {}) {
        let link = document.createElement("link");
        link.type = "stylesheet";
        link.href = path;

        script.onload = function() {
            fn();
        }; // 如果指定了回调函数，则在加载完成后执行回调函数

        document.head.appendChild(link);
    }

    // 初始化函数

    // 初始化top下拉栏
    function initTopDropdown(e) {
        $(".w-dropdown-top-toggle", e)[0].addEventListener("click", function() {
            this.classList.toggle("active");
            $(".w-dropdown-top-menu", e)[0].classList.toggle("show");
        });
    }

    // 初始化下拉栏
    function initDropdown(element, isAll = false) {
        let dropdownBtn = $(".w-dropdown-btn", element);
        let dropdownContent = $(".w-dropdown-content", element);
        // 遍历所有的下拉栏项
        for (let i = 0; i < dropdownBtn.length; i++) {
            // 初始化下拉菜单高度为 0，并设置其高度过渡效果
            dropdownContent[i].style.height = "0";
            dropdownContent[i].style.overflow = "hidden";
            dropdownContent[i].style.transition = "height 0.2s ease-out";

            // 使用闭包确保事件处理函数内部能够访问到对应的下拉菜单
            (function(btn, content) {
                btn.addEventListener("click", function(event) {
                    event.preventDefault();

                    // 切换下拉菜单的高度
                    if (content.style.height === "0px") {
                        if (isAll) {
                            for (let n = 0; n < dropdownContent.length; n++) {
                                dropdownContent[n].style.height = "0";
                            }
                        }
                        content.style.height = content.scrollHeight + "px";
                    } else {
                        content.style.height = "0";
                    }
                });
            })(dropdownBtn[i], dropdownContent[i]);
        }
    }

    // 侧边栏初始化
    function initSidebar(btn, s) {
        btn.addEventListener("click", function() {
            if (s.style.display == "block") {
                s.style.display = "none";
                $("#html").style.overflowY = "auto";
                s.style.animation = "";
            } else {
                s.style.display = "block";
                $("#html").style.overflowY = "hidden";
                s.style.animation = "fadeInDown 0.3s ease-out forwards";
            }
        });
    }

    // 标签栏初始化
    function initTabColumn(
        container,
        selectedIndex = 0,
        moveLimit = 0
    ) {
        const tabBtns = $(".w-tabColumn-btn", container);
        const tabPanels = $(".w-tabColumn-page", container);

        if (moveLimit > 0) {
            const tabContent = $(".w-tabColumn-content", container)[0];
            addGestureListener(tabContent, function(direction) {
                const prevIndex = selectedIndex;

                if (direction == 0 && selectedIndex > 0) {
                    selectedIndex--;
                } else if (direction == 1 && selectedIndex < tabPanels.length - 1) {
                    selectedIndex++;
                }

                if (prevIndex != selectedIndex) {
                    switchTab(selectedIndex);
                }
            }, moveLimit);
        }

        hideAllTabs();
        showTab(selectedIndex);

        for (let i = 0; i < tabBtns.length; i++) {
            tabBtns[i].addEventListener("click", function() {
                switchTab(i);
            });
        }

        function switchTab(index) {
            hideAllTabs();
            showTab(index);
        }

        function hideAllTabs() {
            for (let i = 0; i < tabPanels.length; i++) {
                tabPanels[i].style.display = "none";
            }
            for (let i = 0; i < tabBtns.length; i++) {
                tabBtns[i].style.borderBottomColor = "";
            }
        }

        function showTab(index) {
            tabPanels[index].style.display = "block";
            tabBtns[index].style.borderBottomColor = "#000";
        }
    }

    // 初始化进度条
    function initProgressBar({
        element,
        number = 50,
        options = {
            min: 0,
            max: 100
        },
        style = {
            width: 150,
            height: 10
        },
        isMove = false
    }) {
        element.style.width = style.width;
        element.style.height = style.height;
        const progressBar = element;
        const progress = $(".w-progress", progressBar)[0];
        const moveBtn = $(".w-progress-move-btn", progressBar)[0];

        function setProgress(percentage) {
            percentage = Math.min(Math.max(percentage, options.min), options.max);
            progress.style.width = `${percentage}%`;
        }

        function onMouseMove(event) {
            const rect = progressBar.getBoundingClientRect();
            let x = event.clientX - rect.left;
            x = Math.min(Math.max(x, 0), rect.width);
            const percentage = (x / rect.width) * 100;
            setProgress(percentage); // 在计算前重新设置进度条
        }

        function onTouchMove(event) {
            const rect = progressBar.getBoundingClientRect();
            let x = event.touches[0].clientX - rect.left;
            x = Math.min(Math.max(x, 0), rect.width);
            const percentage = (x / rect.width) * 100;
            setProgress(percentage); // 在计算前重新设置进度条
        }

        if (isMove) {
            // 支持拖动
            moveBtn.style.display = "block";
            progressBar.addEventListener("mousedown", () => {
                progressBar.addEventListener("mousemove", onMouseMove);
            });
            progressBar.addEventListener("touchstart", () => {
                progressBar.addEventListener("touchmove", onTouchMove);
            });

            progressBar.addEventListener("mouseup", () => {
                progressBar.removeEventListener("mousemove", onMouseMove);
            });
            progressBar.addEventListener("touchend", () => {
                progressBar.removeEventListener("touchmove", onTouchMove);
            });
        } else {
            // 不支持拖动
            moveBtn.style.display = "none";
            progress.style.cursor = "initial";
        }

        setProgress(number); // 初始化进度

        return {
            setProgress,
        };
    }

    // 初始化顶部浮动导航栏
    function initTopFloatNavbar(e) {
        window.addEventListener("scroll", function() {
            if (getHtmlScrollOffset().y >= getElementWH($("#navbar"))[1] + 10) {
                e.style.position = "fixed";
                e.style.width = getWebPageWH()[0] + "px";
            } else if (getHtmlScrollOffset().y == 0) {
                e.style.position = "static";
            }
        });
    }

    // 瀑布流
    function waterfall(container) {
        let items = $(".w-waterfall-item", container);
    }

    // 创建窗口
    function CreateWindow(info_ = {}, element = document.body) {
        let info = {
            imgSrc: "./w-icon/图像.svg",
            title: "标题",
            width: 200,
            height: 80,
            child: undefined,
            limit: {
                top: -50,
                bottom: element.offsetHeight + 50,
                left: -50,
                right: element.offsetWidth + 50
            },
            coordinate: {
                x: ($(".w-window").length * 10),
                y: ($(".w-window").length * 10)
            }
        };

        const _info_ = {
            ...info,
            ...info_,
        };

        const windowElement = document.createElement('div');
        windowElement.className = "w-window";
        windowElement.style.minWidth = "200px";
        windowElement.style.minHeight = "80px";
        windowElement.style.width = `${_info_.width}px`;
        windowElement.style.height = `${_info_.height}px`;
        windowElement.style.transform = `translate3d(${_info_.coordinate.x}px, ${_info_.coordinate.y}px, 0)`;

        const windowElementT = document.createElement('div');
        windowElementT.className = "w-window-title";

        const windowElementImg = document.createElement('img');
        windowElementImg.src = _info_.imgSrc;
        const windowElementText = document.createElement('span');
        windowElementText.innerText = _info_.title;
        const windowElementB1 = document.createElement('button');
        windowElementB1.innerText = "×";
        windowElementB1.className = "w-btn buttonClose";

        const windowElementB2 = document.createElement('button');
        windowElementB2.innerText = "□";
        windowElementB2.className = "w-btn buttonMode";

        const windowElementB3 = document.createElement('button');
        windowElementB3.innerText = "—";
        windowElementB3.className = "w-btn buttonHide";

        windowElementT.appendChild(windowElementImg);
        windowElementT.appendChild(windowElementText);
        windowElementT.appendChild(windowElementB1);
        windowElementT.appendChild(windowElementB2);
        windowElementT.appendChild(windowElementB3);

        windowElement.addEventListener("click", function(e) {
            e.stopPropagation();
            windowSw();
            if (e.target.parentNode.className == "w-window-title") {
                if (e.target.innerText == "×") {
                    element.removeChild(windowElement);
                } else if (e.target.innerText == "—") {
                    elementShowHide(windowElement);
                } else {
                    if (windowElementB2.innerText == "□") {
                        windowElementB2.innerText = "⚀";
                        windowElement.style.transform = "translate3d(0px, 0px, 0)";
                        windowElement.style.width = (getScreenWH()[0] - 2.5) + "px";
                        windowElement.style.height = (getScreenWH()[1] - 2.5) + "px";
                    } else {
                        windowElementB2.innerText = "□";
                        windowElement.style.transform = `translate3d(${_info_.coordinate.x}px, ${_info_.coordinate.y}px, 0)`;
                        windowElement.style.width = `${_info_.width}px`;
                        windowElement.style.height = `${_info_.height}px`;
                    }
                }
            }
        });

        addDraggable(windowElementT, windowElement, function(m) {
            windowSw();
            if (m == "onMove" && windowElementB2.innerText == "⚀") {
                windowElementB2.innerText = "□";
                windowElement.style.transform = "translate3d(0px, 0px, 0)";
                windowElement.style.width = `${_info_.width}px`;
                windowElement.style.height = `${_info_.height}px`;
            }
        }, _info_.limit);

        windowElement.appendChild(windowElementT);
        // 添加子元素到窗口中
        if (_info_.child != undefined) {
            windowElement.appendChild(_info_.child);
        }

        // 将窗口添加到指定的元素内部
        element.appendChild(windowElement);

        function windowSw() {
            forElementsFn($(".w-window"), function(e) {
                e.style.zIndex = 998;
                e.style.boxShadow = "2px 2px 2px #ccc";
            });
            windowElement.style.zIndex = 999;
            windowElement.style.boxShadow = "2px 2px 2px rgb(115, 115, 115)";
        }

    }


    // 创建信息盒子
    function createMessageBox({
        text,
        showLocation = "tCenter",
        showTime = 2.5,
        parent = document.body
    }) {
        let distance = $(".w-message-box", parent).length;
        let h = 0;
        if (distance > 0) {
            h = getElementWH($(".w-message-box", parent)[distance - 1])[1] + 5;
        }

        const messageBox = document.createElement("div");
        messageBox.classList.add("w-message-box");
        messageBox.style.animation = "fadeInDown 0.5s ease-out forwards";
        messageBox.innerText = text;

        if (showLocation.startsWith("b")) {
            parent.appendChild(messageBox);
            $(".w-message-box", parent).forEach((e, index) => {
                e.style.bottom = `${h * distance}px`;
                distance--;
            });
        } else {
            [...$(".w-message-box", parent)].reverse().forEach((e, index) => {
                e.style.top = `${h * distance}px`;
                distance--;
            });
            parent.insertBefore(messageBox, parent.firstChild);
        }

        const positions = {
            tLeft: {
                top: "0px",
                left: "0%"
            },
            tCenter: {
                top: "0px",
                left: getCenterOffset(parent.offsetWidth, messageBox.offsetWidth) + "px"
            },
            tRight: {
                top: "0px",
                right: "0%"
            },
            bLeft: {
                bottom: "0px",
                left: "0%"
            },
            bCenter: {
                bottom: "0px",
                left: getCenterOffset(parent.offsetWidth, messageBox.offsetWidth) + "px"
            },
            bRight: {
                bottom: "0px",
                right: "0%"
            },
        };

        // 设置位置
        Object.assign(messageBox.style, positions[showLocation]);

        setTimeout(() => {
            messageBox.style.animation = "fadeInTopEnd 0.5s ease-out forwards";
            setTimeout(() => {
                parent.removeChild(messageBox);
                $(".w-message-box", parent).forElements(function(element, index) {
                    if (index > $(".w-message-box", parent).length) {
                        // 当前元素在待调整元素的下面，需要将其上移一个高度
                        const topValue = parseInt(element.style.top || 0);
                        const bottomValue = parseInt(element.style.bottom || 0);
                        if (topValue) {
                            element.style.top = topValue - h + "px";
                        } else if (bottomValue) {
                            element.style.bottom = bottomValue - h + "px";
                        }
                    }
                });
            }, 500);
        }, showTime * 1000);
    }

    // 创建提示框
    function createTipBox({
        title,
        data,
        showLocation = "center",
        showTime = 0,
        parent = document.body
    }) {
        const tipBox = document.createElement("div");
        tipBox.className = "w-tip-box";

        const tipTitle = document.createElement("div");
        tipTitle.className = "w-tip-title";
        tipTitle.innerHTML = title;
        tipBox.appendChild(tipTitle);

        const tipContent = document.createElement("div");
        tipContent.innerHTML = data;
        tipContent.className = "w-tip-content";
        tipContent.style.maxHeight = (getScreenWH()[1] / 1.6) + "px";
        tipBox.appendChild(tipContent);

        const closeButton = document.createElement("button");
        closeButton.innerText = "取消";
        closeButton.className = "w-btn";
        tipBox.appendChild(closeButton);

        const okButton = document.createElement("button");
        okButton.innerText = "确认";
        okButton.className = "w-btn";
        tipBox.appendChild(okButton);

        if (showLocation === "top") {
            tipBox.style.top = "20%";
        } else if (showLocation === "bottom") {
            tipBox.style.top = "60%";
        } else if (showLocation === "center") {
            tipBox.style.top = "45%";
        }

        parent.appendChild(tipBox);

        // 阻止屏幕滚动
        $("#html").style.overflowY = "hidden";

        tipBox.addEventListener("click", function(e) {
            e.stopPropagation();

            if (e.target == closeButton || e.target == okButton) {
                // 移除提示框和遮罩层
                parent.removeChild(tipBox);
                parent.removeChild(mask);
                // 恢复屏幕滚动
                $("#html").style.overflowY = "auto";
            }

            if (e.target == closeButton) {
                console.log("取消");
            } else if (e.target == okButton) {
                console.log("确定");
            }


        });

        const mask = document.createElement("div");
        mask.className = "w-mask";
        parent.appendChild(mask);

        if (showTime !== 0) {
            setTimeout(() => {
                // 移除提示框和遮罩层
                parent.removeChild(tipBox);
                parent.removeChild(mask);
                // 恢复屏幕滚动
                $("#html").style.overflowY = "auto";
            }, showTime * 1000);
        }
    }

    // 初始化
    function init() {
        // TODO: 在这里进行初始化操作
        console.log("WebGUIJsPro -- 1.0 -- [ wang jia ming ] ");
    }

    // 对外暴露的接口
    return {
        $: $,
        adjustFontSize: adjustFontSize,
        isInViewport: isInViewport,
        getNowFormatDate: getNowFormatDate,
        getEventIndex: getEventIndex,
        getPhysicsWH: getPhysicsWH,
        getWebPageWH: getWebPageWH,
        getScreenWH: getScreenWH,
        getElementWH: getElementWH,
        getElementRect: getElementRect,
        getHtmlScrollOffset: getHtmlScrollOffset,
        getElementScrollOffset: getElementScrollOffset,
        getCenterOffset: getCenterOffset,
        addGestureListener: addGestureListener,
        addDraggable: addDraggable,

        escapeHtml: escapeHtml,
        lazyLoadImg: lazyLoadImg,
        elementAppearAnimation: elementAppearAnimation,
        imgLoadFail: imgLoadFail,
        forElementsFn: forElementsFn,
        updateFavicon: updateFavicon,
        netRequest: netRequest,
        captureKeyboardInput: captureKeyboardInput,
        getBrowserInfo: getBrowserInfo,
        cookieUtil: cookieUtil,
        boxParallax: boxParallax,
        debounce: debounce,
        throttle: throttle,
        bindElementClickFn: bindElementClickFn,
        xyCreateElement: xyCreateElement,
        worldLangSupport: worldLangSupport,
        getDeviceOrientation: getDeviceOrientation,
        formValidation: formValidation,
        elementShowHide: elementShowHide,
        includeJsFile: includeJsFile,
        includeCssFile: includeCssFile,
        htmlPageOnLoad: htmlPageOnLoad,

        initTopDropdown: initTopDropdown,
        initDropdown: initDropdown,
        initSidebar: initSidebar,
        initTabColumn: initTabColumn,
        initProgressBar: initProgressBar,
        initTopFloatNavbar: initTopFloatNavbar,
        waterfall: waterfall,
        CreateWindow: CreateWindow,
        createMessageBox: createMessageBox,
        createTipBox: createTipBox,
        init: init,

        webSafeColor: webSafeColor,
    };
})();