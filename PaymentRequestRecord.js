class PaymentRequestRecord {
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
        /**
         * @type {boolean}
         * 
         * Payment request status (True - Paid | False - Pending or not paid)
         */
        this.status = raw.status;
    }
    /**
     * 
     * @param {boolean} status New status (True or False)
     * 
     * @returns {boolean} Result (True or False)
     * 
     * Updates payment request status, this doesn't affect to bank things, is reference-only
     */
    async updateStatus(status){
        var transaction = await this.rest.db.trs.get(this.raw.id);
        if(!transaction) return false;
        if(typeof status != "boolean") return false;
        this.rest.db.trs.set(`${this.raw.id}.status`, status);
        this.status = status;
        return true;
    }
}
module.exports = PaymentRequestRecord;