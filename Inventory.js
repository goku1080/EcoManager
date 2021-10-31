const InventoryItem = require('./InventoryItem.js');
class Inventory {
    constructor(rest, raw){
        this.rest = rest;
        this.raw = raw;
        this.userID = raw.userID;
        this.items;
    }
    fetchItems(){
        var items = new this.rest.Discord.Collection();
        this.raw.items.forEach(item => {
            var itemObj = new InventoryItem(this.rest, item);
            items.set(item.id, itemObj);
        });
        this.items = items;
        return items;
    }
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
     async get(id){
         var item = await this.raw.items.find(i => i.id == id);
         if(!item) return false;
         var itemObj = new InventoryItem(this.rest, item);
         return itemObj;
     }
}
module.exports = Inventory;