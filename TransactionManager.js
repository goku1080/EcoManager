const AccountTransactionManager = require('./AccountTransactionManager.js');
class TransactionManager {
    /**
     * 
     * @param {Object} rest Rest Info object
     * @param {EcoManager} manager Eco Manager instance
     */
    constructor(rest, manager){
        /**
         * @type {Object}
         * 
         * Rest Info object
         */
         this.rest = rest;
         /**
          * @type {EcoManager}
          * 
          * Eco Manager instance
          */
        this.manager = manager;
    }
    /**
     * 
     * @param {String} userID User's Discord ID
     * 
     * @returns {AccountTransactionManager} Account Transaction Manager instanced class - `false` If fails
     * 
     * Get account transaction manager
     */
    async get(userID){
        var bankAcc = await this.rest.restObj.bankManager.get(userID);
        if(!bankAcc) return false;
        var accountTransactions = new AccountTransactionManager(this.rest, bankAcc);
        return accountTransactions;
    }
}
module.exports = TransactionManager;