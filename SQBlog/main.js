
// 文章列表
var _SQBlog_articleList_ = $("#SQBlog_ArticleList");

const setArticleListShowData = function (index, is = false) {
  const fragment = document.createDocumentFragment(); // 创建文档片段

  _SQBlog_articleList_.innerHTML = "";

  const createArticles = function (e, i) {
    const articleItem = document.createElement("div");
    articleItem.classList.add("articleItem");
    const tagStr = e["tag"].replace(/\[&\]/g, " ");
    articleItem.title = tagStr;

    const floatDiv = document.createElement("div");
    if (!SQBlog_pageSizeMin) {
      floatDiv.style.float = (i % 2 === 0) ? "left" : "right";

      const img = document.createElement("img");
      if (e["previewImg"] != "") {
        img.src = `./Article/${e["aid"]}/${e["previewImg"]}`;
      } else {
        img.src = "./BJ.png";
      }
      floatDiv.appendChild(img);
    }

    const widgetDiv = document.createElement("div");
    widgetDiv.classList.add("WebGUIJsPro-Widget");
    if (SQBlog_pageSizeMin) {
      widgetDiv.style.width = "98%";
      widgetDiv.style.display = "block";
    }

    const linkImg = document.createElement("img");
    linkImg.setAttribute("aid", e["aid"]);
    linkImg.title = "我要看这个文章";
    linkImg.classList.add("link");
    linkImg.src = "./res/icon/ico/link.svg";
    widgetDiv.appendChild(linkImg);

    const h2Title = document.createElement("h2");
    h2Title.setAttribute("aid", e["aid"]);
    h2Title.title = "我要看这个文章";
    h2Title.textContent = e["title"];
    widgetDiv.appendChild(h2Title);

    const spanContainer = document.createElement("span");

    const dateSpan = document.createElement("span");
    dateSpan.classList.add("date");
    dateSpan.textContent = e["date"];
    spanContainer.appendChild(dateSpan);

    const classifySpan = document.createElement("span");
    classifySpan.classList.add("classify");
    classifySpan.textContent = e["classify"];
    spanContainer.appendChild(classifySpan);

    const authorSpan = document.createElement("span");
    authorSpan.classList.add("author");
    authorSpan.textContent = e["author"];
    spanContainer.appendChild(authorSpan);

    widgetDiv.appendChild(spanContainer);

    const previewDiv = document.createElement("div");

    const pPreview = document.createElement("p");
    pPreview.textContent = e["preview"];
    previewDiv.appendChild(pPreview);

    widgetDiv.appendChild(previewDiv);
    if (!SQBlog_pageSizeMin) {
      articleItem.appendChild(floatDiv);
    }
    articleItem.appendChild(widgetDiv);

    fragment.appendChild(articleItem); // 将每个文章项添加到文档片段中
  }

  if (ArticleMetadata_node_type.length != 0 || is) {
    let i = index;
    let j = 0;
    for (; i < ArticleMetadata_node_type.length; i++) {
      j++;
      createArticles(ArticleMetadata_node_type[i], i);
      if (j == SQBlog_showArticleListNumber) {
        break;
      }
    }
  } else {
    _SQBlogCentralControlSystem_.getRangeArticleMetadataNode(index, SQBlog_showArticleListNumber).forItems((e, i) => {
      createArticles(e, i);
    });
  }

  _SQBlog_articleList_.appendChild(fragment); // 最后将文档片段一次性添加到页面中
  elementAppearAnimation($("#SQBlog_ArticleList").$(">div"));
}

var SQBlog_pageSizeMin = false;

function init_controlStyle() {
  const _WebGUIJsPro_diaLogs = $("#_WebGUIJsPro_diaLogs");
  _WebGUIJsPro_diaLogs.$("div").forItems((e) => {
    e.setStyle({
      left: `${(_WebGUIJsPro_diaLogs.offsetWidth - e.offsetWidth) / 2}px`,
      top: `${(_WebGUIJsPro_diaLogs.offsetHeight - e.offsetHeight) / 3.5}px`,
    });
  });

  $("#SQBlog_closeView").$("img")[0].click();

  {
    // 如果网页小于1350
    if (document.body.offsetWidth < 1350) {
      console.log("web page min 1350px");
      SQBlog_pageSizeMin = true;
      $("#SQBlog_ArticleListBox").setStyle({
        width: "100%",
      });
      $(".more", $("#SQBlog_sidebarTool"))[0].style.display = "block";
      $("#SQBlog_navigationBar").style.display = "none";
      const SQBlog_informationBar = $("#SQBlog_informationBar");
      SQBlog_informationBar.style.display = "none";
      SQBlog_informationBar.classList.add("SQBlog-move-style");
      const div = document.createElement("div");
      const about = document.createElement("button");
      about.innerText = "关于 ";
      about.style.float = "right";
      about.onclick = function () {
        new _WebGUIJsPro_DiaLogs({
          type: "info",
          title: "关于",
          text: SQBlog_about
        });
      }
      div.appendChild(about);
      const friendLink = document.createElement("button");
      friendLink.innerText = " 友链";
      friendLink.onclick = function () {
        const friendLink = document.createElement("div");
        SQBlog_friendLink.forItems((e) => {
          const content = e.split("[=]");
          friendLink.innerHTML += `<span><a href="https://${content[1]}">${content[0]}</a></span>&nbsp;&nbsp;`;
        });
        new _WebGUIJsPro_DiaLogs({
          type: "info",
          title: "友链",
          text: friendLink.outerHTML
        });
      }
      div.appendChild(friendLink);
      SQBlog_informationBar.appendChild(div);
    }
    // 如果网页小于600
    if (document.body.offsetWidth < 600) {
      console.log("web page min 600px");
      const SQBlog_openCentent_placeholder = $("#SQBlog_openCentent_placeholder");
      SQBlog_openCentent_placeholder.style.display = "none";
      $("#SQBlog_closeView").style.display = "none";
      SQBlog_openCentent_placeholder.$("img")[0].click();
    }
  }

  $("#SQBlog_openCentent_placeholder").setStyle({
    height: `${document.body.offsetHeight}px`,
  });

  $("#SQBlog_titleBox").$("div")[0].setStyle({
    width: `${$("#SQBlog_titleBox").offsetWidth - ($("#SQBlog_titleBox").offsetWidth * (30 / 100))}px`,
  });

}

function init_controlEvent() {

  const SQBlog_view = $("#SQBlog_view");

  $(".confirm", $("#SQBlog_selectPage"))[0].setVisibility(false);
  const searchInput = $("input", $("#SQBlog_search"))[0];
  const goButton = $(".go", $("#SQBlog_search"))[0];
  const delete_ = $(".delete", $("#SQBlog_search"))[0];
  const inputNumber = $("input", $("#SQBlog_selectPage"))[0];

  // 创建一个InputEvent事件
  const event = new InputEvent('input', {
    bubbles: true, // 事件冒泡
    cancelable: true // 事件可取消
  });

  const resetArticlesList = function (content) {
    if (SQBlog_filtrate.classify == "" && SQBlog_filtrate.date.length == 0 && SQBlog_filtrate.tag.length == 0) {
      ArticleMetadata_node_type.length = 0;
      inputNumber.max = Math.ceil(ArticleMetadata_node.length / SQBlog_showArticleListNumber);
      inputNumber.title = `页数 ${inputNumber.max}`;
      setArticleListShowData(0);
    } else {
      ArticleMetadata_node_type.length = 0;
      if (SQBlog_filtrate.classify != "") {
        ArticleMetadata_node.forEach(key => {
          if (ArticleMetadata_json[key]["classify"].includes(content)) {
            ArticleMetadata_node_type.push(ArticleMetadata_json[key]);
          }
        });
      }

      if (SQBlog_filtrate.date.length > 0) {
        ArticleMetadata_node.forEach(key => {
          if (ArticleMetadata_json[key]["date"].includes(content)) {
            ArticleMetadata_node_type.push(ArticleMetadata_json[key]);
          }
        });
      }

      if (SQBlog_filtrate.tag.length > 0) {
        ArticleMetadata_node.forEach(key => {
          if (ArticleMetadata_json[key]["tag"].includes(content)) {
            ArticleMetadata_node_type.push(ArticleMetadata_json[key]);
          }
        });
      }

      inputNumber.max = Math.ceil(ArticleMetadata_node_type.length / SQBlog_showArticleListNumber);
      inputNumber.title = `页数 ${inputNumber.max}`;
      setArticleListShowData(0, true);
    }
  }

  const getUserClickDate = function (date) {
    if (date == null) {
      return;
    }
    if (date == undefined) {
      SQBlog_filtrate.date.length = 0;
    } else {
      SQBlog_filtrate.date[0] = date;
    }
    resetArticlesList(date);
  }

  const eventFunctionClick = function (event) {
    const element = event.target;
    const content = element.innerText;
    switch (element.getAttribute("tag")) {
      case "classify":
        $("div", $("#SQBlog_classify"))[0].$("b").forItems((e) => {
          e.classList.remove("on");
        });
        if ($(".classify", $("#SQBlog_elesPage"))[0]) {
          $(".classify", $("#SQBlog_elesPage"))[0].$("span").forItems((e) => {
            e.classList.remove("on");
          });
        }
        if (SQBlog_filtrate.classify == content) {
          SQBlog_filtrate.classify = "";
        } else {
          SQBlog_filtrate.classify = content;
          $("div", $("#SQBlog_classify"))[0].$("b").forItems((e) => {
            if (e.innerText == content) {
              e.classList.add("on");
            }
          });
          element.classList.add("on");
        }
        break;
      case "tag":
        let is = false;
        SQBlog_filtrate.tag.forItems((e, i) => {
          if (e == content) {
            SQBlog_filtrate.tag.splice(i, 1);
            $("div", $("#SQBlog_tag"))[0].$("span").forItems((e) => {
              if (e.innerText == content) {
                e.classList.remove("on");
              }
            });
            element.classList.remove("on");
            is = true;
          }
        });
        if (!is) {
          SQBlog_filtrate.tag.push(content);
          $("div", $("#SQBlog_tag"))[0].$("span").forItems((e) => {
            if (e.innerText == content) {
              e.classList.add("on");
            }
          });
          element.classList.add("on");
        }
        break;
      default:
        return;
    }
    resetArticlesList(content);
  }

  $("#SQBlog_elesPage").onclick = function (event) {
    eventFunctionClick(event);
  }

  $("#SQBlog_informationBar").onclick = function (event) {
    const element = event.target;
    if (element.getAttribute("tag") == "article") {
      $("#SQBlog_move_style_background").click();
      if (element.getAttribute("aid") != "" && element.getAttribute("aid") != null) {
        $("#SQBlog_navigationBar").style.display = "none";
        includeJsFile(pagePath + "Article.js", () => {
          page_SQBlog_Article(element.getAttribute("aid"));
          SQBlog_nowPage = "文章";
        }, true);
      }
      return;
    }
    eventFunctionClick(event);
  };

  { // 侧边工具栏

    // 滚动到顶部
    $("#SQBlog_sidebarTool").$(".up")[0].onclick = () => {
      const scrollToTop = function () {
        setTimeout(() => {
          if ($("#MainWindow").scrollTop > 0) {
            $("#MainWindow").scrollTop -= 10;
            scrollToTop();
          } else {
            return;
          }
        }, 1);
      }

      scrollToTop();
    };

    // 主页
    $("#SQBlog_sidebarTool").$(".home")[0].onclick = () => {
      const t = loadingAnimation_1();
      $("#SQBlog_navigationBar").$(".home")[0].click();
      setTimeout(() => {
        $("#SQBlog_openCentent_placeholder").$("img")[0].click();
        setTimeout(() => {
          t.end();
        }, 600);
      }, 1000);
    };

    // 设置
    $("#SQBlog_sidebarTool").$(".set")[0].onclick = () => {
      const set = new _WebGUIJsPro_DiaLogs({
        type: "info",
        title: "设置",
      });
      set.returnDialogs().classList.add("SQBlog-set-window");
    };

    // 更多
    $("#SQBlog_sidebarTool").$(".more")[0].onclick = () => {
      $("#SQBlog_informationBar").style.display = "block";
      $("#SQBlog_informationBar").style.height = `${document.body.offsetHeight}px`;
      $("#SQBlog_move_style_background").setVisibility(true);
    };
    $("#SQBlog_move_style_background").setVisibility(false);
    $("#SQBlog_move_style_background").onclick = () => {
      if ($("#SQBlog_move_style_background").Visibility) {
        $("#SQBlog_move_style_background").setVisibility(false);
        $("#SQBlog_informationBar").style.display = "none";
      }
    }

    // 快链
    $("#SQBlog_sidebarTool").$(".fastLink")[0].onclick = () => {
      { // 获取分享文章id
        // 检查浏览器是否支持 Clipboard API
        if (navigator.clipboard) {
          // 获取粘贴板内容
          navigator.clipboard.readText()
            .then(text => {
              function isValidJSON(str) {
                try {
                  JSON.parse(str);
                  return true;
                } catch (error) {
                  return false;
                }
              }
              if (isValidJSON(text)) {
                const json = JSON.parse(text);
                $("#SQBlog_move_style_background").click();
                if (json.aid != "") {
                  new _WebGUIJsPro_DiaLogs({
                    type: "inquiry",
                    title: "快链",
                    text: `是否跳转到 文章?`,
                  }, (select) => {
                    if (select == "确定") {
                      const is = document.createElement("script");
                      is.src = `./Article/${json.aid}/article.js`;
                      is.onload = () => {
                        is.removePro();
                        $("#SQBlog_navigationBar").style.display = "none";
                        includeJsFile(pagePath + "Article.js", () => {
                          page_SQBlog_Article(json.aid);
                          SQBlog_nowPage = "文章";
                        }, true);
                      }
                      is.onerror = () => {
                        is.removePro();
                        new _WebGUIJsPro_DiaLogs({
                          type: "error",
                          title: "快链",
                          text: `没有此文章,无法实现跳转`,
                        });
                      }
                      $("head")[0].appendChild(is);
                    }
                  });
                } else {
                  new _WebGUIJsPro_DiaLogs({
                    type: "error",
                    title: "快链",
                    text: `空的链接,无法实现跳转`,
                  });
                }
              } else {
                new _WebGUIJsPro_DiaLogs({
                  type: "error",
                  title: "快链",
                  text: `错误的链接,无法实现跳转`,
                });
              }
            })
            .catch(err => {
              new _WebGUIJsPro_DiaLogs({
                type: "error",
                title: "分享",
                text: `无法获取粘贴板内容：${err}`,
              });
            });
        } else {
          new _WebGUIJsPro_DiaLogs({
            type: "error",
            title: "分享",
            text: `浏览器不支持 Clipboard API`,
          });
        }

      }
    };
  }

  { // 设置下拉查看
    $("#SQBlog_openCentent_placeholder").$("img")[0].addEventListener("click", () => {
      SQBlog_view.setStyle({
        opacity: "1",
        visibility: "visible",
      });
      $("#SQBlog_openCentent_placeholder").setStyle({
        height: "0px",
      });
      $("#SQBlog_titleBox").setStyle({
        backgroundColor: "rgba(210, 255, 250, 0.8)",
        boxShadow: "3px 3px 3px rgba(210, 255, 250, 1)",
        position: "fixed"
      });
      $("#MainWindow").setStyle({
        height: `${document.body.offsetHeight}px`,
      });
      $("#SQBlog_sidebarTool").setStyle({
        opacity: "1",
        visibility: "visible"
      });
    });

    $("#SQBlog_closeView").$("img")[0].addEventListener("click", () => {
      SQBlog_view.setStyle({
        opacity: "0",
        visibility: "hidden",
      });
      $("#SQBlog_openCentent_placeholder").setStyle({
        height: `${document.body.offsetHeight}px`,
      });
      $("#SQBlog_titleBox").setStyle({
        backgroundColor: "rgba(210, 255, 250, 0)",
        boxShadow: "3px 3px 3px rgba(210, 255, 250, 0)",
        position: "static"
      });
      $("#MainWindow").setStyle({
        height: ``,
      });
      $("#SQBlog_sidebarTool").setStyle({
        opacity: "0",
        visibility: "hidden"
      });
    });
  }

  { // 自动标题栏
    let lastScrollPosition = $("#MainWindow").scrollTop;
    const title = $("#SQBlog_titleBox");

    $("#MainWindow").onscroll = function () {
      const currentScrollPosition = $("#MainWindow").scrollTop;

      if (currentScrollPosition < lastScrollPosition) {
        title.setStyle({
          top: "0px",
          opacity: "1",
        });
        // console.log("向上滚动");
      } else {
        title.setStyle({
          top: `${-(title.offsetHeight - 10)}px`,
          opacity: "0.5",
        });
        // console.log("向下滚动");
      }

      lastScrollPosition = currentScrollPosition;
    };
    title.addEventListener("mouseenter", () => {
      if (title.style.opacity == "0.5") {
        title.setStyle({
          top: "0px",
          opacity: "1",
        });
      }
    });
  }

  { // 时间
    const td = $("#SQBlog_timeDate");
    setInterval(() => {
      td.innerText = getNowFormatDate();
    }, 1000);
  }

  { // 搜索
    goButton.style.display = "none";
    delete_.style.display = "none";
    searchInput.addEventListener("input", (event) => {
      const textValue = event.target.value;

      if (textValue == "" && delete_.style.display == "none" && goButton.style.display == "inline") {
        goButton.style.display = "none";
        return;
      }
      if (textValue !== "") {
        searchInput.style.width = "80%";
        goButton.style.display = "inline";
      }
    });

    goButton.onclick = function () {
      const value = searchInput.value;
      ArticleMetadata_node_type.length = 0;
      ArticleMetadata_node.forEach(key => {
        if (JSON.stringify(ArticleMetadata_json[key]).includes(value)) {
          ArticleMetadata_node_type.push(ArticleMetadata_json[key]);
        }
      });
      inputNumber.max = Math.ceil(ArticleMetadata_node_type.length / SQBlog_showArticleListNumber);
      inputNumber.title = `页数 ${inputNumber.max}`;
      searchInput.title = `搜索结果数量 ${ArticleMetadata_node_type.length}`;
      setArticleListShowData(0, true);
      searchInput.style.width = "65%";
      delete_.style.display = "inline";
    }

    delete_.onclick = function () {
      goButton.style.display = "none";
      searchInput.style.width = "100%";
      searchInput.value = "";
      ArticleMetadata_node_type.length = 0;
      inputNumber.max = Math.ceil(ArticleMetadata_node.length / SQBlog_showArticleListNumber);
      inputNumber.title = `页数 ${inputNumber.max}`;
      searchInput.title = `你还没有搜索哦 QAQ`;
      setArticleListShowData(0);
      delete_.style.display = "none";
    }
  }

  { // 配置和监听页码输入框
    let is_jsInput = false;
    inputNumber.max = Math.ceil(SQBlog_articleInfo_allArticleNumber / SQBlog_showArticleListNumber);
    inputNumber.title = `页数 ${inputNumber.max}`;
    inputNumber.addEventListener('input', function () {
      this.value = this.value.replace(/\D/g, '');
      const value = parseInt(this.value);
      if (value >= 1 && value <= parseInt(inputNumber.max)) {
        if (is_jsInput) {
          is_jsInput = false;
          $(".confirm", $("#SQBlog_selectPage"))[0].click();
        } else
          $(".confirm", $("#SQBlog_selectPage"))[0].setVisibility(true);
      } else if (value < 0) {
        this.value = 1;
      } else if (value > parseInt(inputNumber.max)) {
        this.value = inputNumber.max;
      } else if (value === "0") {
        this.value = 1;
      }
    });
    $(".confirm", $("#SQBlog_selectPage"))[0].onclick = function () {
      $(".confirm", $("#SQBlog_selectPage"))[0].setVisibility(false);
      $("#SQBlog_sidebarTool").$(".up")[0].click();
      setArticleListShowData((inputNumber.value * SQBlog_showArticleListNumber) - SQBlog_showArticleListNumber);
    };
    $(".home", $("#SQBlog_selectPage"))[0].onclick = function () {
      is_jsInput = true;
      inputNumber.value = 1;
      inputNumber.dispatchEvent(event);
    };
    $(".end", $("#SQBlog_selectPage"))[0].onclick = function () {
      is_jsInput = true;
      inputNumber.value = inputNumber.max;
      inputNumber.dispatchEvent(event);
    };
    $(".up", $("#SQBlog_selectPage"))[0].onclick = function () {
      is_jsInput = true;
      inputNumber.value -= 1;
      inputNumber.dispatchEvent(event);
    };
    $(".down", $("#SQBlog_selectPage"))[0].onclick = function () {
      is_jsInput = true;
      inputNumber.value++;
      inputNumber.dispatchEvent(event);
    };
  }

  // 日历
  _WebGUIJsPro_calendar($("#SQBlog_pigeonhole"), getUserClickDate);

}

function init_SQBlog() {

  /**
   * 给指定元素添加title
   */
  function setElementAddTitle(es, is = true) {
    es.forItems((e) => {
      if (is) {
        e.title = `This is ${e.tagName}`;
      } else {
        if (e.title == "") {
          e.title = `This is ${e.tagName}`;
        }
      }
    });
  }
  setElementAddTitle($("img"), false);
  setElementAddTitle($("input"), false);
  // 给所有图片添加不可移动属性
  $("img").forItems((e) => {
    e.draggable = false;
  });

  init_controlStyle();

  init_controlEvent();

  elementAppearAnimation($("#SQBlog_informationBar").$(">div"));

  { // fill 
    (function () {

      { // title
        const titleBox = info_json["titleBox"];
        $("#SQBlog_webIcon").innerHTML = `
            <img src="${titleBox["icon"]}">
            <span style="text-shadow: 0px 0px 2px #7e7e7e;color: #010101;">${titleBox["blogName"]}</span>
        `;
      }

      { // openCentent_placeholder
        const openCentent_placeholder = info_json["openCentent_placeholder"];
        $("div", $("#SQBlog_openCentent_placeholder"))[0].innerHTML = `
            <p>${openCentent_placeholder["welcome"]}</p>
            <span>${openCentent_placeholder["motto"]}</span>
        `;
      }

      { // informationBar
        const informationBar = info_json["informationBar"];

        { // 作者信息
          const personalInformation = informationBar["personalInformation"];
          $("#SQBlog_icon").src = personalInformation["icon"];
          $("#SQBlog_name").innerHTML = personalInformation["name"];
          $("#SQBlog_motto").innerHTML = personalInformation["motto"];

          // 文章数量
          $("b", $("#SQBlog_ArticleNumber"))[0].innerHTML = SQBlog_articleInfo_allArticleNumber;
          // 分类数量
          $("b", $("#SQBlog_ArticleClassify"))[0].innerHTML = SQBlog_classifyData.length;
          // 标签数量
          $("b", $("#SQBlog_ArticleTagNumber"))[0].innerHTML = SQBlog_tagData.length;

          const contact = Object.keys(personalInformation["contact"]);
          const contactInformation = $("#SQBlog_contactInformation");
          contact.forEach(key => {
            const value = personalInformation["contact"][key].split("[&]");
            contactInformation.innerHTML += `<a href="https://${value[1]}"><img title="${key}" src="${value[0]}"></a>`;
          });
        }

        {// 公告
          const announcement = informationBar["announcement"];
          $("div", $("#SQBlog_announcement"))[0].innerHTML = announcement["text"];
        }

        {// 分类
          const classify = $("div", $("#SQBlog_classify"))[0];
          classify.innerHTML = "";
          SQBlog_classifyData.forItems((e) => {
            classify.innerHTML += `<b tag="classify">${e}</b>`;
          });
        }

        {// 标签
          const tag = $("div", $("#SQBlog_tag"))[0];
          tag.innerHTML = "";
          SQBlog_tagData.forItems((e) => {
            tag.innerHTML += `<span tag="tag">${e}</span>`;
          });
        }
      }

      { // SQBlog_info
        const blogInfo = info_json["blogInfo"];

        let startDate = new Date(blogInfo["startRunDate"]);
        let todayDate = new Date();
        // 计算毫秒级的时间差
        let timeDiff = Math.abs(todayDate.getTime() - startDate.getTime());
        // 将时间差转换为天数
        let daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

        $("#SQBlog_blogInformation").$("div")[0].innerHTML = `
            <p class="runDay">
                <span class="key">运行天数:</span>
                <span class="value">${daysDiff}</span>
            </p>
            `;
      }
    })();
  }

  { // 初始化文章列表
    setArticleListShowData(0);
  }

  { // 填充最新文章 
    const newArticleList = $("div", $("#SQBlog_newArticleList"))[0];
    newArticleList.innerHTML = "";

    _SQBlogCentralControlSystem_.getNewDateArticleMetadataNode(SQBlog_newArticleListNumber).forItems((e) => {
      const div = document.createElement("div");
      div.setAttribute("aid", e["aid"]);
      div.setAttribute("tag", "article");
      div.setAttribute("title", e["date"]);

      const b = document.createElement("b");
      b.setAttribute("aid", e["aid"]);
      b.setAttribute("tag", "article");
      b.textContent = e["title"];

      const p = document.createElement("p");
      p.setAttribute("aid", e["aid"]);
      p.setAttribute("tag", "article");
      p.textContent = e["preview"];

      div.appendChild(b);
      div.appendChild(p);
      newArticleList.appendChild(div);
    });

  }

}

window.onload = function () {
  _INIT_PAGE_WebGUIJsPro_(() => {
    init_SQBlog();
  });
};

// window.addEventListener("resize", () => {init_controlStyle();});

init_controlEvent();
