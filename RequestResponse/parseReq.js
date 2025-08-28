const fs = require("fs");

const reqHandler = (req, res) => {
  console.log(req.url, req.method);
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
    req.url.toLowerCase() === "/submit-details" && req.method === "POST"
  ) {
    // collecting the chunks...
    const body = [];
    req.on("data", (chunks) => {
      console.log(chunks);
      body.push(chunks);
    });
    req.on("end", () => {
      const fullBody = Buffer.concat(body).toString();
      console.log(fullBody);
      const params = new URLSearchParams(fullBody);
      const bodyObj = Object.fromEntries(params);
      console.log(bodyObj);
      fs.writeFileSync("FormData.txt", JSON.stringify(bodyObj)); // file will generate by the name of FormData.txt
    });
    // redirecting the request....
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
}

module.exports = reqHandler; // exporting the reqHandler