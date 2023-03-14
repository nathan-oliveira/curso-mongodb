const router = require('express').Router();
const jwt = require('jsonwebtoken');
const multer = require('multer');

const Party = require('../models/party');
const User = require('../models/user');

const diskStorage = require('../helpers/file-storage');
const upload = multer({ storage: diskStorage });

const verifyToken = require('../helpers/check-token');

const getUserByToken = require('../helpers/get-users-by-token');

router.post('/', verifyToken, upload.fields([{ name: 'photos' }]), (req, res) => {
  const { title, description, party_date: partyDate } = req.body;

  let files = [];
  if (req.files) files = req.files.photos;

  if (title === null || description === null || partyDate === null) 
    return res.status(400).json({ error: 'Os campos "nome", "descrição" e "data" não podem ser vazio.' })
});

module.exports = router;
