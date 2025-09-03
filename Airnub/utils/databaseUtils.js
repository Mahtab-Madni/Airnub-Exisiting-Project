// const mysql = require('mysql2');

// const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   password: 'mahtab@123',
//   database: 'airnub',
// });

// module.exports = pool.promise();

const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;

const MONGO_URL = "mongodb+srv://mahtab:root@airnub.bic4o66.mongodb.net/?retryWrites=true&w=majority&appName=Airnub";
let _db;
const mongoConnect = (callback) => {
  MongoClient.connect(MONGO_URL)
    .then((client) => {
      console.log('MongoDB Connected');
      _db = client.db('airnub');
      callback();
    })
    .catch((err) => {
      console.log("Error while connecting to  mongodb", err);
    });
}

const getDB = () => {
  if (!_db) {
    throw new Error('Mongo not Connected');
  }
  return _db;
}
exports.mongoConnect = mongoConnect;
exports.getDB = getDB;