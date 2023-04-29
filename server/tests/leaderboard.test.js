const supertest = require('supertest');
const createServer = require('../server');
const app = createServer();
const mongoose = require('mongoose');
const connect = require('../dbconnect.js');
const User = require('../models/user');

const expectedLeaderboard = [];

beforeAll(async () => {
    await connect();
    jest.setTimeout(5000);
});

afterAll(async () => {
    await mongoose.connection.close();
    jest.setTimeout(5000);
});

const request = {
    username: "testUsername",
    password: "testPassword"
};

describe('leaderboard', () => {

    describe('get leaderboard', () => {

        it('should return an array with the top 100 scores in descending order', async () => {
            getAllScores();
            const { body } = await supertest(app).post('/api/v1/user/login').send(request);
            const jwt = body.token;
                    
            let res = await supertest(app).get('/api/v1/user/getLeaderboard')
            .set({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + jwt})
            .send();

            const leaderboard = res.body.leaderboard;
            expect(leaderboard).toEqual(expect.arrayContaining(expectedLeaderboard));
            expect(expectedLeaderboard).toEqual(expect.arrayContaining(leaderboard));
            expect(leaderboard).toHaveLength(expectedLeaderboard.length);
        });
    });
});

function getAllScores() {
    User.getUsers({}, (error, users) => {
        if (error) {
            throw error;
        }
        users.forEach((user) => {
            user.scores.forEach((score) => {
                expectedLeaderboard.push({username: user.username, score: score.score, category: score.category});
            })
        })
    })
}