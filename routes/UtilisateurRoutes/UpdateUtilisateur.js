const router = require('express').Router()
const Utilisateur = require('../../models/Utilisateur')
const Joi = require('@hapi/joi')

const schemaUtilisateur ={
    nom: Joi.string().min(3).required(),            
    prenom: Joi.string().min(3).required(),                 
    mail: Joi.string().min(6).required().email(),           
    password: Joi.string().min(6).required(),       
    confirmPassword: Joi.string().min(6).required(),
    dateNaissance: Joi.date().required(),  
    telephone: Joi.number().min(8).required(),  
    adresse: Joi.string().min(3).required(),            
    ville: Joi.string().min(3).required(),         
    CodePostal: Joi.number().min(4).required(),    
}


router.post( "/update/:id", async (req, res) => {

      if (validator.isEmpty(req.body.password)) {
        const {error} = Joi.validate(req.body, schemaUtilisateur)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }  


        await Utilisateur.findById(req.params.id).then((user) => {
          (user.nom = req.body.nom),
            (user.prenom = req.body.prenom),
            (user.mail = req.body.mail),
            (user.password = req.body.password),
            (user.confirmPassword = req.body.confirmPassword),
            (user.dateNaissance = req.body.dateNaissance),
            (user.telephone = req.body.telephone),
            (user.adresse = req.body.adresse),
            (user.ville = req.body.ville),
            (user.CodePostal = req.body.CodePostal),
            user
              .save()
              .then(() => res.status(200).json("user updated successfuly"))
              .catch((err) => res.status(400).json("Error :" + err));
        });
      }})
    
      module.exports = router;