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