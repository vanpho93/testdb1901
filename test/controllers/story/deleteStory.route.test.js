const assert = require('assert');
const request = require('supertest');
const { app } = require('../../../src/app');
const { Story } = require('../../../src/models/story.model.js');

describe('DELETE /story/:_id', () => {
    let storyId1, storyId2;
    beforeEach('Create 2 stories for test', async () => {
        const story1 = new Story({ content: 'st1' });
        const story2 = new Story({ content: 'st2' });
        await story1.save();
        await story2.save();
        storyId1 = story1._id;
        storyId2 = story2._id;
    });

    it('Can delete story by _id', async () => {
        const response = await request(app)
        .delete(`/story/${storyId1}`);
        assert.equal(response.status, 200);
        assert.equal(response.body.success, true);
        assert.equal(response.body.story._id, storyId1);
        assert.equal(response.body.story.content, 'st1');
        const stories = await Story.find({});
        assert.equal(stories.length, 1);
        assert.equal(stories[0].content, 'st2');
    });

    it('Cannot delete story with wrong _id', async () => {
        const response = await request(app)
        .delete(`/story/${123}`);
        assert.equal(response.status, 400);
        assert.equal(response.body.success, false);
        assert.equal(response.body.code, 'INVALID_ID');
    });

    it('Cannot delete removed story', async () => {
        await Story.findByIdAndRemove(storyId1);
        const response = await request(app)
        .delete(`/story/${storyId1}`);
        assert.equal(response.status, 404);
        assert.equal(response.body.success, false);
        assert.equal(response.body.message, 'Cannot find story.');
        assert.equal(response.body.code, 'CANNOT_FIND_STORY');
    });
});
