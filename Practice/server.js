const http = require('http');
const home = require('./home');

const server = http.createServer(home);

server.listen(3001, () => {
  console.log(`server is running at http//localhost:3001`);
});