const Item = require('./Item.js');
class ItemManager {
    constructor(rest, manager){
        this.rest = rest;
        this.manager = manager;
    }
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
           usedMessage: info.usedMessage
       });
       var itemObj = new Item(this.rest, info);
       return itemObj;
    }
    async get(id = null){
        if(!id){
          var itemsRaw = await this.rest.db.items.values();
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