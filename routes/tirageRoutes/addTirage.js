const router = require('express').Router()
const Tirage = require('../../models/Tirage')
const Joi = require('@hapi/joi')


const schemaTirage ={
    sponsor: Joi.string().min(3).required(),            
    titre: Joi.string().min(3).required(),                 
    date: Joi.string().min(6).required(),           
    description: Joi.string().min(6).required(),           
    nom: Joi.string().min(6).required(),           
    
    
}

router.post('/addTirage', async  (req, res) =>{
    //validate data before save the user
    const {error} = Joi.validate(req.body, schemaTirage)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }   

    
    const newTirage = new Tirage({
        sponsor      :   req.body.sponsor,
        titre        :   req.body.titre,
        date         :   req.body.date,
        description  :   req.body.description,
        nom          :   req.body.nom,
        
        
    })
    try{
       await newTirage.save()
       res.send('Tirage enregistrer') 
    }catch (err) {
        res.status(400).send(err)
        console.log(err)
    }
})
module.exports = router