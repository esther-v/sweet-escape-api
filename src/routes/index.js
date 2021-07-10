//Outils
const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");
const tipsController = require("../controllers/tipsController");
const isAuth = require("../middlewares/isAuth");

//Get
router.get("/", controller.home);
router.get("/tips/:id_tip", tipsController.tipDetails);
router.get("/search", tipsController.search);
router.get("/recent_tips", tipsController.recentTips);

//Post
router.post("/signup", controller.newAccount);
router.post("/login", controller.login);
router.post("/tips", isAuth, tipsController.addOne);

//Patch
router.patch("/tips/:id_tip", isAuth, tipsController.updateTip);

// DELETE
router.delete('/tips/:id_tip', isAuth, tipsController.deleteTip);

// Erreur 404
router.use("*", (request, response) => {
    response.status(404).json({message: "La ressource demandée est introuvable"});
  });

// Exportation router
module.exports = router;