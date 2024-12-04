const express = require('express');
const http = require("http");
const path = require("path");

const contactsRouter = require('./controllers/contactController');

const app = express();
const server = http.createServer(app);

app.set("views", path.join(__dirname, "views"));
//le dossier qui contient les pages html est le views
app.set("view engine", "twig");
//l'outil utilise pour creer le code html est le twig
//nous aide a matchMedianipuler les donnees dans la page html notre interface va etre creer par le twig
app.use(express.json());
//pour analyser les données json
app.use(express.urlencoded({ extended: true }));
//pour analyser les url
app.use('/contacts', contactsRouter);


server.listen(3000, function(){
//function is a call back
    console.log("Server is running on http://localhost:3000");
});
//le server est en ecoute sur le port 3000
