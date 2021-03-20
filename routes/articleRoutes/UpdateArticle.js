const router = require('express').Router()
const Article = require('../../models/Article')
const Joi = require('@hapi/joi')


const schemaArticle ={
    titre: Joi.string().min(3).required(),            
    description: Joi.string().min(3).required(),                 
    contenue: Joi.string().min(6).required(),           
    source: Joi.string().min(6).required(),           
}


router.post( "/updateArticle/:id", async (req, res) => {

  const {error} = Joi.validate(req.body, schemaArticle)
  if (error) {
      return res.status(400).send(error.details[0].message)
  }   


        await Article.findById(req.params.id).then((article) => {
          (article.titre = req.body.titre),
            (article.description = req.body.description),
            (article.contenue = req.body.contenue),
            (article.source = req.body.source),
            article
              .save()
              .then(() => res.status(200).json("article updated successfuly"))
              .catch((err) => res.status(400).json("Error :" + err));
        });
      })
    
      module.exports = router;