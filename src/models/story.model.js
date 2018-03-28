const mongoose = require('mongoose');
const { MyError } = require('./MyError.model');
const { validateObjectIds, validateStoryExist } = require('../helpers/validators');

const storySchema = new mongoose.Schema({
    content: { type: String, trim: true, required: true }
})

const StoryModel = mongoose.model('Story', storySchema);

class Story extends StoryModel {
    static async createStory(content) {
        try {
            const story = new Story({ content });
            await story.save();
            return story;
        } catch (error) {
            throw new MyError('Invalid story info.', 400, 'INVALID_STORY_INFO');
        }
    }

    static async updateStory(idStory, content) {
        validateObjectIds(idStory);
        if (!content) {
            throw new MyError('Content should not be empty.', 400, 'CONTENT_NOT_EMPTY');
        }
        const story = await Story.findByIdAndUpdate(idStory, { content });
        validateStoryExist(story);
        return story;
    }

    static async removeStory(idStory) {
        validateObjectIds(idStory);
        const story = await Story.findByIdAndRemove(idStory)
        validateStoryExist(story);
        return story;
    }
}

module.exports = { Story };
