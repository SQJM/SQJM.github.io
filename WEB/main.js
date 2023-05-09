// 将 WebGUIJsPro 对象挂载在全局作用域中，方便调用
with(WebGUIJsPro) {

    init(); // 初始化

    htmlPageOnLoad(800, function() {
        console.log(getNowFormatDate());
        console.log(getBrowserInfo());
        includeJsFile('./page-Help.js', function() {
            //console.log(_Help_()._data_);
        }, true);
        includeJsFile('./lang-English.js', function() {
            worldLangSupport(_English_(), $('.w-lang'));
        }, true);

        // 图片懒加载
        lazyLoadImg();

        // 初始化顶部浮动
        initTopFloatNavbar($('#navbar'));
        // 初始化侧边栏
        initSidebar($('#sidebarbtn'), $('#sidebar'));

        // 绑定html点击功能
        let cdv = 0;
        bindElementClickFn($('#html'), function(coordinate, fE) {
            cdv++;
            if (fE.id == "sidebar") {
                $('#sidebar').style.display = "none";
                $("#html").style.overflowY = "auto";
            }

            if (fE.id == "CopyrightNotice") {
                createTipBox({
                    title: "版权声明",
                    data: "\
                本网站所包含的所有内容，包括但不限于文字、图片、音频、视频、软件、标识、商标等，均受到相应的法律保护。未经本网站相关权利人授权，任何人不得以任何形式将本网站的任何内容以任何方式加以复制、转载、引用、传播、修改、编纂、翻译、汇编或发行。否则，本网站将追究相应的法律责任。\
                <br>本网站部分内容来自网络，如涉及版权等问题，请及时与本网站联系，我们将尽快删除相关内容。<br>\
                本网站保留对本声明作出随时修改的权利。"
                });
            }
            if (fE.id == "PrivacyPolicy") {
                createTipBox({
                    title: "隐私政策",
                    data: "我们非常重视保护用户的个人隐私。在您使用本网站时，我们将严格遵守相关的法律法规和隐私政策，保护您的个人信息安全。<br>\
                    本网站收集的用户信息主要包括您的姓名、电子邮件地址和电话号码等个人身份信息以及浏览器类型、操作系统、访问时间和日期等浏览信息。这些信息将用于向您提供更好的产品和服务体验，同时也会用于网站的统计和分析。<br>\
                    我们承诺不会向任何第三方出售或泄露用户的个人信息，除非经过您明确的授权或法律法规的要求。我们会采取合理的技术和管理措施，以确保您的个人信息安全可靠。<br>\
                    如果您有任何关于隐私政策的问题或疑虑，请联系我们，我们会尽快给予回复。我们会根据相关法律法规和本隐私政策，不断完善和优化本网站的隐私保护措施。"
                });
            }
            if (fE.id == "translateStudioPhilosophy") {
                createTipBox({
                    title: "工作室理念",
                    data: "\
                    我们的工作室文化是多元化和开放式的，<br>\
                    注重鼓励成员不断学习和发展，<br>\
                    以创造性和多元思维的方式应对世界的快速变化和工作室的持续发展."
                });
            }

            /*createMessageBox({
                text: "Index: " + cdv,
                showLocation: "bCenter",
                showTime: 2.5
            });*/

        });

        window.addEventListener("scroll", function() {
            if (getHtmlScrollOffset().y >= getElementWH($("#LogoImg"))[1]) {
                $(".LogoImg")[0].style.height = 0;
                $("#LogoImg").style.zIndex = -1;
            } else if (getHtmlScrollOffset().y == 0) {
                $("#LogoImg").style.zIndex = 1;
                $(".LogoImg")[0].style.height = getElementWH($("#LogoImg"))[1];
            }
        });

        { // 初始化操作
            $(".LogoImg")[0].style.height = getElementWH($("#LogoImg"))[1];
            $("#copyright").innerHTML = "World Studio © 2023";

elementAppearAnimation($(".eaa"));

        }


        /*CreateWindow({
            imgSrc: "./w-icon/图像.svg",
            title: "窗口",
            width: 150,
            height: 100,
            child: gg,
            limit: {
                top: 0,
                bottom: 100,
                left: 0,
                right: 100
            }
        });*/


    }); // 页面加载完成后执行的函数


    // 示例用法
    /*netRequest('https://worldstudio.netlify.app/web/index-main', {
            method: 'GET'
        })
        .then((response) => {
            console.log(response);
            return response; // 如果需要进一步处理，可以将响应数据返回
        })
        .catch((error) => {
            console.error(error);
        });*/

}