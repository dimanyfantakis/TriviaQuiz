const User = require('../models/user');
const jwt = require('jsonwebtoken');

function register(req, res) {
    User.getUserByUsername(req.body.username, (error, user) => {
        if (user) {
            return res.status(404).send({
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
                return res.status(404).send({
                    success: false,
                    message: "Failed to register user"
                });
            }
            res.status(200).send({
                success: true,
                message: "User registered",
                user: user
            });
        });
    });
};

function login(req, res) {
    User.getUserByUsername(req.body.username, (error, user) => {
        if (error) {
            console.log(error);
            return res.sendStatus(403);
        }

        if (!user) {
            return res.status(404).send({
                success: false,
                message: "A user with that username and password doesn't exist"
            })
        }
        
        jwt.sign({user: user}, 'secretkey', (error, token) => {
            res.status(200).send({
                success: true,
                token: token,
                user: user
            });
        });
    });
}

function addScore(req, res) {
    jwt.verify(req.token, 'secretkey', (error) => {
        if (error) {
            return res.sendStatus(403);
        }
        User.getUserByUsername(req.body.username, (error, user) => {
            if (error) {
                console.log(error)
                return res.sendStatus(403);
            }
    
            if (!user) {
                return res.status(404).send({
                    success: false,
                    message: "A user with that username and password doesn't exist"
                })
            }

            user.scores.push({score: parseInt(req.body.score), category: req.body.category});
            user.save();
            res.status(200).send({
                success: true,
                message: "score added"
            });
        });
    })
}

function getScores(req, res) {
    jwt.verify(req.token, 'secretkey', (error) => {
        if (error) {
            console.log(error)
            return res.sendStatus(403);
        }
        User.getUserByUsername(req.query.username, (error, user) => {
            if (error) {
                console.log(error)
                return res.sendStatus(403);
            }
    
            if (!user) {
                return res.status(404).send({
                    success: false,
                    message: "A user with that username and password doesn't exist"
                })
            }

            res.status(200).send({
                scores: user.scores,
                success: true
            });
        });
    })
}

module.exports = {
    register,
    login,
    addScore,
    getScores
}