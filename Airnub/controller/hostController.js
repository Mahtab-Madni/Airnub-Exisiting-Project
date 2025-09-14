const Home = require("../Models/home");
const fs = require("fs");
const path = require("path");
const rootDir = require('../utils/pathUtils');
const User = require("../Models/user");
exports.getAddhome = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  res.render("host/edit-home", {
    pageTitle: "Airnub / Registration",
    currPage: "Add Homes",
    editing: false,
    isLoggedIn: req.isLoggedIn,
    user: req.session.user
  });
};

exports.getHostHomes = async (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  const userId = req.session.user._id;
  try {
    // Only fetch homes where the host is the current user
    const registeredHomes = await Home.find({ host: userId });
    res.render("host/host-home-list", {
      pageTitle: "Airnub / Host Homes List",
      registeredHomes: registeredHomes,
      currPage: "Host Home",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  } catch (err) {
    console.error('Error fetching user-specific homes:', err);
  }
};

exports.getEditHomes = async (req, res) => {
  const homeId = req.params.homeId;
  const query = req.query.editing === 'true';
  const userId = req.session.user ? req.session.user._id : null;

  if (!userId) {
    return res.redirect('/login');
  }

  try {
    const home = await Home.findOne({ _id: homeId, host: userId });
    if (!home) {
      return res.redirect("/host/host-home-list");
    }
    res.render("host/edit-home", {
      home: home,
      pageTitle: "Airnub / Edit Home",
      currPage: "Host Home",
      editing: query,
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  } catch (err) {
    console.error('Error fetching home for editing:', err);
    return res.redirect("/host/host-home-list");
  }
};

exports.postEditHomes = async (req, res, next) => {
  const userId = req.session.user._id;
  const { id, houseName, prices, city, rating, description } = req.body;
  try {
    // Only allow editing if the home belongs to the current user
    const home = await Home.findOne({ _id: id, host: userId });
    if (!home) {
      return res.status(403).send("Unauthorized to edit this home.");
    }
    home.houseName = houseName;
    home.prices = prices;
    home.city = city;
    home.rating = rating;
    home.description = description;
    if (req.files['photo']) {
      fs.unlink(home.photo, (err) => {
        if (err) {
          console.log('Error while deleting the previous image', err);
        }
      });
      home.photo = req.files['photo'][0].path;
    }
    if (req.files['rules']) {
      fs.unlink(home.rules, (err) => {
        if (err) {
          console.log('Error while deleting the previous pdf', err);
        }
      });
      const rulesDir = path.join(rootDir, "rules");
      if (!fs.existsSync(rulesDir)) {
        fs.mkdirSync(rulesDir);
      }
      const newPath = path.join(rulesDir, 'house_rules_' + home._id + '.pdf');
      fs.renameSync(req.files['rules'][0].path, newPath);
      home.rules = newPath;
    }
    await home.save();
    console.log("home edited");
    return res.redirect("/host/host-home-list");
  } catch (err) {
    console.log('error while updating home', err);
    return res.status(500).send("Internal server error");
  }
};

exports.postAddhome = async (req, res, next) => {
  const userId = req.session.user._id;
  const user = await User.findById(userId);
  try {
    const { houseName, prices, city, rating, description } = req.body;
    const photo = req.files["photo"] ? req.files["photo"][0].path : null;
    const rulespath = req.files["rules"] ? req.files["rules"][0].path : null;
    if (!photo) {
      return res
        .status(422)
        .send("No image provided or image format is not supported");
    }
    if (!rulespath) {
      return res
        .status(422)
        .send("No rules pdf provided or pdf format is not supported");
    }
    const home = new Home({
      houseName,
      prices,
      city,
      rating,
      photo,
      description,
      host: userId // Make the home user-specific by storing the host's userId
    });
    await home.save();

    const rulesDir = path.join(rootDir, 'rules');
    if (!fs.existsSync(rulesDir)) {
      await fs.promises.mkdir(rulesDir);
    }
    if (req.files["rules"]) {
      const newPath = path.join(rootDir, 'rules', 'house_rules_' + home._id + '.pdf');
      await fs.promises.rename(req.files["rules"][0].path, newPath);
      home.rules = newPath;
      await home.save();
    }

    // Add the home to the user's hostHomes array
    if (!user.hostHomes.includes(home._id)) {
      user.hostHomes.push(home._id);
      await user.save();
    }
    console.log("home saved");
    return res.redirect("/host/host-home-list");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal server error");
  }
};


exports.postDeleteHome = async (req, res, next) => {
  const homeId = req.params.homeId;
  const userId = req.session.user ? req.session.user._id : null;

  if (!userId) {
    return res.redirect('/login');
  }
  try {
    // Only delete if the home belongs to the current user
    const home = await Home.findOne({ _id: homeId, host: userId });
    if (!home) {
      return res.status(403).send("Unauthorized to delete this home.");
    }
    await Home.deleteOne({ _id: homeId, host: userId });
    return res.redirect("/host/host-home-list");
  } catch (err) {
    console.log("Error while deleting", err);
  }
};