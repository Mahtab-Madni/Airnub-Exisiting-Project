const Home = require("../Models/home");
const User = require("../Models/user");
const path = require("path");
const rootDir = require('../utils/pathUtils');

exports.getIndex = (req, res) => {
  Home.find().then((registeredHomes) => {  // mongoose provide default find function to fetch all data in the collection 
    res.render("store/index", {
      pageTitle: "Airnub / Home",
      registeredHomes: registeredHomes,
      currPage: "Index",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
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
      user: req.session.user,
    });
  });
};

exports.getBookings = (req, res) => {
  res.render("store/bookings", {
    pageTitle: "Airnub / My Bookings",
    currPage: "Bookings",
    isLoggedIn: req.isLoggedIn,
    user: req.session.user,
  });
};

exports.getFavorites = async (req, res) => {
  const userId = req.session.user._id;
  const user = await User.findById(userId).populate('favorites');
    res.render("store/favorites", {
      pageTitle: "Airnub / favorites",
      favoriteHomes: user.favorites,
      currPage: "Favorites",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
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
        user: req.session.user,
      });
    }
  });
};

exports.getHouseRules = [(req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.redirect("/login");
  }
  next();
},
(req, res) => {
  const homeId = req.params.homeId;
  const rulesFileName = 'house_rules_' + homeId + '.pdf';
  const rulesFilePath = path.join(rootDir, 'rules', rulesFileName);
  res.download(rulesFilePath, rulesFileName, (err) => {
    if (err) {
      console.log('Error while downloading the file', err);
      return res.status(500).send('Error while downloading the file');
    }
    console.log('File downloaded successfully');
  });
}
];


exports.postAddToFav = async (req, res) => {
  const homeId = req.body.id;
  const userId = req.session.user._id;
  const user = await User.findById(userId);
  if(!user.favorites.includes(homeId)){
    user.favorites.push(homeId);
    await user.save();
  }
  return res.redirect("/favorites");
}

exports.postRemoveFav = async (req, res) => {
  const homeId = req.params.homeId;
  const userId = req.session.user._id;
  const user = await User.findById(userId);
  if(user.favorites.includes(homeId)){
    user.favorites.pull(homeId);
    await user.save();
  }
  return res.redirect("/favorites");
}
