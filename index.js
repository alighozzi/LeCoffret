const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");




//import routes 
const inscription = require('./routes/UtilisateurRoutes/inscription')
const login = require('./routes/UtilisateurRoutes/login')
 
//block d'ajout
const addArticle = require('./routes/articleRoutes/AddArticle')
const addMedecin = require('./routes/medcinRoutes/Addmedecin')
const addPartenaire = require('./routes/partenaireRoutes/addPartenaire')
const addPromotion = require('./routes/promotionRoutes/addPromotion')
const addTirage = require('./routes/tirageRoutes/addTirage')
const addImageArticle = require('./routes/articleRoutes/AddImageArticle')
const addImageMedecin     = require('./routes/medcinRoutes/AddImageMed')
const addImagePromotion   = require('./routes/promotionRoutes/AddImagePromotion')
const addImagePartenaire  = require('./routes/partenaireRoutes/AddImagePartenaire')
const addImageTiraje      = require('./routes/tirageRoutes/AddImageTirage')

//block update 
const updateUtilisateur   = require('./routes/UtilisateurRoutes/UpdateUtilisateur')
const updatePassword      = require('./routes/UtilisateurRoutes/UpdatePassword')
const updatePromotion     = require('./routes/promotionRoutes/PromotionUpdate')
const updateArticle       = require('./routes/articleRoutes/UpdateArticle')
const updatePartenaire    = require('./routes/partenaireRoutes/PartenaireUpdate')
const updateMedecin       = require('./routes/medcinRoutes/UpdateMedecin')
const updateTiraje        = require('./routes/tirageRoutes/TirajeUpdate')

//block delete
//const deleteUtilisateur   = require('./routes/UtilisateurRoutes/')
const deletePromotion     = require('./routes/promotionRoutes/DeletePromotion')
const deleteArticle       = require('./routes/articleRoutes/DeleteArticle')
const deletePartenaire    = require('./routes/partenaireRoutes/DeletePartenaire')
const deleteMedecin       = require('./routes/medcinRoutes/DeleteMedecin')
const deleteTiraje        = require('./routes/tirageRoutes/DeleteTirage') 

require("dotenv").config();
const app = express();
app.use(cors());
//read data with format json , create am express application
app.use(express.json());
app.use(express.static("uploads"));
//connection to database
const URL = process.env.BD_URL;
mongoose.connect(
  URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("connection to database is established successfully");
  }
);

//routes middleware
app.use("/api", inscription )
app.use("/api", login )

//block add 
app.use("/api", addArticle )
app.use("/api", addMedecin )
app.use("/api", addPartenaire )
app.use("/api", addPromotion )
app.use("/api", addTirage )
app.use("/api", addImageArticle )
app.use("/api", addImageMedecin    )
app.use("/api", addImagePromotion  )
app.use("/api", addImagePartenaire )
app.use("/api", addImageTiraje     )

//block update 
app.use("/api", updateUtilisateur )
app.use("/api", updatePassword    )
app.use("/api", updatePromotion   )
app.use("/api", updateArticle     )
app.use("/api", updatePartenaire  )
app.use("/api", updateMedecin     )
app.use("/api", updateTiraje      )

//block delete
//app.use("/api", deleteUtilisateur )
app.use("/api", deletePromotion   )
app.use("/api", deleteArticle     )
app.use("/api", deletePartenaire  )
app.use("/api", deleteMedecin     )
app.use("/api", deleteTiraje      )
 


//start the server 
app.listen(5000, () => {
    console.log("server is running");
  });
  