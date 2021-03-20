const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const UtilisateurSchema = new mongoose.Schema({
    nom:{
        type: String,
        required : true ,
        min: 6 
    },
    prenom:{
        type: String,
        required : true ,
        min: 6 
    },
    adresse:{
        type: String,
        required : true ,
        min: 6 
    },
    mail:{
        type: String,
        required : true ,
        min: 6 
    },
    password:{
        type: String,
        required : true ,
        min: 6 
    },
    dateNaissance:{
        type: String,
        required : true ,
        min: 6 
    }, 
    telephone:{
        type: Number,
        required : true ,
        min: 6 
    },
    role : {
        type : String,
        Default: 'Utilisateur',
        enum: ["Admin", "Utilisateur"]
    },
    ville :{
        type: String,
        required : true ,
        min: 6 
    },
    CodePostal:{
        type: Number,
        required : true ,
        min: 6 
    },
    date:{
        type: Date,
        default : Date.now
    },

    photo:[{
        type: String,
        default : 'image/default',
        
    }]
},

{ timestamps: true }
)
module.exports = mongoose.model('Utilisateur', UtilisateurSchema)