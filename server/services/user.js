const User = require('../models/user');
const jwt = require('jsonwebtoken');

async function register(userInput) {
    try {
        const user = await User.getUserByUsername(userInput.username);
        if (user){
            return;
        }

        const newUser = new User({
            username: userInput.username,
            password: userInput.password,
        });
        const createdUser = await User.addUser(newUser);
        return createdUser;
    }catch (error) {
        console.log(error);
        throw error;
    }
};

async function login(userInput) {
    try {
        const user = await User.getUserByUsername(userInput.username);
        if (!user){
            return;
        }

        const token = jwt.sign({user: user}, 'secretkey');
        return {user, token};
    }catch (error) {
        console.log(error);
        throw error;
    }
}

async function addScore(userInput, token) {
    try {
        jwt.verify(token, 'secretkey');
        const user = await User.getUserByUsername(userInput.username);
        if (!user){
            return;
        }

        user.scores.push({score: parseInt(userInput.score), category: userInput.category});
        user.save();
        return user;
    }catch (error) {
        console.log(error);
        throw error;
    }
}

async function getScores(username, token) {
    try {
        jwt.verify(token, 'secretkey');
        const user = await User.getUserByUsername(username);
        if (!user){
            return;
        }

        return user.scores;
    }catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    register,
    login,
    addScore,
    getScores
}