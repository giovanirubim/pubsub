const WebSocketServer = require('../WebSocketServer');
const TopicConnectionManager = require('./TopicConnectionManager');
const Publisher = require('./Publisher');

module.exports = class PubSubServer {
	constructor({ webSocketPort }) {
		const webSocketServer = new WebSocketServer({ port: webSocketPort });
		const topicConnectionManager = new TopicConnectionManager();
		const publisher = new Publisher({ topicConnectionManager });
		webSocketServer.on('connect', (connection) => {
			topicConnectionManager.registerConnection(connection);
		});
		webSocketServer.on('message', (connection, { action, topic, data }) => {
			console.log('received:', { action, topic, data });
			if (action === 'subscribe') {
				topicConnectionManager.addToTopic({ connection, topic });
			}
			if (action === 'unsubscribe') {
				topicConnectionManager.removeFromTopic({ connection, topic });
			}
			if (action === 'publish') {
				publisher.publish({ topic, data });
			}
		});
		webSocketServer.on('disconnect', (connection) => {
			topicConnectionManager.removeConnection(connection);
		});
		this.webSocketServer = webSocketServer;
	}
	start() {
		this.webSocketServer.start();
	}
}
