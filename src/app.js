const express = require('express');
const { json } = require('body-parser');

const { storyRouter } = require('./controllers/story.route');

const app = express();
app.use(json());

app.use('/story', storyRouter);

app.use((error, req, res, next) => {
    res.status(500).send({ success: false, message: error.message });
});

module.exports = { app };
