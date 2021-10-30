const Inventory = require('./Inventory.js');
class InventoryManager {
    constructor(rest, manager){
        this.rest = rest;
        this.manager = manager;
    }
    async create(userID){
      var isCreated = await this.rest.db.inventories.get(userID);
      if(isCreated) return false;
      this.rest.db.inventories.set(userID, {
          userID,
          items: []
      });
    }
    async get(userID){
      this.create(userID); // To be sure that the user has a inventory ^^
      var inventoryRaw = await this.rest.db.inventories.get(userID);
      if(!inventoryRaw) return false; // this should never happen, but better to be prepared, we dont want unexpected errors
      var inventory = new Inventory(this.rest, inventoryRaw);
      return inventory;
    }
}