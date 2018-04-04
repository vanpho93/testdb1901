const assert = require('assert');
const { compare } = require('bcrypt');
const { User } = require('../../src/models/user.model');
const { Story } = require('../../src/models/story.model');
const { verify, sign } = require('../../src/helpers/jwt');

describe('Model User.createStory', () => {
    let userId;
    beforeEach('Create user for test', async () => {
        const user = await User.signUp('Teo', 'teo@gmail.com', '123');
        userId = user._id;
    });

    it.only('Can create story', async () => {
        await Story.createStory('abcd', userId);
        const story = await Story.findOne({}).populate('author');
        // console.log(story);
        const user = await User.findById(userId).populate('stories');
        console.log(user);
    });
});
