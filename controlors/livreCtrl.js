const { array } = require('../config/multer');
const Categorie = require('../modeles/categorie');
const Livre = require('../modeles/livres')








exports.getOneLivre = async (req, res, next) => {
    try {
        const livre = await Livre.findById(req.params.id)
        res.json(livre);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "internal server err" });
    }
}

exports.livre = async (req, res, next) => {

    req.body.contenue = req.file.filename
    console.log('file request:' + req.file);

    const livre = await Livre.create(req.body)

    try {
        const livres = await Categorie.findByIdAndUpdate(
            req.params.id,
            { $push: { listeDesLivres: livre._id } },
            { new: true }
        )
            .catch(error => res.status(400).json({ error }));
        res.json(livres)
        console.log(livres);

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "internal server err" });
    }
}


