const mongoose = require('mongoose');
// const favorite = require('./favorite');
// const { getDB } = require("../utils/databaseUtils"); accessing mongoDB databse
// const db = require('../utils/databaseUtils'); // accesing sql database

const homeSchema = new mongoose.Schema({
  houseName: { type: String, required: true },
  prices: { type: Number, required: true },
  city: { type: String, required: true },
  rating: { type: Number, required: true },
  photo: { type: String },
  description: { type: String },
  rules: { type: String },
  host: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

// homeSchema.pre('findOneAndDelete', async function (next) {
//   const homeId = this.getQuery()._id;
//   await favorite.deleteMany({ houseId: homeId });
//   next();
// });

module.exports = mongoose.model("Home", homeSchema);