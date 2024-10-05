// const adminUser = {
//   username: "dengbowen",
//   password: "123456",
// };
const mongoose = require("mongoose");
const User = require("../../db_models/user/index");
const bcrypt = require("bcrypt");
const signin = (app) => {
  app.post("/api/signin", async (req, res) => {
    const { username, password } = req.body;
    console.log(username, password);
    try {
      let user = await User.findOne({
        username: username,
      });
      // console.log(user, user.passwordHash);
      //         在 Mongoose 中，findOne 方法的行为如下：如果找到了匹配的文档，它会解析（resolve）Promise 并返回找到的文档对象。 如果没有找到匹配的文档，它会解析（resolve）Promise 并返回 null。
      if (user != null) {
        // 找到了符合条件的用户

        bcrypt.compare(password, user.passwordHash, (err, isMatch) => {
          if (isMatch) {
            res.json({
              status: 200,
              success: true,
              message: "登录成功",
              token: user._id,
            });
          }
          //  弄了一个晚上，前端那边axios请求直接等不到结果然后返回Promise被拒绝，结果是这里if中的res.json没有执行，compare异步函数写成了comparesyn同步函数，所以前端那边一直等不到结果
        });
      } else {
        res.json({
          status: 401,
          success: false,
          message: "用户名或密码错误",
        });
      }
    } catch (err) {
      // 只有没有连接到数据库时才会抛出错误
      console.log(12345);
      res.status(500).json({
        success: false,
        message: "服务器错误",
      });
    }
  });
};
//   )
// };
module.exports = signin;
