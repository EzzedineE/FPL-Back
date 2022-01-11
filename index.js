var cors = require('cors')
var morgan = require('morgan')
require('dotenv').config()
require('./dataBase/connect')
const categorieRoutes = require('./routes/categorie')
const authRoutes = require('./routes/authRoute')
const livreRoutes = require('./routes/livre')

const express = require('express')
const app = express()
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use('/static', express.static(__dirname + '/uploads'));
app.listen(process.env.PORT || 3000);
app.use('/api/auth', authRoutes);
app.use('/api/categorie', categorieRoutes);
app.use('/api/livres', livreRoutes);

