const express = require('express'),
  helmet = require('helmet'),
  path = require('path'),
  compression = require('compression'),
  bodyParser = require('body-parser'),
  app = express(),
  http = require('http'),
  fs = require('fs'),
  server = http.createServer(app),
  config = require('./config');

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(compression());

app.use('/build', express.static(path.join(__dirname, 'build')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/config', (req, res) => {
  res.send(config.client);
});
app.use('/', (req, res, next) => {
  res.sendFile('index.html', {root: path.join(__dirname, 'public')})
});

app.set('port', process.env.PORT || config.port || '3000');

server.listen(app.get('port'), function () {
  console.log(`Тестовое приложение запущено http://localhost:${app.get('port')}`);
});