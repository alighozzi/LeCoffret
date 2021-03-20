const router = require('express').Router()
const Promotion = require('../../models/Promotion')
const Joi = require('@hapi/joi')
const verifRole = require('../../verifyRole')

const schemaPromotion ={
    dateDebut: Joi.string().min(3).required(),            
    titre: Joi.string().min(3).required(),                 
    dateFIn: Joi.string().min(6).required(),           
    
    
}

router.post('/addPromotion',async (req, res) =>{
    //validate data before save the user
    const {error} = Joi.validate(req.body, schemaPromotion)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }   

    
    const newPromotion = new Promotion({
        dateDebut        :   req.body.dateDebut,
        titre    :   req.body.titre,
        dateFIn        :   req.body.dateFIn,
        
        
    })
    try{
       await newPromotion.save()
       res.send('medecin enregistrer') 
    }catch (err) {
        res.status(400).send(err)
        console.log(err)
    }
})
module.exports = router