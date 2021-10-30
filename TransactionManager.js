const AccountTransactionManager = require('./AccountTransactionManager.js');
class TransactionManager {
    constructor(rest, manager){
        this.rest = rest;
        this.manager = manager;
    }
    async get(userID){
        var bankAcc = await this.rest.restObj.bankManager.get(userID);
        if(!bankAcc) return false;
        var accountTransactions = new AccountTransactionManager(this.rest, bankAcc);
        return accountTransactions;
    }
}