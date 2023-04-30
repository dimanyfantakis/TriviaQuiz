const express = require('express');
const router = express.Router();
const UserService = require('../services/user');
const LeaderboardService = require('../services/leaderboard');

router.post('/register', async (req, res) => {
    try {
        const newUser = await UserService.register(req.body);
        if (newUser === undefined || Object.entries(newUser).length == 0) {
            return res.status(404).send({
                success: false,
                message: "A user with the username: " + req.body.username + ", already exists"
            });
        }
        res.status(200).send({
            success: true,
            message: "User registered",
            user: newUser
        });
    }catch (error) {
        res.status(400).send({
            success: false,
            message: "Failed to register user"
        })
    }
});

router.post('/login', async (req, res) => {
    try {
        const {user, token} = await UserService.login(req.body);
        if (user === undefined || Object.entries(user).length == 0) {
            return res.status(404).send({
                success: false,
                message: "A user with that username and password doesn't exist"
            });
        }

        res.status(200).send({
            success: true,
            token: token,
            user: user
        });
    }catch (error) {
        res.status(400).send({
            success: false,
            message: "Failed to login user"
        })
    }
});

router.post('/addScore', verifyToken, async (req, res) => {
    try {
        const user = await UserService.addScore(req.body, req.token);
        if (user === undefined || Object.entries(user).length == 0) {
            return res.status(404).send({
                success: false,
                message: "A user with that username and password doesn't exist"
            });
        }

        res.status(200).send({
            success: true,
            message: "score added"
        });
    }catch (error) {
        res.status(400).send({
            success: false,
            message: "Failed to login user"
        })
    }
});

router.get('/getScores', verifyToken, async (req, res) => {
    try {
        const userScores = await UserService.getScores(req.query.username, req.token);
        if (userScores === undefined) {
            return res.status(404).send({
                success: false,
                message: "A user with that username and password doesn't exist"
            });
        }

        res.status(200).send({
            scores: userScores,
            success: true
        });        
    }catch (error) {
        res.status(400).send({
            success: false,
            message: "Failed to login user"
        })
    }
    
});

router.get('/getLeaderboard', verifyToken, async (req, res) => {
    try {
        const scores = await LeaderboardService.getLeaderboard(req.token);
        
        if (scores === undefined) {
            return res.status(404).send({
                success: false,
                message: "Failed to retrieve the leaderboard"
            });
        }
        res.status(200).send({
            leaderboard: scores,
            success: true
        });
    }catch (error) {
        res.status(400).send({
            success: false,
            message: "Failed to retrieve the leaderboard"
        })
    }
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