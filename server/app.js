const createServer = require('./server');
const connect = require('./dbconnect.js');

const app = createServer();

app.listen(5000, async () => {
    console.log("server running: 5000");
    await connect();
});