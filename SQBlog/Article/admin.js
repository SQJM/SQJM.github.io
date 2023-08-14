
var SQBlogCentralControlSystem_Article;

const SQBlogCentralControlSystem = function () {

    const init = function () {

    }

    const FindAidArticle = function (aid) {
        includeJsFile(`./Article/${aid}/article.js`, Function, true);
    }

    const FindAidArticleMetadataNode = function (aid) {
        ArticleMetadata_node.forEach(key => {
            if (ArticleMetadata_node[key]["aid"] == aid)
                return ArticleMetadata_node[key];
        });
        return null;
    }

    function getNewDateArticleMetadataNode(number) {
        const assist = function (number) {
            let cuont = new Array;
            ArticleMetadata_node.forEach(key => {
                const arr = [ArticleMetadata_json[key]["aid"], ArticleMetadata_json[key]["date"]];
                cuont.push(arr);
            });
            cuont.sort((a, b) => new Date(b[1]) - new Date(a[1]));
            if (number >= SQBlog_articleInfo_allArticleNumber)
                return cuont.slice(0, SQBlog_articleInfo_allArticleNumber);
            else {
                return cuont.slice(0, number);
            }
        }
        const arr = assist(number);
        let nodes = new Array;
        arr.forEach(e => {
            nodes.push(ArticleMetadata_json[e[0]]);
        });
        return nodes;
    }

    function getRangeArticleMetadataNode(index = 0, range, data = ArticleMetadata_node) {
        let arr = new Array;
        let i = index;
        let j = 0;
        for (; i < data.length; i++) {
            j++;
            const node = data[i];
            arr.push(ArticleMetadata_json[node]);
            if (j == range) {
                break;
            }
        }
        return arr;
    }

    return {
        init,
        FindAidArticle,
        FindAidArticleMetadataNode,
        getNewDateArticleMetadataNode,
        getRangeArticleMetadataNode,
    }
}

const _SQBlogCentralControlSystem_ = new SQBlogCentralControlSystem();
