const calRes = (req, res) => {
  const body = [];
  let result;
  req.on("data", (chunks) => {
  // Asynchoronous Function when data starts to come
    body.push(chunks);
  });
  req.on("end", () => {
    // Asynchoronous Function => called when data coming is ended
    const fullBody = Buffer.concat(body).toString();
    const params = new URLSearchParams(fullBody);
    const bodyObj = Object.fromEntries(params);
    result = Number(bodyObj.first) + Number(bodyObj.sec);
    console.log(result);
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