const { ObjectId } = require("mongodb");
const { getDB } = require("../utils/databaseUtils");

// const db = require('../utils/databaseUtils'); // accesing sql database
module.exports = class Home {
  constructor(houseName, prices, city, rating, photoUrl, description,_id) {
    this.houseName = houseName;
    this.prices = prices;
    this.city = city;
    this.rating = rating;
    this.photoUrl = photoUrl;
    this.description = description;
    if (_id) {
      this._id = _id;
    }
  }

  save() {
    const db = getDB();
    const updateDetails = {
      houseName : this.houseName,
      prices : this.prices,
      city : this.city,
      rating : this.rating,
      photoUrl : this.photoUrl,
      description : this.description
    }
    if (this_id) { // update
      return db
        .collection("homes")
        .updateOne({ _id: new ObjectId(String(this._id)) } , {$set: updateDetails});
    } else {  // insert
      return db.collection("homes").insertOne(this);
    }
  }

  static fetchAll() {
    const db = getDB();
    return db.collection("homes").find().toArray();
  }

  static findById(homeId) {
    const db = getDB();
    return db
      .collection("homes")
      .find({ _id: new ObjectId(String(homeId)) })
      .next(); // matching homeId
  }

  static delById(homeId) {
    const db = getDB();
    return db
      .collection("homes")
      .deleteOne({ _id: new ObjectId(String(homeId)) }); // matching homeId
  }
};
