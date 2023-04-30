const User = require('../models/user');
const jwt = require('jsonwebtoken');

async function getLeaderboard(token) {
    try {
        jwt.verify(token, 'secretkey');
        const users = await User.getUsers({});

        const usersScores = [];
        users.forEach((user) => {
            user.scores.forEach((score) => {
                usersScores.push({username: user.username, score: score.score, category: score.category});
            });
        });
        usersScores.sort((a,b) => {
            return parseFloat(b.score) - parseFloat(a.score);
        });
        
        const leaderboard = usersScores.slice(0, 100);
        return leaderboard;
    }catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    getLeaderboard
}