'use strict';

/**
 * 错误处理函数，用于捕获和记录页面运行过程中的错误信息
 * @param {string} message - 错误消息
 * @param {string} source - 错误来源文件的 URL
 * @param {number} lineno - 错误发生的行号
 * @param {number} colno - 错误发生的列号
 * @param {Error} error - 抛出的错误对象
 */
let _WebGUIJsPro_ERROE_ACCUMULATION = 0;
let _WebGUIJsPro_ERROE_ACCUMULATION_ALL = "";
window.onerror = function (message, source, lineno, colno, error) {
  _WebGUIJsPro_ERROE_ACCUMULATION_ALL += `
<p style="user-select:text;">
  <span style="color: red;">[发生错误]: ${message}</span><br>
  <span style="color: blue; user-select:text;">[错误来源]:</span> <b style="user-select:text;">${source} : ${lineno}:${colno}</b><br>
  <span style="color: blue; user-select:text;">[错误行号]:</span> <b style="user-select:text;">${lineno}</b><br>
  <span style="color: blue; user-select:text;">[错误对象]:</span> <b style="user-select:text;">${error}</b><br>
</p>
<br>
    `;

  if (error instanceof Error && error.name === 'FatalError') {
    // 处理致命错误逻辑
    document.getElementById("MainWindow").style.display = "none";
    const err = document.createElement("p");
    err.innerHTML = `<div style="overflow: auto;max-height:${$("html")[0].offsetHeight}px;">` + _WebGUIJsPro_ERROE_ACCUMULATION_ALL + `<b>有 ${_WebGUIJsPro_ERROE_ACCUMULATION} 个 错误发生了! 这是致命错误.</b><br></div>`;
    document.body.appendChild(err);
    return;
  }

  _WebGUIJsPro_ERROE_ACCUMULATION++;
  if (_WebGUIJsPro_ERROE_ACCUMULATION > 1) {
    let err;
    if (document.getElementById("_WebGUIJsPro_ERROE_Box")) {
      err = document.getElementById("_WebGUIJsPro_ERROE_Box");
    } else {
      err = document.createElement("p");
      err.id = "_WebGUIJsPro_ERROE_Box";
    }

    document.getElementById("_WebGUIJsPro_diaLogs").style.display = "none";
    document.getElementById("MainWindow").style.display = "none";

    err.innerHTML = `<div style="overflow: auto;max-height:${$("html")[0].offsetHeight}px;">` + _WebGUIJsPro_ERROE_ACCUMULATION_ALL + `<h3>有 ${_WebGUIJsPro_ERROE_ACCUMULATION} 个 错误发生了!</h3><br></div>`;
    document.body.appendChild(err);
  } else {
    new _WebGUIJsPro_DiaLogs({
      type: "error",
      title: "错误信息",
      text: `
  <span style="color:red;">发生错误: ${message}</span><br>
  <span>错误来源: ${source}</span><br>
  <span>错误行号: ${lineno} : ${colno}</span><br>
  <span>错误对象: ${error}</span><br>
  `,
    });
  }
};


/**
 * 遍历 NodeList 中的所有元素，并对每个元素执行回调函数
 *
 * @param {Function} callback - 回调函数，接收当前元素和索引作为参数
 * @return {NodeList} 返回当前 节点列表，以便实现链式调用
 */
NodeList.prototype.forItems = function (callback) {
  for (let i = 0; i < this.length; i++) {
    callback(this[i], i);
  }
  return this;
};
/**
 * 遍历数组中的所有元素，并对每个元素执行回调函数
 *
 * @param {Function} callback - 回调函数，接收当前元素和索引作为参数
 * @return {Array} 返回当前 数组，以便实现链式调用
 */
Array.prototype.forItems = function (callback) {
  for (let i = 0; i < this.length; i++) {
    callback(this[i], i);
  }
  return this;
};


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
 * 扩展 HTMLElement 原型的 $ 方法，用于选择子元素
 * @param {string} element_Name - 子元素的选择器
 * @returns {HTMLElement} - 选中的子元素
 */
HTMLElement.prototype.$ = function (element_Name) {
  return $(this).$(element_Name);
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



/**
 * WebGUIJsPro_EventList
 */
let _WebGUIJsPro_EventList = [
  // 一般事件
  ["click", false],           // 鼠标点击时触发此事件
  ["dblclick", false],        // 鼠标双击时触发此事件
  ["mousedown", false],       // 按下鼠标时触发此事件
  ["mouseup", false],         // 鼠标按下后松开鼠标时触发此事件
  ["mouseover", false],       // 当鼠标移动到某对象范围的上方时触发此事件
  ["mousemove", false],       // 鼠标移动时触发此事件
  ["mouseout", false],        // 当鼠标离开某对象范围时触发此事件
  ["keypress", false],        // 当键盘上的某个键被按下并且释放时触发此事件
  ["keydown", false],         // 当键盘上某个按键被按下时触发此事件
  ["keyup", false],           // 当键盘上某个按键被放开时触发此事件

  // 页面相关事件
  ["abort", false],           // 图片在下载时被用户中断
  ["beforeunload", false],    // 当前页面的内容将要被改变时触发此事件
  ["error", false],           // 出现错误时触发此事件
  ["load", false],            // 页面内容完成时触发此事件
  ["move", false],            // 浏览器的窗口被移动时触发此事件
  ["resize", false],          // 当浏览器的窗口大小被改变时触发此事件
  ["scroll", false],          // 浏览器的滚动条位置发生变化时触发此事件
  ["stop", false],            // 浏览器的停止按钮被按下时触发此事件或者正在下载的文件被中断
  ["unload", false],          // 当前页面将被改变时触发此事件

  // 表单相关事件
  ["blur", false],            // 当前元素失去焦点时触发此事件
  ["change", false],          // 当前元素失去焦点并且元素的内容发生改变而触发此事件
  ["focus", false],           // 当某个元素获得焦点时触发此事件
  ["reset", false],           // 当表单中RESET的属性被激发时触发此事件
  ["submit", false],          // 一个表单被递交时触发此事件

  // 滚动字幕事件
  ["bounce", false],          // 在Marquee内的内容移动至Marquee显示范围之外时触发此事件
  ["finish", false],          // 当Marquee元素完成需要显示的内容后触发此事件
  ["start", false],           // 当Marquee元素开始显示内容时触发此事件

  // 编辑事件
  ["beforecopy", false],      // 当页面当前的被选择内容将要复制到浏览器系统的剪贴板前触发此事件
  ["beforecut", false],       // 当页面中的一部分或者全部的内容将被移离当前页面[剪贴]并移动到浏览器的系统剪贴板时触发此事件
  ["beforeeditfocus", false], // 当前元素将要进入编辑状态
  ["beforepaste", false],     // 内容将要从浏览器的系统剪贴板传送[粘贴]到页面中时触发此事件
  ["beforeupdate", false],    // 当浏览器粘贴系统剪贴板中的内容时通知目标对象
  ["contextmenu", false],     // 当浏览器按下鼠标右键出现菜单时或者通过键盘的按键触发页面菜单时触发的事件
  ["copy", false],            // 当页面当前的被选择内容被复制后触发此事件
  ["cut", false],             // 当页面当前的被选择内容被剪切时触发此事件
  ["drag", false],            // 当某个对象被拖动时触发此事件 [活动事件]
  ["dragdrop", false],        // 一个外部对象被鼠标拖进当前窗口或者帧
  ["dragend", false],         // 当鼠标拖动结束时触发此事件，即鼠标的按钮被释放了
  ["dragenter", false],       // 当对象被鼠标拖动的对象进入其容器范围内时触发此事件
  ["dragleave", false],       // 当对象被鼠标拖动的对象离开其容器范围内时触发此事件
  ["dragover", false],        // 当某被拖动的对象在另一对象容器范围内拖动时触发此事件
  ["dragstart", false],       // 当某对象将被拖动时触发此事件
  ["drop", false],            // 在一个拖动过程中，释放鼠标键时触发此事件
  ["losecapture", false],     // 当元素失去鼠标移动所形成的选择焦点时触发此事件
  ["paste", false],           // 当内容被粘贴时触发此事件
  ["select", false],          // 当文本内容被选择时的事件
  ["selectstart", false],     // 当文本内容选择将开始发生时触发的事件

  // 数据绑定
  ["afterupdate", false],     // 当数据完成由数据源到对象的传送时触发此事件
  ["cellchange", false],      // 当数据来源发生变化时
  ["dataavailable", false],   // 当数据接收完成时触发事件
  ["datasetchanged", false],  // 数据在数据源发生变化时触发的事件
  ["datasetcomplete", false], // 当来子数据源的全部有效数据读取完毕时触发此事件
  ["errorupdate", false],     // 当使用onBeforeUpdate事件触发取消了数据传送时，代替onAfterUpdate事件
  ["rowenter", false],        // 当前数据源的数据发生变化并且有新的有效数据时触发的事件
  ["rowexit", false],         // 当前数据源的数据将要发生变化时触发的事件
  ["rowsdelete", false],      // 当前数据记录将被删除时触发此事件
  ["rowsinserted", false],    // 当前数据源将要插入新数据记录时触发此事件

  // 外部事件
  ["afterprint", false],      // 当文档被打印后触发此事件
  ["beforeprint", false],     // 当文档即将打印时触发此事件
  ["filterchange", false],    // 当某个对象的滤镜效果发生变化时触发的事件
  ["help", false],            // 当浏览者按下F1或者浏览器的帮助选择时触发此事件
  ["propertychange", false],  // 当对象的属性之一发生变化时触发此事件
  ["readystatechange", false],// 当对象的初始化属性值发生变化时触发此事件

];
