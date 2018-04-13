const { User } = require('./user.model');

class Friend {
    static async sendFriendRequest(idUser, idReceiver) {}
    static async removeFriendRequest(idUser, idReceiver) {}
    static async acceptRequest(idUser, idRequestUser) {}
    static async declineRequest(idUser, idRequestUser) {}
    static async removeFriend(idUser, idFriend) {}
}

module.exports = { Friend };
