class UserBankManager {
    /**
     * 
     * @param {Object} rest Rest Info object
     * @param {User} user User instanced class
     */
    constructor(rest, user){
        /**
         * @type {Object}
         * 
         * Rest Info object
         */
        this.rest = rest;
        /**
         * @type {User}
         * 
         * User instanced class
         */
        this.user = user;
    }
    /**
     * 
     * @returns {BankAccount} Bank Account instanced class - `false` If fails
     * 
     * Fetches User's Bank Account
     */
    async fetch(){
        var acc = await this.user.fetchBankAccount();
        return acc;
    }
}
module.exports = UserBankManager;