const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/pathUtils');
const homeDataPath = path.join(rootDir, "Data", "homes.json");
module.exports = class Home {
  constructor(houseName, prices, city, rating, photoUrl) {
    this.houseName = houseName;
    this.prices = prices;
    this.city = city;
    this.rating = rating;
    this.photoUrl = photoUrl;
  }

  save() {
    this.id = Math.random().toString();
    Home.fetchAll((registeredHomes) => {
      registeredHomes.push(this);
      fs.writeFile(homeDataPath, JSON.stringify(registeredHomes), (err) => {
        console.error("File Written Succesfully", err);
      });
    });
  }

  static fetchAll(callback) {
    fs.readFile(homeDataPath, (err, data) => {
      callback(!err ? JSON.parse(data) : []);
    });
  }

  static findById(homeId, callback) {
    this.fetchAll(homes => {
      const homeFound = homes.find((home) => home.id === homeId);
      callback(homeFound);
    });
  }
};
