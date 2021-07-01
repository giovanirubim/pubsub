module.exports = class WebSocketConnection {
	constructor({ id, rawConnection }) {
		this.id = id;
		this.rawConnection = rawConnection;
	}
	send(data) {
		const json = JSON.stringify(data)
			.replace(/[^\x20-\x7e]/g, (char) => {
				const code = char.charCodeAt(0);
				const hex = code.toString(16).padStart(4, '0');
				return '\\u' + hex;
			});
		this.rawConnection.send(json);
		return this;
	}
	on(...args) {
		this.rawConnection.on(...args);
		return this;
	}
};
