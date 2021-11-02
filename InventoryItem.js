const Item = require('./Item.js');
class InventoryItem {
    /**
     * 
     * @param {Object} rest Rest Info object
     * @param {Object} raw Inventory Item raw object
     * @param {Inventory} inventory Inventory instanced class
     */
    constructor(rest, raw, inventory){
        /**
         * @type {Object}
         * 
         * Rest Info object
         */
        this.rest = rest;
        /**
         * @type {Object}
         * 
         * Inventory Item raw object
         */
        this.raw = raw;
        /**
         * @type {String}
         * 
         * Item's ID
         */
        this.itemID = raw.id;
        /**
         * @type {Number}
         * 
         * Item's amount in the inventory
         */
        this.amount = raw.amount;
        /**
         * @type {Item}
         * 
         * Original Item
         */
        this.item;
        /**
         * @type {Inventory}
         * 
         * Inventory
         */
        this.inventory = inventory;
    }
    /**
     * 
     * @returns {Item} Item instanced class - `false` If fails
     * 
     * Fetches original Item
     */
    async fetchItem(){ // Get Original Item
         var item = await this.rest.restObj.itemManager.get(this.itemID);
         if(!item) return false;
         var iL = new Item(this.rest, item);
         return iL;
    }
    /**
     * 
     * @param {Number} amount Amount to add
     * 
     * @returns {boolean} Result (True or False)
     * 
     * Adds an amount of the item to the inventory
     */
    async add(amount){ // Adds an amount of the item to the inventory
     var inv = await this.rest.db.inventories.get(this.inventory.userID);
     var total = this.amount + amount;
     inv.items.find(i => i.id == this.itemID).amount = total;
     this.rest.db.inventories.set(`${this.inventory.userID}.items`, inv.items);
     this.amount = total;
     return true;
    }
    /**
     * 
     * @param {Number} amount Amount to substract
     * 
     * @returns {boolean} Result (True or False)
     * 
     * Substracts an amount of the item from the inventory
     */
    async substract(amount){ // Substracts an amount of the item from the inventory
        var inv = await this.rest.db.inventories.get(this.inventory.userID);
        var total = this.amount - amount;
        if(total >= 1) {
            inv.items.find(i => i.id == this.itemID).amount = total;
            this.rest.db.inventories.set(`${this.inventory.userID}.items`, inv.items);
            this.amount = total;
            return true;
        } else {
            var newArrItems = inv.items.filter(i => i.id != this.itemID);
            this.rest.db.inventories.set(`${this.inventory.userID}.items`, newArrItems);
            this.amount = 0;
            return true;
        }
 
    }
    /**
     * 
     * @param {Number} amount Amount to set
     * 
     * @returns {boolean} Result (True or False)
     * 
     * Sets an amount of the item to the inventory
     */
    async setAmount(amount){ // Sets an amount to the item in the inventory
        var inv = await this.rest.db.inventories.get(this.inventory.userID);
        if(amount < 1){
            var newArrItems = inv.items.filter(i => i.id != this.itemID);
            this.rest.db.inventories.set(`${this.inventory.userID}.items`, newArrItems);
            this.amount = 0;
            return true;
        } else {
            inv.items.find(i => i.id == this.itemID).amount = amount;
            this.rest.db.inventories.set(`${this.inventory.userID}.items`, inv.items);
            this.amount = amount;
            return true;
        }
    }
    /**
     * 
     * @returns {boolean} Result (True or False)
     * 
     * Removes the item from the inventory
     */
    async delete(){ // Forces to delete the item from the inventory
        var inv = await this.rest.db.inventories.get(this.inventory.userID);
        var newArrItems = inv.items.filter(i => i.id != this.itemID);
        this.rest.db.inventories.set(`${this.inventory.userID}.items`, newArrItems);
        this.amount = 0;
        return true;
    }
}
module.exports = InventoryItem;