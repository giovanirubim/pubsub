let topicTemplate = '';
let ws = new WebSocket('ws://localhost:9000');

ws.onmessage = ({ data: json }) => {
	const now = new Date();
	const { topic, data } = JSON.parse(json);
	if (!topic) {
		return;
	}
	const info = $(`[topic-name="${topic}"] .topic-info`);
	info.html('');
	for (let name in data) {
		const value = data[name];
		info.append(`<div></div>`);
		info.find('div').last().html(`${name}: ${value}`);
	}
	const timestamp = `${
		now.getHours().toString().padStart(2, '0')
	}:${
		now.getMinutes().toString().padStart(2, '0')
	}:${
		now.getSeconds().toString().padStart(2, '0')
	} ${
		now.getDate().toString().padStart(2, '0')
	}/${
		(now.getMonth() + 1).toString().padStart(2, '0')
	}/${
		now.getFullYear()
	}`
	info.closest('.topic').find('.timestamp').text(timestamp);
};

const wsReady = new Promise((done) => ws.onopen = done);
const send = async (data) => {
	const json = JSON.stringify(data);
	await wsReady;
	ws.send(json);
};

const unsubscribe = (topic) => send({
	action: 'unsubscribe',
	topic: topic,
});

const subscribe = (topic) => send({
	action: 'subscribe',
	topic: topic,
});

const addTopic = (name) => {
	$('body').append(topicTemplate);
	const topic = $('.topic').last();
	topic.attr('topic-name', name);
	topic.find('.topic-name').html(name);
	subscribe(name);
};

$(document).ready(() => {
	const topic = $('.topic-template');
	topic.remove();
	topic.removeClass('topic-template');
	topicTemplate = topic[0].outerHTML;
	addTopic('Foz do Iguaçu');
	$('input[type="button"]').on('click', () => {
		const topic = $('input[type="text"]').val();
		addTopic(topic);
	});
	$('body').on('click', '.remove', function() {
		const topic = $(this).closest('.topic');
		topic.remove();
		const name = topic.attr('topic-name');
		unsubscribe(name);
	});
});
