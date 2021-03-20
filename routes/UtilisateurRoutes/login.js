const router = require('express').Router()
const Utilisateur = require('../../models/Utilisateur')
const Joi = require('@hapi/joi')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
require("dotenv").config();

const schemaUtilisateur ={
    mail: Joi.string().min(6).required().email(),           
    password: Joi.string().min(6).required(),       
}

router.post('/login', async  (req, res) =>{
    try{
    //validate data before save the user
    const {error} = Joi.validate(req.body, schemaUtilisateur)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }   

    //verif email existing
    const user = await Utilisateur.findOne({ mail: req.body.mail });
    if (!user) {
        return res.status(400).json("Email do not exist")
    }
    
    //dehashed the password
    const validpass = await bcrypt.compare(req.body.password, user.password);
    if (!validpass)
      return res.status(400).json("password incorrect please check again");

      let token = jwt.sign(
        { _id: user._id, role: user.role, email: user.email },
        process.env.TOKEN_SECRET,
        { expiresIn: 14400 }
      );
      res.header("Authorization", token);
      res.send({
        token,
        response: {
          _id: user._id,
          nom: user.nom,
          prenom: user.prenom,
          mail: user.mail,
          role: user.role,
        },
      });
    }
    catch (err) {
        res.status(400).json("Error : " + err);
      }
})
module.exports = router