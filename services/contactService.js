const db = require('../database/database');
const { Op } = require('sequelize');
//on va avoir ici les fonctions de notre model contact

async function findAll(req,res,next){
    try{
        const { Contact } = await db();
        //on met await car la fonction db() est async
        const contacts = await Contact.findAll();
        //findAll est une methode de sequelize qui permet de recuperer toutes les données de la table contact
        //res.json(contacts); hethi tab3ith json nhbeou naba3thou html
        res.render('contact.twig', { title: "My form",contacts: contacts});
    } catch(e){
        console.log(e);
        res.status(500).send("Internal Server Error")
    }
}

async function createContact(req,res,next){
    try {
        const { Contact } = await db();
        const { fullname, phone } = req.body;
        //req.body continet les données envoyées par le client
        await Contact.create({fullname, phone});
        res.redirect("/contacts");
        //elle va nous rederiger vers la page contact
    } catch(e) {
        console.log(e);
        res.status(500).send("Internal Server Error");
    }
}

async function updateContact(req,res,next){
    try {
        const { Contact } = await db();
        const { fullname, phone } = req.body;
        const id = req.params.id;  // Get the contact ID from URL parameters
        //req.body continet les données envoyées par le client
        await Contact.update(
            { fullname, phone },
            { where: { id: id } }
        );
        res.redirect("/contacts");
    } catch(e) {
        console.log(e);
        res.status(500).send("Internal Server Error");
    }
}

async function deleteContact(req,res,next){
    try {
        const { Contact } = await db();
        const id = req.params.id;
        //req.body continet les données envoyées par le client
        await Contact.destroy({
            where: { id: id }
        });
        res.redirect("/contacts");
    } catch(e) {
        console.log(e);
        res.status(500).send("Internal Server Error");
    }
}

async function searchContact(req,res,next){
    try {
        const { Contact } = await db();
        const { search } = req.query;
        //req.body continet les données envoyées par le client
        const contacts = await Contact.findAll({
            where: {
                id: search
            }
        });
        res.render('contact.twig', { 
            title: "Search Results",
            contacts: contacts
        });
    } catch(e) {
        console.log(e);
        res.status(500).send("Internal Server Error");
    }
}
module.exports = {findAll, createContact, updateContact, deleteContact, searchContact};
