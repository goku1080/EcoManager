const Inventory = require('./Inventory.js');
class InventoryManager {
  /**
     * 
     * @param {Object} rest Rest Info object
     * @param {EcoManager} manager Eco Manager instance
     */
    constructor(rest, manager){
         /**
         * @type {Object}
         * 
         * Rest Info object
         */
          this.rest = rest;
          /**
           * @type {EcoManager}
           * 
           * Eco Manager instance
           */
          this.manager = manager;
    }
    /**
     * 
     * @param {String} userID User's Discord ID
     * 
     * @returns {boolean} Result (True or False)
     * 
     * Creates user inventory
     */
    async create(userID){
      var isCreated = await this.rest.db.inventories.get(userID);
      if(isCreated) return false;
      this.rest.db.inventories.set(userID, {
          userID,
          items: []
      });
      return true;
    }
    /**
     * 
     * @param {String} userID User's Discord ID
     *  
     * @returns {Inventory} Inventory instanced class - `false` If fails
     */
    async get(userID){
      this.create(userID); // To be sure that the user has a inventory ^^
      var inventoryRaw = await this.rest.db.inventories.get(userID);
      if(!inventoryRaw) return false; // this should never happen, but better to be prepared, we dont want unexpected errors
      var inventory = new Inventory(this.rest, inventoryRaw);
      return inventory;
    }
}
module.exports = InventoryManager;