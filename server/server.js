const express = require('express');
const cors = require('cors');

module.exports = function createServer() {
    const app = express();
    const users = require('./routes/user');
    const corsOptions = {
        origin: 'http://localhost:4200'
    };

    app.use(cors());
    app.use(express.json());
    app.use('/api/v1/user', users);

    return app;
};