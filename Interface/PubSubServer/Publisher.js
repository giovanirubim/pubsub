module.exports = class Publisher {
	constructor({ topicConnectionManager }) {
		this.topicConnectionManager = topicConnectionManager;
	}
	publish({ topic, data }) {
		const { topicConnectionManager } = this;
		const connections = topicConnectionManager.getConnectionsByTopic(topic);
		const promises = connections.map((conn) => conn.send({ topic, data }));
		return Promise.allSettled(promises);
	}
};
