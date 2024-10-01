const mongoose = require("mongoose");

const Article = require("../../db_models/article");

const articleProvide = (app) => {
  let articleRes;
  //获取文章
  app.get("/api/article", async (req, res) => {
    try {
      articleRes = await Article.find({});
      res.json(articleRes);
      //  console.log(articleRes);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "访问数据库失败",
        success: false,
      });
      // 前端axios仍然会返回一个成功的promise
    }
  });
};
module.exports = articleProvide;
