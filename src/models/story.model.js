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
}

module.exports = { Story };
