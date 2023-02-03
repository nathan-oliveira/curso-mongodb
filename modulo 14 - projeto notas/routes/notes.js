const Router = require('express').Router;
const db = require('../db/connection');
const { ObjectId } = require('mongodb');

const router = Router();

router.get('/', function (req, res) {
  res.render('notes/create');
})

router.post('/', function (req, res) {
  const { title, description } = req.body;
  
  db.getDb()
    .db()
    .collection('notes')
    .insertOne({ title, description })
  
  res.redirect(301, '/');
})

module.exports = router;