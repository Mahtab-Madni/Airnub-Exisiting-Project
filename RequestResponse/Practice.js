const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write(
      `<html>
        <head>
          <title>My first Page</title>
          <style>
            ul{
              list-style-type: none;
              background-color: rgb(36, 35, 35);
              padding: 0px; margin: 0px;
              overflow: hidden;
            }
            a{
              color: white;
              display: block;
              text-decoration: none;
              padding: 15px;
              text-align: center;
            }
            a::hover{
              background-color: black;
            }
            li{
              float: left;
            }
          </style>
        </head>
        <body>
          <h2>Welcome to Myntra</h2>
          <nav>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/men">Men</a></li>
              <li><a href="/women">Women</a></li>
              <li><a href="/kids">Kids</a></li>
              <li><a href="/cart">Cart</a></li>
            </ul>
          </nav>
        </body>
      </html>`
    );
    return res.end();
  } else if (req.url.toLowerCase() === "/men") {
    res.write("<h1>Welcome to Men Section</h1>");
    return res.end();
  } else if (req.url.toLowerCase() === "/women") {
    res.write("<h1>Welcome to Women Section</h1>");
    return res.end();
  } else if (req.url.toLowerCase() === "/kids") {
    res.write("<h1>Welcome to Kids Section</h1>");
    return res.end();
  } else if (req.url.toLowerCase() === "/cart") {
    res.write("<h1>Welcome to Cart Section</h1>");
    return res.end();
  }
});
const port = 3000;
server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
