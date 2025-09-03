const Home = require("../Models/home");

exports.getAddhome = (req, res, next) => {
  res.render("host/edit-home", { pageTitle: "Airnub / Registration", currPage:"Add Homes" , editing : false});
};

exports.getHostHomes = (req, res) => {
  Home.fetchAll().then((registeredHomes) => {
    res.render("host/host-home-list", {
      pageTitle: "Airnub / Host Homes List",
      registeredHomes: registeredHomes,
      currPage: "Host Home",
    });
  })
};

exports.getEditHomes = (req, res) => {
  const homeId = req.params.homeId;
  const query = req.query.editing === 'true';
  
  Home.findById(homeId).then(home => {
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
  const { id, houseName, prices, city, rating, photoUrl , description} = req.body;
  const home = new Home(houseName, prices, city, rating, photoUrl, description, id);
  home.save().then(() => { console.log("home edited") });
  return res.redirect("/host/host-home-list");
};


exports.postAddhome = (req, res, next) => {
  const { houseName, prices, city, rating, photoUrl , description } = req.body;
  const home = new Home(houseName, prices, city, rating, photoUrl, description );
  home.save().then(() => {
    console.log("home saved");
  });
  return res.redirect("/host/host-home-list");
};


exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.delById(homeId).then(() => {
    return res.redirect("/host/host-home-list");
  }).catch(err => {
    console.log("Error while deleting", err);
  })
};