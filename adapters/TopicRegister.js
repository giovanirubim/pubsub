class TopicRegister {
	constructor({ timeout }) {
		this.timeout = timeout;
		this.lastId = 0;
		this.connections = [];
		this.connectionIdMap = {};
	}
	registerConnection(connection) {
		const id = ++ this.lastId;
		const item = {
			id,
			connection,
			topics: new Set(),
		};
		this.connections.push(item);
		this.connectionIdMap[id] = item;
		return id;
	}
	removeConnection(id) {
		const { connectionIdMap, connections } = this;
		const item = connectionIdMap[id];
		const index = connections.indexOf(item);
		connections.splice(index, 1);
		delete connectionIdMap[id];
		return this;
	}
	addTopic(connectionId, topicName) {
		const { connectionIdMap } = this;
		const { topics } = connectionIdMap[connectionId];
		topics.add(topicName);
		return this;
	}
	removeTopic(connectionId, topicName) {
		const { connectionIdMap } = this;
		const { topics } = connectionIdMap[connectionId];
		topics.delete(topicName);
		return this;
	}
	getConnectionsByTopic(topicName) {
		return this.connections
			.filter(({ topics }) => topics.has(topicName))
			.map(({ connection }) => connection);
	}
}
