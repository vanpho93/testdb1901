require('../src/helpers/connectDatabase');
const { Story } = require('../src/models/story.model');

process.env.NODE_ENV = 'test';

beforeEach('Remove database for test', async () => {
    await Story.remove({});
});
