const mongoose = require('mongoose')
const MedcinSchema = new mongoose.Schema({
    photo:[{
        type: String,
        default : 'image/default',
        
    }],
    nom:{
        type: String,
        required : true ,
        min: 6 
    },
    adresse:{
        type: String,
        required : true ,
        min: 6 
    },
    tel:{
        type: Number,
        required : true ,
        min: 6 
    }
    
},
{ timestamps: true }
)
module.exports = mongoose.model('Medecin', MedcinSchema)