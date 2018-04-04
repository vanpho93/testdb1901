const assert = require('assert');
const request = require('supertest');
const { app } = require('../../../src/app');
const { Story } = require('../../../src/models/story.model.js');

xdescribe('POST /story', () => {
    it('Can create new story', async () => {
        const response = await request(app)
        .post('/story')
        .send({ content: 'abcd' });
        assert.equal(response.body.success, true);
        assert.equal(response.status, 201);
        const story = await Story.findOne({});
        const storyCount = await Story.count({});
        assert.equal(story.content, 'abcd');
        assert.equal(storyCount, 1);
    });

    it('Cannot create new story without content', async () => {
        const response = await request(app)
        .post('/story')
        .send({ content: '' });
        assert.equal(response.body.success, false);
        assert.equal(response.status, 400);
        assert.equal(response.body.code, 'INVALID_STORY_INFO');
        const story = await Story.findOne({});
        const storyCount = await Story.count({});
        assert.equal(story, null);
        assert.equal(storyCount, 0);
    });
});
