const PubSubServer = require('./Interface/PubSubServer');
const server = new PubSubServer({
	httpPort: 80,
	webSocketPort: 9000,
});
server.start();
