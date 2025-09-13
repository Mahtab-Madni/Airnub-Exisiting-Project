const Home = require("../Models/home");
const fs = require("fs");

exports.getAddhome = (req, res, next) => {
  res.render("host/edit-home", { pageTitle: "Airnub / Registration", currPage: "Add Homes", editing: false, isLoggedIn: req.isLoggedIn, user: req.session.user});
};

exports.getHostHomes = (req, res) => {
  Home.find().then((registeredHomes) => { // mongoose provide default find function to fetch all data in the collection 
    res.render("host/host-home-list", {
      pageTitle: "Airnub / Host Homes List",
      registeredHomes: registeredHomes,
      currPage: "Host Home",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
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
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  });
};

exports.postEditHomes = (req, res, next) => {
  const { id, houseName, prices, city, rating, description } = req.body;
  Home.findById(id).then(home => {  // mongoose provide default findById function to  find data based on their id
    home.houseName = houseName;
    home.prices = prices;
    home.city = city;
    home.rating = rating;
    home.description = description;
    if (req.files['photo']) {
      fs.unlink(home.photo, (err) => { // deleting the previous image from uploads folder
        if (err) {
          console.log('Error while deleting the previous image', err);
        }
      });
      home.photo = req.files['photo'][0].path;
    }
    if(req.files['rules']){
      fs.unlink(home.rules, (err) => { // deleting the previous pdf from rules folder
        if (err) {
          console.log('Error while deleting the previous pdf', err);
        } 
      });
      home.rules = req.files["rules"][0].path;
    }
    home.save().then(() => { console.log("home edited") }).catch(err => { console.log('error while updating') });
    return res.redirect("/host/host-home-list");
  }).catch(err => console.log('error while finding id',err));
};


exports.postAddhome = (req, res, next) => {
  const { houseName, prices, city, rating, description } = req.body;
  const photo = req.files['photo'] ? req.files['photo'][0].path : null;
  const rules = req.files['rules'] ? req.files['rules'][0].path : null;
  if(!photo){
    return res.status(422).send('No image provided or image format is not supported');
  }
  const home = new Home({ houseName, prices, city, rating, photo, description, rules});
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