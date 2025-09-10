const Favorite = require("../Models/favorite");
const Home = require("../Models/home");

exports.getIndex = (req, res) => {
  Home.find().then((registeredHomes) => {  // mongoose provide default find function to fetch all data in the collection 
    res.render("store/index", {
      pageTitle: "Airnub / Home",
      registeredHomes: registeredHomes,
      currPage: "Index",
      isLoggedIn : req.isLoggedIn,
    });
  });
};

exports.getHomes = (req, res) => {
  Home.find().then((registeredHomes) => {
    // mongoose provide default find function to fetch all data in the collection
    res.render("store/home-list", {
      pageTitle: "Airnub / Homes List",
      registeredHomes: registeredHomes,
      currPage: "Home List",
      isLoggedIn: req.isLoggedIn,
    });
  });
};

exports.getBookings = (req, res) => {
  res.render("store/bookings", {
    pageTitle: "Airnub / My Bookings",
    currPage: "Bookings",
    isLoggedIn: req.isLoggedIn,
  });
};

exports.getFavorites = (req, res) => {
  Favorite.find()
    .populate('houseId')
    .then(favorites => { 
    const favHomes = favorites.map(fav => fav.houseId)
    res.render("store/favorites", {
      pageTitle: "Airnub / favorites",
      favoriteHomes: favHomes,
      currPage: "Favorites",
      isLoggedIn: req.isLoggedIn,
    });
  });
};

exports.getHomeDetails = (req, res) => {
  const homeId = req.params.homeId;
  console.log("Add Home detail page at :", homeId);
  Home.findById(homeId).then((home) => {  // mongoose provide default findById function to  find data based on their id
    if (!home) {
      console.log("Home not found");
      return res.redirect("/home-list");
    } else {
      res.render("store/home-details", {
        home: home,
        pageTitle: "Airnub / Homes details",
        currPage: "Home List",
        isLoggedIn: req.isLoggedIn,
      });
    }
  });
};

exports.postAddToFav = (req, res) => {
  const homeId = req.body.id;
  Favorite.findOne({ houseId: homeId }).then(fav => {
    if (fav) {
      console.log("Already marked favorite");
    } else {
      fav = new Favorite({ houseId: homeId });
      fav.save().then(() => { console.log('Fav added') });
    }
    return res.redirect("/favorites");
  }).catch(err => { console.log('Error while marking favorite') });
};

exports.postRemoveFav = (req, res) => {
  const homeId = req.params.homeId;
  Favorite.findOneAndDelete({ houseId : homeId })
    .then(() => { console.log('Fav removed') })
    .catch(err => {
      if (err) {
        console.log("Error while removing", err);
      }
    })
    .finally(() => { return res.redirect("/favorites"); });
};
