module.exports = (root, req, res, next) => {
	const requestPath = req.url
		.replace(/[?#].*$/, '');
	const filePath = path.join(root, requestPath)
		.replace(/\/$/, '/index.html');
	try {
		if (!fs.existsSync(filePath)) {
			res.writeHead(404);
			res.end();
			return;
		}
		const stat = fs.lstatSync(filePath);
		if (stat.isDirectory()) {
			res.writeHead(301, {
				'location': requestPath + '/',
			});
			res.end();
			return;
		}
		const buffer = fs.readFileSync(filePath);
		res.writeHead(200, {
			'content-length': buffer.length,
			'content-type': mimeTypes.lookup(filePath),
		});
		res.write(buffer);
		res.end();
	} catch(error) {
		next(error);
	}
};
