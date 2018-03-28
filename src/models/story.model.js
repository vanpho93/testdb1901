const mongoose = require('mongoose');
const { MyError } = require('./MyError.model');

const storySchema = new mongoose.Schema({
    content: { type: String, trim: true, required: true }
})

const StoryModel = mongoose.model('Story', storySchema);

class Story extends StoryModel {
    static createStory(content) {
        const story = new Story({ content });
        return story.save();
    }

    static async updateStory(idStory, content) {
        if (!content) {
            throw new MyError('Content should not be empty.', 400, 'CONTENT_NOT_EMPTY');
        }
        const story = await Story.findByIdAndUpdate(idStory, { content })
        .catch(error => {
            throw new MyError('Invalid id', 400, 'INVALID_ID');
        })
        if (!story) {
            throw new MyError('Cannot find story.', 404, 'CANNOT_FIND_STORY');
        }
        return story;
    }

    static async removeStory(idStory) {
        const story = await Story.findByIdAndRemove(idStory);
        if (!story) {
            throw new MyError('Cannot find story.', 404, 'CANNOT_FIND_STORY');
        }
        return story;
    }
}

module.exports = { Story };
