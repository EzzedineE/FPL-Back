const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const userSchema = mongoose.Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: false },
    type: { type: String, required: false },
    downloadListe: [{ id: { type: Schema.Types.ObjectId, ref: 'livres' }, date: { type: Date, default: Date.now() } }],
}, { versionKey: false, timestamps: true });
module.exports = mongoose.model('User', userSchema);