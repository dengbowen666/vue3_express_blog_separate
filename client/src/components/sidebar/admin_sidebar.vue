<template>
  <div class="placeholder"></div>
  <div id="left_menu">
    <div class="menu_name">
      <h1>BOWEN'S BLOG</h1>
      <h5>采菊东篱下</h5>
    </div>
    <nav>
      <ul>
        <router-link v-for="item in sidebarOptions" :key="item.id" :to="item.path"
          :class="{ active: item.path === $route.path }" @click="item.click">
          <!-- 直接判断当前路径是否是该item的路径即可，更方便 -->
          <li class="nav">

            <el-icon v-html="item.icon"></el-icon>
            <div class="nav_name"> {{ item.name }}</div>
            <!-- 这里只能复制svg代码，直接插入html， -->
          </li>
        </router-link>
      </ul>
    </nav>
    <div class="tip"><span>管理员模式</span></div>
    <div class="info">
      <img src="../../assets/head.png" class="author" alt="head" />
      <div class="info_name">
        <p>你好</p>
        {{ username }}
      </div>
      <div class="archive">
        <ul>
         
            <li>
              
             <style_change/>
            </li>
         
        </ul>
      </div>
      <ul class="communication">
        <li class="communication_item">
          <a href="https://github.com/dengbowen666/vue3_express_blog_separate">
            <img src=" ../../assets/图标/github.svg" alt="" />
            <span>GitHub</span>
          </a>
        </li>
        <li class="communication_item">
          <a href="#">
            <img src="../../assets/图标/gitee-copy.svg" alt="" />
            <span>Gitee</span>
          </a>
        </li>
        <li class="communication_item">
          <a href="https://space.bilibili.com/446703056?spm_id_from=333.1007.0.0">
            <img src="../../assets/图标/bilibili.svg" alt="" />
            <span>BiliBili</span>
          </a>
        </li>
        <li class="communication_item">
          <a href="#">
            <img src="../../assets/图标/知乎.svg" alt="" />
            <span>ZhiHu</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
import useStore from "../../store/index";
import { onMounted, ref } from "vue";
let username = ref("");
import style_change from './sidebar_components/style_change/index.vue'
import { useRouter } from "vue-router";

const router = useRouter();
onMounted(() => {
  const store = useStore();
  const { user } = store;
  let { name } = user;
  username.value = name.toUpperCase();
  console.log(name);
});

// 登录时候输入的名字存在store里面，sidebar就使用这个变量并大写显示
// 遇到了数据不持久化的问题，页面刷新刚才改变的name数据就丢失，而是重新得到原始store中定义的name值
import "./style/index.css";

const logout = () => {
  if (confirm("确定要登出吗？")) {
    
    router.push({ name: 'visitor_article_pre' });
    localStorage.removeItem('isLogin');
// 登出时把loign的标志清除
    
  } else return;
};
const write = () => {
  router.push({ name: "article_post" });
};
const sidebarOptions = [
  {
    id: 1,
    name: "首页",
    path: "/admin_home",
    click: () => { },
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" ><path fill="currentColor" d="M192 413.952V896h640V413.952L512 147.328zM139.52 374.4l352-293.312a32 32 0 0 1 40.96 0l352 293.312A32 32 0 0 1 896 398.976V928a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V398.976a32 32 0 0 1 11.52-24.576"></path></svg>`,
  },
  {
    id: 2, name: "关于", path: "/admin_about", click: () => { },
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" ><path fill="currentColor" d="M176 416a112 112 0 1 0 0 224 112 112 0 0 0 0-224m0 64a48 48 0 1 1 0 96 48 48 0 0 1 0-96m336-64a112 112 0 1 1 0 224 112 112 0 0 1 0-224m0 64a48 48 0 1 0 0 96 48 48 0 0 0 0-96m336-64a112 112 0 1 1 0 224 112 112 0 0 1 0-224m0 64a48 48 0 1 0 0 96 48 48 0 0 0 0-96"></path></svg>`,
  },
  {
    id: 3,
    name: "写作",
    path: "/article_post",
    click: write,
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" ><path fill="currentColor" d="m199.04 672.64 193.984 112 224-387.968-193.92-112-224 388.032zm-23.872 60.16 32.896 148.288 144.896-45.696zM455.04 229.248l193.92 112 56.704-98.112-193.984-112-56.64 98.112zM104.32 708.8l384-665.024 304.768 175.936L409.152 884.8h.064l-248.448 78.336zm384 254.272v-64h448v64h-448z"></path></svg>`,
  },
  {
    id: 4, name: "登出", path: "", click: logout,
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" ><path fill="currentColor" d="m466.752 512-90.496-90.496a32 32 0 0 1 45.248-45.248L512 466.752l90.496-90.496a32 32 0 1 1 45.248 45.248L557.248 512l90.496 90.496a32 32 0 1 1-45.248 45.248L512 557.248l-90.496 90.496a32 32 0 0 1-45.248-45.248z"></path><path fill="currentColor" d="M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768m0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896"></path></svg>`,
  },
  // 对象数组保证每个对象keyvalue都有
];
</script>
<style scoped>

.tip {
  span {
    padding: 2px 10px;
    background-color: #222;
    color: #fff;
  }
}
</style>
