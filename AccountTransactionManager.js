const Transaction = require('./Transaction.js');
class AccountTransactionManager {
    constructor(rest, account){
        this.rest = rest;
        this.account = account;
    }
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
            amount: data.amount
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
          amount: data.amount
         };
         this.rest.db.trs.set(id,transactionRaw);
         var tL = new Transaction(this.rest, transactionRaw);
         return tL;
         break;
     }
    }
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