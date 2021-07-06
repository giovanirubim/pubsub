const WebSocketServer = require('../WebSocketServer');
const TopicConnectionManager = require('./TopicConnectionManager');
const Publisher = require('./Publisher');

module.exports = class PubSubServer {
	constructor({ webSocketPort }) {
		const webSocketServer = new WebSocketServer({ port: webSocketPort });
		const topicConnectionManager = new TopicConnectionManager();
		const publisher = new Publisher({ topicConnectionManager });
		webSocketServer.on('connect', (connection) => {
			console.log('A client connected');
			topicConnectionManager.registerConnection(connection);
		});
		webSocketServer.on('message', (connection, { action, topic, data }) => {
			if (action === 'subscribe') {
				console.log(`A client subscribed to ${topic}`);
				topicConnectionManager.addToTopic({ connection, topic });
			}
			if (action === 'unsubscribe') {
				console.log(`A client unsubscribed from ${topic}`);
				topicConnectionManager.removeFromTopic({ connection, topic });
			}
			if (action === 'publish') {
				console.log(`A client published to ${topic}`);
				publisher.publish({ topic, data });
			}
		});
		webSocketServer.on('disconnect', (connection) => {
			console.log('A client disconnected');
			topicConnectionManager.removeConnection(connection);
		});
		this.webSocketServer = webSocketServer;
	}
	start() {
		this.webSocketServer.start();
	}
}
