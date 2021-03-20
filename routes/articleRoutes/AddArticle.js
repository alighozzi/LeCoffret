const router = require('express').Router()
const Article = require('../../models/Article')
const Joi = require('@hapi/joi')


const schemaArticle ={
    titre: Joi.string().min(3).required(),            
    description: Joi.string().min(3).required(),                 
    contenue: Joi.string().min(6).required(),           
    source: Joi.string().min(6).required(),       
          
    
}

router.post('/addarticle', async  (req, res) =>{
    //validate data before save the user
    const {error} = Joi.validate(req.body, schemaArticle)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }   

    
    const newarticle = new Article({
        titre           :   req.body.titre,
        description     :   req.body.description,
        contenue        :   req.body.contenue,
        source          :   req.body.source,
 })
    try{
       await newarticle.save()
       res.send('article enregistrer') 
    }catch (err) {
        res.status(400).send(err)
        console.log(err)
    }
})
module.exports = router