const router = require("express").Router();
const Tirage = require('../../models/Tirage')
const verifyRole = require("../../verifyRole");



router.delete(
    "/delete/:id",
    async (req, res) => {
      await Tirage.findByIdAndDelete(req.params.id)
        .then((tirage) => res.json("tirage deleted"))
        .catch((err) => res.status(400).json("Error : " + err));
    }
  );

  module.exports = router