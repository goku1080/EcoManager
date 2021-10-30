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
        this.rest.db.items.set(`${this.id}.${field}`, value);
        this[field] = value;
        return true;
    }
    async delete(){
        this.rest.db.items.delete(`${this.id}`);
        var shopItem = this.rest.restObj.shopManager.get(this.id);
        if(shopItem){
            shopItem.remove();
        }
        return true;
    }
}