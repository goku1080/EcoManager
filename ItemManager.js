const Item = require('./Item.js');
class ItemManager {
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
     * @param {Object} info Item base data
     * @property {String} displayName Item's Display name
     * @property {String} description Item's description
     * @property {boolean} usable Usable or not (True or False)
     * @property {String} usedMessage The message that is sent when item is used
     * 
     * @returns {Item} Item instanced class - `false` If fails
     * 
     * Creates item
     */
    async create(info){
        /* Info base
        { displayName, description, usable, usedMessage }
        */
       if(!info.displayName || !info.description || usable == null) return false;
       var id = `${this.rest.db.items.size()+1}`;
       this.rest.db.items.set(id, {
           id,
           displayName: info.displayName,
           description: info.description,
           usable: info.usable,
           usedMessage: info.usedMessage,
           deleted: false
       });
       var itemObj = new Item(this.rest, info);
       return itemObj;
    }
    /**
     * 
     * @param {String} id Item's ID
     * 
     * @returns {Item} Item instanced class - `false` If fails - Collection of Items if an ID was not given
     * 
     * Gets Item(s)
     */
    async get(id = null){
        if(!id){
          var fullItems = await this.rest.db.items.values();
          var itemsRaw = fullItems.filter(i => i.deleted == false);
          var items = new this.rest.Discord.Collection();
          itemsRaw.forEach(item => {
            var itemObj = new Item(this.rest, item);
            items.set(item.id, itemObj);
          });
          return items;
        } else {
            var itemRaw = await this.rest.db.items.get(id);
            if(!itemRaw || itemRaw.deleted == true) return false;
            var item = new Item(this.rest, itemRaw);
            return item;
        }
    }
}
module.exports = ItemManager;