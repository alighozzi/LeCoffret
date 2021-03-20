const router = require("express").Router();
const Article = require('../../models/Article')
const verifyRole = require("../../verifyRole");



router.delete(
    "/delete/:id",
    async (req, res) => {
      await Article.findByIdAndDelete(req.params.id)
        .then((article) => res.json("article deleted"))
        .catch((err) => res.status(400).json("Error : " + err));
    }
  );
  module.exports = router