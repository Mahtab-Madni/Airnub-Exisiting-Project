const { check, validationResult } = require("express-validator");
const User = require("../Models/user");
const bcrypt = require("bcryptjs");

exports.getLogin = (req, res) => {
  res.render("auth/login", {
    pageTitle: "Airnub - Login",
    currPage: "Login",
    isLoggedIn: false,
    errors: [],
    oldInput: { email: "" },
    user: {},
  });
};

exports.postLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(422).render("auth/login", {
      pageTitle: "Airnub - Login",
      currPage: "Login",
      isLoggedIn: false,
      errors: ["Invalid email or password"],
      oldInput: { email },
      user:{},
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(422).render("auth/login", {
      pageTitle: "Airnub - Login",
      currPage: "Login",
      isLoggedIn: false,
      errors: ["Invalid email or password"],
      oldInput: { email },
      user:{},
    });
  }
  req.session.isLoggedIn = true;
  req.session.user = user;
  await req.session.save();
  return res.redirect("/");
};

exports.getSignUp = (req, res) => {
  res.render("auth/signup", {
    pageTitle: "Airnub - SignUp",
    currPage: "Sign Up",
    isLoggedIn: false,
    errors: [],
    oldInput: { firstName: "", lastName: "", email: "", userType: "" },
    user: {},
  });
};

exports.postSignUp = [
  //first Name Validation
  check("firstName")
    .notEmpty()
    .withMessage("First Name is required")
    .trim()
    .isLength({ min: 2 })
    .withMessage("First Name must have atleast 2  characters")
    .matches(/^[A-Za-z]+$/)
    .withMessage("First Name must contain only letters"),

  //last Name Validation
  check("lastName")
    .notEmpty()
    .withMessage("Last Name is required")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Last Name must have atleast 2 characters")
    .matches(/^[A-Za-z]+$/)
    .withMessage("Last Name must contain only letters"),

  //email validation
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .normalizeEmail(),

  //password validation
  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one digit")
    .matches(/[A-Za-z]/)
    .withMessage("Password must contain at least one letter")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("Password must contain at least one special character")
    .trim(),

  //confirm password validation
  check("confirmPassword")
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),

  //User Type validation
  check("userType").notEmpty().withMessage("User Type is required"),

  //check terms and conditions
  check("terms")
    .notEmpty()
    .withMessage("You must accept the terms and conditions")
    .custom((value) => {
      if (!value) {
        throw new Error("You must accept the terms and conditions");
      }
      return true;
    }),
  (req, res) => {
    const { firstName, lastName, email, password, confirmPassword, userType } =
      req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).render("auth/signup", {
        pageTitle: "Airnub - SignUp",
        currPage: "Sign Up",
        isLoggedIn: false,
        errors: errors.array().map((err) => err.msg),
        oldInput: {
          firstName,
          lastName,
          email,
          userType,
        },
        user: {},
      });
    }
    bcrypt
      .hash(password, 12)
      .then((hashedPassword) => {
        // Hash the password before saving to database
        const user = new User({
          firstName,
          lastName,
          email,
          password: hashedPassword,
          userType,
        });
        return user.save();
      })
      .then(() => {
        return res.redirect("/login");
      })
      .catch((err) => {
        return res.status(422).render("auth/signup", {
          pageTitle: "Airnub - SignUp",
          currPage: "Sign Up",
          isLoggedIn: false,
          errors: [err.message],
          oldInput: {
            firstName,
            lastName,
            email,
            userType,
            user: {},
          },
        });
      });
  }
];

exports.postlogout = (req, res) => {
  req.session.destroy(() => {
    return res.redirect("/login");
  });
};