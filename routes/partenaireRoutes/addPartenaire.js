const router = require('express').Router()
const Partenaire = require('../../models/Partenaire')
const Joi = require('@hapi/joi')


const schemaPartenaire ={
    lien: Joi.string().min(3).required(),            
    titre: Joi.string().min(3).required(),                 
    description: Joi.string().min(6).required(),           
    
    
}

router.post('/addpartenaire', async  (req, res) =>{
    //validate data before save the user
    const {error} = Joi.validate(req.body, schemaPartenaire)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }   

    
    const newPartenaire = new Partenaire({
        lien        :   req.body.lien,
        titre    :   req.body.titre,
        description        :   req.body.description,
        
        
    })
    try{
       await newPartenaire.save()
       res.send('medecin enregistrer') 
    }catch (err) {
        res.status(400).send(err)
        console.log(err)
    }
})
module.exports = router