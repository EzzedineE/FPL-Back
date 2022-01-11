const express = require("express")
const router = express.Router();

const categorieCtrl = require('../controlors/categorie')

router.post('/', categorieCtrl.createCategorie);
router.get('/:id', categorieCtrl.getOneCategorie);
router.get('/', categorieCtrl.getAllCategorie);
module.exports = router