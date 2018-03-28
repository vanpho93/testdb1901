const mongoose = require('mongoose');

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
        if (!content) throw new Error('Content should not be empty.');
        const story = await Story.findByIdAndUpdate(idStory, { content });
        if (!story) throw new Error('Cannot find story.');
        return story;
    }

    static async removeStory(idStory) {
        const story = await Story.findByIdAndRemove(idStory);
        if (!story) throw new Error('Cannot find story.');
        return story;
    }
}

module.exports = { Story };
