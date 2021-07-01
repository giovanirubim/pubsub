module.exports = class TopicConnectionManager {
	constructor() {
		this.connections = [];
		this.connectionMap = {};
	}
	registerConnection(connection) {
		const { id } = connection;
		const topics = new Set();
		const item = { connection, topics };
		this.connectionMap[id] = item;
		return this;
	}
	removeConnection({ id }) {
		const { connectionMap } = this;
		const item = connectionMap[id];
		delete connectionMap[id];
		return this;
	}
	addToTopic({ connection, topic }) {
		const { connectionMap } = this;
		const { topics } = connectionMap[connection.id];
		topics.add(topic);
		return this;
	}
	removeFromTopic({ connection, topic }) {
		const { connectionMap } = this;
		const { topics } = connectionMap[connection.id];
		topics.delete(topic);
		return this;
	}
	getConnectionTopics(connection) {
		const { connectionMap } = this;
		const { topics } = connectionMap[connection.id];
		return [ ...topics ];
	}
	getAllConnections() {
		return Object.values(this.connectionMap);
	}
	getConnectionsByTopic(topic) {
		return this.getAllConnections()
			.filter(({ topics }) => topics.has(topic))
			.map(({ connection }) => connection);
	}
}
