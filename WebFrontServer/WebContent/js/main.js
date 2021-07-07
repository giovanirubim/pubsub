import * as websocket from './websocket.js';

websocket.ondata(({ topic, data }) => {
	if (!topic) {
		return;
	}
	const now = new Date();
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
});

const unsubscribe = (topic) => websocket.send({
	action: 'unsubscribe',
	topic: topic,
});

const subscribe = (topic) => websocket.send({
	action: 'subscribe',
	topic: topic,
});

let topicTemplate = '';

const addTopic = (name) => {
	$('body').append(topicTemplate);
	const topic = $('.topic').last();
	topic.attr('topic-name', name);
	topic.find('.topic-name').html(name);
	subscribe(name);
};

$(document).ready(() => {
	let input = $('input[type="text"]');
	let button = $('input[type="button"]');
	const topic = $('.topic-template');
	topic.remove();
	topic.removeClass('topic-template');
	topicTemplate = topic[0].outerHTML;
	button.on('click', () => {
		addTopic(input.val());
		input.val('');
	});
	input.on('keyup', (e) => {
		if (e.key !== 'Enter') {
			return;
		}
		if (!e.ctlrKey && !e.altKey && !e.shiftKey) {
			button.trigger('click');
		}
	});
	$('body').on('click', '.remove', function() {
		const topic = $(this).closest('.topic');
		topic.remove();
		const name = topic.attr('topic-name');
		unsubscribe(name);
	});
});
