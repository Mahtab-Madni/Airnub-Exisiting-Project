const { getDB } = require("../utils/databaseUtils");

module.exports = class Favorite {
  constructor(houseId) {
    this.houseId = houseId;
  }

  save() {
    const db = getDB();
    return db.collection("favorites").findOne({ homeId: this.houseId })
      .then(exisitingFav => {
        if (!exisitingFav) {
          return db.collection("favorites").insertOne(this); // creating and returning a collection (json) named favorites
        }
        return Promise.resolve();
      });
  }
  static getFavorites() {
    const db = getDB();
    return db.collection("favorites").find().toArray();
  }

  static removeById(delhomeId) {
    const db = getDB();
        return db
          .collection("favorites")
          .deleteOne({ houseId: delhomeId }); // matching homeId
  }
};