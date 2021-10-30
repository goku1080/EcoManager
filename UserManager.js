const { DiscordAPIError } = require('discord.js');
const User = require('./User.js');
class UserManager {
    constructor(rest, manager){
        this.rest = rest;
        this.manager = manager;
    }
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