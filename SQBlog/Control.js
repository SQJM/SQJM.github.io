// web安全色
const _WebGUIJsPro_webSafeColor_ = [
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


/**
 * _WebGUIJsPro_calendar - 日历组件
 *
 * @param {HTMLElement} element - 日历组件的容器元素
 */
/*
<div id="" class="WebGUIJsPro-calendar">
  <div class="WebGUIJsPro-calendar-top">
    <button class="WebGUIJsPro-calendar-top-up">&lt;</button>
    <span class="WebGUIJsPro-calendar-top-date"></span>
    <button class="WebGUIJsPro-calendar-top-down">&gt;</button>
  </div>
  <div class="WebGUIJsPro-calendar-bottom"></div>
</div>
 */
const _WebGUIJsPro_calendar = function (element, fn = Function) {
  const top = element.$(".WebGUIJsPro-calendar-top")[0];
  const top_date = top.$(".WebGUIJsPro-calendar-top-date")[0];
  const bottom = element.$(".WebGUIJsPro-calendar-bottom")[0];
  {
    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");
    const tr = document.createElement("tr");
    const days = ["一", "二", "三", "四", "五", "六", "日"];
    days.forItems((e) => {
      tr.innerHTML += `<th><b>${e}</b></th>`;
    });
    thead.appendChild(tr);
    table.appendChild(thead);
    table.appendChild(tbody);
    bottom.innerHTML = table.outerHTML;
  }
  const calendarBody = bottom.$("tbody")[0];

  // 当前日期
  let currentDate = new Date();

  // 渲染日历
  const renderCalendar = (year, month) => {
    // 获取当月第一天的日期（用于确定填充日历时的起始位置）
    const firstDayOfMonth = new Date(year, month, 1);

    // 如果月份为 0，则调整为 12（表示十二月）
    let firstDayYear = year;
    let firstDayMonth = month;
    top_date.innerText = `${firstDayYear}年${firstDayMonth + 1}月`;

    // 获取当月的天数
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // 清空日历表格内容
    calendarBody.innerHTML = "";

    // 循环生成日历中的日期部分
    let date = 1;
    for (let i = 0; i < 6; i++) {
      // 创建表格行
      const row = document.createElement("tr");

      // 创建表格单元格并添加日期
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDayOfMonth.getDay() - 1) {
          // 填充前一个月的日期
          const cell = document.createElement("td");
          row.appendChild(cell);
        } else if (date > daysInMonth) {
          // 当月日期已经填充完毕，不再继续填充
          break;
        } else {
          // 填充当月的日期
          const cell = document.createElement("td");
          cell.classList.add("WebGUIJsPro-calendar-bottom-td");
          cell.innerText = date;

          // 判断是否为今天的日期，若是则添加样式类"WebGUIJsPro-calendar-now"
          const today = new Date();
          if (
            year === today.getFullYear() &&
            month === today.getMonth() &&
            date === today.getDate()
          ) {
            cell.classList.add("WebGUIJsPro-calendar-now");
          }

          row.appendChild(cell);
          date++;
        }
      }

      calendarBody.appendChild(row);

      // 当月日期已经填充完毕，不再继续填充
      if (date > daysInMonth) {
        break;
      }
    }
  };

  // 初始化日历
  renderCalendar(currentDate.getFullYear(), currentDate.getMonth());

  element.onclick = function (event) {
    event.stopPropagation();
    const element = event.target;
    const classname = element.className;

    if (classname == "WebGUIJsPro-calendar-top-up") {
      currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);
      renderCalendar(currentDate.getFullYear(), currentDate.getMonth());
    } else if (classname == "WebGUIJsPro-calendar-top-down") {
      currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1);
      renderCalendar(currentDate.getFullYear(), currentDate.getMonth());
    } else {
      if (!element.classList.contains("on") && element.classList.contains("WebGUIJsPro-calendar-bottom-td")) {
        calendarBody.$("*").forItems((e) => {
          e.classList.remove("on")
        });
        element.classList.add("on");
        let date_string = top_date.innerText + element.innerText;
        date_string = date_string.replace(/年/g, "-").replace(/月/g, "-");
        fn(formatDateString(date_string));
      } else if (element.classList.contains("on") && element.classList.contains("WebGUIJsPro-calendar-bottom-td")) {
        element.classList.remove("on");
        fn(undefined);
      } else {
        fn(null);
      }
    }
  }
};

/**
 * DiaLogs - 创建一个对话框组件
 * @param {string} type - 对话框类型，可选值为 "info(信息)"  "inquiry(询问)"  "warning(警告)"  "error(错误)" "succeed(成功)"
 * @param {string} title - 对话框标题
 * @param {string} text - 对话框内容
 * @param {string} width - 对话框宽度，默认为 "30%"
 * @param {string} height - 对话框高度，默认为 "30%"
 * @param {function} callFn - 回调函数
 */
class _WebGUIJsPro_DiaLogs {
  constructor({
    type = "info",
    title = "标题",
    text = "",
    width = "30%",
    height = "",
    isButton = true,
    buttons = []
  },
    callFn = Function) {
    // 创建对话框容器
    const _dialogs = document.createElement("div");
    this._Dialogs = _dialogs;
    _dialogs.classList.add("WebGUIJsPro-DiaLogs-" + type);

    // 创建标题元素
    const _title = document.createElement("div");
    _title.classList.add("WebGUIJsPro-diaLogs-title");

    // 创建图标元素
    const _icon = document.createElement("img");
    _icon.classList.add("WebGUIJsPro-diaLogs-icon");
    _icon.draggable = false;
    _icon.src = "./res/icon/diaLogs/" + type + ".svg";

    // 创建标题文本元素
    const _text = document.createElement("span");
    _text.innerHTML = title;
    _text.classList.add("WebGUIJsPro-diaLogs-titleText");

    // 创建内容元素
    const _content = document.createElement("div");
    _content.innerHTML = text;
    _content.classList.add("WebGUIJsPro-diaLogs-content");

    const closeDiaLogs = function (m) {
      _dialogs.removePro();
      if ($("#_WebGUIJsPro_diaLogs").$("div").length <= 0) {
        $("#_WebGUIJsPro_diaLogs").setVisibility(false);
      }
      callFn(m);
    }

    // 创建确定按钮
    const ok_button = document.createElement("button");
    ok_button.innerHTML = "确定";
    ok_button.addEventListener("click", () => {
      closeDiaLogs(ok_button.innerHTML);
    });

    // 创建取消按钮
    const cancel_button = document.createElement("button");
    cancel_button.innerHTML = "取消";
    cancel_button.addEventListener("click", () => {
      closeDiaLogs(cancel_button.innerHTML);
    });

    // 创建关闭按钮
    const close_button = document.createElement("button");
    close_button.innerHTML = "关闭";
    close_button.addEventListener("click", () => {
      closeDiaLogs(close_button.innerHTML);
    });

    // 创建按钮容器
    const _button = document.createElement("div");
    _button.classList.add("WebGUIJsPro-diaLogs-buttonBox");

    if (isButton) {
      // 根据对话框类型设置按钮行为
      if (type === "info") {
        _button.appendChild(close_button);
      } else if (type === "inquiry") {
        _button.appendChild(ok_button);
        _button.appendChild(cancel_button);
      } else if (type === "warning") {
        _button.appendChild(ok_button);
      } else if (type === "error") {
        _button.appendChild(ok_button);
      } else if (type === "succeed") {
        _button.appendChild(ok_button);
      }
    } else {
      buttons.forItems((e) => {
        const user_button = document.createElement("button");
        user_button.innerHTML = e;
        user_button.addEventListener("click", () => {
          closeDiaLogs(user_button.innerHTML);
        });
        user_button.setStyle(buttonStyle);
        _button.appendChild(user_button);
      });
    }

    // 构建对话框结构
    _title.appendChild(_icon);
    _title.appendChild(_text);

    _dialogs.appendChild(_title);
    _dialogs.appendChild(_content);
    _dialogs.appendChild(_button);

    $("#_WebGUIJsPro_diaLogs").appendChild(_dialogs);
    if (!$("#_WebGUIJsPro_diaLogs").Visibility) {
      $("#_WebGUIJsPro_diaLogs").setVisibility(true);
    }

    // 设置对话框样式
    _dialogs.setStyle({
      width: width,
      height: height,
    });

    _dialogs.setStyle({
      left: `${($("#_WebGUIJsPro_diaLogs").offsetWidth - _dialogs.offsetWidth) / 2}px`,
      top: `${($("#_WebGUIJsPro_diaLogs").offsetHeight - _dialogs.offsetHeight) / 3.5}px`,
    });
  }

  returnDialogs() {
    return this._Dialogs;
  }
}

/**
 * _WebGUIJsPro_Window 是一个用于创建自定义窗口组件的类
 * @class
 * @param {HTMLElement} [parent=document.body] - 窗口组件的父元素。
 * @param {string} [iconSrc='./res/icon/ico/img.svg'] - 窗口的图标路径。
 * @param {string} [titleText='窗口标题'] - 窗口的标题文本。
 */
class _WebGUIJsPro_Window {
  constructor(parent = document.body) {
    this.parent = parent;

    this.window = document.createElement("div");
    this.window.classList.add("WebGUIJsPro-window");

    this.title = document.createElement("div");
    this.title.classList.add("WebGUIJsPro-window-title");

    // 创建图标元素
    this.titleIcon = document.createElement("img");
    this.titleIcon.classList.add("WebGUIJsPro-diaLogs-icon");
    this.titleIcon.draggable = false;
    this.titleIcon.src = "./res/icon/ico/img.svg";

    // 创建标题文本元素
    this.titleTextElement = document.createElement("span");
    this.titleTextElement.innerHTML = "窗口标题";
    this.titleTextElement.classList.add("WebGUIJsPro-diaLogs-title-text");

    // 创建标题按钮
    this.titleButton = document.createElement("div");
    this.titleButton.classList.add("WebGUIJsPro-diaLogs-title-button");

    // 创建关闭按钮
    this.titleButtonClose = document.createElement("img");
    this.titleButtonClose.classList.add("WebGUIJsPro-diaLogs-title-button-close");
    this.titleButtonClose.draggable = false;
    this.titleButtonClose.src = "./res/icon/ico/no.svg";
    this.titleButton.appendChild(this.titleButtonClose);

    this.content = document.createElement("div");
    this.content.classList.add("WebGUIJsPro-window-content");

    // 窗口事件
    this.window.addEventListener("click", (event) => {
      { // 聚焦窗口
        $(".WebGUIJsPro-window").forItems((e) => {
          e.setStyle({
            zIndex: "995"
          });
        });
        this.window.setStyle({
          zIndex: "996"
        });
      }

      const clickElement = event.target;

      // 标题按钮事件
      if (clickElement.className === "WebGUIJsPro-diaLogs-title-button-close") {
        this.window.remove();
      }
    });

    this.title.appendChild(this.titleIcon);
    this.title.appendChild(this.titleTextElement);
    this.title.appendChild(this.titleButton);

    this.window.appendChild(this.title);
    this.window.appendChild(this.content);

    this.parent.appendChild(this.window);

    // 添加拖拽功能
    this.DraggableObj = {
      element: this.title,
      effectElement: this.window,
      fn: Function,
      limit: {
        top: 0,
        left: 0,
        right: this.parent.offsetWidth - 10,
        bottom: this.parent.offsetHeight - 10
      },
      isKeyOperation: true,
    };
    addDraggable(this.DraggableObj);
  }

}

/**
 * _WebGUIJsPro_ProgressBar 进度条组件
 *
 * @param {HTMLElement} parent - 父容器元素，进度条将附加到此元素上
 * @returns {Object} - 功能 setGuise value  maxValue 
 */
/*
 <div></div>
 */
class _WebGUIJsPro_ProgressBar {
  constructor(parent) {
    this.maxValue = 0;

    this.progressBar = document.createElement("div");
    this.progressBar.setStyle({
      width: "100%",
      display: "block",
      backgroundColor: "rgba(255, 255, 255, 0.8)"
    });

    this.progress = document.createElement("div");
    this.progress.setStyle({
      display: "block",
      minWidth: "0px",
      width: "0%",
      height: "100%",
      backgroundColor: "rgba(60, 160, 250, 0.95)"
    });

    this.progressBar.appendChild(this.progress);
    parent.appendChild(this.progressBar);
  }

  setGuise() {
    // 实现设置外观的逻辑
  }

  setValue(number) {
    this.progress.style.width = `${(number * this.maxValue) / 100}%`;
  }

  value() {
    return this.progress.style.width;
  }
}

/**
 * _WebGUIJsPro_DropDownBox 下拉盒组件
 * 
 * @param {HTMLElement} parent - 父容器元素
 * @returns {Object} - 功能 addItem removeItem updateItem handleItemClick setCallback
 */
/* 
<div id="" class="_WebGUIJsPro_DropDownBox">
  <div class="title"><span class="title">title</span><img class="ico title"></div>
  <div class="itemBox"></div>
</div>
 */
class _WebGUIJsPro_DropDownBox {
  constructor(parent) {
    this.parent = parent;
    this.items = [];
    this.callback = Function;
    this.parent.addEventListener("click", this.handleItemClick.bind(this));
    this.itemContainer = this.parent.$(".itemBox")[0];
    this.img = undefined;
    if (this.parent.$(".title")[0].$("img")[0].classList.contains("ico")) {
      this.img = this.parent.$(".title")[0].$("img")[0];
      this.img.src = "./res/icon/ico/down-btn.svg"
    }
    this.itemContainer.setStyle({
      visibility: "hidden",
      height: "0",
      opacity: "0",
    });
  }

  addItem(content) {
    const item = document.createElement("div");
    item.textContent = content;
    this.items.push(item);
    this.itemContainer.appendChild(item);
  }

  removeItem(content) {
    const index = this.items.findIndex(item => item.textContent === content);
    if (index !== -1) {
      const item = this.items.splice(index, 1)[0];
      this.itemContainer.removeChild(item);
    }
  }

  updateItem(oldContent, newContent) {
    const index = this.items.findIndex(item => item.textContent === oldContent);
    if (index !== -1) {
      const item = this.items[index];
      item.textContent = newContent;
    }
  }

  getItemContent(item) {
    return item.textContent;
  }

  handleItemClick(event) {
    const target = event.target;
    if (target.classList.contains("title")) {
      if (this.itemContainer.style.visibility == "visible") {
        this.img.style.transform = "rotate(0deg)";
        this.itemContainer.setStyle({
          visibility: "hidden",
          height: "0px",
          opacity: "0",
        });
      } else {
        this.img.style.transform = "rotate(180deg)";
        this.itemContainer.setStyle({
          visibility: "visible",
          height: "",
          opacity: "1",
        });
      }
      return;
    }
    const item = this.items.find(item => item === target);
    if (item) {
      const itemContent = this.getItemContent(item);
      this.callback(itemContent);
    }
  }

  setCallback(callback) {
    this.callback = callback;
  }
}

/**
 * _WebGUIJsPro_Tabale 表格组件
 *
 * @param {HTMLElement} parent - 父容器元素，表格将附加到此元素上
 */
/*
 <div id="" class="_WebGUIJsPro_Tabale"></div>
 */
class _WebGUIJsPro_Tabale {
  constructor(parent) {
    this.parent = parent;
    this.table = document.createElement("table");
    this.table.cellspacing = "0";
    this.thead = document.createElement("thead");
    this.tbody = document.createElement("tbody");
    this.is_rowNumber = false;
    this.table.appendChild(this.thead);
    this.table.appendChild(this.tbody);
    this.parent.appendChild(this.table);
  }

  updateRowNumber() {
    if (this.tbody.children[0]) {
      Array.from(this.tbody.children).forItems((tr, i) => {
        tr.setAttribute("rowNumber", i)
      });
    }
    if (this.tbody.children[0] && this.is_rowNumber) {
      Array.from(this.tbody.children).forItems((tr, i) => {
        if (tr.firstChild && tr.firstChild.className === "rowNumber") {
          tr.firstChild.innerText = i;
        } else if (tr.firstChild) {
          const rowN = document.createElement("td");
          rowN.className = "rowNumber";
          rowN.innerText = i;
          tr.insertBefore(rowN, tr.firstChild);
        } else {
          tr.innerHTML = `<td class="rowNumber">${i}</td>${tr.innerHTML}`;
        }
      });
    }
  }

  setRowNumber(is) {
    this.is_rowNumber = is;
    if (this.is_rowNumber && !this.thead.$("tr")[0].$(".rowNumber")[0]) {
      const td = document.createElement("td");
      td.className = "rowNumber";
      td.innerText = "行号";
      // 获取第一个子元素
      const firstChild = this.thead.$("tr")[0].firstChild;
      // 在第一个子元素之前插入新元素
      this.thead.$("tr")[0].insertBefore(td, firstChild);
    } else if (!this.is_rowNumber && this.thead.$("tr")[0].$(".rowNumber")) {
      this.thead.$(".rowNumber")[0].removePro();
      Array.from(this.tbody.$("tr")).forItems((e) => {
        if (e.firstChild.className === "rowNumber") {
          e.firstChild.removePro();
        }
      });
    }
    this.updateRowNumber();
  }

  setTitle(contents = []) {
    const tr = document.createElement("tr");
    contents.forItems((e) => {
      tr.innerHTML += `<td><b>${e}</b></td>`;
    });
    this.thead.innerHTML = tr.outerHTML;
  }

  addLine(index = 0, line = document.createElement("tr")) {
    if (this.tbody.$("tr")) {
      let son;
      Array.from(this.tbody.$("tr")).forItems((e, i) => {
        if (i == index) {
          son = e;
        }
      });
      this.tbody.insertBefore(line, son);
    } else {
      this.tbody.appendChild(line);
    }
    this.updateRowNumber();
  }

  removeLine(index) {
    const line = this.findLine(index);
    if (line != null) {
      line.removePro();
    }
    this.updateRowNumber();
  }

  findLine(index) {
    let line = null;
    if (this.tbody.$("tr") && this.tbody.childNodes.length >= index) {
      Array.from(this.tbody.$("tr")).forItems((e, i) => {
        if (i == index) {
          line = e;
        }
      });
    }
    return line;
  }
}

/**
 * _WebGUIJsPro_DropDownList 下拉列表组件
 * 
 * @param {HTMLElement} parent - 父容器元素
 * @returns {Object} - 功能 addItem removeItem updateItem handleItemClick setCallback
 */
/* 
<div id="" class="_WebGUIJsPro_DropDownList">
  <div class="title"><span class="title">title</span><img class="ico title"></div>
  <div class="itemList"></div>
</div>
 */
class _WebGUIJsPro_DropDownList {
  constructor(parent) {
    this.parent = parent;
    this.items = [];
    this.callback = Function;
    this.parent.addEventListener("click", this.handleItemClick.bind(this));
    this.itemContainer = this.parent.$(".itemList")[0];
    this.img = undefined;
    if (this.parent.$(".title")[0].$("img")[0].classList.contains("ico")) {
      this.img = this.parent.$(".title")[0].$("img")[0];
      this.img.src = "./res/icon/ico/down-btn.svg"
    }
    this.itemContainer.setStyle({
      visibility: "hidden",
      height: "0",
      opacity: "0",
    });
  }

  addItem(content) {
    const item = document.createElement("div");
    item.textContent = content;
    this.items.push(item);
    this.itemContainer.appendChild(item);
  }

  removeItem(content) {
    const index = this.items.findIndex(item => item.textContent === content);
    if (index !== -1) {
      const item = this.items.splice(index, 1)[0];
      this.itemContainer.removeChild(item);
    }
  }

  updateItem(oldContent, newContent) {
    const index = this.items.findIndex(item => item.textContent === oldContent);
    if (index !== -1) {
      const item = this.items[index];
      item.textContent = newContent;
    }
  }

  getItemContent(item) {
    return item.textContent;
  }

  handleItemClick(event) {
    const target = event.target;
    if (target.classList.contains("title")) {
      if (this.itemContainer.style.visibility == "visible") {
        this.img.style.transform = "rotate(0deg)";
        this.itemContainer.setStyle({
          visibility: "hidden",
          height: "0px",
          opacity: "0",
        });
      } else {
        this.img.style.transform = "rotate(180deg)";
        this.itemContainer.setStyle({
          visibility: "visible",
          height: "100%",
          opacity: "1",
        });
      }
      return;
    }
    const item = this.items.find(item => item === target);
    if (item) {
      const itemContent = this.getItemContent(item);
      this.callback(itemContent);
    }
  }

  setCallback(callback) {
    this.callback = callback;
  }
}