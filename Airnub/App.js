// external modules
const express = require('express');

//local Modules
const storeRouter = require('./Routes/storeRouter');
const hostRouter  = require("./Routes/hostRouter");
const { pageNotFound } = require('./controller/error');
const { mongoConnect } = require('./utils/databaseUtils');

const app = express();

app.use(express.static('public')); // allowing server to access public folder for css styling

app.set('view engine', 'ejs'); // setting app.js to perform ejs function (embedded javascript)
app.set('views', 'views');

app.use(express.urlencoded()); // for body parsing
app.use(storeRouter);
app.use("/host",hostRouter);
app.use(pageNotFound);

const PORT = 3000;
mongoConnect(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
})
