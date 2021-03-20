const router = require('express').Router()
const Medecin = require('../../models/Medcin')
const Joi = require('@hapi/joi')


const schemaMedecin ={
    nom: Joi.string().min(3).required(),            
    adresse: Joi.string().min(3).required(),                 
    tel: Joi.string().min(6).required(),           
    
    
}


router.post( "/updateMed/:id", async (req, res) => {

    const {error} = Joi.validate(req.body, schemaMedecin)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }


        await Medecin.findById(req.params.id).then((medecin) => {
            (medecin.nom = req.body.nom),
            (medecin.adresse = req.body.adresse),
            (medecin.tel = req.body.tel),
            
            medecin
              .save()
              .then(() => res.status(200).json("Medcin updated successfuly"))
              .catch((err) => res.status(400).json("Error :" + err));
        });
      })
    
      module.exports = router;