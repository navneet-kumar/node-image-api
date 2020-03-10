const http = require("http");
const app = require("./app");
const consumer = require("./src/consumer");
const Queue = require("./src/queue");
const port = process.env.PORT || 3000;

console.log("Processing queue instantiated...");
new Queue().getInstance();
console.log("Consumer instantiated...");
new consumer().consume();

const server = http.createServer(app);
server.listen(port);