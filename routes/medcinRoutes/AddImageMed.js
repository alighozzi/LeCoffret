const router = require('express').Router()
const Medecin = require('../../models/Medcin')
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
router.post('/add/:medecinID/image', upload.single('imageMedecin'), async (req,res) =>{
    try{   
    //trouver le medecin  concerne
     const MedecinConcerne = await Medecin.findOne({_id: req.params.medecinID}) 
     MedecinConcerne.photo.push(req.file.path)
     await MedecinConcerne.save()
    }catch (err) {
        res.status(400).send(err)
        console.log(err)
    }  
})
module.exports = router