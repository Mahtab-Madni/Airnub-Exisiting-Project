
exports.getLogin = (req, res) => {
  const query = req.query.SignUp === 'true';
  res.render("auth/login", {
    pageTitle: "Airnub - Login",
    currPage: "Login",
    SignUp: query,
    isLoggedIn: false,
  });
};

exports.postLogin = (req, res) => {
  req.session.isLoggedIn = true;
  return res.redirect("/");
};

exports.getSignUp = (req, res) => {
  const query = req.query.SignUp === 'true';

  res.render("auth/login", {
    pageTitle: "Airnub - SignUp",
    currPage: "Login",
    SignUp: query,
    isLoggedIn: false,
  });
};

exports.postSignUp = (req, res) => {
  req.session.isLoggedIn = true;
  return res.redirect("/");
};

exports.postlogout = (req, res) => {
  req.session.destroy(() => {
    return res.redirect("/login");
  });
};