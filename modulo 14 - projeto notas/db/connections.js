const { MongoClient } = require('mongodb');
const url = "mongodb://localhost:27017/notesDb";

let _db;

const initDb = (callback) => {
  MongoClient.connect(url, { useUnifiedTopology: true })
    .then((client) => {
      _db = client;
      callback(null, _db)
    })
    .then((err) => {
      callback(err)
    })
}

const getDb = () => {
  return _db;
}

module.exports = {
  initDb,
  getDb,
}
