
const _WebUtilPro_VERSION = "2.5.0";
const Html = document.getElementsByTagName("html")[0];
const Head = document.head;
const Body = document.body;
const MainWindow = document.getElementById("MainWindow");
const CaleBack_ID = 0;
const CaleBack_FN = 1;
const CaleBack_CONDITION = 2;
// 点击的元素
let WClickElement = HTMLElement;
let WClickElementCount = 1;
// 样式
const _WebUtilPro__STYLE_INIT = document.createElement("style");
(function () {
  _WebUtilPro__STYLE_INIT.id = "_WebGUIJsPro__STYLE_INIT";
  _WebUtilPro__STYLE_INIT.innerText = `
noscript {
    margin: 10px;
    position: relative;
    text-align: center;
}
html {
    position: static;
    width: 100%;
    height: 100%;
    display: block;
}
body {
    position: static;
    width: 100%;
    height: 100%;
    opacity: 0;
    display: none;
    transition: opacity 0.5s;
}
#MainWindow {
    display: block;
    width: 100%;
    height: 100%;
}
  `;
  Head.appendChild(_WebUtilPro__STYLE_INIT);
})();

function _WebUtilPro_isString(str) {
  return typeof str === 'string' || str instanceof String;
}

function _WebUtilPro_isFunction(func) {
  return typeof func === 'function' || func instanceof Function;
}

function _WebUtilPro_isClass(obj) {
  return typeof obj === 'function' && /^\s*class\s+/.test(obj.toString());
}

function _WebUtilPro_isPlainObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

function _WebUtilPro_isArray(arr) {
  return Array.isArray(arr);
}

function _WebUtilPro_isNumber(num) {
  return typeof num === 'number' || num instanceof Number;
}

function _WebUtilPro_isBoolean(bool) {
  return typeof bool === 'boolean' || bool instanceof Boolean;
}

function _WebUtilPro_isNegative(num) {
  return num < 0;
}

function _WebUtilPro_isHTMLElement(obj) {
  return obj instanceof HTMLElement;
}


// 方向
const _WebUtilPro_direction = {
  Top: 0,
  Bottom: 1,
  Left: 2,
  Right: 3
};
// 位置
const _WebUtilPro_place = {
  Left: {
    Top: 0,
    Center: 1,
    Bottom: 2
  },
  Center: {
    Top: 3,
    Center: 4,
    Bottom: 5
  },
  Right: {
    Top: 6,
    Center: 7,
    Bottom: 8
  }
};
// 解析位置
const _WebUtilPro_analysisPlace = function (value) {
  if (_WebUtilPro_isNumber(value)) {
    switch (value) {
      case 0: { return "LT" }
      case 1: { return "LC" }
      case 2: { return "LB" }
      case 3: { return "CT" }
      case 4: { return "CC" }
      case 5: { return "CB" }
      case 6: { return "RT" }
      case 7: { return "RC" }
      case 8: { return "RB" }
    }
  } else if (_WebUtilPro_isString(value)) {
    const value_ = value.toUpperCase();
    switch (value_) {
      case "LT": { return _WebUtilPro_place.Left.Top }
      case "LC": { return _WebUtilPro_place.Left.Center }
      case "LB": { return _WebUtilPro_place.Left.Bottom }
      case "CT": { return _WebUtilPro_place.Center.Top }
      case "CC": { return _WebUtilPro_place.Center.Center }
      case "CB": { return _WebUtilPro_place.Center.Bottom }
      case "RT": { return _WebUtilPro_place.Right.Top }
      case "RC": { return _WebUtilPro_place.Right.Center }
      case "RB": { return _WebUtilPro_place.Right.Bottom }
    }
  }
  return false;
};

(function () {
  'use strict';
  /**
   * 定义 `setVisibility` 方法，用于设置元素的可见性
   *
   * @param {boolean} isVisible  
   */
  // 将 `Visibility` 属性添加到 `HTMLElement` 的原型上，用于保存元素的可见性状态
  HTMLElement.prototype.Visibility;
  HTMLElement.prototype.setVisibility = function (isVisible) {
    if (isVisible) {
      this.Visibility = true;
      this.setStyle({
        visibility: "visible",
      });
    } else {
      this.Visibility = false;
      this.setStyle({
        visibility: "hidden",
      });
    }
  };

  /**
   *
   * 给当前 HTML 元素设置样式。
   * @param {Object} styleObj - 表示 CSS 样式属性和值的键值对对象
   * @return {HTMLElement} 返回当前 HTML 元素本身，以便实现链式调用
   */
  HTMLElement.prototype.setStyle = function (styleObj) {
    for (let property in styleObj) {
      this.style[property] = styleObj[property];
    }
    return this;
  };

  /**
   * 移除元素的所有绑定事件
   */
  HTMLElement.prototype.removeAllEventListeners = function () {
    // 移除当前元素的绑定事件
    const events = this.__events || {};
    for (let eventName in events) {
      if (events.hasOwnProperty(eventName)) {
        for (let i = 0; i < events[eventName].length; i++) {
          element.removeEventListener(eventName, events[eventName][i].listener);
        }
      }
    }
  }
  /**
   * 移除元素及其所有子元素的所有绑定事件
   */
  HTMLElement.prototype.removeElementAllEventListeners = function () {
    // 移除当前元素的绑定事件
    this.removeAllEventListeners();

    // 检查当前元素是否有子节点，递归调用函数对子节点进行同样的操作
    const children = this.children;
    for (let i = 0; i < children.length; i++) {
      children[i].removeElementAllEventListeners();
    }
  }
  /**
   * 在移除指定元素前，先移除其及其所有子元素的所有绑定事件
   * 然后再将该元素从其父节点中删除
   */
  HTMLElement.prototype.removePro = function () {
    this.removeElementAllEventListeners();
    this.remove();
  }

  /**
   * 获取指定元素的上级节点
   * @param {Number} levels - 要获取的上级级数
   * @returns {Object|null} - 返回获取到的上级节点，若超出根节点则返回 null
   */
  HTMLElement.prototype.getParentLevelsUp = function (levels) {
    let parent = this;
    for (let i = 0; i < levels; i++) {
      if (parent.parentNode) {
        parent = parent.parentNode;
      } else {
        return null; // 若超出根节点，则返回 null
      }
    }
    return parent;
  }

  /**
   * 为 HTMLElement 的原型添加 SoleID 属性，用于生成唯一标识符
   * @returns {string} - 生成的唯一标识符
   */
  Object.defineProperty(HTMLElement.prototype, "SoleID", {
    get: function () {
      if (!this._SoleID) {
        this._SoleID = (function () {
          let timestamp = new Date().getTime(); // 获取当前时间戳
          timestamp = timestamp - Math.floor(Math.random() * 10000000);
          let random = Math.floor(Math.random() * 100000); // 生成一个随机数
          timestamp = timestamp.toString(12);
          return `SoleID_${timestamp}_${random}`; // 拼接生成唯一ID
        })();
      }
      return this._SoleID;
    }
  });

})();

const WebUtilPro = (function () {
  'use strict';
  /**
   * $ 函数用于获取指定的 DOM 元素。
   *
   * @param {String} element_Name CSS 选择器、ID、类名或属性名
   * @return {Object} elementM 包含获取到的 DOM 元素及相关方法的对象
   * @return {HTMLElement} ReturnElement DOM 元素
   */
  function $(element_Name, obj = document, filter = "") {
    try {
      function selectorF(selector) {
        const selectorType = {
          "#": "id",
          ".": "class",
          "[": "attr",
          ">": "son",
          "&": "SoleID",
        };
        const type = selectorType[selector.charAt(0)];

        let ReturnElement = HTMLElement;
        if (type === "id") {
          // 如果是 ID 选择器
          ReturnElement = obj.getElementById(selector.substring(1));
        } else if (type === "class") {
          // 如果是 class 选择器
          ReturnElement = obj.querySelectorAll(selector);
        } else if (type === "attr") {
          // 如果是 attr 选择器
          ReturnElement = obj.querySelectorAll(selector);
        } else if (type === "son") {
          // 如果是 son 选择器
          if (selectorType[selector.charAt(1)]) {
            const elements = obj.querySelectorAll("*");
            let arrs = Array.from(elements).filter((element) => element.parentNode === obj);
            let arr = new Array;
            const V = selector.substring(2);
            const V2 = selector.substring(2, selector.length - 1);
            switch (selectorType[selector.charAt(1)]) {
              case "class":
                arrs.forEach(e => {
                  if (e.classList.contains(V)) {
                    arr.push(e);
                  }
                });
                break;
              case "attr":
                arrs.forEach(e => {
                  if (e.hasAttribute(V2)) {
                    arr.push(e);
                  }
                });
                break;
              default:
                arr = void 0;
                break;
            }
            ReturnElement = arr;
          } else {
            const elements = obj.querySelectorAll(selector.substring(1));
            ReturnElement = Array.from(elements).filter((element) => element.parentNode === obj);
          }
        } else if (type === "SoleID") {
          // 如果是 SoleID 选择器
          const allE = obj.querySelectorAll("*");
          allE.forEach(e => {
            if (e.SoleID == selector.substring(1)) {
              ReturnElement = e;
            }
          });
          ReturnElement = undefined;
        } else {
          // 默认使用标签名选择器
          ReturnElement = obj.getElementsByTagName(selector);
        }
        if (ReturnElement === null) {
          return void 0;
        }
        return ReturnElement;
      }
      let elementM;
      if (element_Name instanceof HTMLElement) {
        elementM = element_Name;
      } else {
        elementM = selectorF(element_Name);
      }
      elementM.$ = function (eName) {
        return $(eName, this);
      };
      elementM.forEach = function (callback) {
        for (let i = 0; i < this.length; i++) {
          callback(this[i], i);
        }
      };
      return elementM;
    } catch (error) {
      throw new Error(error);
    }
  }
  /**
   * 扩展 HTMLElement 原型的 $ 方法，用于选择子元素
   * @param {string} element_Name - 子元素的选择器
   * @returns {HTMLElement} - 选中的子元素
   */
  HTMLElement.prototype.$ = function (element_Name) {
    return $(this).$(element_Name);
  }

  /**
   * 获取指定的父级返回 true 或者直到 MainWindow 结束
   * @param {HTMLELEMENT} element - 要获取指定父级的元素
   * @param {function} fn - 验证功能 如果当前的父级是与预期一样的则需要返回 true
   */
  function getAppointParent(element, fn = () => { }) {
    if (element === MainWindow) {
      return MainWindow;
    }
    if (!fn(element)) {
      return getAppointParent(element.parentNode, fn);
    } else
      return element;
  }

  return {

    /**
     * $ 函数用于获取指定的 DOM 元素。
     *
     * @param {String} element_Name CSS 选择器、ID、类名或属性名
     * @return {Object} 包含获取到的 DOM 元素及相关方法的对象
     * @return {HTMLElement} DOM 元素
     */
    $,

    /**
     * 检查给定类及其原型链上是否存在指定方法名
     * @param {function} klass 给定的类
     * @param {string} functionName 指定的方法名
     * @returns {boolean} 是否存在指定方法名
     */
    checkClassHasFunction: function (klass, functionName) {
      // 获取类原型对象
      const proto = klass.prototype;
      // 检查类原型对象和类本身是否具有该方法
      if (
        proto.hasOwnProperty(functionName) ||
        klass.hasOwnProperty(functionName)
      ) {
        return true;
      }
      // 遍历原型链，查找是否具有该方法
      let currentProto = proto;
      while (currentProto !== null) {
        if (currentProto.hasOwnProperty(functionName)) {
          return true;
        }
        currentProto = Object.getPrototypeOf(currentProto);
      }
      return false;
    },

    /**
     * 函数用于获取当前时间的格式化字符串。
     *
     * @param {String} separator 时分秒之间的分隔符，默认为 ":"
     * @return {String} 当前时间的格式化字符串，格式为 "YYYY-MM-DD HH:mm:ss"
     */
    getNowFormatDate: function (template = `YYYY年MM月DD HH:mm:ss`) {
      if (!getNowFormatDate.template) {
        // 检查是否已缓存格式化字符串
        getNowFormatDate.template = template;
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
    },

    /**
     * 生成唯一ID
     * @returns {string} 生成的唯一ID
     */
    generateUniqueId: function () {
      let timestamp = new Date().getTime(); // 获取当前时间戳
      timestamp = timestamp - Math.floor(Math.random() * 1000000);
      let random = Math.floor(Math.random() * 100000); // 生成一个随机数
      timestamp = timestamp.toString(12);
      return `ID_${timestamp}_${random}`; // 拼接生成唯一ID
    },

    /**
     * 获取本地网址
     * @returns {string} 返回URL
     */
    getLocationURL: function () {
      return new URL(window.location.href).origin + "/";
    },

    /**
     * 函数用于为一个元素添加手势监听事件。
     *
     * @param {Element} element 需要添加手势监听的元素
     * @param {function} callback 手势监听事件回调函数，接收一个方向参数 direction（0 表示向右滑动，1 表示向左滑动，2 表示向下滑动，3 表示向上滑动）
     * @param {Number} threshold 手势触发的最小滑动距离阈值，默认为 5 像素
     */
    addGestureListener: function (element, callback, threshold) {
      let startX, startY, endX, endY;
      element.addEventListener("touchstart", function (e) {
        startX = e.changedTouches[0].pageX;
        startY = e.changedTouches[0].pageY;
      }, { passive: true });
      element.addEventListener("touchend", function (e) {
        endX = e.changedTouches[0].pageX;
        endY = e.changedTouches[0].pageY;
        let direction;
        let deltaX = endX - startX;
        let deltaY = endY - startY;
        let distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY); // 计算滑动距离
        if (distance < threshold) return; // 如果滑动距离不足阈值，则认为是无效手势，直接返回
        // 右0
        // 下2
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          direction = deltaX > 0 ? 0 : 1;
        } else {
          direction = deltaY > 0 ? 2 : 3;
        }
        if (_WebUtilPro_isFunction(callback)) {
          callback(direction);
        }
      }, { passive: true });
    },

    /**
     * addDraggable 函数用于实现拖拽功能。
     *
     * @param {Element} element 需要添加拖拽功能的元素
     * @param {Element} effectElement 对该元素进行移动效果的元素，默认为 element 本身
     * @param {function} fn 回调函数，在拖拽过程中会不断地触发该函数，并将一个字符串参数传入以表示当前拖拽的状态（包括 "onMove"、"endMove"、"onClick" 等）
     * @param {Object} limit 用于限制元素移动的范围的对象，包括 top、bottom、left、right 四个属性
     */
    addDraggable: function ({
      element,
      effectElement = element,
      fn = () => { },
      limit = {},
      isKeyOperation = true,
    }) {
      let startX = 0;
      let startY = 0;
      let startTransformX = 0;
      let startTransformY = 0;
      let values = [];
      let timer = null;

      element.addEventListener("mousedown", onPointerDown, { passive: false });
      element.addEventListener("touchstart", onPointerDown, { passive: false });

      function getTranslate3d(element) {
        const transform = element.style.transform;
        const match = transform.match(/translate3d\((.+?)\)/);

        if (match) {
          const values = match[1].split(", ");
          const x = parseInt(values[0]);
          const y = parseInt(values[1]);
          const z = parseInt(values[2]);

          return { x, y, z };
        }

        return { x: 0, y: 0, z: 0 };
      }
      function onKeyPress(event) {
        const { key } = event;
        // 根据按键调整偏移量
        switch (key) {
          case "ArrowUp":
            setTransformXY(getTranslate3d(effectElement).x, getTranslate3d(effectElement).y - 1);
            break;
          case "ArrowDown":
            setTransformXY(getTranslate3d(effectElement).x, getTranslate3d(effectElement).y + 1);
            break;
          case "ArrowLeft":
            setTransformXY(getTranslate3d(effectElement).x - 1, getTranslate3d(effectElement).y);
            break;
          case "ArrowRight":
            setTransformXY(getTranslate3d(effectElement).x + 1, getTranslate3d(effectElement).y);
            break;
          default:
            return;
        }
      }

      function onPointerDown(event) {
        if (isKeyOperation) {
          document.addEventListener("keydown", onKeyPress);
        }
        event.preventDefault();

        startX =
          event.clientX ||
          (event.touches && event.touches.length > 0 && event.touches[0].clientX) ||
          0;
        startY =
          event.clientY ||
          (event.touches && event.touches.length > 0 && event.touches[0].clientY) ||
          0;

        const transform = getTransformXY();
        startTransformX = transform.x;
        startTransformY = transform.y;

        document.addEventListener("mousemove", onPointerMove);
        document.addEventListener("touchmove", onPointerMove);
        document.addEventListener("mouseup", onPointerUp);
        document.addEventListener("touchend", onPointerUp);

        timer = setTimeout(() => {
          timer = null;
        }, 300);
      }

      function onPointerMove(event) {
        const offsetX = ((event.clientX || (event.touches && event.touches[0].clientX)) || 0) - startX;
        const offsetY = ((event.clientY || (event.touches && event.touches[0].clientY)) || 0) - startY;

        if (timer !== null) {
          // 判断是否移动超过阈值
          if (Math.abs(offsetX) > 10 || Math.abs(offsetY) > 10) {
            clearTimeout(timer);
            timer = null;
          }
        } else {
          setTransformXY(startTransformX + offsetX, startTransformY + offsetY);
        }
      }

      function onPointerUp(event) {
        document.removeEventListener("keydown", onKeyPress);

        document.removeEventListener("mousemove", onPointerMove);
        document.removeEventListener("touchmove", onPointerMove);
        document.removeEventListener("mouseup", onPointerUp);
        document.removeEventListener("touchend", onPointerUp);

        if (timer !== null) {
          clearTimeout(timer);
          timer = null;
          fn("onClick", event);
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

        if (values.length == 0 || values.join("") != matrix[1]) {
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

        fn("onMove", x, y);
      }
    },

    /**
     * 获取设备方向函数
     * @returns {number} 设备方向指示，0 表示竖屏、1 表示横屏、-1 表示无法确定
     */
    getDeviceOrientation: function () {
      if (window.matchMedia("(orientation: portrait)").matches) {
        return 0; //竖
      } else if (window.matchMedia("(orientation: landscape)").matches) {
        return 1;
      } else {
        return -1;
      }
    },

    /**
     * 表单验证函数
     * @param {string} data 待验证数据
     * @param {string} mode 验证模式，可选值为 "password"、"idCard"、"phone" 和 "email"
     * @returns {boolean} 验证结果，true 表示验证通过，false 表示验证失败
     */
    formValidation: function (data, mode) {
      let is;
      if (mode !== "") {
        if (mode === "password") {
          is = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        } else if (mode === "idCard") {
          is =
            /^[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}[\dX]$/;
        } else if (mode === "phone") {
          is = /^[1][3-9]\d{9}$/;
        } else if (mode === "email") {
          is = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
        }
        return is.test(data);
      } else {
        return false;
      }
    },

    /**
     * 更新网站 Favicon 的链接
     * @param {string} newIconUrl 新的 Favicon 的 URL
     */
    updateFavicon: function (newIconUrl) {
      // 获取 link 元素
      let linkElement =
        document.querySelector('link[rel="shortcut icon"]') ||
        document.querySelector('link[rel="icon"]');

      // 创建一个新 link 元素
      let newLinkElement = document.createElement("link");
      newLinkElement.rel = "shortcut icon";
      newLinkElement.type = "image/x-icon";
      newLinkElement.href = newIconUrl;

      // 替换或添加 link 元素
      if (linkElement) {
        linkElement.parentNode.replaceChild(newLinkElement, linkElement);
      } else {
        document.head.appendChild(newLinkElement);
      }
    },

    /**
     * 获取浏览器信息
     * @returns {Object} 返回一个包含浏览器信息的对象
     */
    getBrowserInfo: function () {
      const browserInfo = {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language,
        isOnline: navigator.onLine,
        isCookieEnabled: navigator.cookieEnabled,
        geolocation: navigator.geolocation,
        colorScheme: function () {
          return window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "DarkMode"
            : "LightMode";
        },
      };

      return browserInfo;
    }
    ,
    /**
     * 返回柔和亮的随机颜色
     * @returns {string} 返回一个颜色字符串
     */
    getRandomColor: function (type = 'rgba') {
      let hue = Math.floor(Math.random() * 360);  // 随机生成色相值 (0 - 359)
      hue = hue - Math.floor(Math.random() * 99) + Math.floor(Math.random() * 66);
      let saturation = Math.floor(Math.random() * 30 + 70);  // 随机生成饱和度值 (70 - 100)
      let lightness = Math.floor(Math.random() * 10 + 60);  // 随机生成亮度值 (60 - 70)

      let color;

      if (type === 'rgb') {
        color = `rgb(${hue}, ${saturation}, ${lightness})`;
      } else if (type === 'rgba') {
        let alpha = (Math.random() * (1 - 0.2) + 0.2).toFixed(2);  // 随机生成透明度值 (0.2 - 1)
        color = `rgba(${hue}, ${saturation}, ${lightness}, ${alpha})`;
      } else if (type === 'hsl') {
        color = `hsl(${hue}$, ${saturation}%, ${lightness}%)`;
      } else {
        throw new Error('Invalid color type');
      }

      return color;
    },



    /**
     * 懒加载图片函数
     */
    lazyLoadImg: function () {
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
    },

    /**
     * easyStorageTool - Web Storage 工具函数
     * 
     * 这个工具函数用于简化对 Web Storage（localStorage 或 sessionStorage）的操作
     * @returns {Object} - 一个包含 setItem、getItem、removeItem 和 clear 方法的对象
     */
    easyStorageTool: function () {
      // 设置键值对
      function setItem(key, value) {
        try {
          localStorage.setItem(key, JSON.stringify(value));
          return true;
        } catch (error) {
          console.error('存储错误：', error);
          return false;
        }
      }

      // 获取指定键的值
      function getItem(key) {
        try {
          const value = localStorage.getItem(key);
          return value ? JSON.parse(value) : null;
        } catch (error) {
          console.error('读取错误：', error);
          return null;
        }
      }

      // 删除指定键值对
      function removeItem(key) {
        try {
          localStorage.removeItem(key);
          return true;
        } catch (error) {
          console.error('删除错误：', error);
          return false;
        }
      }

      // 清空存储
      function clear() {
        try {
          localStorage.clear();
          return true;
        } catch (error) {
          console.error('清空错误：', error);
          return false;
        }
      }

      // 返回公共方法
      return {
        setItem,
        getItem,
        removeItem,
        clear
      };
    },


    /**
     * Cookie 工具函数，用于设置、获取和删除 Cookie。
     * @param {string} cookieName - Cookie 名称前缀
     * @returns {object} - 包含 set、get 和 Delete 方法的对象
     */
    cookieUtil: function (cookieName) {
      return {
        set: function (name, value, days, path = "/") {
          var expires = "";
          if (days) {
            var date = new Date();
            date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
            expires = "; expires=" + date.toUTCString();
          }
          const cookieData =
            cookieName + "_" + name + "=" + value + expires + "; path=" + path;
          document.cookie = cookieData;
        },

        get: function (name) {
          var fullNameEQ = cookieName + "_" + name + "=";
          var ca = document.cookie.split(";");

          for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === " ") c = c.substring(1, c.length);
            if (c.indexOf(fullNameEQ) === 0)
              return c.substring(fullNameEQ.length, c.length);
          }
          return null;
        },

        Delete: function (name, path = "/") {
          this.set(name, "", -1, path);
        },
      };
    },

    /**
     * WAudioPlayer 音频播放器对象
     */
    WAudioPlayer: function () {
      const audio = new Audio();
      let audioFileList = new Map();
      let progressCallback = null;

      /**
       * 添加音频文件路径
       * @param {string} src - 音频文件路径
       */
      function addAudioFile(src) {
        // 将音频文件路径以文件名（不包含扩展名）为键存储到 Map 中
        audioFileList.set(src.split("/").pop().split(".").slice(0, -1).join("."), src);
      }

      /**
       * 删除音频文件路径
       * @param {string} audioName - 音频文件名（不包含扩展名）
       */
      function removeAudioFile(audioName) {
        audioFileList.delete(audioName);
      }

      /**
       * 加载音频
       * @param {string} audioName - 音频文件名（不包含扩展名）
       */
      function loadAudio(audioName) {
        const audioInfo = audioFileList.get(audioName);
        if (audioInfo) {
          audio.src = audioInfo;
          audio.load();
        } else {
          console.log("找不到该歌曲");
        }
      }

      /**
       * 播放音频
       */
      function play() {
        audio.play();
      }

      /**
       * 暂停音频
       */
      function pause() {
        audio.pause();
      }

      /**
       * 设置进度回调函数
       * @param {Function} callback - 进度回调函数，接收两个参数：当前时间和总时间
       */
      function setProgressCallback(callback) {
        progressCallback = callback;
        audio.addEventListener("timeupdate", handleProgressUpdate);
      }

      /**
       * 处理进度更新事件
       */
      function handleProgressUpdate() {
        if (progressCallback) {
          const currentTime = audio.currentTime;
          const duration = audio.duration;
          progressCallback(currentTime, duration);
        }
      }

      return {
        audio,
        audioFileList,

        addAudioFile,
        removeAudioFile,
        loadAudio,
        play,
        pause,
        setProgressCallback,
      };
    },

    /*
      DataStoragePro - 数据存储处理工具
      
      提供了将特定格式的字符串转换为JSON对象，以及将JSON对象转换为特定格式字符串的功能。
    */
    DataStoragePro: function () {
      return {
        // 将特定格式的字符串转换为JSON对象
        dspToJson: function (dspStr) {
          const lines = dspStr.split("\n");
          let jsonStr = "";

          for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            const oneChar = line.charAt(0);

            if (oneChar === "[") {
              const key = line.substring(1, line.indexOf("{"));
              jsonStr += `"${key}": {`;
            } else if (oneChar === "<") {
              const [firstString, ...rest] = line.substring(1).split(":").map(str => str.trim().replace(/['"]/g, ''));
              const secondString = rest.join(':');
              jsonStr += `"${firstString}":"${secondString}"`;
              if (lines[i + 1] && lines[i + 1].trim().charAt(0) !== "}") {
                jsonStr += ",";
              }
            } else if (oneChar === "}") {
              jsonStr += "}";
              if (lines[i + 1] && lines[i + 1].trim().charAt(0) !== "" && lines[i + 1].trim().charAt(0) !== "}") {
                jsonStr += ",";
              }
            }
          }

          jsonStr = "{" + jsonStr + "}";
          //console.log(jsonStr);
          return JSON.parse(jsonStr);
        },
        // 将JSON对象转换为特定格式字符串
        JsonToDsp: function (json) {
          let dspStr = JSON.stringify(json);

          // dspStr = dspStr.replace(/{/g, "{\n");
          // dspStr = dspStr.replace(/}/g, "\n}");
          // dspStr = dspStr.replace(/\",/g, "\"\n");

          console.log(dspStr)

          return dspStr;
        },
      };
    },

    /**
     * 格式化日期字符串为"YYYY-MM-DD"格式
     * @param {string} dateString - 需要格式化的日期字符串，格式为"YYYY-M-D"
     * @returns {string} 格式化后的日期字符串，格式为"YYYY-MM-DD"
     */
    formatDateString: function (dateString) {
      let parts = dateString.split("-");
      let year = parts[0];
      let month = ("0" + parts[1]).slice(-2); // 补零
      let day = ("0" + parts[2]).slice(-2); // 补零

      return year + "-" + month + "-" + day;
    },

    /**
     * 计算给定起始日期与指定日期之间的天数差
     * @param {string} strStartDate - 起始日期
     * @param {string} [strEndtDate=new Date] - 结束日期 默认为当前日期
     * @returns {number} - 天数差
     */
    calculateDaysDiff: function (strStartDate, strEndtDate = new Date) {
      let startDate = new Date(strStartDate);
      let todayDate = new Date(strEndtDate);
      let timeDiff = Math.abs(todayDate.getTime() - startDate.getTime());
      let daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      return daysDiff;
    },

    /**
     * 获取指定的父级返回 true 或者直到 MainWindow 结束
     * @param {HTMLELEMENT} element - 要获取指定父级的元素
     * @param {function} fn - 验证功能 如果当前的父级是与预期一样的则需要返回 true
     */
    getAppointParent,

    /**
     * 获取元素相对于屏幕的坐标
     * @param {HTMLElement} element - 要获取坐标的元素
     * @returns {Object} - 元素相对于屏幕的坐标，包含 x 和 y 值
     */
    getElementScreenPosition: function (element) {
      const rect = element.getBoundingClientRect(); // 获取矩形对象
      const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      return {
        x: rect.left + scrollLeft,
        y: rect.top + scrollTop
      };
    },

    /**
     * 字符串转 HTML
     * @param {String} str - 要转换的字符串
     * @returns {HTMLElement} - 解析后的 HTML
     */
    strToHTML: function (str) {
      const div = document.createElement("div");
      div.innerHTML = str;
      return div.innerHTML;
    },

    /**
     * 命令解析器
     * 
     */
    commandParser: function () {

    },

    /**
     * 元素在动画结束后自动删除
     * @param {HTMLElement} element - 目标元素
     * @param {any} an - 动画
     */
    elementAnEndDel: function (element, an, removeElement = element, fn = () => { }) {
      if (_WebUtilPro_isPlainObject(an)) {
        element.setStyle(an);
        let time = 500;
        if (an.time) { time = an.time; }
        clearTimeout(an.timeID);
        an.timeID = setTimeout(() => {
          fn();
          removeElement.removePro();
        }, time);
      } else {
        element.style.animation = "";
        element.style.animation = an;
        element.addEventListener("animationend", () => {
          fn();
          removeElement.removePro();
        });
      }
    },

    /**
     * 元素出现动画函数
     * @param {HTMLElement} element - 目标元素
     * @param {any} an - 动画
     */
    elementAppearAnimation: function (element, an) {
      const observer = new IntersectionObserver(onIntersection, {
        threshold: 0.5,
      });

      element.style.animation = "";

      function onIntersection(entries) {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            observer.unobserve(entry.target);

            const e = entry.target;
            e.style.animation = an;
          }
        });
      }
    },

    /**
     * 导入元素
     * @param {String} path - 路径
     */
    importHTML: function (path, fn = () => { }) {
      const Iframe = document.createElement("iframe");
      Iframe.src = `${path}.htm`;
      Iframe.onload = function () {
        const iframeContent = Iframe.contentWindow.document.body.innerHTML;
        fn(iframeContent);
        Iframe.removePro();
      };
      MainWindow.appendChild(Iframe);
    },

    /**
     * 动态引入 JavaScript 文件
     * @param {string} path - JavaScript 文件路径
     * @param {function} fn - 在加载完成后执行的回调函数
     * @param {boolean} endDelete - 是否在加载结束后删除 script 标签
     */
    includeJsFile: function (path, fn = () => { }, endDelete = false) {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = path;

      script.onload = function () {
        fn(true, script);
        if (endDelete) {
          setTimeout(() => {
            script.removePro();
          }, 5);
        }
      };

      script.onerror = function () {
        fn(false, script);
        if (endDelete) {
          setTimeout(() => {
            script.removePro();
          }, 5);
        }
      };

      document.body.appendChild(script);
    },

    /**
     * 动态引入 CSS 文件
     * @param {string} path - CSS 文件路径
     * @param {function} fn - 在加载完成后执行的回调函数
     */
    includeCssFile: function (path, fn = () => { }) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = path;

      link.onload = function () {
        fn(true, link);
      };

      link.onerror = function () {
        fn(false, link);
      };

      document.head.appendChild(link);
    },

    /*
     * 标准初始化页功能
     */
    _INIT_PAGE_WebUtilPro_: function (callback = () => { }) {
      console.info(`WebUtilPro -- ${_WebUtilPro_VERSION} -- [ wang jia ming ] `);
      MainWindow.style
      Body.style.display = "block";
      setTimeout(() => {
        Body.style.opacity = "1";
        callback();
      }, 100);
    }
  }

});

try {
  (function () { // 核心事件

    const {
      $
    } = WebUtilPro();

    let Element_timeout_TimeoutID;
    MainWindow.onmousedown = (event) => {
      const Element = event.target;

      {
        {
          if (Element.getAttribute("ThisDisabled") === "true") {
            return;
          }
          const timeout = parseInt(Element.getAttribute("timeout"));
          if (timeout) {
            clearTimeout(Element_timeout_TimeoutID);
            Element.setAttribute("ThisDisabled", "true");
            Element_timeout_TimeoutID = setTimeout(function () {
              Element.removeAttribute("ThisDisabled");
            }, timeout);
          }
        }
        { // 自身回调功能
          if (Element.getAttribute("callback") !== null) {
            const attributeValue = Element.getAttribute("callback");
            if (attributeValue && typeof window[attributeValue] === 'function') {
              window[attributeValue](Element);
            } else {
              eval(attributeValue);
            }
          }
        }
        if (Element.getAttribute("WTriggerSon") !== null && Element.firstElementChild) {
          let event = new MouseEvent('mousedown', {
            bubbles: true,
            cancelable: true,
            view: window
          });

          const Str = Element.getAttribute("WTriggerSon").split("=");
          const Way = Str[0];
          const Index = Str[1];
          let IndexWClickElementFirstElementChild = Element.$(">*")[parseInt(Index)];

          if (!IndexWClickElementFirstElementChild) {
            IndexWClickElementFirstElementChild = Element.firstElementChild;
          }

          if (Way === "click") {
            event = new MouseEvent('click', {
              bubbles: true,
              cancelable: true,
            });
          }

          if (IndexWClickElementFirstElementChild.tagName.toLowerCase() === "input") {
            IndexWClickElementFirstElementChild.focus();
          }

          IndexWClickElementFirstElementChild.dispatchEvent(event);
        }

        if (WClickElement !== Element) {
          WClickElementCount = 1;
          // 移除其他的 WClick
          $(".WClick").forEach(e => {
            e.parentNode.classList.remove("WClickParent");
            e.parentNode.removeAttribute("WClickParent");
            e.classList.remove("WClick");
            e.removeAttribute("WClick");
          });
          // 设置点击元素的 WClick 属性
          Element.classList.add("WClick");
          Element.setAttribute("WClick", "");
          Element.parentNode.classList.add("WClickParent");
          Element.parentNode.setAttribute("WClickParent", "");

          WClickElement = Element;
        } else {
          WClickElementCount++;
        }

        { // 删除元素
          if (Element.getAttribute("delElement") !== null) {
            if (Element.getAttribute("delElement") === "{parent}") {
              Element.parentNode.removePro();
            }else{
              const e = $(Element.getAttribute("delElement"));
              if (e.length > 1) {
                e[0].removePro();
              } else {
                e.removePro();
              }
            }
          }
        }

      }
    };

    MainWindow.oninput = (event) => {
      const Element = event.target;

      {
        if (Element.value && Element.value.trim() != "") {
          Element.setAttribute("WValue", "");
        } else {
          Element.removeAttribute("WValue");
        }
      }
    };
  })();
} catch (error) {
  throw new Error(error);
}
// WebUtilPro SQJM 2023