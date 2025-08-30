const Home = require("../Models/home");

exports.getAddhome = (req, res, next) => {
  res.render("host/edit-home", { pageTitle: "Airnub / Registration", currPage:"Add Homes" , editing : false});
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

exports.getEditHomes = (req, res) => {
  const homeId = req.params.homeId;
  const query = req.query.editing === 'true';
  
  Home.findById(homeId, home => {
    if (!home) {
      return res.redirect("/host/host-home-list");
    }
    res.render("host/edit-home", {
      home : home ,
      pageTitle: "Airnub / Edit Home",
      currPage: "Host Home",
      editing: query,
    });
  });
};

exports.postEditHomes = (req, res, next) => {
  const { id, houseName, prices, city, rating, photoUrl } = req.body;
  const home = new Home(houseName, prices, city, rating, photoUrl);
  home.id = id;
  home.save();
  return res.redirect("/host/host-home-list");
};

exports.postAddhome = (req, res, next) => {
  const { houseName, prices, city, rating, photoUrl } = req.body;
  const home = new Home(houseName, prices, city, rating, photoUrl);
  home.save();
  return res.redirect("/host/host-home-list");
};

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.delById(homeId, err => {
    if (err) {
      console.log("error while deleting");
    }
    return res.redirect("/host/host-home-list");
  })
};