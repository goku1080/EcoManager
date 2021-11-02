const InventoryItem = require('./InventoryItem.js');
class Inventory {
    /**
     * 
     * @param {Object} rest Rest Info object
     * @param {Object} raw Raw Inventory object
     */
    constructor(rest, raw){
        /**
         * @type {Object}
         * 
         * Rest Info object
         */
        this.rest = rest;
        /**
         * @type {Object}
         * 
         * Raw Inventory object
         */
        this.raw = raw;
        /**
         * @type {String}
         * 
         * User's Discord ID
         */
        this.userID = raw.userID;
        /**
         * @type {Array}
         * 
         * Inventory Items Collection - this must be fetched with `fetchItems`
         */
        this.items;
    }
    /**
     * 
     * @returns {Collection<String, InventoryItem>} A Collection of inventory items
     * 
     * Gets inventory items and returns them + replaces `this.items` to this collection
     */
    fetchItems(){
        var items = new this.rest.Discord.Collection();
        this.raw.items.forEach(item => {
            var itemObj = new InventoryItem(this.rest, item);
            items.set(item.id, itemObj);
        });
        this.items = items;
        return items;
    }
    /**
     * 
     * @param {String} itemid Item's ID
     * @param {Number} amount Amount of items to add
     * 
     * @returns {InventoryItem} Inventory Item instanced class of the just added item - `false` If fails
     * 
     * Adds a certain amount of an item to the inventory, if the item doesn't exist in the inventory, it gets added
     */
    async addItem(itemid, amount = 1){
      var item = this.rest.restObj.itemManager.get(itemid);
      if(!item) return false;
      var alreadyHas = await this.get(itemid);
      if(alreadyHas){
          var totalAmount = alreadyHas.amount + amount;
          var itemRaw = this.raw.items.find(i => i.id == itemid);
          itemRaw.amount = totalAmount;
          alreadyHas.add(amount);
          var itemObj = new InventoryItem(this.rest, itemRaw);
          return itemObj;
    } else {
          var itemRaw = {
              id: itemid,
              amount
          };
          this.raw.items.push(itemformat);
          this.rest.db.inventories.set(`${this.userID}.items`, this.raw.items);
          var itemObj = new InventoryItem(this.rest, itemRaw, this);
          return itemObj;
      }
    }
    /**
     * 
     * @param {String} id Item's ID
     * 
     * @returns {InventoryItem} Inventory Item instanced class of the item - `false` If fails
     * 
     * Gets Inventory Item
     */
     async get(id){
         var item = await this.raw.items.find(i => i.id == id);
         if(!item) return false;
         var itemObj = new InventoryItem(this.rest, item);
         return itemObj;
     }
}
module.exports = Inventory;