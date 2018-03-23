const assert = require('assert');
const request = require('supertest');
const { app } = require('../../../src/app');
const { Story } = require('../../../src/models/story.model.js');

describe('POST /story', () => {
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
});
