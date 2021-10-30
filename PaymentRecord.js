class PaymentRecord {
    constructor(rest, raw){
        this.rest = rest;
        this.raw = raw;
        this.amount = raw.amount;
    }
}