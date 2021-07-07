const ws = new WebSocket('ws://localhost:9000');
const connectionPromise = new Promise((done) => ws.onopen = done);
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
