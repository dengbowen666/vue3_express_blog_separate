// 写这个hook是为了把请求全部文章的业务独立出来，方便以后修改和复用
import { reqArticle } from "../../api/reqArticle";
import useStore from "../../store";
import { storeToRefs } from "pinia";

// 终于把这个list从store中获取过来了
function useReqArticle() {
const store = useStore();
const { article } = store;
let { articleList } = storeToRefs(article);
    async function reqA() {
      const res = await reqArticle("");
      if (res.data.type === Object) {
        alert(res.data.message);
        console.log(res.data.message);
      } else {
        articleList.value = res.data;
        console.log(res);
      }
      // 联和到后端server里面的providearticle如果没有联到数据库返回一个对象，对象里有失败的信息，如果联到了数据库返回一个数组，数组里是文章的列表
    }
    return { 
        reqA,
        articleList
    }
}
export default useReqArticle;

