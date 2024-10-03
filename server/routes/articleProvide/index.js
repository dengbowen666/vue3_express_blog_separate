const mongoose = require("mongoose");

const Article = require("../../db_models/article");

const articleProvide = (app) => {
  let articleRes;
  //获取文章
  app.get("/api/article", async (req, res) => {
const {id}=req.query;


    try {
      // console.log(id);
if (id != "") {
  articleRes = await Article.find({ _id: id });
}
else{
  articleRes = await Article.find({});
}
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
