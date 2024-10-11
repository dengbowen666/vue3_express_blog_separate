<template>
  <div class="edit_container">
    <div class="edit_wrap">
      
        <button class="return_button" size="small" @click="$router.go(-1)">《《《</button>
      
      <div class="edit_head key">标题</div>
      <el-input v-model="title" placeholder="请输入标题"></el-input>
      <div class="tag_wrap key">
        <span>标签: </span>
        <el-tag class="tag_margin" :key="tag" v-for="tag in labels" :closable="true" :close-transition="true"
          @close="handleClose(tag)" type="primary">{{ tag }}
        </el-tag>
        <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="mini"
          @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
      </div>
      <div class="edit_head key">简介</div>
      <el-input type="textarea" :rows="5" placeholder="请输入简介" v-model="gist">
      </el-input>
      <div class="edit_head key">内容 (Markdown编辑器)</div>
      <div class="markdown">
        <textarea class="markdown_input" v-model="content" @input="update"></textarea>
        <div class="markdown_compiled" v-html="compiledMarkdown"></div>
        <div class="clear"></div>
      </div>
      <div class="save_button">
        <el-button type="primary" @click="saveArticle">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted,shallowRef ,watch} from 'vue'
import { marked } from 'marked'

import "highlight.js/styles/monokai-sublime.css";

let title = ref('')
let gist = ref('')
let content = ref('')
let labels = ref<string[]>([])
let inputVisible = ref(false)
let inputValue = ref('')
let compiledMarkdown = shallowRef('')


import { useRoute } from 'vue-router';
// 接收路由参数
const route = useRoute()
const articleId = ref()

import { reqArticle } from '../../api/reqArticle';
// 获取文章详情，方便在上面修改
const getArticleDetail = async () => {
  const result = await reqArticle(articleId.value)
  const res = result.data[0]
  console.log(res);
  
  if(res){
    title.value = res.title
    gist.value = res.gist
    content.value = res.content
    labels.value = res.labels
    compiledMarkdown.value = marked(res.content)
  }
  else {
    console.log('没有获取到文章详情'); 
    // 说明这里传过去请求文章的id有问题，是新写作界面
  }

  // console.log(res.title);
}
// 这里路由传递参数的时机不是太清楚
articleId.value = route.params.id as string
watch(() => route.params.id, (newId) => {
  articleId.value = newId; // 更新 articleId
  console.log('Updated Article ID:', articleId.value); // 这里应该有值
});
onMounted(() => {
  
 
  
  
    
    getArticleDetail()
    
  

})




const showInput = () => {
  inputVisible.value = true
}

const handleInputConfirm = () => {
  let { value } = inputValue
  if (value) {
    labels.value.push(value)
    inputValue.value = ''
    inputVisible.value = false
  }
}

const handleClose = (tag: string) => {
  const index = labels.value.indexOf(tag)
  if (index !== -1) {
    labels.value.splice(index, 1)
  }
}

var rendererMD = new marked.Renderer();
marked.setOptions({
  renderer: rendererMD,
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
 
});//基本设置
// console.log(marked('I am using __markdown__.'));
const update = () => {
  compiledMarkdown.value = marked(content.value)
  console.log(compiledMarkdown.value);
  
}
import { postArticle } from '../../api/postArticle/index'

let articleData = reactive({})
import { useRouter } from 'vue-router';

// 保存修改和增添文章后，调用hook函数，请求后端更新文章列表，并跳转到管理主页
import useReqArticle from '../../hook/useReqArticle/index.ts'
const { reqA } = useReqArticle()
const router = useRouter()
const saveArticle = () => {
  articleData = {
    _id: articleId.value,
    title: title.value,
    gist: gist.value,
    content: content.value,
    labels: labels.value,
    date: new Date().toLocaleString()
  }
//想了想文章还是不要自己定id1234，mongodb数据库每个文档自带一个_id,把所有要用到的id都修改成_id，article_detail传递的params参数也是_id了，


  // 调用API保存文章数据,调用包装的axios->request再包装成的函数postArticle
  postArticle(articleData).then((res) => {
    if (res.data.status === 200) {
      alert(res.data.message)
      reqA().then(()=>{ router.push({ name: 'admin_home' }) })
      
    }
    else if (res.data.status === 500){
      alert(res.data.message)
    }
  }).catch((err) => {
    console.log(err)
  })
  console.log(articleData)
  
}

onMounted(() => {
  update() // 初始化时渲染Markdown
})
</script>

<style scoped>
.edit_container {
  flex: 1;
  position: relative;
}

.edit_wrap {
  padding: 20px 100px;
  font-size: 16px;
}


.return_button {
  position: absolute;
  padding-right: 10px;
  left:30px;
  top:45px;
  color: #409EFF;
  background: #000;
  border: none;
  border-radius: 1px;
}
.return_button:hover{
  color: #b6b9bc;
  background: #000;
}



.tag_wrap {
  text-align: left;
  padding: 20px 0;
}

.tag_wrap .input-new-tag {
  width: 80px;
  height: 28px;
}

.edit_wrap textarea {
  outline: none;
  font-size: 16px;
}

.edit_head {
  margin: 20px 0;
  text-align: left;
}

.key {
  color: #222;
  font-size: 20px;
  font-weight: 700;
}

.markdown {
  text-align: left;
  display: flex;
  justify-content: space-between;

  border: 1px solid #bfcbd9;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
  width: 100%;
  height: 800px;
  vertical-align: top;
  background: #f5f7f9;
  overflow: hidden;
}

.markdown textarea {
  border: none;
  resize: none;
  /*不可拖动*/
}

.markdown_input {
  
  display: block;
  width: 49%;
  height: 98%;
  background-color: white;
  padding-left: 1%;
  padding-top: 1%;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
}
/* 我说怎么解析出来的html没样式，原来是全局样式里面清除了默认的标签样式 */
.markdown_compiled {
  overflow: auto;
  
  display: block;
  width: 49%;
  height: 100%;
  padding: 5px 0 5px 1%;
ul{
  list-style-type: circle ;
}




  }


.save_button {
  padding: 40px 0;
}
</style>