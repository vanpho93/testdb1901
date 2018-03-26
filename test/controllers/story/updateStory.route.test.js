const assert = require('assert');
const request = require('supertest');
const { app } = require('../../../src/app');
const { Story } = require('../../../src/models/story.model.js');

describe.only('PUT /story/:_id', () => {
    let storyId1;
    beforeEach('Create 2 stories for test', async () => {
        const story1 = new Story({ content: 'st1' });
        await story1.save();
        storyId1 = story1._id;
    });

    it('Can update story by _id', async () => {
        const response = await request(app)
        .put(`/story/${storyId1}`)
        .send({ content: 'xyz' });
        assert.equal(response.status, 200);
        assert.equal(response.body.success, true);
        assert.equal(response.body.story._id, storyId1);
        assert.equal(response.body.story.content, 'st1');
        const story = await Story.findOne({});
        assert.equal(story.content, 'xyz');
    });

    it('Cannot update story with wrong _id', async () => {
        const response = await request(app)
        .put(`/story/${123}`)
        .send({ content: 'abcd' });
        assert.equal(response.status, 400);
        assert.equal(response.body.success, false);
        const story = await Story.findOne({});
        assert.equal(story.content, 'st1');
    });

    it('Cannot update removed story', async () => {
        await Story.findByIdAndRemove(storyId1);
        const response = await request(app)
        .put(`/story/${storyId1}`)
        .send({ content: 'xyz' })
        assert.equal(response.status, 400);
        assert.equal(response.body.success, false);
        assert.equal(response.body.message, 'Cannot find story.');
    });
});
