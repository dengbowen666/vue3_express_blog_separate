<template>
    <div id="about">
        <h1 class="introBlog">系统介绍</h1>
        <p>这个博客系统是前后端相结合的一个练手项目</p>
        <h2>技术栈</h2>

        <h3>前端</h3>
        <ul>
            <li>vue3+ts</li>
            <li>element-plus</li>
            <li>vue-router</li>
        </ul>
        <h3>后端</h3>
        <ul>
            <li>node.js</li>
            <li>express</li>
            <li>mongoose</li>
        </ul>
        <h3>数据库</h3>
        <ul>
            <li>mongodb</li>
        </ul>


        <h2>实现功能</h2>
        <ul>
            <li>用户登录,登出</li>
            <li>文章发布、编辑、删除</li>
            <li>文章分类、标签管理</li>

        </ul>
        <h1 class="introAuthor">关于作者</h1>
        <h3>作者：dengbowen666</h3>
        <h1>我的网站</h1>
        <a href="https://dengbowen666.github.io/MyVuePressWeb/">https://dengbowen666.github.io/MyVuePressWeb/</a>


    </div>
</template>
<script setup lang="ts">

</script>
<style scoped>
#about {
    margin-top: 2rem;
    margin-left: 10rem;
    width: 500px;
}

ul {

    margin-left: 20px;
    display: block;
    box-shadow: 2px 2px 10px #000000;
    padding-left: 20px;
    background-color: #ffffff57;

    li {
        list-style: armenian;
    }
}

h1 {
    position: relative;
    border-bottom: #fffdfd2e 2px solid;
    margin: 20px 0px;
    font-size: 30px;
    height:50px;
    color: #000000;
    font-weight: 700;
    text-shadow: #aaa0a0ad 1px 1px 10px;
    animation: appear 2s ease;
    overflow: hidden;
}
@keyframes appear {
    0% {
        width:0%;
        opacity:0%
    }

    100% {
       width:100%;
       opacity:100%

    }
}

h1::after {
    content: '';
    display: block;
    position: absolute;
    width: 0%;
    height: 3px;

    background-image: linear-gradient(to right, #000000, #fff);
    transition: all 0.5s ease-in-out;

}

h1:hover::after {
    width: 100%;
    background-image: linear-gradient(to right, #000000, #fff);
    /* background-color: #fff; */
}

h2 {
    text-align: center;
    position: relative;
    font-size: 20px;
    color: #000000;
    font-weight: 700;
    margin: 30px;
}

h2::before {
    position: absolute;
    content: '';
    display: block;
    position: absolute;
    width: 40%;
    top: 50%;
    height: 2px;
    background-image: linear-gradient(to right, #000000, #c54a4a);
    transition: all 0.5s ease-in-out;
}

h2::after {
    position: absolute;
     content: '';
    display: block;
    position: absolute;
    width: 40%;
    top: 50%;
    right: 0%;
    height: 2px;
    background-image: linear-gradient(to right, #c54a4a, #000000);
}

    h3 {
        font-size: 15px;
        color: #000000;
        font-style: oblique;
        font-weight: 600;
        /* 缩进一个字符 */
        text-indent: 1em;
        margin: 10px 0px;
    }

    .introBlog {}

    .introAuthor {}</style>