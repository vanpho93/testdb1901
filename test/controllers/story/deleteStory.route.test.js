const assert = require('assert');
const request = require('supertest');
const { app } = require('../../../src/app');
const { Story } = require('../../../src/models/story.model.js');

describe.only('DELETE /story/:_id', () => {
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
        assert.equal(response.body.success, true);
        assert.equal(response.body.story._id, storyId1);
        assert.equal(response.body.story.content, 'st1');
        const stories = await Story.find({});
        assert.equal(stories.length, 1);
        assert.equal(stories[0].content, 'st2');
    });

    xit('Cannot delete story with wrong _id', async () => {
    });

    xit('Cannot delete removed story', async () => {
    });
});
