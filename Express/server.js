//external Module

const express = require('express');
const app = express();

app.use("/",(req, res, next) => {
  console.log("come in first middleware", req.url, req.method);
  next();
});
app.use("/", (req, res, next) => {
  console.log("come in Second middleware", req.url, req.method);
  next();
});
app.use("/",(req, res, next) => {
  console.log("come in Third middleware", req.url, req.method);
  res.send("<p>Ths is Response</p>");
});
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
