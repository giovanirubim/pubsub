const WebSocket = require('ws');
const socket = new WebSocket('ws://localhost:9000/');
const topics = process.argv.slice(2);

if (topics.length === 0) {
	console.error('No input topics');
	process.exit(1);
}

const topicMap = Object.fromEntries(topics.map((topic) => [topic, null]));

const refreshScreen = () => {
	console.clear();
	console.log('Subscribed to: ' + topics.map((topic) => `"${topic}"`).join(', '));
	for (let topic in topicMap) {
		console.log(`\n${topic}:`);
		const data = topicMap[topic];
		if (!data) {
			console.log(' - No data received');
			continue;
		}
		for (let field in data) {
			console.log(` - ${field}: ${data[field]}`);
		}
	}
};

socket.on('open', () => {
	topics.forEach((topic) => {
		socket.send(JSON.stringify({
			action: 'subscribe',
			topic,
		}));
	});
});

socket.on('message', (json) => {
	const { topic, data } = JSON.parse(json);
	topicMap[topic] = {
		...data,
		'Updated at': new Date().toString(),
	};
	refreshScreen();
});

refreshScreen();
