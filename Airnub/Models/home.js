const db = require('../utils/databaseUtils'); // accesing sql database
module.exports = class Home {
  constructor(houseName, prices, city, rating, photoUrl, description,id) {
    this.houseName = houseName;
    this.prices = prices;
    this.city = city;
    this.rating = rating;
    this.photoUrl = photoUrl;
    this.description = description;
    this.id = id;
  }

  save() {
    if (this.id) { // update
        return db.execute(
        'UPDATE homes SET houseName =?,prices =?,city=?,photoUrl=?, rating =?, description=? WHERE id=?',
        [this.houseName, this.prices, this.city, this.photoUrl, this.rating, this.description, this.id]
      );
    } else { // insert
        return db.execute(
        'INSERT INTO homes (houseName, prices, city, photoUrl, rating, description) VALUES (?,?,?,?,?,?)',
        [this.houseName, this.prices, this.city, this.photoUrl, this.rating, this.description]
      );
    }
  }

  static fetchAll() {
    return db.execute('SELECT * FROM homes');  // return promise
  }

  static findById(homeId) {
    return db.execute("SELECT * FROM homes WHERE id=?",[homeId]);
  }

  static delById(homeId) {
    return db.execute("DELETE FROM homes WHERE id=?", [homeId]);
  }
};
