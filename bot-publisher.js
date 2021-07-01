const WebSocket = require('ws');
const socket = new WebSocket('ws://localhost:9000');
const topics = ['foz do iguaçu', 'santa catarina', 'toledo'];

const pickRandom = (array) => {
	const index = array.length*Math.random() | 0;
	return array[index];
};

const publish = ({ topic, data }) => {
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
			topic: pickRandom(topics),
			data: {
				temperature: Math.random()*15 + 15 | 0,
				windSpeed: Math.random()*60 | 0,
			},
		});
	}, 3000);
});
