<template>
     <el-switch v-model="value1" 
    @change="changeTheme"

   
   :inactive-action-icon="Moon"  :active-action-icon="Sunny"
  style="--el-switch-on-color: #c79696; --el-switch-off-color: #222"
    />
 
</template>

<script lang="ts" setup>
import { ref, inject, onMounted } from 'vue'

const value1 = ref()
onMounted(() => {
    value1.value = localStorage.getItem('myTheme') === 'light' ? true : false
})
 
import { Sunny, Moon } from '@element-plus/icons-vue';

const { theme, setTheme } = inject<{ theme: Ref<string>, setTheme: (newTheme: string) => void }>('theme') || {};

const changeTheme = () => {
    if (value1.value) {
        setTheme('light')
    } else {
        setTheme('dark')
    }
    }


</script>
