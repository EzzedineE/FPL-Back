const mongoose = require('mongoose');

const user = require('../modeles/userModule');
const livreSchema = mongoose.Schema({
    titre: { type: String, required: true },
    auteur: { type: String, required: true },
    description: { type: String, required: false },
    contenue: { type: String, required: true },

}, { versionKey: false, timestamps: true });
module.exports = mongoose.model('livres', livreSchema)