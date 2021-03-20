const router = require('express').Router()
const Promotion = require('../../models/Promotion')
const Joi = require('@hapi/joi')


const schemaPromotion ={
    dateDebut: Joi.date().min(3).required(),            
    titre: Joi.string().min(3).required(),                 
    dateFIn: Joi.date().min(6).required(),           
    
    
}

router.post( "/updatePromotion/:id", async (req, res) => {

    const {error} = Joi.validate(req.body, schemaPromotion)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }


        await Promotion.findById(req.params.id).then((promotion) => {
            (promotion.dateDebut = req.body.dateDebut),
            (promotion.titre = req.body.titre),
            (promotion.dateFIn = req.body.dateFIn),
            
            promotion
              .save()
              .then(() => res.status(200).json("promotion updated successfuly"))
              .catch((err) => res.status(400).json("Error :" + err));
        });
      })
    
      module.exports = router;