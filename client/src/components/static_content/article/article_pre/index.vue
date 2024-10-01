<template>
    <div id="content">

        <div class="article_wrap" v-for="item in articleList">
            <div class="article_title" @click="articleDetail(item.id)">{{ item.title }}</div>
            <div class="article_info">
                <span class="article_info_date">发表于：{{ item.date }}</span>
                <span class="article_info_label">标签：
                    <span v-if="item.labels.length === 0">未分类</span>
                    <el-tag v-else class="tag_margin" type="primary" v-for="tag in item.labels">{{ tag }}</el-tag>
                </span>
            </div>
            <div class="article_gist">{{ item.gist }}</div>
            <div @click="articleDetail(item._id)" class="article_button article_all">阅读全文</div>
            <div class="article_underline"></div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed, ref, reactive, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { reqArticle } from '../../../../api/reqArticle/index'
import useStore from '../../../../store'

const store = useStore()
const { article } = store
let { articleList } = storeToRefs(article)
// 终于把这个list从store中获取过来了


async function reqA() {

    const res = await reqArticle()
    if (res.data.type === Object) {
        alert(res.data.message)
        console.log(res.data.message);
        
    } else {
        articleList.value = res.data
        console.log(res)
    }
    // 联和到后端server里面的providearticle如果没有联到数据库返回一个对象，对象里有失败的信息，如果联到了数据库返回一个数组，数组里是文章的列表
} onMounted(() => reqA())
//  这几行的执行顺序还要考虑一下

import { router } from '../../../../router/index';
import { useRoute } from 'vue-router';
const route = useRoute()
// // 获取当前路径

const articleDetail = (_id: string) => {

    // if (route.path === '/admin_home/article_pre') {
    //     router.push({ name: 'admin_article_detail', params: { _id } })
    // }
    // else {
        router.push({ name: 'visitor_article_detail', params: { _id } })
    // }
}




// 本来想articleDetail 函数将根据当前的路由状态（用户所在的父路由）决定跳转到哪个 article_detail 路由。但是总是只能跳一个所以只有对两个detail路由分别命名，根据当前路径判断跳转
</script>
<style scoped>
#content {
    text-align: center;
}


.article_wrap {
    padding: 40px;
}

.article_title {
    display: inline-block;
    color: #222;
    font-size: 34px;
    font-weight: 600;
    border-bottom: 1px solid white;
    cursor: pointer;
}

.article_title:hover {
    border-bottom: 1px solid #222;
}

.article_info {
    color: #999;
    font-size: 14px;
    padding-top: 8px;
}

.tag_margin {
    margin: 3px;
}

.article_gist {
    text-align: left;
    padding-top: 40px;
    padding-bottom: 40px;
    font-size: 16px;
}

.article_button {
    display: inline-block;
    padding: 3px 12px;
    border: 2px solid #222;
    color: #222;
    font-size: 14px;
    cursor: pointer;
}

.article_all:hover {
    color: white;
    background: #000;
    font-weight: 600;
}

.article_underline {
    height: 1px;
    width: 40px;
    background: #545455;
    margin: 80px auto 0;
}
.article_info_date{
    margin-right: 20px;
}
</style>