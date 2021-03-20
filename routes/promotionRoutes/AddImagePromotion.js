const router = require('express').Router()
const Promotion = require('../../models/Promotion')
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
router.post('/add/:promotionID/image', upload.single('imagePromotion'), async (req,res) =>{
    try{   
    //trouver le promotion  concerne
     const PromotionConcerne = await Promotion.findOne({_id: req.params.promotionID}) 
     console.log(PromotionConcerne)
     console.log(req.file.path)
     PromotionConcerne.photo.push(req.file.path)
    console.log('photo pushed')
     await PromotionConcerne.save()
    }catch (err) {
        res.status(400).send(err)
        console.log(err)
    }  
})
module.exports = router