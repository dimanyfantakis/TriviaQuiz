const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/database.js');

try {
    mongoose.connect(
        config.mongoAtlasUri,
        { 
            useNewUrlParser: true,
            useUnifiedTopology: true 
        }, () => { 
            console.log(" Mongoose is connected");
        },
    );
} catch (e) {
    console.log("could not connect");
}

const dbConnection = mongoose.connection;
dbConnection.on("error", (err) => {
    console.log(`Connection error ${err}`);
});
dbConnection.once("open", () => {
    console.log("Connected to DB!")
});

const app = express();
const users = require('./routes/user');
const corsOptions = {
    origin: 'http://localhost:4200'
};

app.use(cors());
app.use(express.json());
app.use('/api/v1/user', users);

app.listen(5000, () => {
    console.log("server running: 5000");
});