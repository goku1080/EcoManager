class ShopItem {
    constructor(rest, raw){
        this.rest = rest;
        this.raw = raw;
        this.itemID = raw.itemID;
        this.price = raw.price;
    }
    async fetchItem(){
        if(!await this.rest.restObj.shopManager.get(this.itemID)) return false;
        var iL = await this.rest.restObj.itemManager.get(this.itemID);
        return iL;
    }
    async remove(){
        if(!await this.rest.restObj.shopManager.get(this.itemID)) return false;
        this.rest.db.shopitems.delete(this.itemID);
        return true;
    }
    edit(field, value){
        var validFields = [
            {
                field: "price",
                type: "int"
            }
        
        ];
            if(validFields.find(f => f.field == field)){
                if(typeof value == validFields.find(f => f.field == field).type){
                    this.rest.db.items.set(`${this.id}.${field}`, value);
                    this[field] = value;
                    return true;
                } else {
                   return false;
                }
            } else {
                return false;
            }
    
    }
}
module.exports = ShopItem;