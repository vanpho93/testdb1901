const assert = require('assert');
const { compare } = require('bcrypt');
const { User } = require('../../../src/models/user.model');
const { verify, sign } = require('../../../src/helpers/jwt');

describe.only('POST /user/signin', () => {
    beforeEach('Sign up 2 users for test', async () => {
        await User.signUp('Teo', 'teo@gmail.com', '321');
        await User.signUp('Ti', 'ti@gmail.com', '123');
    });

    it('Can sign in with username and password', async () => {
    });

    it('Cannot sign in with wrong email', async () => {
    });

    it('Cannot sign in with wrong password', async () => {
    });
});
