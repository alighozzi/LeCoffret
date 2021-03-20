const router = require('express').Router()
const Partenaire = require('../../models/Partenaire')
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
router.post('/add/:partenaireID/image', upload.single('imagePartenaire'), async (req,res) =>{
    try{   
    //trouver le partenaire  concerne
     const PartenaireConcerne = await Partenaire.findOne({_id: req.params.partenaireID}) 
     console.log(PartenaireConcerne)
     console.log(req.file.path)
     PartenaireConcerne.photo.push(req.file.path)
    console.log('photo pushed')
     await PartenaireConcerne.save()
    }catch (err) {
        res.status(400).send(err)
        console.log(err)
    }  
})
module.exports = router