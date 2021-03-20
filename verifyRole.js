let user = require('./models/Utilisateur')

module.exports = function(role){
    return (req , res, next)=>{
        if (req.user.role !== role){
            res.status(401).json('not allowed')
        }
        next()
    }
}