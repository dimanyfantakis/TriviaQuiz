const User = require('../models/user');
const jwt = require('jsonwebtoken');

function getLeaderboard(req, res) {
    jwt.verify(req.token, 'secretkey', (error) => {
        if (error) {
            return res.sendStatus(403);
        }

        let usersScores = [];
        User.getUsers({}, (error, users) => {
            if (error) {
                console.log(error)
                return res.sendStatus(403);
            }

            users.forEach((user) => {
                user.scores.forEach((score) => {
                    usersScores.push({username: user.username, score: score.score, category: score.category});
                })
            })
            
            usersScores.sort((a,b) => {
                return parseFloat(b.score) - parseFloat(a.score);
            });
            const topHundredUserScores = usersScores.slice(0, 100);

            res.status(200).send({
                leaderboard: topHundredUserScores,
                success: true
            });
        })
    })
}

module.exports = {
    getLeaderboard
}