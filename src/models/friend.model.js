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
        const user = await User.findOneAndUpdate(queryObj, updateObj, { new: true });
        validateUserExist(user);
        const receiver = await User.findByIdAndUpdate(
            idReceiver,
            { $push: { incommingRequests: idUser } },
            { fields: { name: 1 } }
        );
        validateUserExist(receiver);
        return receiver;
    }

    static async removeFriendRequest(idUser, idReceiver) {
        validateObjectIds(idUser, idReceiver);
        const user = await User.findByIdAndUpdate(
            idUser,
            { $pull: { sentRequests: idReceiver } }
        );
        validateUserExist(user);
        const queryObj = {
            _id: idReceiver,
            incommingRequests: { $eq: idUser }
        };
        const updateObj = { $pull: { incommingRequests: idUser } };
        const receiver = await User.findOneAndUpdate(queryObj, updateObj, { fields: { name: 1 } });
        validateUserExist(receiver);
        return receiver;
    }

    static async acceptRequest(idUser, idRequestUser) {}
    static async declineRequest(idUser, idRequestUser) {}
    static async removeFriend(idUser, idFriend) {}
}

module.exports = { Friend };
