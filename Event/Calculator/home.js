const result = require("./calRes");
const home = (req, res) => {
  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write(`
      <html>
        <head>
          <title> Practice </title>
        </head>
        <body>
          <h1>Welcome to page</h1>
          <a href="/cal-home">Go to Calculator</a>
        </body>
      </html>
    `);
    return res.end();
  } else if (req.url === "/cal-home") {
    res.setHeader("Content-Type", "text/html");
    res.write(`
      <html>
        <head>
          <title> Practice </title>
        </head>
        <body>
          <h1>Welcome to Calculator</h1>
          <form action="/cal-res" method="POST">
            <input type="text" placeholder="first num" name= "first"/>
            <input type="text" placeholder="sec num" name= "sec"/>
            <button type="submit">Sum</button>
          </form>
        </body>
      </html>
    `);
    return res.end();
  } else if (req.url === "/cal-res" && req.method == "POST") {
    return result(req, res);
  }
  res.setHeader("Content-Type", "text/html");
  res.write(`
    <html>
      <head>
        <title> Practice </title>
      </head>
      <body>
        <h1>404 Page Not Found Error</h1>
        <a href="/">Go to Home</a>
      </body>
    </html>
  `);
};
module.exports = home;
