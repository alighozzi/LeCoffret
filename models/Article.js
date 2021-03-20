const mongoose = require('mongoose')
const ArticleSchema = new mongoose.Schema({
    titre:{
        type: String,
        required : true ,
        min: 6 
    },
    description:{
        type: String,
        required : true ,
        min: 6 
    },
    contenue:{
        type: String,
        required : true ,
        min: 6 
    },
    source:{
        type: String,
        required : true ,
        min: 6 
    },
    photo:[{
        type: String,
        default : 'image/default',
        
    }],
    date:{
        type: Date,
        default : Date.now
    }
    
},
{ timestamps: true })
module.exports = mongoose.model('Article', ArticleSchema)