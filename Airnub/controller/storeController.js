const Home = require("../Models/home");

exports.getIndex = (req, res) => {
  Home.fetchAll((registeredHomes) => {
    res.render("store/index", {
      pageTitle: "Airnub / Home",
      registeredHomes: registeredHomes,
      currPage : 'Index',
    });
  });
};

exports.getHomes = (req, res) => {
  Home.fetchAll((registeredHomes) => {
    res.render("store/home-list", {
      pageTitle: "Airnub / Homes List",
      registeredHomes: registeredHomes,
      currPage: "Home List"
    });
  });
};

exports.getBookings = (req, res) => {
  res.render("store/bookings", {
    pageTitle: "Airnub / My Bookings",
    currPage: "Bookings",
  });
};

exports.getFavotites = (req, res) => {
   Home.fetchAll((registeredHomes) => {
     res.render("store/favorites", {
       pageTitle: "Airnub / favorites",
       registeredHomes: registeredHomes,
       currPage: "Favorites",
     });
   });
};

exports.getHomeDetails = (req, res) => {
  const homeId = req.params.homeId;
  console.log("Add Home detail page at :", homeId);
  res.render("store/home-details", {
    pageTitle: "Airnub / Homes details",
    currPage: "Home List",
  });
};