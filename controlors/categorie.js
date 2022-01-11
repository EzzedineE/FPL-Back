const Categorie = require('../modeles/categorie')
const livre = require('../modeles/livres')

exports.createCategorie = (req, res, next) => {
    delete req.body._id;
    const categorie = new Categorie({
        ...req.body
    });
    categorie.save()
        .then((result) => res.status(201).json(result))
        .catch(error => res.status(400).json({ error }));
    console.log(categorie);
}



exports.getAllCategorie = (req, res, next) => {

    Categorie.find().populate('listeDesLivres')
        .then(categories => res.status(200).json(categories))
        .catch(error => res.status(400).json({ error }),);

}
// exports.getOneCategorie = (req, res, next) => {

//     Categorie.findById()
//         .then(categories => res.status(200).json(categories))
//         .catch(error => res.status(400).json({ error }),);

// }

exports.getOneCategorie = async (req, res, next) => {
    console.log(req.params.id);
    try {
        const cate = await Categorie.findById(req.params.id).populate('listeDesLivres')
        res.json(cate);
        console.log(req.params.id);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "internal server err" });
    }
}