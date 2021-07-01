const PubSubServer = require('./Interface/PubSubServer');
const server = new PubSubServer({
	webSocketPort: 9000,
});
server.start();
