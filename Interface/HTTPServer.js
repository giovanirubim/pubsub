const express = require('express');
const handleFileRequest = require('./handleFileRequest');

module.exports = class HttpServer {
	constructor({ port }) {
		const router = express.Router();
		router.use(express.json());
		this.port = port;
		this.router = router;
		this.app = express();
	}
	post(...args) {
		this.router.post(...args);
		return this;
	}
	monutFileSystem(root) {
		this.router.use((req, res, next) => handleFileRequest(root, req, res, next));
		return this;
	}
	start() {
		const { port, app, router } = this;
		app.use(router);
		app.listen(port, '0.0.0.0', () => {
			console.log('HTTP server started at port ' + port);
		});
		return this;
	}
};
