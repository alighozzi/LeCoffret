const router = require("express").Router();
const Medecin = require('../../models/Medcin')
const verifyRole = require("../../verifyRole");



router.delete("/delete/:id",async (req, res) => {
      await Medecin.findByIdAndDelete(req.params.id)
        .then((medecin) => res.json("medecin deleted"))
        .catch((err) => res.status(400).json("Error : " + err));
    }
  );
  module.exports = router