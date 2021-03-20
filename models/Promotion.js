const mongoose = require('mongoose')
const PromotionSchema = new mongoose.Schema({
    photo:[{
        type: String,
        default : 'image/default',
        
    }],
    titre:{
        type: String,
        required : true ,
        min: 6 
    },
    dateDebut:{
        type: Date,
        required : true ,
    },
    dateFIn:{
        type: Date,
        required : true ,
    }
    
},
{ timestamps: true })
module.exports = mongoose.model('Promotion', PromotionSchema)