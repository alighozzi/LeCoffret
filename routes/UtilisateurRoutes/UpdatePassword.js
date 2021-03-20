const router = require('express').Router()
const Utilisateur = require('../../models/Utilisateur')
const Joi = require('@hapi/joi')

const schemaUtilisateur ={
            
    password: Joi.string().min(6).required(),       
    confirmPassword: Joi.string().min(6).required(),
    
}

router.post( "/Password/:id", async (req, res) => {

    const user = Utilisateur.findOne({_id : req.params.id})
    const oldPassword = Utilisateur.password
    const newutilisateur = new Utilisateur({
        oldPass         :   req.body.oldPass,
        newpassword     :   req.body.newpassword,
        confirmPassword :   req.body.confirmPassword,
    })
    if (newutilisateur.oldPass ==  oldPassword && newpassword != oldPass && confirmPassword == newpassword ){
        const hashedpassword = await bcrypt.hash(req.body.newpassword, 12);
        user.password.push(hashedpassword)
        await user.save()
    }


})

module.exports = router;