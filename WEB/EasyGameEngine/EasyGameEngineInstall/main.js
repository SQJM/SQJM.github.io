var main = document.getElementById("main");
func_1();
function returnData(name,size,date,func1,func2) {
    return (
      "<div>\
        <h3>" +
      name +
      "</h3>\
        <p>" +
      size +
      "</p>\
        <p>" +
      date +
      '</p>\
        <button onclick="' +
      func1 +
      '">查看</button>\
        <button onclick="' +
      func2 +
      '">下载</button>\
      </div>'
    );
}

function func_1() {
    main.innerHTML = returnData("名字", "大小", "日期", "null();", "null();");
}

function func_2() {
  main.innerHTML = returnData(
    "名字_t",
    "大小_t",
    "日期_t",
    "null();",
    "null();"
  );
}