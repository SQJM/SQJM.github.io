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