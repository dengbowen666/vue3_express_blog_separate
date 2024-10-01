import  request  from "../../utils/request/index";
enum postArticleApi {
  postArticle = "/article/postArticle",
}
export const postArticle = (article: Object) => {
    // console.log(1);
    
  return request.post(postArticleApi.postArticle, {
    article
  });
}
