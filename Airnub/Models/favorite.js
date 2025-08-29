const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/pathUtils');
const favoriteDataPath = path.join(rootDir, "Data", "favorite.json");
module.exports = class Favorite {

  static addToFavorites(homeId, callback) {
    Favorite.getFavorites((favorites) => {

      if (favorites.includes(homeId)) {
        callback("Home is already marked favorites");
      } else {
        favorites.push(homeId);
        fs.writeFile(favoriteDataPath, JSON.stringify(favorites), callback);
      }
    });
  }

  static getFavorites(callback) {
    fs.readFile(favoriteDataPath, (err, data) => {
      callback(!err ? JSON.parse(data) : []);
    });
  }
};