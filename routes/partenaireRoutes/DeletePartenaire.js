const router = require("express").Router();
const Partenaire = require('../../models/Partenaire')
const verifyRole = require("../../verifyRole");



router.delete("/delete/:id",async (req, res) => {
      await Partenaire.findByIdAndDelete(req.params.id)
        .then((partenaire) => res.json("partenaire deleted"))
        .catch((err) => res.status(400).json("Error : " + err));
    }
  );

  module.exports = router