const assert = require('assert');
const { compare } = require('bcrypt');
const { User } = require('../../src/models/user.model');

describe('Model User.signUp', () => {
    it('Can sign up user', async () => {
        const user = await User.signUp('Pho', 'a@gmail.com', '123');
        assert.equal(user.name, 'Pho');
        assert.equal(user.email, 'a@gmail.com');
        const user2 = await User.findOne({});
        assert.equal(user2.name, 'Pho');
        assert.equal(user2.email, 'a@gmail.com');
        const isSame = await compare('123', user2.password);
        assert.equal(isSame, true);
    });
});

describe('Model User.signIn', () => {
    beforeEach('Sign up 2 users for test', async () => {
        await User.signUp('Teo', 'teo@gmail.com', '321');
        await User.signUp('Ti', 'ti@gmail.com', '123');
    });

    it('Can sign in with username and password', async () => {
        
    });
});
