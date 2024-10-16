var Article = require("../../db_models/article");
const postArticle = (app) => {
  app.post("/api/article/postArticle", (req, res) => {
    const { _id, title, content, labels, gist, date } = req.body.article;

    //  model.create语法要注意，它返回的是一个Promise对象，所以需要用then和catch来处理异步操作
    console.log(_id);
    if (_id) {
      const result = Article.findOne({ _id: _id });
      if (result) {
        Article.updateOne(
          { _id: _id },
          {
            title,
            content,
            labels,
            gist,
            date,
          }
        )
          .then((doc) => {
            res.json({ status: 200, message: "更新成功" });
          })
          .catch((err) => {
            res.json({ status: 500, message: "服务器错误" });
          });
      }
    } else {
      Article.create({
        title,
        content,
        labels,
        gist,
        date,
      })
        .then((doc) => {
          res.json({ status: 200, message: "添加成功" });
        })
        .catch((err) => {
          res.json({ status: 500, message: "服务器错误" });
        });
    }
  });
};
module.exports = postArticle;
