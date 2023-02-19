let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');

let user = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String}
} , {timestamps: true});


user.pre('save', async function (next) {
    if (this.password && this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

user.methods.verifyPassword = async function(password) {
    try {
        let result = await bcrypt.compare(password, this.password);
    return result;
    } catch (error) {
        return error;
    }
}

user.methods.signToken = async function() {
    console.log(this);
    let payload = {
        username: this.username
    };
    // jwt.sign(payload, "thisisasecret", (err, token) => {
    //     err ? console.log(err) : this.token = token;
    // });
    try {
        let token = await jwt.sign(payload, "thisisasecret");
        return token;
    } catch (error) {
        return error
    }

}

user.methods.userJSON = function(token) {
    return {
        username: this.username,
        token: token
    }
}

module.exports = mongoose.model('User', user);