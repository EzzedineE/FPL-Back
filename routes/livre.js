const express = require("express")
const router = express.Router();
const livreCtrl = require('../controlors/livreCtrl')
const upload = require('../config/multer')


router.post('/:id', upload.single("contenue"), livreCtrl.livre);
router.get('/:id', livreCtrl.getOneLivre);
module.exports = router