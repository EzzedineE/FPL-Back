const express = require("express")
const router = express.Router();
const authCtrl = require('../controlors/authCtrl')
router.post('/register', authCtrl.register);
router.post('/login', authCtrl.login);
router.post('/', authCtrl.download);
router.get('/statistics', authCtrl.statistics);
router.get('/downloaded/:id', authCtrl.downloadedFile);
module.exports = router