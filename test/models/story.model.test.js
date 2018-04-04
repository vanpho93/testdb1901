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

    it('Can create story', async () => {
        await Story.createStory('abcd', userId);
        const story = await Story.findOne({}).populate('author');
        assert.equal(story.content, 'abcd');
        assert.equal(story.author._id, userId.toString());
        const user = await User.findById(userId).populate('stories');
        console.log(user.stories[0].content, 'abcd');
    });

    it('Cannot create story without content', async () => {
        const error = await Story.createStory('', userId).catch(error => error);
        assert.equal(error.code, 'INVALID_STORY_INFO');
        const story = await Story.findOne({}).populate('author');
        assert.equal(story, null);
        const user = await User.findById(userId);
        assert.equal(user.stories.length, 0);
    })
    it('Cannot create story with invalid userId', async () => {
        const error = await Story.createStory('', '123').catch(error => error);
        assert.equal(error.code, 'INVALID_ID');
        const story = await Story.findOne({}).populate('author');
        assert.equal(story, null);
        const user = await User.findById(userId);
        assert.equal(user.stories.length, 0);
    });
    it('Cannot create story with removed userId', async () => {
        await User.findByIdAndRemove(userId);
        const error = await Story.createStory('abcd', userId).catch(e => e);
        assert.equal(error.code, 'CANNOT_FIND_USER');
        const story = await Story.findOne({}).populate('author');
        assert.equal(story, null);
        const user = await User.findById(userId);
        assert.equal(user, null);
    });
});
