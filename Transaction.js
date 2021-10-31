const PaymentRecord = require("./PaymentRecord.js");
const PaymentRequestRecord = require("./PaymentRequestRecord.js");
class Transaction {
    constructor(rest, raw){
        this.rest = rest;
        this.raw = raw;
        this.sender = raw.sender;
        this.receptor = raw.receptor;
        this.type = raw.type;
        if(this.type == "payment"){ this.record = new PaymentRecord(this.rest, this.raw); }
        if(this.type == "payment_request"){ this.record = new PaymentRequestRecord(this.rest, this.raw); }
    }

}
module.exports = Transaction;