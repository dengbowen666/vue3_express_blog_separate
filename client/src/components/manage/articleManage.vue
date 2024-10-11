<template>
    <div class="manage-content">
        <div class="manage_head">
            <div class="sort">
                <button @click="sort('date')" class="sort_button time">by时间</button>
                <button @click="sort('title') "
                class="sort_button
                letter">by字母</button>
            </div>

            <div class="search">
                <input type="text" placeholder="搜索" :class="{ active: show_input_flag, search_input: true }"
                    v-model="search_input" />
                <el-icon @click="search" class="search_icon">
                    <Search />
                </el-icon>
            </div>
        </div>
        <div v-if="resList.length > 0">
            <ul class="article-list">
                <li v-for="item in pages[current_page]" :key="item._id">
                    <div class="title_date">
                        <div class="title">{{ item.title }}</div>
                        <div class="date">{{ item.date }}</div>
                    </div>

                    <!-- 这里的info居然索到了style文件下对info的样式 -->
                    <div class="handle">
                        <button
                       class="article_modify" @click="modify(item._id)">

                            修改</button>
                        <button 
                    
                        class="article_delete" @click="article_delete(item._id)">删除</button>
                    </div>
                </li>
            </ul>
        </div>
        <div v-if="resList.length == 0" class="no_content">..空空如也</div>

        <div class="pagination">
            <div class="pre_page" :class="{ noclick: current_page <= 0 }">
                <el-icon @click="pre_page">
                    <CaretLeft />
                </el-icon>
            </div>
            <div class="current_page" v-if="!isChoosePage" @dblclick="isChoosePage = true;">{{ current_page + 1 }}</div>
            <div v-if="isChoosePage" class="choose_page">
                <el-input v-model="choose_page_number" @blur="choose_page" @keyup.enter="choose_page" placeholder="页数">
                </el-input>
            </div>
            <div class="next_page">
                <el-icon @click="next_page" :class="{ noclick: current_page == total_pages - 1 }">
                    <CaretRight />
                </el-icon>
            </div>
            <div class="total_pages">
                总页数 {{ total_pages }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import useStore from "../../store";
const store = useStore();
const { article } = store;
const { articleList } = storeToRefs(article);
// article既要本地持久存储，这里又要获取响应式数据，才能保证刷新不掉
// console.log(articleList);
const resList = ref(articleList.value);
// 只能用原始store里面list的深拷贝，不然修改了原始数据，pinia会自动更新，刷新页面就变了
const show_input_flag = ref(false);
// 先进入的页面是游客模式，那里已经从后端获取数据了，所以这里不需要再请求数据了,但是修改保存需要直接对数据库进行操作
const search_input = ref("");
// 是响应式的，所以值可以变化


function search() {
    if (!show_input_flag.value) {
        show_input_flag.value = true;
    } else {
        if (search_input.value == "") {

            resList.value = articleList.value;
            divide_page()
        }

        // 未完成逻辑，input展开时，如果input为空但是焦点在input则搜索全部，如果焦点不在input则关闭input框
        else {
            searchArticls();
        }
    }
}

function searchArticls() {
    const searchTerm = search_input.value.toLowerCase().trim();
    resList.value = articleList.value.filter((article) =>
        article.title.toLowerCase().includes(searchTerm)
    );
    // console.log(resList.value.length);


}
onMounted(() => {
    // 挂载的时候就找一次然后渲染出来
    searchArticls();

});
import { watch } from "vue";
watch(
    () => resList.value,
    async (newValue) => {
        divide_page()
    },
    { deep: true }
    // 这里需要深度监听，因为resList.value是引用类型，直接监听的话，值变了但是地址没变，监听不到
);

// 排序模块
function sort(choice: string) {
    if (choice == "date") {
        resList.value = resList.value.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateB.getTime() - dateA.getTime();
        });

        // 这里运用sort函数，自定义规则对页面上呈现的resList进行排序
        // 把之前按当地时间转换的date字符串转换成date对象，然后比较时间，按降序排列

    } else if (choice == "title") {
        resList.value = resList.value.sort((a, b) => {
            const titlea = a.title.split("")[0].toLowerCase();
            // 字符串标题先分割，成一个个字字符数组，然后再取首字母比较
            const titleb = b.title.split("")[0].toLowerCase();
            return titlea.charCodeAt() - titleb.charCodeAt();
            // 如果a<b则返回负数，a排在前面
        });

    }
}
const article_page = ref(10);
const pages = ref([]);
const total_pages = ref(0);
const current_page = ref(0);
// 分页业务
function pre_page() {
    if (current_page.value > 0) {
        current_page.value--
        choose_page_number.value = current_page.value + 1
    }

}
function next_page() {
    if (current_page.value < total_pages.value - 1) {

        current_page.value++
        choose_page_number.value = current_page.value + 1
    }
}
function divide_page() {
    // 分页，每次查找之后把查找得到的数据分在不同数组里，然后根据页数来显示
    total_pages.value = Math.ceil(resList.value.length / article_page.value);
    // 总页数向上取整
    // 写一个二维数组来存储查询得到的结果，每一页是一个数组
    pages.value = [];
    // 清空数组,不然会一直往里面加

    for (let i = 0; i < total_pages.value; i++) {
        pages.value.push(
            resList.value.slice(i * article_page.value, (i + 1) * article_page.value)
        );
    }
    console.log(pages.value);
}
const isChoosePage = ref(false)
const choose_page_number = ref()
const choose_page = () => {
    current_page.value = choose_page_number.value - 1
    isChoosePage.value = false

}
const router = useRouter()
function modify(id: string) {
    router.push({ name: 'article_write', params: { id: id } })


}

import { deleteArticle } from "../../api/deleteArticle";
import useReqArtivcle from "../../hook/useReqArticle/index"
const { reqA } = useReqArtivcle()
function article_delete(id: string) {
    if (confirm("确定删除吗？")) {
        deleteArticle(id).then(async (res) => {
            if (res.data.status == 200) {


                reqA().then(() => {
                    alert(res.data.message)
                })
                resList.value = articleList.value


            }
            else {
                alert(res.data.message)
            }
        }).catch((err) => {

        })
    }

}

</script>

<style scoped>
.manage-content {
    margin: 0 0 10px 20px;
    flex:1;
    padding: 40px;
    background-color: #ffffff44;
    border-radius: 10px;
    height: 90vh;
    position: relative;
    box-shadow: #222 0 0 10px;
   
}

.manage_head {
    position: absolute;
    width: 680px;
    display: flex;
    margin-top: -20px;
    justify-content: space-between;
    align-items: center;

    .search {
        position: relative;
        display: flex;
        align-items: center;

        input {
            border: 1px solid transparent;
            border-radius: 5px;
            outline: none;
            padding: 5px 10px;
            width: 10px;
            transition: all 1s ease-in-out;
            opacity: 0;
            /* 去掉默认的内框 */
        }

        input:active {
            border: none;
            outline: none;
        }

        input:focus {
            border: 1px solid #222;
        }

        .active {
            width: 180px;
            opacity: 1;
        }

        /* 虽然width是0但是因为有padding所以仍然有宽度 */
        /* 因为是spacebetween,自动靠右 */
        .el-icon {
            position: absolute;
            right: 0;
            width: 30px;
            height: 26px;
            background: #222;
            color: #fff;
            border: 1px solid #222;
            border-radius: 0px 5px 5px 0px;
            cursor: pointer;
        }
    }

    .sort{
        display: flex;
        width: 130px;
        justify-content: space-between;
       
        .sort_button{
            height: 60px;
            width: 60px;
            border-radius: 50%;
            /* 美观的球形 */
            background-color: var(--bgcolor);
            color: var(--color);
            cursor: pointer;
            transition: all 0.5s ease-in-out;
            /* 阴影 */
            box-shadow: #222 0 0 10px;
            border-color: transparent;
            
        }
        .time{
            --bgcolor:#222
            ;
            --color:#fff;
        }
        .time:hover{
            --bgcolor:#fff;
            --color:#222;
        }
        .letter{
            --bgcolor:#fff;
            --color:#222;
        }
        .letter:hover{
            --bgcolor:#222;
            --color:#fff;
        }
        .sort_button:hover{
            background-color: var(--bgcolor);
            color: var(--color);
        }

        
    }
}

.article-list {
    margin-top: 60px;

    li {
        display: flex;
        flex-direction: row;
        position: relative;
        justify-content: space-between;
        align-items: center;
        list-style: none;

        margin: 30px 0;

        .title_date {
            display: flex;
            align-items: center;
            height: 25px;

            .title {
                height: 100%;
                line-height: 25px;
                width: 100px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                /* 溢出隐藏不换行并且省略号 */
            }

            .title:hover {
                white-space: normal;
                overflow: scroll;
            }

            /* 鼠标放上去可以滑动显示 */
            .date {
                margin-left: 30px;
                font-size: 12px;
                color: #999;
            }
        }
    }

    li:after {
        position: absolute;
        content: "";
        display: block;
        height: 1px;
        width: 100%;
        top: 20px;
        background-color: #222;
        margin: 10px 0;
    }
}
.handle {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 90px;
    button{
        
      
      
        background-color: var(--bgcolor);
        color: var(--color);
        cursor: pointer;
        transition: all 0.5s ease-in-out;
        /* 阴影 */
        box-shadow: #7b525286 5px 5px 10px;
        border-color: transparent;
    

    }
    
}
.no_content {
    margin-top: 100px;
    text-align: center;

    font-size: 40px;
    color: #999;
}

.pagination {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
}

.pre_page {
    margin-right: 10px;

}

.current_page {
    color: #222;
    height: 30px;
    font-size: 15px;
    width: 28px;
    border: 1px solid transparent;
    text-align: center;
    line-height: 30px;
    background: #fff;
    border-radius: 5px;
}

.choose_page {
    color: #222;

    font-size: 12px;
    width: 30px;
    border: 1px solid transparent;
}

.noclick {
    color: #999;
    cursor: not-allowed;
}

.next_page {
    margin-left: 10px;
}

</style>
