import { defineStore } from "pinia";
import { ref, reactive } from 'vue'
const useArticleStore = defineStore(
  "article",
  () => {
    const articleList = ref([]);

    return {
      articleList,
    };
  },

  {
    persist: {
      key: "articleList",
      storage: localStorage,
    },
    }
//   持久储存，key为articleList，存储在localStorage中
);
export default useArticleStore