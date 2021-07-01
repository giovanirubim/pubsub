const WebSocket = require('ws');
const socket = new WebSocket('ws://localhost:9000/');

socket.on('open', () => {
	socket.send(JSON.stringify({
		action: 'subscribe',
		topic: 'foz do iguaçu',
	}));
});

socket.on('message', (json) => {
	const data = JSON.parse(json);
	console.log('received:', data);
});
