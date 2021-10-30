class InventoryItem {
    constructor(rest, raw, inventory){
        this.rest = rest;
        this.raw = raw;
        this.itemID = raw.id;
        this.amount = raw.amount;
        this.item;
        this.inventory = inventory;
    }
    async fetchItem(){ // Get Original Item
         var item = await this.rest.restObj.itemManager.get(this.itemID);
         if(!item) return false;
         return item;
    }
    add(amount){ // Adds an amount of the item to the inventory
     var inv = await this.rest.db.inventories.get(this.inventory.userID);
     var total = this.amount + amount;
     inv.items.find(i => i.id == this.itemID).amount = total;
     this.rest.db.inventories.set(`${this.inventory.userID}.items`, inv.items);
     this.amount = total;
     return true;
    }
    substract(){ // Substracts an amount of the item to the inventory
        var inv = await this.rest.db.inventories.get(this.inventory.userID);
        var total = this.amount - amount;
        if(total >= 1) {
            inv.items.find(i => i.id == this.itemID).amount = total;
            this.rest.db.inventories.set(`${this.inventory.userID}.items`, inv.items);
            this.amount = total;
            return true;
        } else {
            var newArrItems = inv.items.filter(i => i.id != this.itemID);
            this.rest.db.inventories.set(`${this.inventory.userID}.items`, newArrItems);
            this.amount = 0;
            return true;
        }
 
    }
    setAmount(amount){ // Sets an amount to the item in the inventory
        var inv = await this.rest.db.inventories.get(this.inventory.userID);
        if(amount < 1){
            var newArrItems = inv.items.filter(i => i.id != this.itemID);
            this.rest.db.inventories.set(`${this.inventory.userID}.items`, newArrItems);
            this.amount = 0;
            return true;
        } else {
            inv.items.find(i => i.id == this.itemID).amount = amount;
            this.rest.db.inventories.set(`${this.inventory.userID}.items`, inv.items);
            this.amount = amount;
            return true;
        }
    }
    delete(){ // Forces to delete the item from the inventory
        var inv = await this.rest.db.inventories.get(this.inventory.userID);
        var newArrItems = inv.items.filter(i => i.id != this.itemID);
        this.rest.db.inventories.set(`${this.inventory.userID}.items`, newArrItems);
        this.amount = 0;
        return true;
    }
}