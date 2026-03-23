const http = require('http');

const data = JSON.stringify({
  message: 'Hola, ¿qué cabañas tienen?',
  history: []
});

const options = {
  hostname: 'localhost',
  port: 3001,
  path: '/api/chat',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  }
};

const req = http.request(options, res => {
  console.log(`STATUS: ${res.statusCode}`);
  res.on('data', d => {
    process.stdout.write(d);
  });
  res.on('end', () => {
    console.log('\n--END--');
  });
});

req.on('error', error => {
  console.error(error);
});

req.write(data);
req.end();
