const { User } = require('./user.model');
const { validateObjectIds, validateUserExist } = require('../helpers/validators');

class Friend {
    static async sendFriendRequest(idUser, idReceiver) {
        validateObjectIds(idUser, idReceiver);
        const queryObj = {
            _id: idUser,
            friends: { $ne: idReceiver },
            incommingRequests: { $ne: idReceiver },
            sentRequests: { $ne: idReceiver },
        };
        const updateObj = { $push: { sentRequests: idReceiver } };
        const receiver = await User.findByIdAndUpdate(idReceiver, { $push: { incommingRequests: idUser } });
        validateUserExist(receiver);
        const user = await User.findOneAndUpdate(queryObj, updateObj, { new: true });
        validateUserExist(user);
        return user;
    }
    static async removeFriendRequest(idUser, idReceiver) {}
    static async acceptRequest(idUser, idRequestUser) {}
    static async declineRequest(idUser, idRequestUser) {}
    static async removeFriend(idUser, idFriend) {}
}

module.exports = { Friend };
