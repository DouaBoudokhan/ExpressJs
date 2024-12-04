const express = require('express');
const router = express.Router();

const { findAll, createContact, updateContact, deleteContact, searchContact } = require('../services/contactService');
router.get('/', findAll);
router.get('/search', searchContact);
router.post('/', createContact);
router.put('/:id', updateContact);
router.delete('/:id', deleteContact);
module.exports = router;