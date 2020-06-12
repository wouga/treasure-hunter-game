const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.status(403)
    res.json({
        message: 'Nothing for you'
    });
});


app.use(middlewares.store);

app.use('/api/v1', api);

app.use(middlewares.errorHandler);
app.use(middlewares.notFound);

module.exports = app;