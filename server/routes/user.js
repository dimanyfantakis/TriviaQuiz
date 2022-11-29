const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');

router.post('/register', (req, res, next) => {

    User.getUserByUsername(req.body.username, (error, user) => {
        if (user) {
            return res.json({
                success: false,
                message: "A user with the username: " + user.username + ", already exists"
            });
        }

        let newUser = new User({
            username: req.body.username,
            password: req.body.password,
        });
    
        User.addUser(newUser, (error, user) => {
            if (error) {
                res.json({
                    success: false,
                    message: "Failed to register user"
                });
            }else {
                res.json({
                    success: true,
                    message: "User registered",
                    user: user
                });
            }
        });
    });
});

router.post('/login', (req, res) => {
    let user = User.getUserByUsername(req.body.username, (error, user) => {
        if (error) {
            throw error;
        }

        if (!user) {
            return res.json({
                success: false,
                message: "A user with that username and password doesn't exist"
            });
        }
    });

    jwt.sign({user: user}, 'secretkey', (error, token) => {
        res.json({
            success: true,
            token: token,
            user: user
        });
    });
});

router.post('/addScore', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error) => {
        if (error) {
            res.sendStatus(403);
            return;
        }
        User.getUserByUsername(req.body.username, (error, user) => {
            if (error) {
                throw error;
            }
    
            if (!user) {
                return res.json({
                    success: false,
                    message: "A user with that username and password doesn't exist"
                })
            }
            user.scores.push({score: parseInt(req.body.score), category: req.body.category});
            user.save();
            return res.json({
                success: true,
                message: "score added"
            });
        });
    })
});

router.get('/getScores', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error) => {
        if (error) {
            console.log(error)
            res.sendStatus(403);
            return;
        }
        User.getUserByUsername(req.query.username, (error, user) => {
            if (error) {
                throw error;
            }
    
            if (!user) {
                return res.json({
                    success: false,
                    message: "A user with that username and password doesn't exist"
                });
            }
    
            return res.json({
                scores: user.scores,
                success: true
            });
        });
    })
});

router.get('/getLeaderboard', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error) => {
        if (error) {
            res.sendStatus(403);
            return;
        }

        let usersScores = [];
        User.getUsers({}, (error, users) => {
            if (error) {
                throw error;
            }
            users.forEach((user) => {
                user.scores.forEach((score) => {
                    usersScores.push({username: user.username, score: score.score, category: score.category})
                })
            })
            
            usersScores.sort((a,b) => {
                return parseFloat(b.score) - parseFloat(a.score) 
            });

            const usersScoresTopHundred = usersScores.slice(0, 100);

            return res.json({
                leaderboard: usersScoresTopHundred,
                success: true
            });
        })
    })
});

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    }else {
        res.sendStatus(403);
    }
}

module.exports = router;