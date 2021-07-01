const WebSocket = require('ws');
const socket = new WebSocket('ws://localhost:9000');
const topic = process.argv[2];

if (!topic) {
	console.error('No input topic');
	process.exit(1);
}

const publish = (data) => {
	const json = JSON.stringify({
		action: 'publish',
		topic,
		data,
	});
	console.log('publishing:', { topic, data });
	socket.send(json);
};

socket.on('open', () => {
	setInterval(() => {
		publish({
			temperature: Math.random()*15 + 15 | 0,
			windSpeed: Math.random()*60 | 0,
			humidity: Math.random()*30 + 70 | 0,
		});
	}, 3000);
});
