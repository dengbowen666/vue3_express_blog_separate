<template>
  <div id="sign_wrap">
    <div class="container">
      <h1>后台管理</h1>



      <div class="form-control">

        <form>
          <div class="form-control">
            <input type="text" required v-model="name" class="input">

            <label>
              <span style="transition-delay: 0ms">N</span>
              <span style="transition-delay: 50ms">a</span>
              <span style="transition-delay: 100ms">m</span>
              <span style="transition-delay: 150ms">e</span>

            </label>
          </div>

          <div class="form-control">
            <input type="password" required v-model="password" class="input">
            <label class="password">
              <span v-for="(letter, index) in passwordArray" :key="letter" :style="{
                transitionDelay: `${(index + 1) * 50}ms`
              }">
                {{ letter }}
              </span>
            </label>
          </div>

          <p class="remember"><input type="checkbox" id="checkbox" v-model="checked"><span>remember me</span></p>
          <div class="btns">
            <button @click="signin" class="btn signin">登录</button>
            <button @click="cancel" class="btn cancel">取消</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reqSignin } from '../../api/reqSignin'
import { ref, onMounted } from 'vue';
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
  const token = localStorage.getItem('remember')
  if (token) {
    // (废)如果浏览器存储中有token，那么说明用户已经登录过，直接从用token向后端获取账号密码，填充到input框，跳转到admin_home
    name.value = "******"
    password.value = "******"
    // 获取input元素
    var inputElements = document.querySelectorAll('.input');

    // 禁用input元素
    inputElements.forEach(inputElement => {

      inputElement.disabled = true;
       inputElement.style.cursor = 'not-allowed';
    })

  }
  else {
    name.value = ''
    password.value = ''
  }
}
)

const checked = ref(false || localStorage.getItem('remember') ? true : false)
//如果没有token，则清空name和password需要手动输入在登陆 
async function signin() {



  try {
    if (name.value.length < 6 || password.value.length < 6) {
      alert('用户名和密码必须大于6位')
      return
    }
    let res = await reqSignin(name.value, password.value)
    if (res.data.status === 200) {
      console.log(res.data)
      console.log(checked.value);

      if (checked.value) {
        localStorage.setItem('remember', 'true')
      }
      else {
        localStorage.removeItem('remember')

      }
      localStorage.setItem('isLogin', res.data.token)
      setTimeout(() => router.push({ name: 'admin_home' }), 200)
      // 延迟200毫秒后跳转到admin_home，直接跳转，那么content处的组件article_pre不会正常展示，需要手动刷新

      // 将服务器返回的token存储到浏览器存储中


      // 非常奇怪，如果不这样直接导航到admin的子路由而是导航到admin_home，那么进入admin_home后content处的组件article_pre不会正常展示，需要手动刷新页面
      //现在把content处的组件article_pre这块路由全删了

    }
    else if (res.data.status === 401) {
      if (localStorage.getItem('remember')) {
        if (!checked.value) {
          localStorage.removeItem('remember')
        }
        // console.log(1111);
        localStorage.setItem('isLogin', 'true')
        router.push({ name: 'admin_home' })
      }
      else {
        alert(res.data.message)
      }
    }

  }
  catch (err) {
    alert('服务器错误')
    //  如果await的promise被reject了，那么就会抛出异常，所以需要用catch来捕获异常
  }
}
// }


const cancel = () => {
  router.push({ name: 'visitor_article_pre' })
  // 为什么这里push到子路由visitor_article_pre才不会白屏，而push到父路由/visitor_home就会白屏

}

const passwordWord = ref('Password')
const passwordArray = passwordWord.value.split('')

</script>
<style scoped>
#sign_wrap {
  text-align: center;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #fff
}
h1{

  margin-bottom: 50px;

}
.container {

  background-color: rgba(52, 14, 14, 0.4);
  padding: 20px 40px;
}





.form-control {
  position: relative;
  margin: 20px 0 40px;
  width: 300px;
}

.form-control input {
  background-color: transparent;
  border: 0;
  border-bottom: 2px #fff solid;
  display: block;
  width: 100%;
  padding: 15px 0 5px 0;
  font-size: 18px;
  color: #fff;
  position: relative;
  z-index: 100;
}

.form-control input:focus,
.form-control input:valid {
  outline: 0;
  border-bottom-color: var(--bg-color);
}

.form-control label {
  position: absolute;
  top: 5px;
  left: 0;
  pointer-events: none;
}

.form-control label span {
  display: inline-block;
  font-size: 18px;
  min-width: 5px;
  transition: 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.form-control input:focus+label span,
.form-control input:valid+label span ,
.form-control input:disabled+label span {
  color: var(--bg-color);
  transform: translateY(-30px);
}

.remember {
  display: flex;
  width: 200px;
  height: 20px;
  line-height: 15px;
  margin-bottom: 10px;

  input {
    margin-right: 3px;
    width: 15px;
  }
}

.btns{
  display: flex;
  justify-content: space-between;
  width: 300px;
  margin-top: 20px;
  .btn {
width: 120px;
font-weight: 500;
border:none;
}


.signin{
  background:#222;
  color: #fff;
}


.cancel{

}
}

</style>