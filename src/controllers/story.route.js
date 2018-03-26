const express = require('express');
const { Story } = require('../models/story.model');

const storyRouter = express.Router();

storyRouter.get('/', (req, res) => {
    Story.find({})
    .then(stories => res.send({ success: true, stories }))
    .catch(error => res.status(500).send({ success: false, message: error.message }));
});

storyRouter.post('/', (req, res) => {
    Story.createStory(req.body.content)
    .then(story => res.status(201).send({ success: true, story }))
    .catch(error => res.status(400).send({ success: false, message: error.message }));
});

storyRouter.put('/:_id', (req, res) => {
    const { content } = req.body;
    Story.findByIdAndUpdate(req.params._id, { content })
    .then(story => {
        if (!story) throw new Error('Cannot find story.');
        res.send({ success: true, story });
    })
    .catch(error => res.status(400).send({ success: false, message: error.message }));
});

storyRouter.delete('/:_id', (req, res) => {
    Story.findByIdAndRemove(req.params._id)
    .then(story => {
        if (!story) throw new Error('Cannot find story.');
        res.send({ success: true, story });
    })
    .catch(error => res.status(404).send({ success: false, message: error.message }));
});

module.exports = { storyRouter };
