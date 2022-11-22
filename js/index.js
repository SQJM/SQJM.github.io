//
document.getElementById("ie_1_1").style.display="none";
//
document.getElementById("ie_2_1").style.display="none";
document.getElementById("ie_2_2").style.display="none";
//


//修改侧边栏高度

function s_h_(){
    var s_h = document.getElementById("sidebarId").scrollHeight;
	var s_w = document.getElementById("sidebarId").scrollWidth;
	document.getElementById("si").style.width = s_w + "px";
    document.getElementById("si").style.height = s_h + "px";
	
}

s_h_();

function date(){
	let oDate = new Date();
	let y=oDate.getFullYear();
	//获取当前年份
	let M=oDate.getMonth()+1;
	//获取当前月份，由于获取的是0~11，所以还应该再+1
	let day=oDate.getDate();
	//获取当前日份
	let h=oDate.getHours();
	//获取当前小时
	let m=oDate.getMinutes();
	//获取当前分钟
	let s=oDate.getSeconds();
	//获取当前秒数
	let week=oDate.getDay()+1;
	//获取今天星期
	var x = document.getElementById("Date");
	x.innerHTML = "日期:" + y + "年" + M + "月" + day + "号" + h + "点" + m + "分" + s + "秒";
}
date();
