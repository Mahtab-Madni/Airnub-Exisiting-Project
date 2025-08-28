const calRes = (req, res) => {
  const body = [];
  req.on("data", (chunks) => {
    body.push(chunks);
  });
  req.on("end", () => {
    const fullBody = Buffer.concat(body).toString();
    const params = new URLSearchParams(fullBody);
    const bodyObj = Object.fromEntries(params);
    const result = Number(bodyObj.first) + Number(bodyObj.sec);
    res.write(
      `<html>
        <head>
          <title> Practice </title>
        </head>
        <body>
          <h1>Sum =${result}</h1>
          <a href="/">Go to Home</a>
        </body>
      </html>`
    );
    return res.end();
  });
}
module.exports = calRes;