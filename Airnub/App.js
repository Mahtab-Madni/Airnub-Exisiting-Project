// external modules
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongodbStore = require('connect-mongodb-session')(session);
const mongoUrl = "mongodb+srv://mahtab:root@airnub.bic4o66.mongodb.net/airnub?retryWrites=true&w=majority&appName=Airnub";
const multer = require('multer');
//local Modules
const storeRouter = require('./Routes/storeRouter');
const hostRouter  = require("./Routes/hostRouter");
const { pageNotFound } = require('./controller/error');
const authRouter = require('./Routes/authRouter');
const rootDir = require('./utils/pathUtils');

const app = express();
app.use(express.static('public')); // allowing server to access public folder for css styling
app.set('view engine', 'ejs'); // setting app.js to perform ejs function (embedded javascript)
app.set('views', 'views');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
      cb(null, 'uploads/'); // folder to store images
    } else if (file.mimetype === 'application/pdf') {
      cb(null, 'rules/'); // folder to store pdf files
    } else {
      cb({ message: 'Unsupported file format' }, false);
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // naming the file with current timestamp and original name
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'application/pdf') {
    cb(null, true); // accept file
  } else {
    cb(null, false); // reject file
  }
};

const multerOptions = {
  storage , fileFilter
}

app.use(express.urlencoded()); // for body parsing
app.use(express.static(path.join(rootDir, 'public'))); // to access public folder
app.use(multer(multerOptions).fields([{ name: 'photo', maxCount: 1 }, { name: 'rules', maxCount: 1 }]));// for parsing multipart/form-data
app.use('/uploads', express.static(path.join(rootDir, 'uploads'))); // to access uploads folder
app.use('/host/uploads', express.static(path.join(rootDir, 'uploads'))); // to access uploads folder
app.use('/rules', express.static(path.join(rootDir, 'rules'))); // to access rules folder

// session store in mongoDB

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
