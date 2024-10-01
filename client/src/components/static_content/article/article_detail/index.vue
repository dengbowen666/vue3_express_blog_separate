<template>
    <div id="content">
        <button class="return" @click="$router.go(-1)"> 返回首页</button>
        <!-- 直接跳回上级路由 -->
        <div class="article_wrap">
            <div class="article_title article_detail_title">{{ articleDetail.title }}</div>
            <div class="article_info">
                <span class="article_info_date">发表于：{{ articleDetail.date }}</span>
                <span class="article_info_label">标签：
                    <span v-if="articleDetail.labels.length === 0">未分类</span>
                    <el-tag v-else class="tag_margin" type="primary" v-for="tag in articleDetail.labels">{{ tag }}</el-tag>
                </span>
            </div>
            <div class="article_detail_content"  >
                <div class="markdown_compiled" v-html="compiledMarkdown"></div>
                <!-- {{marked(articleDetail.content)}} -->
                <!-- 这里如果直接content那么显示的就是edit编写的markdown文档 -->
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { ref,reactive } from 'vue';
import { storeToRefs } from 'pinia';

import useStore from '../../../../store'
import { marked } from 'marked';
const route = useRoute();
const itemId = route.params._id;
// 接收路由传递过来的参数
// 并且读取store里面的文章列表数据，综合判断这是那一篇文章，然后进行渲染
const store = useStore()
const { article } = store
let articleDetail = reactive<any>({})
let { articleList } = storeToRefs(article)
console.log(articleList.value);
let compiledMarkdown = ref<any>('')
articleList.value.forEach((item: any) => {
    if (item._id === itemId) {
        articleDetail = item
        
       compiledMarkdown.value= marked(articleDetail.content)
        
    }
})

</script>

<style scoped>
#content {
    position: relative;
   text-align: center;
}


.article_wrap {
    padding: 40px;
}
.article_detail_content{
    text-align: left;
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
.article_info_date{
    margin-right: 20px;
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

.return{
    position:absolute;
    top:30px;
    left:40px;
    border:1px solid #222;
    color:#222;
    font-size:14px;
    padding:3px 12px;
    cursor: pointer;
}

.return:hover{
    color:white;
    background:#222;

}

</style>