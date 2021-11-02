class UserBankManager {
    constructor(rest, user){
        this.rest = rest;
        this.user = user;
    }
    async fetch(){
        var acc = await this.user.fetchBankAccount();
        return acc;
    }
}
module.exports = UserBankManager;