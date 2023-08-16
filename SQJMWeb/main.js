

function init_controlStyle() {
  const _WebGUIJsPro_diaLogs = $("#_WebGUIJsPro_diaLogs");
  _WebGUIJsPro_diaLogs.$("div").forEach((e) => {
    e.setStyle({
      left: `${(_WebGUIJsPro_diaLogs.offsetWidth - e.offsetWidth) / 2}px`,
      top: `${(_WebGUIJsPro_diaLogs.offsetHeight - e.offsetHeight) / 3.5}px`,
    });
  });

}

function init_controlEvent() {

  // 创建一个InputEvent事件
  const event = new InputEvent('input', {
    bubbles: true, // 事件冒泡
    cancelable: true // 事件可取消
  });

}

function inti_SQJMWeb() {

  /**
   * 给指定元素添加title
   */
  function setElementAddTitle(es, is = true) {
    es.array.forEach(element => {
      forItems
    });((e) => {
      if (is) {
        e.title = `This is ${e.tagName}`;
      } else {
        if (e.title == "") {
          e.title = `This is ${e.tagName}`;
        }
      }
    });
  }
  // setElementAddTitle($("img"), false);
  // setElementAddTitle($("input"), false);
  // // 给所有图片添加不可移动属性
  // $("img").forEach((e) => {
  //   e.draggable = false;
  // });

  init_controlStyle();

  init_controlEvent();
}

window.onload = function () {
  _INIT_PAGE_WebGUIJsPro_(() => {
    inti_SQJMWeb();
  });
};

// window.addEventListener("resize", () => {init_controlStyle();});

init_controlEvent();
