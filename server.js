const http = require("http");
const app = require("./app");
const cons = require("./src/consumer");
const Queue = require("./src/queue");
const port = process.env.PORT || 3000;

new Queue().getInstance();
console.log("Processing queue instantiated...");

const consumer = new cons();
consumer.consume();
console.log("Consumer instantiated...");

const server = http.createServer(app);
server.listen(port);
console.log(`Server started listening on ${port} ...`);

module.exports = {server, consumer};