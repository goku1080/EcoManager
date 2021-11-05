const Transaction = require('./Transaction.js');
class AccountTransactionManager {
    /**
     * 
     * @param {Object} rest Rest Info object
     * @param {BankAccount} account Bank Account class instanced
     */
    constructor(rest, account){
        /**
         * @type {Object}
         * 
         * Rest Info object
         */
        this.rest = rest;
        /**
         * @type {BankAccount}
         * 
         * Transactions' Bank Account class instanced
         */
        this.account = account;
    }
    /**
     * 
     * @param {String} type The type of transaction ("payment" or "payment_request")
     * 
     * @param {Object} data Transaction record data
     * @property {String} sender Transaction sender - Needed in [*]
     * @property {String} receptor Transaction Receptor - Needed in ["Payment", "Payment Request"]
     * @property {String} itemID Transaction Item ID - Needed in ["Purchase"]
     * @property {Number} amount Transaction Amount - Needed in ["Payment", "Payment Request", "Purchase"]
     * @property {boolean} status Transaction status - Needed in ["Payment Request"]
     * 
     * @returns {Transaction} Transaction instanced class
     * 
     * Record/creates a transaction
     */
    async record(type, data){
      /*
      Types
      
      - Payment: {
          sender: $senderID,
          receptor: $receptorID,
          amount: $amountSent
      }
      - Payment request: {
          sender: $senderID,
          receptor: $receptorID,
          amount: $amount,
          status: $statusRequest
      }
      */
     switch(type){
         case "payment":
           if(!data.receptor || !data.amount) return false;
           var id = `${this.rest.db.trs.size()+1}`;
           var transactionRaw = {
            id,
            type,
            sender: this.account.user,
            receptor: data.receptor,
            amount: parseInt(data.amount)
         };
           this.rest.db.trs.set(id,transactionRaw);
           var tL = new Transaction(this.rest, transactionRaw);
           return tL;
         break;
         case "payment_request": 
          if(!data.receptor || !data.amount) return false;
         var id = `${this.rest.db.trs.size()+1}`;
         var transactionRaw = {
          id,
          type,
          sender: this.account.user,
          receptor: data.receptor,
          status: false,
          amount: parseInt(data.amount)
         };
         this.rest.db.trs.set(id,transactionRaw);
         var tL = new Transaction(this.rest, transactionRaw);
         return tL;
         break;
         case "purchase":
          if(!data.itemID) return false;
          if(!data.amount){
              data.amount = 1;
          }
          var id = `${this.rest.db.trs.size()+1}`;
          var tR = {
              id,
              type,
              sender: this.account.user,
              item: data.itemID,
              amount: parseInt(data.amount)
          }
          this.rest.db.trs.set(id,tR);
         var tL = new Transaction(this.rest, tR);
         break;
     }
    }
    /**
     * 
     * @param {String} id Transaction's ID
     * 
     * @returns {Transaction} false If fails, Transaction instanced class if success
     * 
     * Gets transaction
     */
    async get(id = null){
      if(!id){
          var transactions = await this.rest.db.trs.values();
          var tC = new this.rest.Discord.Collection();
          transactions.forEach(tr => {
              var tL = new Transaction(this.rest, tr);
              tC.set(tr.id, tL);
          });
          return tC;
      } else {
          var tR = await this.rest.db.trs.get(id);
          if(!tR) return false;
          var tL = new Transaction(this.rest, tR);
          return tL;
      }
    }
}
module.exports = AccountTransactionManager;