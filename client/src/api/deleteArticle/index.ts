import request from "../../utils/request/index";
enum deleteArticleApi {
  deleteArticle = "/article/deleteArticle",
}
export const deleteArticle = (_id: string) => {
  // console.log(1);

  return request.delete(deleteArticleApi.deleteArticle+`/${_id}`);
};
