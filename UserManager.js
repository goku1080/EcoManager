const { DiscordAPIError, Collection } = require('discord.js');
const User = require('./User.js');
class UserManager {
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
     * @param {Object} user User (Requires Tag and ID properties)
     * @property {String} id User's Discord ID
     * @property {String} tag User's Discord Tag
     * 
     * @returns {User} User class instance
     * 
     * If fails
     * @returns {boolean} false
     * 
     * Creates user, this is used by internal classes, but you can use it too
     */
    async create(user){
        if(await this.get(user.id)) return false;
        var uR = {
            user: {
                id: user.id,
                tag: user.tag
               },
            cash: 0
        };
        this.rest.db.users.set(user.id, uR);
        return new User(this.rest, uR);
    }
    /**
     * 
     * @param {String} userID User's ID
     * 
     * @returns {boolean} Result (True or False)
     * 
     * Deletes user, this is probably not going to be used so often, almost never
     */
    async delete(userID){
        if(await this.get(userID)) return false;
        this.rest.db.users.delete(userID);
        return true;
    }
    /**
     * 
     * @param {String} [userID] User's ID (Optional)
     * @returns {User} User class instanced - Or a collection of them if there's not user ID
     * 
     * Gets user(s), if you don't input any user ID it'll return a collection of all registered users
     */
    async get(userID = null){
       if(!userID){
          let users = await this.rest.db.users.values();
          var usersColl = new this.rest.Discord.Collection();
          users.forEach(u => {
              var userObj = new User(this.rest, u);
              usersColl.set(u.user.id, userObj);
          });
          return usersColl;
        } else {
            let user = await this.rest.db.users.get(userID);
            if(!user) return false;
            var userObj = new User(this.rest, user);
            return userObj;
        }
    }
}
module.exports = UserManager;