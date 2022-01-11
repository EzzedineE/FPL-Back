const User = require('../modeles/userModule')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

exports.downloadedFile = async (req, res, next) => {
    try {
        liste = [];
        const user = await User.findById(req.params.id);
        console.log(user);
        if (user.downloadListe !== null) {
            var dt = new Date();
            user.downloadListe.forEach(element => {
                if (element.date > dt.setMonth(dt.getMonth() - 1)) {
                    liste.push(element);
                }
            });
        }
        res.json(liste);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "internal server err" });
    }
}

exports.statistics = async (req, res, next) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "internal server err" });
    }
}


exports.register = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then((userRes) => {
            if (userRes == null) {
                bcrypt.hash(req.body.password, 10)
                    .then(hash => {
                        const userBody = req.body
                        const user = new User({ ...userBody, password: hash })
                        console.log(user);
                        user.save()
                            .then(() => res.status(201).json({ message: 'utilisateur cree !' }))
                            .catch(error => res.status(400).json({ error }))
                    })
                    .catch(error => res.status(500).json({ error }))
            } else {
                res.status(404).json({ msg: "email existant" })
            }

        })
        .catch((err) => { res.status(500).json(err) })

}

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouver' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'mot de passe incorecte' })
                    }
                    res.status(200).json({
                        user,
                        token: jwt.sign(
                            { userId: user._id },
                            process.env.TOKEN_SECRET,
                            { expiresIn: '24h' }
                        )
                    })
                })
                .catch(error => res.status(500).json({ error }));

        })
        .catch(error => res.status(500).json({ error }))

}

exports.download = async (req, res, next) => {
    console.log(req.body)
    try {
        const user = await User.findByIdAndUpdate(
            req.body.userid,
            { $push: { downloadListe: { id: req.body.livreid } } },
            { new: true }
        )
            .catch(error => res.status(400).json({ error }));
        res.json(user)
        console.log(user);

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "internal server err" });
    }
}