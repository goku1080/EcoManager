const BankAccount = require("./BankAccount");

class BankCard {
    /**
     * 
     * @param {Object} rest Rest Info object
     * @param {Object} raw Raw Bank Card object
     * @param {BankAccount} bankAccount Bank Account instanced class
     */
    constructor(rest, raw, bankAccount){
        /**
         * @type {Object}
         * 
         * Rest Info object
         */
        this.rest = rest;
        /**
         * @type {Object}
         * 
         * Raw Bank Card object
         */
        this.raw = raw;
        /**
         * @type {BankAccount}
         * 
         * Card's Bank Account
         */
        this.account = bankAccount;
        /**
         * @type {String}
         * 
         * Bank Account's user ID
         */
        this.user = this.account.user;
        /**
         * @type {Number}
         * 
         * Card's ID
         */
        this.id = raw.id;
        /**
         * @type {Number}
         * 
         * Card's Balance
         */
        this.balance = raw.balance;
        /**
         * @type {boolean}
         * 
         * If card is valid or not
         */
        this.valid = raw.valid;
    }
    /**
     * 
     * @returns {boolean} Result (True or False)
     * 
     * Removes card (sets card.valid to false)
     */
    async remove(){
        if(!await this.rest.db.accs.get(this.user)) return false;
        var id = this.id;
        var card = this.bankAccount.raw.cards.find(c => c.id == id);
        if(!card) return false;
        card.valid = false;
        var newCardsArr = this.bankAccount.raw.cards.filter(c => c.id != id).push(card);
        this.bankAccount.raw.cards = newCardsArr;
        this.rest.db.accs.set(`${this.user}.cards`, newCardsArr);
        return true;
    }
    /**
     * 
     * @param {Number} [amount] Amount to add - By default is `1`
     * 
     * @returns {boolean} Result (True or False)
     * 
     * Adds an amount of money
     */
    async addBalance(amount = 1){
        if(!await this.rest.db.accs.get(this.user)) return false;
        var total = this.balance + parseInt(amount);
        var id = this.id;
        var card = this.bankAccount.raw.cards.find(c => c.id == id);
        if(!card) return false;
        card.balance = total;
        var newCardsArr = this.bankAccount.raw.cards.filter(c => c.id != id).push(card);
        this.rest.db.accs.add(`${this.user}.cards`, newCardsArr);
        this.balance = total;
        return true;
    }
    /**
     * 
     * @param {Number} [amount] Amount to substract - By default is `1`
     * 
     * @returns {boolean} Result (True or False)
     * 
     * Substracts an amount of money
     */
    async removeBalance(amount = 1){
        if(!await this.rest.db.accs.get(this.user)) return false;
        var total = this.balance - parseInt(amount);
        var id = this.id;
        var card = this.bankAccount.raw.cards.find(c => c.id == id);
        if(!card) return false;
        card.balance = total;
        var newCardsArr = this.bankAccount.raw.cards.filter(c => c.id != id).push(card);
        this.rest.db.accs.add(`${this.user}.cards`, newCardsArr);
        this.balance = total;
        return true;
    }
    /**
     * 
     * @param {Number} amount Amount to set
     * 
     * @returns {boolean} Result (True or False)
     * 
     * Sets balance to `$amount`
     */
    async setBalance(amount){
        if(!await this.rest.db.accs.get(this.user)) return false;
        var id = this.id;
        var card = this.bankAccount.raw.cards.find(c => c.id == id);
        if(!card) return false;
        card.balance = amount;
        var newCardsArr = this.bankAccount.raw.cards.filter(c => c.id != id).push(card);
        this.rest.db.accs.add(`${this.user}.cards`, newCardsArr);
        this.balance = amount;
        return true;
    }
}
module.exports = BankCard;