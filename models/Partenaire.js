const mongoose = require('mongoose')
const PartenaireSchema = new mongoose.Schema({
    lien:{
        type: String,
        required : true ,
        min: 6 
    },
    photo:[{
        type: String,
        default : 'image/default',
        
    }],
    titre:{
        type: String,
        required : true ,
        min: 6 
    },
    description:{
        type: String,
        required : true ,
        min: 6 
    }
    
},
{ timestamps: true })
module.exports = mongoose.model('Partenaire', PartenaireSchema)