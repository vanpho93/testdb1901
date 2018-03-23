const express = require('express');
const { json } = require('body-parser');

const { Story } = require('./models/status.model');

const app = express();
app.use(json());

app.get('/story', (req, res) => {
    Story.find({})
    .then(stories => res.send({ success: true, stories }))
    .catch(error => res.status(500).send({ success: false, message: error.message }));
});

app.post('/story', (req, res) => {
    const { content } = req.body;
    const story = new Story({ content });
    story.save()
    .then(story => res.status(201).send({ success: true, story }))
    .catch(error => res.status(400).send({ success: false, message: error.message }));
});

app.put('/story/:_id', (req, res) => {
    const { content } = req.body;
    Story.findByIdAndUpdate(req.params._id, { content })
    .then(story => {
        if (!story) throw new Error('Cannot find story.');
        res.status(201).send({ success: true, story });
    })
    .catch(error => res.status(400).send({ success: false, message: error.message }));
});

app.delete('/story/:_id', (req, res) => {
    Story.findByIdAndRemove(req.params._id)
    .then(story => {
        if (!story) throw new Error('Cannot find story.');
        res.send({ success: true, story });
    })
    .catch(error => res.status(404).send({ success: false, message: error.message }));
});

module.exports = { app };
