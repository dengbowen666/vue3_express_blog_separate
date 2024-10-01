import { defineStore } from 'pinia'
import { ref, reactive } from "vue";
const useUserStore = defineStore('user', () => {
    persist: true;
  
    const name = ref<string>('')
    return { name }

},
    {
        persist: {
            key: "userinfo",
            storage: localStorage,
    }}



)
//  不仅仅是登陆组件可以访问name，其他所有组件都可以用到，且可以是响应式的，这就是集中管理状态
export default useUserStore