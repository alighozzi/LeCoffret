const router = require('express').Router()
const Utilisateur = require('../../models/Utilisateur')
const Joi = require('@hapi/joi')
const JoiDate = require("@hapi/joi-date");
const bcrypt = require("bcryptjs");

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

router.post('/inscription', async  (req, res) =>{
    //validate data before save the user
    const {error} = Joi.validate(req.body, schemaUtilisateur)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }   

    //verif email existing
    const emailExist = await Utilisateur.findOne({ mail: req.body.mail });
    if (emailExist) {
        return res.status(400).json("Email already taken")
    }
    //validate the password
    if (req.body.password != req.body.confirmPassword){
        return res.status(400).json("password and confirm password must be the same ");
    }
    //hashed the password
    const hashedpassword = await bcrypt.hash(req.body.password, 12);
    const newutilisateur = new Utilisateur({
        nom             :   req.body.nom,
        prenom          :   req.body.prenom,
        mail            :   req.body.mail,
        password        :   hashedpassword,
        confirmPassword :   req.body.confirmPassword,
        dateNaissance   :   req.body.dateNaissance,
        telephone       :   req.body.telephone,
        adresse         :   req.body.adresse,
        ville           :   req.body.ville,
        CodePostal      :   req.body.CodePostal,
        role            :   'Utilisateur'
    })
    try{
       await newutilisateur.save()
       res.send('Utilisateur enregistrer') 
    }catch (err) {
        res.status(400).send(err)
        console.log(err)
    }
})
module.exports = router