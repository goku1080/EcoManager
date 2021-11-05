class PaymentRecord {
    /**
     * 
     * @param {Object} rest Rest Info object
     * @param {Object} raw Transaction Raw object
     */
    constructor(rest, raw){
        /**
         * @type {Object}
         * 
         * Rest Info object
         */
        this.rest = rest;
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
         * @type {Object}
         * 
         * Raw Transaction object
         */
        this.raw = raw;
        /**
         * @type {Number}
         * 
         * Amount of money paid
         */
        this.amount = raw.amount;
    }
}
module.exports = PaymentRecord;