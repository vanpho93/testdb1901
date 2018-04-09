const mongoose = require('mongoose');
const { MyError } = require('./MyError.model');
const { User } = require('./user.model');
const { validateObjectIds, validateStoryExist, validateUserExist } = require('../helpers/validators');

const commentSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: { type: String, trim: true, required: true },
    fans: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

const CommentModel = mongoose.model('Comment', commentSchema);

class Comment extends CommentModel {}

module.exports = { Comment };
