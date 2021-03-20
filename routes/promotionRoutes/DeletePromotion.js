const router = require("express").Router();
const Promotion = require('../../models/Promotion')
const verifyRole = require("../../verifyRole");



router.delete(
    "/delete/:id",
    async (req, res) => {
      await Promotion.findByIdAndDelete(req.params.id)
        .then((promotion) => res.json("promotion deleted"))
        .catch((err) => res.status(400).json("Error : " + err));
    }
  );

  module.exports = router