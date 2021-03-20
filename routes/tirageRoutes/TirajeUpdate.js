const router = require('express').Router()
const Tirage = require('../../models/Tirage')
const Joi = require('@hapi/joi')


const schemaTirage ={
    sponsor: Joi.string().min(3).required(),            
    titre: Joi.string().min(3).required(),                 
    date: Joi.date().min(6).required(),           
    description: Joi.string().min(6).required(),           
    nom: Joi.string().min(6).required(),           
    
    
}

router.post( "/updateTiraje/:id", async (req, res) => {

    const {error} = Joi.validate(req.body, schemaTirage)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }


        await Promotion.findById(req.params.id).then((promotion) => {
            (promotion.sponsor = req.body.sponsor),
            (promotion.titre = req.body.titre),
            (promotion.date = req.body.date),
            (promotion.description = req.body.description),
            (promotion.nom = req.body.nom),
            
            promotion
              .save()
              .then(() => res.status(200).json("Tiraje updated successfuly"))
              .catch((err) => res.status(400).json("Error :" + err));
        });
      })
    
module.exports = router;