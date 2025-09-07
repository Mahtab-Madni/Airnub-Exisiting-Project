// const { getDB } = require("../utils/databaseUtils");
const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  houseId:
  {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
    ref: 'Home',
  }
})

module.exports = mongoose.model("Favorite", favoriteSchema);