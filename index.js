const PubSubServer = require('./Interface/PubSubServer');
const WebFrontServer = require('./WebFrontServer')

new PubSubServer({
	webSocketPort: 9000,
}).start();

new WebFrontServer({
	port: 8080,
}).start();
