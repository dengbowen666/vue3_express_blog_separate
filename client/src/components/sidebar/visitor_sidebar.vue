<template>
    <div class="placeholder"></div>
    <div id="left_menu">
        <div class="menu_name">
            <h1>BOWEN'S BLOG</h1>
            <h5>采菊东篱下</h5>
        </div>
        
        <nav>
            <ul>
                <router-link v-for="item in sidebarOptions" :key="item.id" 
                :to="item.path" 
                :class="{active:activeindex===item.id}"
                @click="changeActive(item.id)"
                >
                    <li class="nav" >
                      <el-icon v-html="item.icon"></el-icon><div class="nav_name">   {{ item.name }}</div>
                    </li>
                </router-link>
            </ul>
        </nav>
        <div class="tip"><span>游客模式，无法编辑</span></div>
        <div class="info">
            <img src="../../assets/head.png" class="author" alt="head">
            <div class="info_name">欢迎 游客</div>
            <div class="archive">
                <ul>
                    <router-link to="/article">
                        <li>
                            <span class="archive_count">{{ articleNumber }}</span>
                            <style_change/>
                        </li>
                    </router-link>
                </ul>
            </div>
            <ul class="communication">
                <li class="communication_item">
                    <a href="#">
                        <img src=" ../../assets/图标/github.svg" alt="">
                        <span>GitHub</span>
                    </a>
                </li>
                <li class="communication_item">
                    <a href="#">
                        <img src="../../assets/图标/gitee-copy.svg" alt="">
                        <span>Gitee</span>
                    </a>
                </li>
                <li class="communication_item">
                    <a href="#">
                        <img src="../../assets/图标/bilibili.svg" alt="">
                        <span>BiliBili</span>
                    </a>
                </li>
                <li class="communication_item">
                    <a href="#">
                        <img src="../../assets/图标/知乎.svg" alt="">
                        <span>ZhiHu</span>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>
<script setup lang="ts">
import style_change from './sidebar_components/style_change/index.vue'
import "./style/index.css"
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
// 该钩子函数帮助获取现在的路径，方便我确定当前在哪个页面
let activeindex = ref(1)
onMounted(() => {
    const route = useRoute();
    const routerPath = route.path;
    sidebarOptions.forEach((item) => {
        if (item.path === routerPath) {
             activeindex.value = item.id
        }
    })
})
// 这个操作解决了在刷新页面后，activeindex没有及时更新的问题，如果activeindex没有及时更新，那么active类就不会被添加到对应的li标签上，导致页面刷新后，高亮的标签不正确

const changeActive = (id: number) => {
    activeindex.value = id
}
const sidebarOptions = [{
    id: 1,
    name: "首页",
    path: "/visitor_home/visitor_article_pre",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" ><path fill="currentColor" d="M192 413.952V896h640V413.952L512 147.328zM139.52 374.4l352-293.312a32 32 0 0 1 40.96 0l352 293.312A32 32 0 0 1 896 398.976V928a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V398.976a32 32 0 0 1 11.52-24.576"></path></svg>`,
}, {
    id: 2,
    name: "关于",
    path: "/visitor_about",
     icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" ><path fill="currentColor" d="M176 416a112 112 0 1 0 0 224 112 112 0 0 0 0-224m0 64a48 48 0 1 1 0 96 48 48 0 0 1 0-96m336-64a112 112 0 1 1 0 224 112 112 0 0 1 0-224m0 64a48 48 0 1 0 0 96 48 48 0 0 0 0-96m336-64a112 112 0 1 1 0 224 112 112 0 0 1 0-224m0 64a48 48 0 1 0 0 96 48 48 0 0 0 0-96"></path></svg>`,

}, {
    id: 3,
    name: "登录",
    path: "/signin",
    icon:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" ><path fill="currentColor" d="M288 320a224 224 0 1 0 448 0 224 224 0 1 0-448 0m544 608H160a32 32 0 0 1-32-32v-96a160 160 0 0 1 160-160h448a160 160 0 0 1 160 160v96a32 32 0 0 1-32 32z"></path></svg>`
}
]



</script>
<style scoped>
.tip{
    border-bottom: 1px solid #000;
}

</style>