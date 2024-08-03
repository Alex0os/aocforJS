const https = require('https');

const options = {
	hostname: 'adventofcode.com',
	port: 443,
	path: '/2023',
	method: 'GET',
	headers: {
		'Content-Type': 'text/html'
	},
};

const req = https.request(options, (res) => {
	console.log(`STATUS: ${res.statusCode}\n\n`);
	console.log(`HEADERS: ${JSON.stringify(res.headers)}\n\n`);
	res.setEncoding('utf8');
	res.on('data', (chunk) => {
		console.log(`BODY: ${chunk}\n\n`);
	});
	res.on('end', () => {
		console.log('No more data in response.');
	});
});

req.on('error', (e) => {
	console.error(`problem with request: ${e.message}`);
});

// Write data to request body
req.end();
