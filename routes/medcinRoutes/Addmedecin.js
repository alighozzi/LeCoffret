const router = require('express').Router()
const Medecin = require('../../models/Medcin')
const Joi = require('@hapi/joi')


const schemaMedecin ={
    nom: Joi.string().min(3).required(),            
    adresse: Joi.string().min(3).required(),                 
    tel: Joi.string().min(6).required(),           
    
    
}

router.post('/addmedecin', async  (req, res) =>{
    //validate data before save the user
    const {error} = Joi.validate(req.body, schemaMedecin)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }   

    
    const newMedecin = new Medecin({
        nom        :   req.body.nom,
        adresse    :   req.body.adresse,
        tel        :   req.body.tel,
        
        
    })
    try{
       await newMedecin.save()
       res.send('medecin enregistrer') 
    }catch (err) {
        res.status(400).send(err)
        console.log(err)
    }
})
module.exports = router