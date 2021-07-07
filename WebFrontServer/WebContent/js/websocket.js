let ws, connectionPromise;
const connect = () => {
	ws = new WebSocket('ws://localhost:9000');
	let connected = false;
	connectionPromise = new Promise((done) => {
		ws.onopen = () => {
			console.log('WebSocket connected');
			connected = true;
			done();
		};
		ws.onclose = () => {
			if (connected) {
				console.log('WebSocket connection lost');
			}
			console.log('Retrying...');
			connect();
		};
	});
};
connect();
export const send = async (data) => {
	const json = JSON.stringify(data);
	await connectionPromise;
	ws.send(json);
};
export const ondata = (handler) => {
	ws.onmessage = ({ data: json }) => {
		const data = JSON.parse(json);
		handler(data);
	};
};
