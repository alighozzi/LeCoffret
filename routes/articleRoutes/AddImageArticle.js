const router = require('express').Router()
const Article = require('../../models/Article')
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function(req, file , cb){
        cb(null, './uploads/')
    },
    filename: function(req, file, cb){
        cb(null , file.originalname)
    }
})
const filtrage = (req , file , cb) =>{
    //tester le type du fichier
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null , true)
    }else {
        cb(new Error('type non valide '), false)
    }
}
const upload = multer({ 
    storage,
    limits:{
        //taille de la photo ne doit pas passer 5Mo
        fieldSize: 1024 * 1023 * 5 
    },
    fileFilter:filtrage
})
router.post('/add/:articleID/image', upload.single('imageArticle'), async (req,res) =>{
    try{   
    //trouver le produit  concerne
     const ArticleConcerne = await Article.findOne({_id: req.params.articleID}) 
     console.log(ArticleConcerne)
     console.log(req.file.path)
     ArticleConcerne.photo.push(req.file.path)
    console.log('photo pushed')
     await ArticleConcerne.save()
    }catch (err) {
        res.status(400).send(err)
        console.log(err)
    }  
})
module.exports = router