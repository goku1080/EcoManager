class ShopManager {
    constructor(rest, manager){
        this.rest = rest;
        this.manager = manager;
    }
    add(data){
      if(!data.price || !data.itemID) return false;
      
    }
}