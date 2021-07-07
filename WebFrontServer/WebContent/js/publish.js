import * as websocket from './websocket.js';

const publish = () => {
	const suffixes = {
		'Temperature': '°C',
		'Wind Speed':  'km/h',
		'Humidity':    '%',
	};
	const data = {};
	$('[field-name]').each(function(){
		const input = $(this);
		const name = input.attr('field-name');
		const suffix = suffixes[name];
		const value = input.val()
			.replace(/^.*?(-?\d+([.,]\d+)?)[^\d]*$/, `$1${suffix}`)
			.replace(',', '.');
		data[name] = value;
	});
	const topic = $('#topic').val();
	websocket.send({
		topic,
		action: 'publish',
		data,
	});
};

$(document).ready(() => {
	$('input[type="button"]').on('click', publish);
});
