import { defineStore } from 'pinia'
import useArticleStore from './article';
import useUserStore from './user'
const useStore = defineStore(
    "main",
    function () {
        // state

        return {
            user: useUserStore(),
            article: useArticleStore(),
        };
    }



);
export default useStore