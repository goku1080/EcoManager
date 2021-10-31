const ShopItem = require('./ShopItem.js');
class ShopManager {
    constructor(rest, manager){
        this.rest = rest;
        this.manager = manager;
    }
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