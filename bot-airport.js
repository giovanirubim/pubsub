const WebSocket = require('ws');
const socket = new WebSocket('ws://localhost:9000/');
const topics = process.argv.slice(2);

if (topics.length === 0) {
	console.error('No input topics');
	process.exit(1);
}

const currentData = Object.fromEntries(topics.map((topic) => [topic, null]));

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
	currentData[topic] = {
		...data,
		updatedAt: new Date().toString(),
	};
	const formatted = JSON.stringify(currentData, null, '\x20');
	console.clear();
	console.log(formatted);
});
