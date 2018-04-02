const mongoose = require('mongoose');
const { hash, compare } = require('bcrypt');
const { sign } = require('../helpers/jwt');
// const { MyError } = require('./MyError.model');
// const { validateObjectIds, validateStoryExist } = require('../helpers/validators');

const userSchema = new mongoose.Schema({
    email: { type: String, trim: true, required: true, unique: true },
    password: { type: String, trim: true, required: true },
    name: { type: String, trim: true, required: true }
});

const UserModel = mongoose.model('User', userSchema);

class User extends UserModel {
    static async signUp(name, email, plainPassword) {
        const password = await hash(plainPassword, 8);
        const user = new User({ name, email, password });
        return user.save();
    }

    static async signIn(email, password) {
        const user = await User.findOne({ email });
        if (!user) throw new Error('Invalid user info.');
        const isSame = await compare(password, user.password);
        if (!isSame) throw new Error('Invalid user info.');
        const userInfo = user.toObject();
        const token = await sign({ _id: userInfo._id });
        userInfo.token = token;
        delete userInfo.password;
        return userInfo;
    }
}

module.exports = { User };
