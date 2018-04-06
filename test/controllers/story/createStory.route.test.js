const assert = require('assert');
const request = require('supertest');
const { app } = require('../../../src/app');
const { Story } = require('../../../src/models/story.model.js');
const { User } = require('../../../src/models/user.model.js');

describe('POST /story', () => {
    let token, idUser;

    beforeEach('Get token for test', async () => {
        await User.signUp('Teo', 'teo@gmail.com', '321');
        const user = await User.signIn('teo@gmail.com', '321');
        token = user.token;
        idUser = user._id;
    });

    it.only('Can create new story', async () => {
        const response = await request(app)
        .post('/story')
        .set({ token })
        .send({ content: 'abcd' });
        assert.equal(response.body.success, true);
        assert.equal(response.body.story.content, 'abcd');
        const story = await Story.findOne({}).populate('author');
        assert.equal(story.content, 'abcd');
        assert.equal(story.author._id, idUser.toString());
        const user = await User.findById(idUser).populate('stories');
        assert.equal(user.stories[0].content, 'abcd');
    });

    it('Cannot create new story without content', async () => {
    });
});
