const { isModuleNamespaceObject } = require('util/types');
const RestInstance = require('./RestInstance.js');

class Rest {
    constructor(client){
        this.client = client;
        this.Discord = Discord;
    }
    instance(guildID){
     return new RestInstance(this.client, guildID);
    }
}
module.exports = Rest;