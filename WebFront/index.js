const path = require('path');
const HTTPServer = require('../Interface/HTTPServer');

const port = process.argv[2] ?? 80;
const server = new HTTPServer({ port });
const root = path.join(__dirname, 'WebContent');

server.monutFileSystem(root);
server.start();
