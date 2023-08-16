
/**
 * 检查给定类及其原型链上是否存在指定方法名
 * @param {Function} klass 给定的类
 * @param {string} functionName 指定的方法名
 * @returns {boolean} 是否存在指定方法名
 */
function checkClassHasFunction(klass, functionName) {
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
  while (currentProto != null) {
    if (currentProto.hasOwnProperty(functionName)) {
      return true;
    }
    currentProto = Object.getPrototypeOf(currentProto);
  }
  return false;
}

/**
 * $ 函数用于获取指定的 DOM 元素。
 *
 * @param {String} element_Name CSS 选择器、ID、类名或属性名
 * @return {Object} 包含获取到的 DOM 元素及相关方法的对象
 * @return {HTMLElement} DOM 元素
 */
const $ = function (element_Name, obj = document) {
  function selectorF(selector) {
    const selectorType = {
      "#": "id",
      ".": "class",
      "[": "attr",
      ">": "son",
    };
    const type = selectorType[selector.charAt(0)];

    if (type == "id") {
      // 如果是 ID 选择器
      return obj.getElementById(selector.substring(1));
    } else if (type == "class") {
      // 如果是 class 选择器
      return obj.querySelectorAll(selector);
    } else if (type == "attr") {
      // 如果是属性选择器
      selector = selector.substring(1, selector.length - 1); // 去掉中括号
      const [attributeName, attributeValue] = selector.split("=");

      return obj.querySelectorAll(
        `[${attributeName}="${attributeValue.replace(/"/g, "")}"]`
      );
    } else if (type === "son") {
      // 如果是子代选择器
      const elements = obj.querySelectorAll(selector.substring(1));
      return Array.from(elements).filter((element) => element.parentNode === obj);
    } else {
      // 默认使用标签名选择器
      return obj.getElementsByTagName(selector);
    }
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
};
const Html = $("html")[0];
const Body = $("body")[0];

/**
 * 函数用于获取当前时间的格式化字符串。
 *
 * @param {String} separator 时分秒之间的分隔符，默认为 ":"
 * @return {String} 当前时间的格式化字符串，格式为 "YYYY-MM-DD HH:mm:ss"
 */
function getNowFormatDate(separator = ":") {
  if (!getNowFormatDate.template) {
    // 检查是否已缓存格式化字符串
    getNowFormatDate.template = `YYYY年MM月DD HH${separator}mm${separator}ss`;
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

/**
 * 生成唯一ID
 * @returns {string} 生成的唯一ID
 */
function generateUniqueId() {
  let timestamp = new Date().getTime(); // 获取当前时间戳
  timestamp = timestamp - Math.floor(Math.random() * 1000000);
  let random = Math.floor(Math.random() * 100000); // 生成一个随机数
  timestamp = timestamp.toString(12);
  return `ID_${timestamp}_${random}`; // 拼接生成唯一ID
}

/**
 * 函数用于为一个元素添加手势监听事件。
 *
 * @param {Element} element 需要添加手势监听的元素
 * @param {Function} callback 手势监听事件回调函数，接收一个方向参数 direction（0 表示向右滑动，1 表示向左滑动，2 表示向下滑动，3 表示向上滑动）
 * @param {Number} threshold 手势触发的最小滑动距离阈值，默认为 5 像素
 */
function addGestureListener(element, callback, threshold) {
  var startX, startY, endX, endY;
  element.addEventListener("touchstart", function (e) {
    startX = e.changedTouches[0].pageX;
    startY = e.changedTouches[0].pageY;
  });
  element.addEventListener("touchend", function (e) {
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

/**
 * addDraggable 函数用于实现拖拽功能。
 *
 * @param {Element} element 需要添加拖拽功能的元素
 * @param {Element} effectElement 对该元素进行移动效果的元素，默认为 element 本身
 * @param {Function} fn 回调函数，在拖拽过程中会不断地触发该函数，并将一个字符串参数传入以表示当前拖拽的状态（包括 "onMove"、"endMove"、"onClick" 等）
 * @param {Object} limit 用于限制元素移动的范围的对象，包括 top、bottom、left、right 四个属性
 */
function addDraggable({
  element,
  effectElement = element,
  fn = Function,
  limit = {},
  isKeyOperation = true,
}) {
  let startX = 0;
  let startY = 0;
  let startTransformX = 0;
  let startTransformY = 0;
  let values = [];
  let timer = null;

  element.addEventListener("mousedown", onPointerDown);
  element.addEventListener("touchstart", onPointerDown, { passive: true });

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
      fn("onMove");
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
        fn("onMove");
      }
    } else {
      setTransformXY(startTransformX + offsetX, startTransformY + offsetY);
    }
  }

  function onPointerUp() {
    document.removeEventListener("keydown", onKeyPress);

    document.removeEventListener("mousemove", onPointerMove);
    document.removeEventListener("touchmove", onPointerMove);
    document.removeEventListener("mouseup", onPointerUp);
    document.removeEventListener("touchend", onPointerUp);

    if (timer != null) {
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
  }
}

/**
 * 获取设备方向函数
 * @returns {number} 设备方向指示，0 表示竖屏、1 表示横屏、-1 表示无法确定
 */
function getDeviceOrientation() {
  if (window.matchMedia("(orientation: portrait)").matches) {
    return 0; //竖
  } else if (window.matchMedia("(orientation: landscape)").matches) {
    return 1;
  } else {
    return -1;
  }
}

/**
 * 表单验证函数
 * @param {string} data 待验证数据
 * @param {string} mode 验证模式，可选值为 "password"、"idCard"、"phone" 和 "email"
 * @returns {boolean} 验证结果，true 表示验证通过，false 表示验证失败
 */
function formValidation(data, mode) {
  let is;
  if (mode != "") {
    if (mode == "password") {
      is = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    } else if (mode == "idCard") {
      is =
        /^[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}[\dX]$/;
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

/**
 * 更新网站 Favicon 的链接
 * @param {string} newIconUrl 新的 Favicon 的 URL
 */
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

/**
 * 图片加载失败时的处理函数
 * @param {HTMLImageElement} img 目标图片元素
 * @param {string} path 默认图像路径，默认值为 "./w-icon/图像.svg"
 */
function imgLoadFail(img, path = "./w-icon/图像.svg") {
  img.onerror = function () {
    img.src = path;
  };
}

/**
 * 元素出现动画函数
 * @param {Array} es 要添加动画的元素数组
 */
function elementAppearAnimation(es) {
  const observer = new IntersectionObserver(onIntersection, {
    threshold: 0.5,
  });

  es.forItems((e) => {
    observer.observe(e);
    e.style.opacity = "0";
    e.style.visibility = "hidden";
    e.style.transition = "all 0.3s ease-in-out";
  });

  function onIntersection(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);

        const e = entry.target;
        e.style.visibility = "visible";
        e.style.opacity = "1";
      }
    });
  }
}

/**
 * 获取浏览器信息
 * @returns {Object} 返回一个包含浏览器信息的对象
 */
function getBrowserInfo() {
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

/**
 * 懒加载图片函数
 */
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

/**
 * easyStorageTool - Web Storage 工具函数
 * 
 * 这个工具函数用于简化对 Web Storage（localStorage 或 sessionStorage）的操作
 * @returns {Object} - 一个包含 setItem、getItem、removeItem 和 clear 方法的对象
 */
function easyStorageTool() {
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
}


/**
 * Cookie 工具函数，用于设置、获取和删除 Cookie。
 * @param {string} cookieName - Cookie 名称前缀
 * @returns {object} - 包含 set、get 和 Delete 方法的对象
 */
const cookieUtil = function (cookieName) {
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
        while (c.charAt(0) == " ") c = c.substring(1, c.length);
        if (c.indexOf(fullNameEQ) == 0)
          return c.substring(fullNameEQ.length, c.length);
      }
      return null;
    },

    Delete: function (name, path = "/") {
      this.set(name, "", -1, path);
    },
  };
};

/**
 * WAudioPlayer 音频播放器对象
 */
function WAudioPlayer() {
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
}



/*
  DataStoragePro - 数据存储处理工具
  
  提供了将特定格式的字符串转换为JSON对象，以及将JSON对象转换为特定格式字符串的功能。
*/
function DataStoragePro() {
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
          const [firstString, secondString] = line.substring(1).split(":").map(str => str.trim().replace(/['"]/g, ''));
          jsonStr += `"${firstString}":"${secondString}"`;
          if (lines[i + 1] && lines[i + 1].trim().charAt(0) !== "}") {
            jsonStr += ","
          }
        } else if (oneChar === "}") {
          jsonStr += `}`;
          if (lines[i + 1] && lines[i + 1].trim().charAt(0) !== "" && lines[i + 1].trim().charAt(0) !== "}") {
            jsonStr += ","
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
}

/**
 * 格式化日期字符串为"YYYY-MM-DD"格式
 * @param {string} dateString - 需要格式化的日期字符串，格式为"YYYY-M-D"
 * @returns {string} 格式化后的日期字符串，格式为"YYYY-MM-DD"
 */
function formatDateString(dateString) {
  let parts = dateString.split("-");
  let year = parts[0];
  let month = ("0" + parts[1]).slice(-2); // 补零
  let day = ("0" + parts[2]).slice(-2); // 补零

  return year + "-" + month + "-" + day;
}

/**
 * 动态引入 JavaScript 文件
 * @param {string} path - JavaScript 文件路径
 * @param {function} fn - 在加载完成后执行的回调函数
 * @param {boolean} endDelete - 是否在加载结束后删除 script 标签
 */
function includeJsFile(path, fn = Function, endDelete = false) {
  let script = document.createElement("script");
  script.type = "text/javascript";
  script.src = path;

  script.onload = function () {
    fn();
    if (endDelete) {
      setTimeout(() => {
        script.removePro();
      }, 5);
    }
  };

  document.body.appendChild(script);
}

/**
 * 动态引入 CSS 文件
 * @param {string} path - CSS 文件路径
 * @param {function} fn - 在加载完成后执行的回调函数
 */
function includeCssFile(path, fn = Function) {
  let link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = path;

  link.onload = function () {
    fn();
  }; // 如果指定了回调函数，则在加载完成后执行回调函数

  document.head.appendChild(link);
}

/*
 * 标准初始化页功能
 */
function _INIT_PAGE_WebGUIJsPro_(callback = Function) {
  console.info("WebGUIJsPro -- 2.5.0 -- [ wang jia ming ] ");
  console.info(getNowFormatDate());
  console.info(getBrowserInfo());

  Body.style.display = "block";
  setTimeout(() => {
    Body.style.opacity = "1";
    callback();
  }, 100);
}
