const assert = require('assert');
const { User } = require('../../src/models/user.model');

describe.only('Model User', () => {
    it('Can sign up user', async () => {
        const user = await User.signUp('Pho', 'a@gmail.com', '123');
        console.log(user);
    });
});
