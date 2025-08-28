const http = require("http");
const home = require("./home");

const server = http.createServer(home);

server.listen(3002, () => {
  console.log(`server is running at http://localhost:3002`);
});
