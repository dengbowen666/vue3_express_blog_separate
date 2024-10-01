

<template>
   <div id="app">
  
  <div id="main">
          <router-view name="sidebar" :key="$route.fullPath"></router-view>
          <!-- 加上这个key属性解决路径变化不刷新路由的问题 -->
          <router-view name="content" :key="$route.fullPath"></router-view>
        </div>
        <el-backtop :right="100" :bottom="100" />
        </div>
</template>
  

<script lang="ts" setup>
import { onMounted,onUnmounted } from 'vue';
// onUnmounted(() => {
//   localStorage.removeItem('isLogin_token')
// })
// 此次登录，退出页面的时候就把token清除，下次登录的时候，token就没了，需要重新登录，但是开发环境下，我不要这行实现
</script>



<style scoped>

#app{
    width: 100vw;
    
    background-image: radial-gradient(circle at 0%, rgba(77, 67, 67, 0.518),rgba(255, 0, 0, 0.269), rgba(44, 44, 42, 0.163), rgba(180, 18, 18, 0.644))
    ;
    background-repeat:initial;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
 #main {
  display: flex;
    
    width: 960px;
    min-height: 100vh;
    margin: auto;
  }
 
</style>
