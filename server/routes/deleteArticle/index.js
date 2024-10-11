const mongoose = require('mongoose');
const Article = require('../../db_models/article/index');
const deleteArticle = (app) => {
    app.delete("/api/article/deleteArticle/:_id", async (req, res) => {
      const { _id } = req.params;

      try {
        const article = await Article.findByIdAndDelete(_id);
        res.status(200).json({
          message: "删除成功",
        });
      } catch (error) {
        res.status(500).json({
          message: "删除失败",
        });
      }
    });
}
 
module.exports = deleteArticle;



