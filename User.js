const { DiscordAPIError } = require('discord.js');
const UserBankManager = require('./UserBankManager.js');
const UserInventoryManager = require('./UserInventoryManager.js');
class User {
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
         * Raw User object
         */
       this.raw = raw;
       /**
        * @type {String}
        * 
        * User's Discord ID
        */
       this.id = raw.user.id;
       /**
        * @type {Discord.User|Object}
        * - Required properties
        * @property {String} id User ID
        * @property {String} tag User tag
        * 
        * User basic info
        */
       this.userInfo = raw.user;
       /**
        * @type {Number}
        * 
        * User's balance
        */
       this.balance = raw.cash;
       /**
        * @type {UserBankManager}
        * 
        * User Bank Manager instanced class
        */
       this.bankAccount = new UserBankManager(this.rest, this);
       /**
        * @type {UserInventoryManager}
        * 
        * User Inventory Manager instanced class
        */
       this.inventory = new UserInventoryManager(this.rest, this);
    }
    /**
     * 
     * @param {Number} amount Amount to add
     * 
     * @returns {boolean} Result (True or False)
     * 
     * Adds amount to user's cash
     */
    addCash(amount){
        if(typeof amount != "number") return false;
        var totalBalance = this.balance + amount;
        this.rest.db.users.set(`${this.id}.cash`, totalBalance);
        this.balance = totalBalance;
        return true;
    }
    /**
     * 
     * @param {Number} amount Amount to set
     * 
     * @returns {boolean} Result (True or False)
     * 
     * Set user's cash
     */
    setCash(amount){
        if(typeof amount != "number") return false;
        this.rest.db.users.set(`${this.id}.cash`, amount);
        this.balance = amount;
        return true;
    }
    /**
     * 
     * @param {Number} amount Amount to substract
     * 
     * @returns {boolean} Result (True or False)
     * 
     * Substract user's cash
     */
    substractCash(amount){
        if(typeof amount != "number") return false;
        var totalBalance = this.balance - amount;
        this.rest.db.users.set(`${this.id}.cash`, totalBalance);
        this.balance = totalBalance;
        return true;
    }
    /**
     * 
     * @returns {BankAccount} Bank Account instanced class - `false` If fails
     * 
     * Fetches user's Bank Account
     */
    async fetchBankAccount(){
        var acc = await this.rest.restObj.bankManager.get(this.id);
        this.bankAccount = acc;
        return acc;
    }
    /**
     * 
     * @returns {Inventory} Inventory instanced class - `false` If fails
     * 
     * Fetches user's Inventory
     */
    async fetchInventory(){
        var inventory = await this.rest.restObj.inventoryManager.get(this.id);
        this.inventory = inventory;
        return inventory;
    }
}
module.exports = User;