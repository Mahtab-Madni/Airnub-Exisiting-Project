const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/pathUtils');
const Favorite = require('./favorite');
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
    Home.fetchAll((registeredHomes) => {
      if (this.id) {
        // edit home
        registeredHomes = registeredHomes.map((home) => {
          if (home.id === this.id) {
            return this;
          }
          return home;
        });
      } else {
        // add home
        this.id = Math.random().toString();
        registeredHomes.push(this);
      }
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
    this.fetchAll((homes) => {
      const homeFound = homes.find((home) => home.id === homeId);
      callback(homeFound);
    });
  }

  static delById(homeId, callback) {
    this.fetchAll((homes) => {
      homes = homes.filter(home => home.id !== homeId);
      fs.writeFile(homeDataPath, JSON.stringify(homes), err => {
        Favorite.removeById(home, callback);
      });
    });
  }
};
