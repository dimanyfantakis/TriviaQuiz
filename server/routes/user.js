const express = require('express');
const router = express.Router();
const UserService = require('../services/user');
const LeaderboardService = require('../services/leaderboard');

router.post('/register', (req, res, next) => {
    UserService.register(req, res);
});

router.post('/login', (req, res) => {
    UserService.login(req, res);
});

router.post('/addScore', verifyToken, (req, res) => {
    UserService.addScore(req, res);
});

router.get('/getScores', verifyToken, (req, res) => {
    UserService.getScores(req, res);
});

router.get('/getLeaderboard', verifyToken, (req, res) => {
    LeaderboardService.getLeaderboard(req, res);
});

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader === 'undefined') {
        return res.sendStatus(403);
    }
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
}

module.exports = router;