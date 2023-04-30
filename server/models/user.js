const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    scores: [{
        score: Number,
        category: String
    }]
}, 
{
    collection: 'users'
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
}

module.exports.getUsers = async function(id) {
    try {
        const users = await User.find({});
        return users;        
    }catch (error) {
        throw error;
    }
}

module.exports.getUserByUsername = async function(username) {
    const query = {username: username}
    try {
        const user = await User.findOne(query);
        return user;
    }catch (error) {
        throw error;    
    }
}

module.exports.addUser = async function(newUser) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(newUser.password, salt);
        newUser.password = hash;
        const createdUser = await newUser.save();
        return createdUser;
    }catch (error) {
        throw error;
    }
}