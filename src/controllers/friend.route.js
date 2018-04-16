const express = require('express');
const { Friend } = require('../models/friend.model');
const { mustBeUser } = require('./user.middleware');

const friendRouter = express.Router();

friendRouter.use(mustBeUser);

friendRouter.post('/request/:idReceiver', (req, res) => {
    Friend.sendFriendRequest(req.idUser, req.params.idReceiver)
    .then(receiver => res.send({ success: true, receiver }))
    .catch(res.onError);
});

friendRouter.post('/cancel/:idReceiver', (req, res) => {
    Friend.removeFriendRequest(req.idUser, req.params.idReceiver)
    .then(receiver => res.send({ success: true, receiver }))
    .catch(res.onError);
});

friendRouter.post('/decline/:idSender', (req, res) => {
    Friend.removeFriendRequest(req.idUser, req.params.idSender)
    .then(sender => res.send({ success: true, sender }))
    .catch(res.onError);
});

module.exports = { friendRouter };
