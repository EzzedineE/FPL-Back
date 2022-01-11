const mongoose = require('mongoose');


const connect =
    mongoose.connect(process.env.mongoose,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => console.log('Connexion à MongoDB réussie !'))
        .catch(() => console.log('Connexion à MongoDB échouée !'));



module.exports = connect