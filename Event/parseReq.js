const fs = require("fs");
const http = require('http');

const server = http.createServer((req, res) => {
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
      // fs.writeFileSync("FormData.txt", JSON.stringify(bodyObj)); it block all other task that is going on since it forces main Event thread loop to execute it. This task will not go to the workers thread to execute.

      // to Solve this problem we use fs.writeFile() instead of fs.writeFileSync()
      fs.writeFile("FormData.txt", JSON.stringify(bodyObj), (err) => {
        console.log("Data written Successfully");
        // redirecting the request.... after file had been written
        res.statusCode = 302; // code for redirecting
        res.setHeader("Location", "/"); // redirecting location
        return res.end();
      });
    });
  } else {
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
});
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is runnin at http://localhost:${PORT}`);
})