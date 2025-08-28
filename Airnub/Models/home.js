const fs = require('fs');
const path = require('path');

const rootDir = require('../utils/pathUtils');

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
      const homeDataPath = path.join(rootDir, "Data", "homes.json");
      fs.writeFile(homeDataPath, JSON.stringify(registeredHomes), (err) => {
        console.error("File Written Succesfully", err);
      });
    });
  }

  static fetchAll(callback) {
    const homeDataPath = path.join(rootDir, "Data", "homes.json");
    fs.readFile(homeDataPath, (err, data) => {
      callback(!err ? JSON.parse(data) : []);
    });
  }
};
