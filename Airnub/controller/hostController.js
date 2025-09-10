const Home = require("../Models/home");

exports.getAddhome = (req, res, next) => {
  res.render("host/edit-home", { pageTitle: "Airnub / Registration", currPage:"Add Homes" , editing : false , isLoggedIn : req.isLoggedIn});
};

exports.getHostHomes = (req, res) => {
  Home.find().then((registeredHomes) => { // mongoose provide default find function to fetch all data in the collection 
    res.render("host/host-home-list", {
      pageTitle: "Airnub / Host Homes List",
      registeredHomes: registeredHomes,
      currPage: "Host Home",
      isLoggedIn : req.isLoggedIn,
    });
  })
};

exports.getEditHomes = (req, res) => {
  const homeId = req.params.homeId;
  const query = req.query.editing === 'true';
  
  Home.findById(homeId).then(home => {  // mongoose provide default findById function to  find data based on their id
    if (!home) {
      return res.redirect("/host/host-home-list");
    }
    res.render("host/edit-home", {
      home : home ,
      pageTitle: "Airnub / Edit Home",
      currPage: "Host Home",
      editing: query,
      isLoggedIn : req.isLoggedIn,
    });
  });
};

exports.postEditHomes = (req, res, next) => {
  const { id, houseName, prices, city, rating, photoUrl, description } = req.body;
  Home.findById(id).then(home => {  // mongoose provide default findById function to  find data based on their id
    home.houseName = houseName;
    home.prices = prices;
    home.city = city;
    home.rating = rating;
    home.photoUrl = photoUrl;
    home.description = description;
    home.save().then(() => { console.log("home edited") }).catch(err => { console.log('error while updating') });
    return res.redirect("/host/host-home-list");
  }).catch(err => console.log('error while finding id'));
};


exports.postAddhome = (req, res, next) => {
  const { houseName, prices, city, rating, photoUrl , description } = req.body;
  const home = new Home({ houseName, prices, city, rating, photoUrl, description });
  home.save().then(() => { // mongoose provide default save function to save the collection
    console.log("home saved");
  });
  return res.redirect("/host/host-home-list");
};


exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.findByIdAndDelete(homeId).then(() => {  // mongoose provide default findByIdAndDelete function to find data based on their id and delete it
    return res.redirect("/host/host-home-list");
  }).catch(err => {
    console.log("Error while deleting", err);
  })
};