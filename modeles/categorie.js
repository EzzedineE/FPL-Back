const mongoose = require('mongoose');
// const { array } = require('../config/multer');
var Schema = mongoose.Schema;
const livres = require('../modeles/livres')

const categorieSchema = mongoose.Schema({
    listeDesLivres: [{ type: Schema.Types.ObjectId, ref: 'livres', }],
    nomcategorie: { type: String, },

}, { versionKey: false, timestamps: true });
module.exports = mongoose.model('Categorie', categorieSchema);