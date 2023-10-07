WImportStyleControl("lib/WebGUIPro", "material-icons");
WImportStyleControl("lib/WebGUIPro", "WElement");
WImportStyleControl("lib/WebGUIPro", "WButton");
WImportStyleControl("lib/WebGUIPro", "WGroupButton");
WImportStyleControl("lib/WebGUIPro", "WList");
WImportStyleControl("lib/WebGUIPro", "WHoverMenu");
WImportStyleControl("lib/WebGUIPro", "WNote");
WImportStyleControl("lib/WebGUIPro", "WMark");

WImportControl("lib/WebGUIPro", "WDialog");
WImportControl("lib/WebGUIPro", "WSwitch");
WImportControl("lib/WebGUIPro", "WInputText");
WImportControl("lib/WebGUIPro", "WDrawer");
WImportControl("lib/WebGUIPro", "WDropMenu");
WImportControl("lib/WebGUIPro", "WLoadingPanel");
WImportControl("lib/WebGUIPro", "WDropList");
WImportControl("lib/WebGUIPro", "WMessage");
WImportControl("lib/WebGUIPro", "WProgressBar");
WImportControl("lib/WebGUIPro", "WMessagePro");
WImportControl("lib/WebGUIPro", "WTab");
WImportControl("lib/WebGUIPro", "WBreadcrumbs");
WImportControl("lib/WebGUIPro", "WImportWidget");

const {
  $,
  addDraggable,
  _INIT_PAGE_WebUtilPro_,
  importHTML
} = WebUtilPro();

// 创建一个 InputEvent 事件
const event_input = new InputEvent('input', {
  bubbles: true, // 事件冒泡
  cancelable: true // 事件可取消
});

const t = document.createElement("sb");

const SQJMWeb_content_preview = $("#SQJMWeb_content_preview").$(".bimg")[0];
const SQJMWeb_content_preview_img = $("#SQJMWeb_content_preview").$("img")[0];
const SQJMWeb_content_dynamic = $("#SQJMWeb_content_dynamic");
const SQJMWeb_content_dynamic_div1_div1 = SQJMWeb_content_dynamic.$(".div1")[0].$(".div1")[0];
const SQJMWeb_content_dynamic_div1_div2 = SQJMWeb_content_dynamic.$(".div1")[0].$(".div2")[0];

let SQJMWeb_content_preview_img_index = 0;
let SQJMWeb_content_preview_img_index_change_isPause = false;
const SQJMWeb_content_dynamic_div1_div2_p_remove_select = function () {
  SQJMWeb_content_dynamic_div1_div2.$("p").forEach(e => {
    e.removeAttribute("select");
  });
}
const SQJMWeb_content_preview_img_change = function () {
  SQJMWeb_content_preview_img.style.opacity = "0";
  switch (SQJMWeb_content_preview_img_index) {
    case 0:
      {
        SQJMWeb_content_dynamic_div1_div2_p_remove_select();
        SQJMWeb_content_preview.style.backgroundImage = "url(./test.png)";
        SQJMWeb_content_preview_img.src = "./test.png";
        SQJMWeb_content_dynamic_div1_div2.$("p")[0].setAttribute("select", "");
      }
      break;
    case 1:
      {
        SQJMWeb_content_dynamic_div1_div2_p_remove_select();
        SQJMWeb_content_preview.style.backgroundImage = "url(./BJ.png)";
        SQJMWeb_content_preview_img.src = "./BJ.png";
        SQJMWeb_content_dynamic_div1_div2.$("p")[1].setAttribute("select", "");
      }
      break;
    case 2:
      {
        SQJMWeb_content_dynamic_div1_div2_p_remove_select();
        SQJMWeb_content_preview.style.backgroundImage = "url(./test.png)";
        SQJMWeb_content_preview_img.src = "./test.png";
        SQJMWeb_content_dynamic_div1_div2.$("p")[2].setAttribute("select", "");
        SQJMWeb_content_preview_img_index = -1;
      }
      break;
  }
  setTimeout(() => {
    SQJMWeb_content_preview_img.style.opacity = "1";
  }, 500);
}
SQJMWeb_content_dynamic_div1_div1.onclick = function (event) {
  const element = event.target;
  SQJMWeb_content_preview_img_index_change_isPause = true;
  if (element.classList.contains("l")) {
    if (SQJMWeb_content_preview_img_index >= 0) {
      SQJMWeb_content_preview_img_index--;
    } else {
      SQJMWeb_content_preview_img_index = 2;
    }
  } else if (element.classList.contains("r")) {
    SQJMWeb_content_preview_img_index++;
    if (SQJMWeb_content_preview_img_index > 2) {
      SQJMWeb_content_preview_img_index = 0;
    }
  }
  SQJMWeb_content_preview_img_change();
  SQJMWeb_content_preview_img_index_change_isPause = false;
}
setInterval(() => {
  if (SQJMWeb_content_preview_img_index_change_isPause) {
    return;
  }
  SQJMWeb_content_preview_img_change();
  SQJMWeb_content_preview_img_index++;
}, 5000);

function init_web() {

  const OpenAnContentHtml = `
  <div>
    <div class="SQJMWeb_Effect_logo_1"></div>
    <div class="SQJMWeb_Effect_logo_2"></div>
    <style>
        .SQJMWeb_Effect_logo_1 {
            transform: rotate(40deg);
            position: fixed;
            top: -50%;
            left: -50%;
            height: 300%;
            animation: SQJMWeb_Effect_logo_1 8s forwards;
            width: 70px;
            background-color: rgba(255, 255, 255, 0.6);
        }

        @keyframes SQJMWeb_Effect_logo_1 {
            0% {
                left: -50%;
            }

            100% {
                left: 110%;
            }
        }

        .SQJMWeb_Effect_logo_2 {
            transform: rotate(40deg);
            position: fixed;
            top: -50%;
            left: -30%;
            height: 300%;
            animation: SQJMWeb_Effect_logo_2 8s forwards;
            width: 100px;
            background-color: rgba(255, 255, 255, 0.8);
        }

        @keyframes SQJMWeb_Effect_logo_2 {
            0% {
                left: -30%;
            }

            48.48% {
                /* 添加停顿的百分比 */
                left: 20%;
            }

            50.50% {
                /* 添加停顿的百分比 */
                left: 20%;
            }

            100% {
                left: 110%;
            }
        }
    </style>
</div>
  `;
  const OpenAn = WLoadingPanel({
    content: OpenAnContentHtml,
    time: 6//650
  });



}

window.onload = function () {
  _INIT_PAGE_WebUtilPro_(() => {
    init_web();
  });
  window.onload = null;
};
