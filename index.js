const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const usersRouter = require('./routes/users');
const { sequelize } = require('./models');

// Chargement des variables d'environnement depuis le fichier .env
dotenv.config();

// Configuration des middlewares
app.use(cors());
app.use(express.json());

// Configuration des routes
app.use('/users', usersRouter);

// Démarrage du serveur
const port = process.env.PORT;
sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
});

module.exports = app;
