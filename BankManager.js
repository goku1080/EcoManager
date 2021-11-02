const { Collection } = require('discord.js');
const BankAccount = require('./BankAccount.js');
class BankManager {
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
     * @param {Object} user User (Discord.User) - Or an object with this properties
     * @property {String} id User's Discord ID
     * @property {String} tag User's Discord Tagw
     * 
     * @param {Number} initBalance Initial Balance
     * 
     * @returns {BankAccount} Bank Account instanced class - `false` if fails  
     * 
     * Creates Bank Account
     */
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
    /**
     * 
     * @param {String} [userID] User's Discord ID
     * 
     * @returns {BankAccount} Bank Account instanced class - `false` if fails - Collection of Bank Account instanced class if a user ID is not given
     * 
     * Gets Bank Account(s)
     */
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