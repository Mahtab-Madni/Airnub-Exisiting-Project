const express = require("express");
const fs = require("fs");
const {
  getAddhome,
  postAddhome,
  getHostHomes,
  getEditHomes,
  postEditHomes,
  postDeleteHome,
} = require("../controller/hostController");

const hostRouter = express();

hostRouter.use(express.static("public")); // allowing server to access public folder for css styling

hostRouter.get("/add-home", getAddhome);
hostRouter.post("/add-home", postAddhome);
hostRouter.get("/host-home-list", getHostHomes);
hostRouter.get("/edit-home_:homeId", getEditHomes);
hostRouter.post("/edit-home", postEditHomes);
hostRouter.post("/delete-home_:homeId", postDeleteHome);
module.exports = hostRouter;
