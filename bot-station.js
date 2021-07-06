const WebSocket = require('ws');
const RandomGenerator =  require('./RandomGenerator');

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
	console.log(`\nPublishing to "${topic}":`);
	for (let field in data) {
		console.log(` - ${field}: ${data[field]}`);
	}
	socket.send(json);
};

const temperature = new RandomGenerator({
	min: 0,
	max: 40,
	stability: 0.65,
});
const windSpeed = new RandomGenerator({
	min: 0,
	max: 80,
	stability: 0.5,
});
const humidity = new RandomGenerator({
	min: 65,
	max: 100,
	stability: 0.9,
});

socket.on('open', () => {
	setInterval(() => {
		publish({
			'Temperature': Math.round(temperature.next()) + '°C',
			'Wind speed': Math.round(windSpeed.next()) + 'km/h',
			'Humidity': Math.round(humidity.next()) + '%',
		});
	}, 3000);
});
