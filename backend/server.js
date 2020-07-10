const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const API_PORT = 3001;
const app = express();
app.use(cors());

const routes = require('./routes');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

app.use('/api', routes);
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));