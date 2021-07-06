const path = require('path');
const HTTPServer = require('../Interface/HTTPServer');
const root = path.join(__dirname, 'WebContent');

class WebFrontServer {
	constructor({ port }) {
		this.server = new HTTPServer({ port });
	}
	start() {
		this.server.monutFileSystem(root);
		this.server.start();
	}
}

module.exports = WebFrontServer;
