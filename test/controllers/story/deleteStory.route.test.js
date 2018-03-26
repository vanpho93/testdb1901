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

    xit('Can delete story by _id', async () => {
    });

    xit('Cannot delete story with wrong _id', async () => {
    });

    xit('Cannot delete removed story', async () => {
    });
});
