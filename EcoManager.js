const { DiscordAPIError } = require('discord.js');
const megadb = require('megadb');
const { UserManager } = require('./UserManager.js');
class EcoManager {
    /**
     * 
     * @param {Object} rest Rest Info object
     */
    constructor(rest){
        /**
         * @type {Object}
         * 
         * Rest Info object
         */
        this.rest = rest;
    }
    /**
     * 
     * @param {Object} user User (Requires Tag and ID properties)
     * @property {String} id User's Discord ID
     * @property {String} tag User's Discord Tag
     * @returns {boolean} Result (True or False)
     * 
     * Processes user and checks if the user exists, if they doesn't exist then it creates the user in the database
     */
    async processUser(user){
        var isCreated = await this.rest.db.users.get(user.id);
        if(isCreated) return;
        this.rest.db.users.set(user.id, {
            user: {
             id: user.id,
             tag: user.tag
            },
            cash: 0
        });
        return true;
    }
}
module.exports = EcoManager;