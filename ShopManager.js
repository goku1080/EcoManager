const { Collection } = require('discord.js');
const ShopItem = require('./ShopItem.js');
class ShopManager {
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
     * @param {Object} data Shop Item data object
     * @property {String} itemID Item's ID
     * @property {Number} price Price for item
     *  
     * @returns {ShopItem} Shop Item instanced class - `false` If fails
     * 
     * Adds the item to the shop
     */
    async add(data){
      if(!data.price || !data.itemID) return false;
      if(await this.get(data.itemID)) return false;
      var siR = {
        id: data.itemID,
        price: parseInt(data.price)
      };
      this.rest.db.shopitems.set(data.itemID, siR);
      var siL = new ShopItem(this.rest, siR);
      return siL;
    }
    /**
     * 
     * @param {String} [id] Item's ID - Optional
     * 
     * @returns {ShopItem} Shop Item instanced class - `false` If fails - Collection of Shop Items if an ID is not given
     */
    async get(id = null){
      if(id){
        var siR = await this.rest.db.shopitems.get(id);
        if(!iR) return false;
        var siL = new ShopItem(this.rest, siR);
        return siL;
      } else {
        var sis = await this.rest.db.shopitems.values();
        var siC = new this.rest.Discord.Collection();
        sis.forEach(siR => {
          var siL = new ShopItem(this.rest, siR);
          siC.set(siR.id, siL);
        });
        return siC;
      }
    }
}
module.exports = ShopManager;