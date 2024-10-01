<template>
    <div class="article">
     
        <router-view name="article" :key="$route.fullPath"></router-view>
 

<!-- 给<router-view>添加一个key属性，这样每次路由变化时，<router-view>都会重新渲染。： -->
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.article{
flex:1;
}
</style>