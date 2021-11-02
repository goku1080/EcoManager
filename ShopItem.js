class ShopItem {
    /**
     * 
     * @param {Object} rest Rest Info object
     * @param {Object} raw Raw Shop Item
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
         * Raw Shop Item object
         */
        this.raw = raw;
        /**
         * @type {String}
         * 
         * Item's ID
         */
        this.itemID = raw.itemID;
        /**
         * @type {Number}
         * 
         * Shop Item's price
         */
        this.price = raw.price;
    }
    /**
     * 
     * @returns {Item} Item instanced class - `false` If fails
     * 
     * Fetches Original Item
     */
    async fetchItem(){
        if(!await this.rest.restObj.shopManager.get(this.itemID)) return false;
        var iL = await this.rest.restObj.itemManager.get(this.itemID);
        return iL;
    }
    /**
     * 
     * @returns {boolean} Result (True or False)
     * 
     * Removes the item from the shop
     */
    async remove(){
        if(!await this.rest.restObj.shopManager.get(this.itemID)) return false;
        this.rest.db.shopitems.delete(this.itemID);
        return true;
    }
   /**
     * 
     * @param {String} field Field to edit
     * 
     * Valid Fields: [price]
     * 
     * @param {*} value New value for field
     * 
     * @returns {boolean} Result (True or False)
     * 
     * Edits the item's field that is given with the new value also given
     */
    edit(field, value){
        var validFields = [
            {
                field: "price",
                type: "number"
            }
        
        ];
        if(!await this.rest.restObj.shopManager.get(this.itemID)) return false;
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