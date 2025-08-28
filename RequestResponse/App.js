const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write(`
      <html>
        <head>
          <title> My first Page </title>
        </head>
        <body>
          <h2>Enter your Details</h2>
          <form action="/submit-details" method="POST">
            <input type="text" name ="username"  placeholder="Username"><br>
            <label for="gender">Gender:</label>
            <label for="male">Male</label>
            <input type="radio" id ="male" value="male" name="gender">
            <label for="female">Female</label>
            <input type="radio" id ="female" value="female" name="gender">
            <button type="submit">Submit</button>
          </form>
        </body>
      </html>
    `);
    return res.end();
  } else if (
    req.url.toLowerCase() === "/submit-details" &&
    req.method === "POST"
  ) {
    // redirecting the request....
    fs.writeFileSync("FormData.txt", "Mahtab Madni"); // file will generate by the name of FormData.txt
    res.statusCode = 302; // code for redirecting
    res.setHeader("Location", "/"); // redirecting location
  }
  res.setHeader("Content-Type", "text/html");
  res.write(
    `<html>
        <head>
          <title>My first Page</title>
        </head>
        <body>
          <h1>Welcome to my first Page</h1>
        </body>
       </html>`
  );
  res.end();
});
const port = 3000;
server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
