class User {
    constructor(rest, raw){
       this.rest = rest;
       this.raw = raw;
       this.id = raw.user.id;
       this.userInfo = raw.user;
       this.balance = raw.cash;
    }
    addCash(amount){
        if(typeof amount != "number") return false;
        var totalBalance = this.balance + amount;
        this.rest.db.users.set(`${this.db}.cash`, totalBalance);
        this.balance = totalBalance;
    }
    setCash(amount){
        if(typeof amount != "number") return false;
        this.rest.db.users.set(`${this.db}.cash`, amount);
        this.balance = amount;
    }
    substractCash(amount){
        if(typeof amount != "number") return false;
        var totalBalance = this.balance - amount;
        this.rest.db.users.set(`${this.db}.cash`, totalBalance);
        this.balance = totalBalance;
    }
    async fetchBankAccount(){
        var acc = await this.rest.restObj.bankManager.get(this.id);
        return acc;
    }
    async fetchInventory(){
        var inventory = await this.rest.restObj.inventoryManager.get(this.id);
        return inventory;
    }
}
module.exports = User;