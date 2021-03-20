const mongoose = require('mongoose')
const TirageSchema = new mongoose.Schema({
    photo:[{
        type: String,
        default : 'image/default',
        
    }],
    sponsor:{
        type: String,
        required : true ,
        min: 6 
    },
    lieu:{
        type: String,
        required : true ,
        min: 6 
    },
    date:{
        type: Date,
        required : true ,
        min: 6 
    },
    description:{
        type: String,
        required : true ,
        min: 6 
    },
    nom:{
        type: String,
        required : true ,
        min: 6 
    }
    
},
{ timestamps: true })
module.exports = mongoose.model('Tirage', TirageSchema)