const { isModuleNamespaceObject } = require('util/types');
const RestInstance = require('./RestInstance.js');
const RestInstance = require('./User.js');
const Discord = require('discord.js');
class Rest {

    /**
     * @param {Client} client The client for initializing the Rest
     */


    constructor(client){
        /**
         * The client given in the constructor
         */
        this.client = client;
        /**
         * Discord library import, basically `require('discord.js')`
         */
        this.Discord = Discord;
    }
    /**
     * Instances Rest
     * @param guildID The ID of the guild to instance
     * @returns {RestInstance} Rest Instace class object
     */
    instance(guildID){
     return new RestInstance(this.client, guildID);
    }
}
module.exports = Rest;