// external modules
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongodbStore = require('connect-mongodb-session')(session);
const mongoUrl ="mongodb+srv://mahtab:root@airnub.bic4o66.mongodb.net/airnub?retryWrites=true&w=majority&appName=Airnub";
//local Modules
const storeRouter = require('./Routes/storeRouter');
const hostRouter  = require("./Routes/hostRouter");
const { pageNotFound } = require('./controller/error');
const authRouter = require('./Routes/authRouter');

const app = express();
app.use(express.static('public')); // allowing server to access public folder for css styling
app.set('view engine', 'ejs'); // setting app.js to perform ejs function (embedded javascript)
app.set('views', 'views');
app.use(express.urlencoded()); // for body parsing

const store = new MongodbStore({
  uri: mongoUrl,
  collection: 'sessions',
})
app.use(session({
  secret: "Airnub-Session_Key", // key for signin session id cookie & session encrypted data
  resave: false,
  saveUninitialized: true,
  store: store,
}))

app.use((req, res, next) => {
  req.isLoggedIn = req.session.isLoggedIn;
  next();
})
app.use(storeRouter);
app.use("/host", (req, res,next) => {
  if (!req.isLoggedIn) {
    return res.redirect("/login");
  } 
  next();
});
app.use("/host",hostRouter);
app.use(authRouter);
app.use(pageNotFound);

const PORT = 3000;
mongoose.connect(mongoUrl).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
}).catch((err) => { console.log('Error while connecting to mongoose', err); });
