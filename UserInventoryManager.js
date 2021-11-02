class UserInventoryManager {
    /**
     * 
     * @param {Object} rest Rest Info object
     * @param {User} user User instanced class
     */
    constructor(rest, user){
        /**
         * @type {Object}
         * 
         * Rest Info object
         */
         this.rest = rest;
         /**
          * @type {User}
          * 
          * User instanced class
          */
         this.user = user;
    }
    /**
     * 
     * @returns {Inventory} Inventory instanced class - `false` If fails
     * 
     * Fetches User's Inventory
     */
    async fetch(){
        var inventory = await this.user.fetchInventory();
        return inventory;
    }
}
module.exports = UserInventoryManager;