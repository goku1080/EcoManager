class UserInventoryManager {
    constructor(rest, user){
        this.rest = rest;
        this.user = user;
    }
    async fetch(){
        var inventory = await this.user.fetchInventory();
        return inventory;
    }
}
module.exports = UserInventoryManager;