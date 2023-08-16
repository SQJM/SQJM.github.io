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
