const BankAccount = require('./BankAccount.js');
class BankManager {
    constructor(rest, manager){
        this.rest = rest;
        this.manager = manager;
    }
    async create(user, initBalance = 0){
        if(await this.rest.db.accs.get(user.id)) return false;
        this.rest.restObj.ecoManager.processUser(user);
        var rawAcc = {
            userID: user.id,
            balance: parseInt(initBalance),
            cards: []
        };
        this.rest.db.accs.set(user.id, rawAcc);
        return new BankAccount(this.rest, rawAcc);
    }
    async get(userID = null){
      if(!userID){
          var accs = await this.rest.db.accs.values();
          var aC = new this.rest.Discord.Collection();
          accs.forEach(acc => {
              var aL = new BankAccount(this.rest, acc);
              aC.set(acc.userID, aL);
          });
          return aC;
      } else {
          if(!await this.rest.db.accs.get(userID)) return false;
          var aR = await this.rest.db.accs.get(userID);
          var aL = new BankAccount(this.rest, aR);
          return aL;
      }
    }
}
module.exports = BankManager;