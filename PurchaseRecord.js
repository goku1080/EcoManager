class PurchaseRecord {
    constructor(rest, raw){
        this.rest = rest;
        this.raw = raw;
        this.user = this.raw.sender;
        this.amount = this.raw.amount;
        this.item = this.raw.item;
    }
}