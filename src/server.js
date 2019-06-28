const http = require('http');
const express = require('express');

const app = express();

app.use(express.static('bench'));

const server = http.createServer(app);

server.listen(8080);

console.log('Listening on 8080...');
