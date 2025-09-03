const Favorite = require("../Models/favorite");
const Home = require("../Models/home");

exports.getIndex = (req, res) => {
  Home.fetchAll().then((registeredHomes) => {
    res.render("store/index", {
      pageTitle: "Airnub / Home",
      registeredHomes: registeredHomes,
      currPage: "Index",
    });
  });
};

exports.getHomes = (req, res) => {
  Home.fetchAll().then((registeredHomes) => {
    res.render("store/home-list", {
      pageTitle: "Airnub / Homes List",
      registeredHomes: registeredHomes,
      currPage: "Home List",
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
  Favorite.getFavorites().then(favorites => {
    favorites = favorites.map(fav => fav.houseId)
    Home.fetchAll().then(registeredHomes => {
      const favHomes = registeredHomes.filter((home) =>
        favorites.includes(home._id.toString())
      );
      res.render("store/favorites", {
        pageTitle: "Airnub / favorites",
        favoriteHomes: favHomes,
        currPage: "Favorites",
      });
    });
  });
};

exports.getHomeDetails = (req, res) => {
  const homeId = req.params.homeId;
  console.log("Add Home detail page at :", homeId);
  Home.findById(homeId).then((home) => {
    if (!home) {
      console.log("Home not found");
      return res.redirect("/home-list");
    } else {
      res.render("store/home-details", {
        home: home,
        pageTitle: "Airnub / Homes details",
        currPage: "Home List",
      });
    }
  });
};

exports.postAddToFav = (req, res) => {
  const fav = new Favorite(req.body.id);
  fav.save()
    .then(() => { console.log('Fav added') })
    .catch(err => {
      if (err) {
        console.log("Error while marking Favorite");
      }
    })
    .finally(() => { return res.redirect("/favorites"); });
};

exports.postRemoveFav = (req, res) => {
  const homeId = req.params.homeId;
  Favorite.removeById(homeId)
    .then(() => { console.log('Fav removed') })
    .catch(err => {
      if (err) {
        console.log("Error while removing", err);
      }
    })
    .finally(() => { return res.redirect("/favorites"); });
};
