const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
    content: { type: String, trim: true, required: true }
})

const Story = mongoose.model('Story', storySchema);

module.exports = { Story };
