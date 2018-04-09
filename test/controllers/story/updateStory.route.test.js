const assert = require('assert');
const request = require('supertest');
const { app } = require('../../../src/app');
const { Story } = require('../../../src/models/story.model.js');
const { User } = require('../../../src/models/user.model.js');

describe('PUT /story/:_id', () => {
    let token1, idUser1, token2, idUser2, idStory;

    beforeEach('Create story and get token for test', async () => {
        await User.signUp('Teo', 'teo@gmail.com', '321');
        await User.signUp('Ti', 'ti@gmail.com', '321');
        const user1 = await User.signIn('teo@gmail.com', '321');
        const user2 = await User.signIn('ti@gmail.com', '321');
        token1 = user1.token;
        idUser1 = user1._id;
        token2 = user2.token;
        idUser2 = user2._id;
        const story = await Story.createStory('abcd', idUser1);
        idStory = story._id
    });

    it('Can update story', async () => {
    });

    it('Cannot update a story without content', async () => {
    });

    it('Cannot update story without token', async () => {
    });

    it('Cannot update story with invalid token format', async () => {
    });

    it('Cannot update story with other\'s token', async () => {
    });

    it('Cannot update story with wrong story id', async () => {
    });

    it('Cannot update a removed story', async () => {
    });
});
