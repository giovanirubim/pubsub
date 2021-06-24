class PubSubServer {
	constructor({ webSocket, httpServer }) {
		this.webSocket = webSocket;
		this.httpServer = httpServer;
		this.topics = new Set();
		httpServer.post('/publish/:topic', async (req, res, next) => {
			const { body, params } = req;
			const { topic } = params;
		});
	}
	publish(topic, data) {
		
	}
	createTopic(topicName) {
		this.topics.add(topicName);
		return this;
	}
}