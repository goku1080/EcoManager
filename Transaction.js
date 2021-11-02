const PaymentRecord = require("./PaymentRecord.js");
const PaymentRequestRecord = require("./PaymentRequestRecord.js");
class Transaction {
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
         * Raw Transaction object
         */
        this.raw = raw;
        /**
         * @type {String}
         * 
         * Sender's Discord ID
         */
        this.sender = raw.sender;
        /**
         * @type {String}
         * 
         * Receptor's Discord ID
         */
        this.receptor = raw.receptor;
        /**
         * @type {String}
         * 
         * Transaction type
         */
        this.type = raw.type;
        if(this.type == "payment"){ 
         /**
          * @type {PaymentRecord}
          * 
          * Payment Record data
          */
         this.record = new PaymentRecord(this.rest, this.raw); 
        }
        if(this.type == "payment_request"){ 
            /**
             * @type {PaymentRequestRecord}
             * 
             * Payment Request Record data
             */
            this.record = new PaymentRequestRecord(this.rest, this.raw); 
        }
    }

}
module.exports = Transaction;