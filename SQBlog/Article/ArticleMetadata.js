
let ArticleMetadata = `
[root{
}
`;

const ArticleMetadata_json = DataStoragePro().dspToJson(ArticleMetadata)["root"];

ArticleMetadata = "";

const ArticleMetadata_node = Object.keys(ArticleMetadata_json);

let ArticleMetadata_node_type = new Array;

// 所有文章数量
const SQBlog_articleInfo_allArticleNumber = ArticleMetadata_node.length;