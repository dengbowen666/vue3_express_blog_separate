const express = require("express");
const mongoose = require("mongoose");

const app = express();
// 默认实在本地开启服务
// 后续应该部署到云服务器上，然后通过域名访问
const port = 3000;
const cors = require("cors");
app.use(cors()); //使用cors中间件,解决跨域问题

// 连接数据库
try {
  mongoose
    .connect("mongodb://localhost:27017/vue_press_blog", {})
    .then(() => {
      console.log("数据库连接成功");
    });
} catch (e) {
  console.log(e);
}

// // 连接数据库，带上用户名密码
// try {
//   mongoose.connect('mongodb://vue_express_blog:dbw2004627@localhost:27017/vue_express_blog', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(console.log("连接数据库成功"));
// } catch (e) {
//   console.log(e);
// }
// 登录模块
app.use(express.json());
var signin = require("./routes/signin/index");
signin(app);

const createUser = require("./routes/signup/index");
// createUser()

var articleProvide = require("./routes/articleProvide/index");
articleProvide(app);

var postArticle = require("./routes/postArticle/index");
postArticle(app);
var deleteArticle = require("./routes/deleteArticle/index");
deleteArticle(app);

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});




