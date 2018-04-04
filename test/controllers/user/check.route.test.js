const assert = require('assert');
const { compare } = require('bcrypt');
const { User } = require('../../../src/models/user.model');
const request = require('supertest');
const { app } = require('../../../src/app');
const { verify, sign } = require('../../../src/helpers/jwt');

xdescribe('POST /user/check', () => {
    let token;

    beforeEach('Get token for test', async () => {
        await User.signUp('Teo', 'teo@gmail.com', '321');
        const user = await User.signIn('teo@gmail.com', '321');
        token = user.token;
    });

    it('Can pass sign in status with token', async () => {
    });

    it('Cannot pass sign in status with invalid token', async () => {
    });

    it('Cannot pass sign in status with valid token but _id', async () => {
    });

    it('Cannot pass sign in status with token of removed user.', async () => {
    });
});
