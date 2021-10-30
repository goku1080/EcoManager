const megadb = require('megadb');
const { UserManager } = require('./')
class EcoManager {
    constructor(rest){
        this.rest = rest;
    }
    // @params user obj
    // @returns true/false
    async processUser(user){
        var isCreated = await this.rest.db.users.get(user.id);
        if(isCreated) return;
        this.rest.db.users.set(user.id, {
            user: {
             id: user.id,
             tag: user.tag
            },
            cash: 0
        });
        return true;
    }
}
module.exports = EcoManager;