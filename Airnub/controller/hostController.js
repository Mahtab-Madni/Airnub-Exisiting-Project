const Home = require("../Models/home");

exports.getAddhome = (req, res, next) => {
  res.render("host/Form", { pageTitle: "Airnub / Registration", currPage:"Add Homes" });
};

exports.getHostHomes = (req, res) => {
  Home.fetchAll((registeredHomes) => {
    res.render("host/host-home-list", {
      pageTitle: "Airnub / Host Homes List",
      registeredHomes: registeredHomes,
      currPage: "Host Home",
    });
  });
};

exports.postAddhome = (req, res, next) => {
  const { houseName, prices, city, rating, photoUrl } = req.body;
  const home = new Home(houseName, prices, city, rating, photoUrl);
  home.save();
  res.render("host/home-added", {
    pageTitle: "Registration Successful",
    currPage: "Add Homes",
  });
};

