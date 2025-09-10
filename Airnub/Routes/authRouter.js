const express = require("express");
const {getLogin , postLogin, getSignUp , postSignUp, postlogout} = require("../controller/authController");

const authRouter = express();
authRouter.use(express.static("public")); // allowing server to access public folder for css styling

authRouter.get("/login", getLogin);
authRouter.post("/login", postLogin);
authRouter.post("/logout", postlogout);
authRouter.get("/signup", getSignUp);
authRouter.post("/signup", postSignUp);
module.exports = authRouter;