const assert = require('assert');
const request = require('supertest');
const { app } = require('../../../src/app');
const { Friend } = require('../../../src/models/friend.model');
const { User } = require('../../../src/models/user.model.js');

describe.only('POST /friend/accept/:_id', () => {
    let token1, idUser1, token2, idUser2, idUser3, token3;

    beforeEach('Create users for test', async () => {
        await User.signUp('Teo', 'teo@gmail.com', '321');
        await User.signUp('Ti', 'ti@gmail.com', '321');
        await User.signUp('Tun', 'tun@gmail.com', '321');
        const user1 = await User.signIn('teo@gmail.com', '321');
        const user2 = await User.signIn('ti@gmail.com', '321');
        const user3 = await User.signIn('tun@gmail.com', '321');
        token1 = user1.token;
        idUser1 = user1._id;
        token2 = user2.token;
        idUser2 = user2._id;
        token3 = user3.token;
        idUser3 = user3._id;
        await Friend.sendFriendRequest(idUser1, idUser2);
    });

    it('Can accept friend request', async () => {
        const response = await request(app)
        .post('/friend/accept/' + idUser1)
        .set({ token: token2 })
        .send({});
        assert.equal(response.body.success, true);
        assert.equal(response.body.friend._id, idUser1);
        assert.equal(response.body.friend.name, 'Teo');
        const sender = await User.findById(idUser1).populate('friends');
        const receiver = await User.findById(idUser2).populate('friends');
        assert.equal(sender.friends[0]._id.toString(), idUser2);
        assert.equal(receiver.friends[0]._id.toString(), idUser1);
    });

    it('Cannot accept friend request for user, that have not sent you request', async () => {
        const response = await request(app)
        .post('/friend/accept/' + idUser3)
        .set({ token: token2 })
        .send({});
        assert.equal(response.body.success, false);
        assert.equal(response.body.code, 'CANNOT_FIND_USER');
        assert.equal(response.status, 404);
        const user1 = await User.findById(idUser1);
        const user2 = await User.findById(idUser2);
        const user3 = await User.findById(idUser3);
        assert.equal(user1.friends.length, 0);
        assert.equal(user1.friends.length, 0);
        assert.equal(user1.friends.length, 0);
    });

    it('Cannot accept friend request for user twice', async () => {
        await Friend.acceptRequest(idUser2, idUser1);
        const response = await request(app)
        .post('/friend/accept/' + idUser1)
        .set({ token: token2 })
        .send({});
        assert.equal(response.body.success, false);
        assert.equal(response.body.code, 'CANNOT_FIND_USER');
        assert.equal(response.status, 404);
        const user1 = await User.findById(idUser1);
        const user2 = await User.findById(idUser2);
        const user3 = await User.findById(idUser3);
        assert.equal(user1.friends.length, 1);
        assert.equal(user2.friends.length, 1);
        assert.equal(user3.friends.length, 0);
    });

    it('Cannot accept friend request for removed user', async () => {
        await User.findByIdAndRemove(idUser1);
        const response = await request(app)
        .post('/friend/accept/' + idUser1)
        .set({ token: token2 })
        .send({});
        assert.equal(response.body.success, false);
        assert.equal(response.body.code, 'CANNOT_FIND_USER');
        assert.equal(response.status, 404);
        const user2 = await User.findById(idUser2).populate('friends');
        assert.equal(user2.friends.length, 0);
    });

    it('Cannot accept friend request with removed user', async () => {
        await User.findByIdAndRemove(idUser2);
        const response = await request(app)
        .post('/friend/accept/' + idUser1)
        .set({ token: token2 })
        .send({});
        assert.equal(response.body.success, false);
        assert.equal(response.body.code, 'CANNOT_FIND_USER');
        assert.equal(response.status, 404);
        const user1 = await User.findById(idUser1).populate('friends');
        assert.equal(user1.friends.length, 0);
    });

    it('Cannot accept friend request without token', async () => {
        await User.findByIdAndRemove(idUser2);
        const response = await request(app)
        .post('/friend/accept/' + idUser1)
        .send({});
        assert.equal(response.body.success, false);
        assert.equal(response.body.code, 'INVALID_TOKEN');
        assert.equal(response.status, 400);
    });
});
