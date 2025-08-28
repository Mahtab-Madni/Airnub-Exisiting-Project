const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser'); // module for parsing the body
const app = express();
app.use((req, res, next) => {
  console.log("First Dummy middleware", req.url, req.method);
  next();
});

app.use((req, res, next) => {
  console.log("Second Dummy middleware", req.url, req.method);
  next();
});

app.get("/", (req, res, next) => {
  console.log("Handling / for Get", req.url, req.method);
  res.send("<h1>Welcome to Node JS + Express JSPage</h1>");
});

app.get("/contact-us", (req, res, next) => {
  console.log("Handling /contact-us for get", req.url, req.method);
  res.send(
    `<h1> Please give us your detail here:</h1>
    <form action = "/contact-us" method = "POST">
      <input type="text" placeholder="Enter your name" name="name"/>
      <input type="email" placeholder = "Enter your email" name = "email"/>
      <input type="submit"></input>
    </form>`
  );
});

app.use(bodyParser.urlencoded()); 
app.post("/contact-us", (req, res, next) => {
  console.log("Handling /contact-us for post", req.url, req.method, req.body);
  fs.writeFile("FormData.txt", JSON.stringify(req.body), (err) => {
    console.log("File written successfully");
  });
  res.send("<h1>Thanks for your details</h1>");
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})