class Item {
    /**
     * 
     * @param {Object} rest Rest Info object
     * @param {Object} raw Item Raw object
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
         * Raw Item object
         */
        this.raw = raw;
        /**
         * @type {String}
         * 
         * Item's ID
         */
        this.id = raw.id;
        /**
         * @type {String}
         * 
         * Item's Display name
         */
        this.displayName = raw.displayName;
        /**
         * @type {String}
         * 
         * Item's Description
         */
        this.description = raw.description;
        /**
         * @type {boolean}
         * 
         * If item is usable or not
         */
        this.usable = raw.usable;
        /**
         * @type {String}
         * 
         * Used message - If its not usable it should be `null`
         */
        this.usedMessage = raw.usedMessage;
    }
    /**
     * 
     * @param {String} field Field to edit
     * 
     * Valid Fields: [displayName, description, usable, usedMessage]
     * 
     * @param {*} value New value for field
     * 
     * @returns {boolean} Result (True or False)
     * 
     * Edits the item's field that is given with the new value also given
     */
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
    if(!await this.rest.restObj.itemManager.get(this.id)) return false;
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
    /**
     * 
     * @returns {boolean} Result (True or False)
     * 
     * Deletes the Item, also it deletes the item from shop if it is published in it
     */
    async delete(){
        if(!await this.rest.restObj.itemManager.get(this.id)) return false;
        this.rest.db.items.delete(`${this.id}`);
        var shopItem = this.rest.restObj.shopManager.get(this.id);
        if(shopItem){
            shopItem.remove();
        }
        return true;
    }
    /**
     * 
     * @returns {ShopItem} Shop Item instanced class - `false` If fails
     * 
     * Fetches Shop Item
     */
    async fetchShopItem(){
        if(!await this.rest.restObj.itemManager.get(this.id)) return false;
        var siL = await this.rest.restObj.shopManager.get(this.id);
        return siL;
    }
}
module.exports = Item;