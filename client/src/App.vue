

<template>
   <div id="app">
  <div id="left"></div>
  <div id="main">
          <router-view name="sidebar" :key="$route.fullPath"></router-view>
          <!-- 加上这个key属性解决路径变化不刷新路由的问题 -->
          <router-view name="content" :key="$route.fullPath"></router-view>
          <router-view name="rightbar" :key="$route.fullPath"></router-view>
          <router-view name="footer" :key="$route.fullPath"></router-view>

        </div>
         <div id="right"></div>
        <el-backtop :right="100" :bottom="100" />
        </div>

       
</template>
  

<script lang="ts" setup>
import { onMounted, onUnmounted, ref, provide } from 'vue';

onUnmounted(() => {
  localStorage.removeItem('isLogin')
})
// 此次登录，退出页面的时候就把token清除，下次登录的时候，token就没了，需要重新登录，但是开发环境下，我不要这行实现




const addThemeAttribute = (theme: string) => {
  const html = document.documentElement;
  html.setAttribute('class', theme);
}

const theme = ref(localStorage.getItem('myTheme') || 'light');

onMounted(() => {
  addThemeAttribute(theme.value);
});

const setTheme = (newTheme: string) => {
  // 改变主题
  theme.value = newTheme;

  addThemeAttribute(newTheme);

  localStorage.setItem('myTheme', newTheme);
};

provide('theme', {
  theme,
  setTheme
});


</script>



<style scoped>

#app{
    width: 100vw;
    
  background-color: var(--bg-color);
  color:var(--text-color) ;
    background-repeat:initial;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    transition: all 0.3s ease-in-out;
}
 #main {
  display: flex;
    
   flex:3;
    min-height: 100vh;
    margin: auto;
  }
#left{

  background: #000;
  flex:1;
}
#right{
  
  background: #000;
  flex:1;

}
</style>
