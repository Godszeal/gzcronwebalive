// example_server.js
const express = require('express');
const http = require('http');
const path = require('path');
const { startCron, events } = require('./gzcronwebalive'); // requires local module folder

const app = express();
const server = http.createServer(app);

// serve docs
app.use('/', express.static(path.join(__dirname, 'docs')));

// SSE endpoint
let clients = [];
app.get('/events', (req, res) => {
  res.setHeader('Content-Type','text/event-stream');
  res.setHeader('Cache-Control','no-cache');
  res.setHeader('Connection','keep-alive');
  res.flushHeaders();
  clients.push(res);

  req.on('close', () => {
    clients = clients.filter(c => c !== res);
  });
});

// forward logs to SSE clients
events.on('log', (msg) => {
  clients.forEach(res => {
    try { res.write(`data: ${msg}\n\n`); } catch(e){ /* ignore */ }
  });
});

// start cron and server
startCron();
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Example server listening on ${PORT}`));
