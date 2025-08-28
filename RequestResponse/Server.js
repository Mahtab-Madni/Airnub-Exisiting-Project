const http = require('http');
const handler = require("./parseReq");
const server = http.createServer(handler);

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server in running at http://localhost:${PORT}`);
});
