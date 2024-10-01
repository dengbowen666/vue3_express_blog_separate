import request from "../../utils/request/index"


enum ReqApi{
    reqArticleApi="/article"
}
export const reqArticle = () => {
   return request.get(ReqApi.reqArticleApi)
    // 要不要return呢,必须的不然函数调用后返回空，无法await
}
