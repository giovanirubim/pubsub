const http = require('http');
const EventEmitter = require('events');
const WebSocket = require('ws');
const WebSocketConnection = require('./WebSocketConnection');

module.exports = class WebSocketServer extends EventEmitter {
	constructor({ port }) {
		super();
		const server = http.createServer();
		this.lastConnectiondId = 0;
		this.port = port;
		this.server = server;
		this.webSocket = new WebSocket.Server({ server });
		this.bindServer();
	}
	handleConnection(rawConnection) {
		const id = ++ this.lastConnectiondId;
		const connection = new WebSocketConnection({ id, rawConnection });
		rawConnection.on('message', (message) => {
			const data = JSON.parse(message);
			this.emit('message', connection, data);
		});
		rawConnection.on('close', () => {
			this.emit('disconnect', connection);
		});
		this.emit('connect', connection);
	}
	bindServer() {
		this.webSocket.on('connection', (connection) => {
			this.handleConnection(connection);
		});
		return this;
	}
	start() {
		const { port, server } = this;
		server.listen(port, '0.0.0.0', () => {
			console.log('WebSocket server started at port ' + port);
		});
		return this;
	}
};
