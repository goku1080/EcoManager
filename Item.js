class Item {
    constructor(rest, raw){
        this.rest = rest;
        this.raw = raw;
        this.id = raw.id;
        this.displayName = raw.displayName;
        this.description = raw.description;
        this.usable = raw.usable;
        this.usedMessage = raw.usedMessage;
    }
    edit(field, value){
        /* Info base
        { displayName, description, usable, usedMessage }
        */
        var validFields = [
        {
            field: "displayName",
            type: "string"
        },
        {
            field: "description",
            type: "string"
        },
        {
            field: "usable",
            type: "boolean"
        },
        {
            field: "usedMessage",
            type: "string"
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
    async delete(){
        this.rest.db.items.delete(`${this.id}`);
        var shopItem = this.rest.restObj.shopManager.get(this.id);
        if(shopItem){
            shopItem.remove();
        }
        return true;
    }
    async fetchShopItem(){
        if(!await this.rest.restObj.itemManager.get(this.id)) return false;
        var siL = await this.rest.restObj.shopManager.get(this.id);
        return siL;
    }
}
module.exports = Item;