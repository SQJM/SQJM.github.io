let info_dsp = `
[root{
    <showArticleListNumber:"8"
    [titleBox{
        <icon:"./webicon.png"
        <blogName:"|SQ Blog"
    }
    [openCentent_placeholder{
        <welcome:"Hello!SQ Blog."
        <motto:"海内存知己天涯若比邻"
    }
    [informationBar{
        [personalInformation{
            <icon:"./webicon.png"
            <name:"SQJM"
            <motto:"Hello World"
            [contact{
                <github:"./res/icon/contactInformation/github.svg[&]github.com/SQJM/"
                <bilibili:"./res/icon/contactInformation/bilibili.svg[&]space.bilibili.com/523209464"
            }
        }
        [announcement{
            <text:"null"
        }
        [newArticleListNumber{
            <number:"6"
        }
    }
    [classify{
        <classify:""
    }
    [tag{
        <tag:""
    }
    [friendLink{
        <link:"SQJM[=]sqjm.netlify.app"
    }
    [about{
        <text:"这里是SQBlog!"
    }
    [blogInfo{
        <startRunDate:"2023-08-01"
    }
}
`;

const info_json = DataStoragePro().dspToJson(info_dsp)["root"];

info_dsp = "";

// 页面展示文章列表数量
const SQBlog_showArticleListNumber = info_json["showArticleListNumber"];

// 最新文章列表展示文章数量
const SQBlog_newArticleListNumber = info_json["informationBar"]["newArticleListNumber"]["number"];

// 分类
const SQBlog_classifyData = info_json["classify"]["classify"].split("[&]");

// 标签
const SQBlog_tagData = info_json["tag"]["tag"].split("[&]");

// 友链
const SQBlog_friendLink = info_json["friendLink"]["link"].split("[&]");

// 关于
const SQBlog_about = info_json["about"]["text"];

let SQBlog_filtrate = {
    "classify": "",
    "date": [],
    "tag": []
}

//console.log(info_json);