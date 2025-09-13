const express = require("express");
const {
  getHomes,
  getBookings,
  getFavorites,
  getIndex,
  getHomeDetails,
  postAddToFav,
  postRemoveFav,
  getHouseRules,
} = require("../controller/storeController");

const storeRouter = express();

storeRouter.use(express.static("public")); // allowing server to access public folder for css styling
storeRouter.get("/", getIndex);
storeRouter.get("/home-list", getHomes);
storeRouter.get("/bookings", getBookings);
storeRouter.get("/favorites", getFavorites);
storeRouter.get("/home_:homeId", getHomeDetails);
storeRouter.get("/rules/:homeId/download",getHouseRules);
storeRouter.post("/favorites", postAddToFav);
storeRouter.post("/removeFav_:homeId", postRemoveFav);
module.exports = storeRouter;