const router = require('express').Router()
const Partenaire = require('../../models/Partenaire')
const Joi = require('@hapi/joi')


const schemaPartenaire ={
    lien: Joi.string().min(3).required(),            
    titre: Joi.string().min(3).required(),                 
    description: Joi.string().min(6).required(),           
    
    
}

router.post( "/updatePartenaire/:id", async (req, res) => {

    const {error} = Joi.validate(req.body, schemaPartenaire)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }


        await Partenaire.findById(req.params.id).then((partenaire) => {
            (partenaire.lien = req.body.lien),
            (partenaire.titre = req.body.titre),
            (partenaire.description = req.body.description),
            
            partenaire
              .save()
              .then(() => res.status(200).json("partenaire updated successfuly"))
              .catch((err) => res.status(400).json("Error :" + err));
        });
      })
    
      module.exports = router;