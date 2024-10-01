<template>
  <div id="sign_wrap">
    <div id="content">
      <h1>后台管理</h1>
      <el-input v-model="name" placeholder="请输入用户名"></el-input>
      <el-input v-model="password" placeholder="请输入密码" type="password"></el-input>
      <el-button type="primary" @click="signin">登录</el-button>
      <el-button @click="cancel">取消</el-button>

    </div>
  </div>
</template>
<script setup lang="ts">
import { reqSignin } from '../../api/reqSignin'
import { ref,onMounted } from 'vue';
import { router } from '../../router/index.ts';
import useStore from '../../store/index'
import { storeToRefs } from 'pinia'
const usestore = useStore()
//从pinia仓库中获取name，但是此时解构出来的name不是响应式的，所以需要用到storeToRefs
const { user } = usestore
const { name } = storeToRefs(user)
// let {name} = storeToRefs(usestore)


let password = ref('')
// (废)从浏览器存储中读取用户名和密码
onMounted(() => {
  const token = localStorage.getItem('isLogin_token')
  if (token) {
    // (废)如果浏览器存储中有token，那么说明用户已经登录过，直接从用token向后端获取账号密码，填充到input框，跳转到admin_home
    setTimeout( () => {

      // try {
      //   const res = await reqSignin(name.value, password.value, token)
      // if (res.data.status === 200) {
      //     name.value = res.data.userinfo.username
      //     password.value = res.data.userinfo.password
      //   }
        // 按理说都能找到用户的，因为token就是相应用户在数据库中的_id
      // }catch (err) {
      //   alert('服务器错误')
      // }
      
      
      router.push({ name: 'admin_home' })
    }, 20)




  }
  else {
    name.value = ''
    password.value = ''
  }
}
)

//如果没有token，则清空name和password需要手动输入在登陆 
async function signin() {
  try {
    if (name.value.length < 6 || password.value.length < 6) {
      alert('用户名和密码必须大于6位')
      return
    }
    let res = await reqSignin(name.value, password.value)
    if (res.data.status === 200) {
      console.log(res.data);

      // 登录成功，将用户名和密码存储到浏览器存储中
      // localStorage.setItem('name', name.value)
      // localStorage.setItem('password', password.value) 
      localStorage.setItem('isLogin_token', res.data.token)
      // 将服务器返回的token存储到浏览器存储中
      setTimeout(() => router.push({ name: 'admin_home' }), 200)
      // 延迟200毫秒后跳转到admin_home，直接跳转，那么content处的组件article_pre不会正常展示，需要手动刷新

      // 非常奇怪，如果不这样直接导航到admin的子路由而是导航到admin_home，那么进入admin_home后content处的组件article_pre不会正常展示，需要手动刷新页面
      //现在把content处的组件article_pre这块路由全删了

    }
    else {
      alert(res.data.message)

    }
  }
  catch (err) {
    alert('服务器错误或者try中代码执行错误')
    //  如果await的promise被reject了，那么就会抛出异常，所以需要用catch来捕获异常
  }

}


const cancel = () => {
  router.push({ name: 'visitor_article_pre' })
  // 为什么这里push到子路由visitor_article_pre才不会白屏，而push到父路由/visitor_home就会白屏

}

</script>
<style scoped>
#sign_wrap {
  text-align: center;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center
}

#content {
  width: 300px;
}

#sign_wrap h1 {
  font-size: 30px;
  color: #383a42;
  padding: 10px;
}

#sign_wrap div {
  padding-bottom: 20px;
}
</style>