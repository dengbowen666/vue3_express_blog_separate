# Vue 3 + TypeScript + Vite

<ul><li>首页面即是未登录状态，可以查看查看博文，但是无法修改和编辑，也不能添加，点击sidebar登录入口，跳转到登录页面，输入用户名和密码，点击登录，登录成功后，跳转到首页面，此时可以编辑和修改博文，也可以添加博文，点击sidebar退出登录，跳转到登录页面，此时无法编辑和修改博文，也不能添加博文。</li>
<li>只有一个管理员用户,取消注册功能</li>

* 点展开查看全文，可以查看全文，可以点返回，返回到首页

* 首页可以预览文章的介绍，这里可以做花哨一点，按发布线时间线排序，可以搜索想要的文章，查看文章全文
* 管理模块：可以搜索文章，列表中展示结果文章的标题，后面有编辑和删除选项
*  写作模块，支持新写文章并发布，随后在主页可以看到了
</ul>
<h3>note</h3>
1.

2.本应用使用Vite作为构建工具，Vite是Vue官方推荐的构建工具，使用ES6模块化，开发环境下使用ES6模块化，生产环境下使用ES5模块化，使用ES6模块化可以更好的利用浏览器缓存，提高页面加载速度。  

3.本应用使用Vue 3作为前端框架，Vue 3是Vue的最新版本，Vue 3使用Composition API，Composition API是Vue 3的新特性，Composition API可以让开发者更好的组织代码，提高代码的可读性和可维护性  。  

4.vue应用虽然是客户端渲染，但是仍然需要从服务器获得Htmlcssjs文件，开发环境下是本机5173端口作为服务器，以后会部署在云服务器或者静态网站托管服务上。

5.在开发阶段，Express 应用默认会在本机（localhost）的 3000 端口上启动服务。这意味着，只有在同一台机器上，通过浏览器访问 http://localhost:3000 才能看到应用。为了使应用能够被外部访问，并且能够处理更多的并发请求，通常会将 Express 应用部署到一个生产环境中，并使用 Nginx 作为反向代理服务器。这样其他人也可以通过公网 IP 地址访问你的应用。

* 将Express 应用部署到一个服务器上，这个服务器可以是云服务器、虚拟专用服务器（VPS）等。
* 在同一个服务器上或者另一个负载均衡服务器上安装 Nginx
* 在 Nginx 的配置文件中设置反向代理规则，将来自 Nginx 的请求转发到你的 Express 应用


<h1 style="color:red;font-size:20px">这是markdown实时预览编辑器</h1>

<ul style="margin-top:10px">
<li>
可以在内部使用markdown语法和html语法
<li>
</ul>

```

console.log("hello!")

```

# 不足
* 按理说前端页面展示数据，比如加限制搜索应该是向后端传递限制的参数，然后按需求从数据库中取出，这样才节约，但是我为了编码方便，一次性先把数据取出来，然后在前端做限制，这样会浪费加载时间，以后会优化
* 组件间通信用的太少，太依赖store，store里面采用持久化储存导致很多信息长期留在了本地，用户名和密码存在本地太危险，应该采用token，token的生成依赖后端
* 没有使用路由守卫，应该使用路由守卫，防止未登录用户访问编辑页面
* 一个页面应该拆分出更小的组件方便管理
* 