const megadb = require('megadb');
const EcoManager = require('./EcoManager.js');
const UserManager = require('./UserManager.js');
const ItemManager = require('./ItemManager.js');
const BankManager = require('./BankManager.js');
const TransactionManager = require('./TransactionManager.js');
const InventoryManager = require('./InventoryManager.js');
const ShopManager = require('./ShopManager.js');
class RestInstance {
    /**
     * 
     * @param {Client} client 
     * @param {String} guildID 
     */
    constructor(client, guildID){
        /**
         * Contains databases objects
         * @property {*} accs Bank Accounts database
         * @property {*} users Users Database
         * @property {*} trs Transactions Database
         * @property {*} items Items Database
         * @property {*} inventories Inventories Database
         * @property {*} shopitems Shop Database
         */
        this.db = {
            accs: new megadb.crearDB(guildID, "bankAccounts"),
            users: new megadb.crearDB(guildID, "users_eco"),
            trs: new megadb.crearDB(guildID, "transactions"),
            items: new megadb.crearDB(guildID, "items"),
            inventories: new megadb.crearDB(guildID, "inventories"),
            shopitems: new megadb.crearDB(guildID, "shopitems")
        };
        /**
         * Info that is exported and use in other classes
         * @property {*} client Client
         * @property {*} guildID The instanced guild's ID
         * @property {*} db this.db
         * @property {*} Discord Discord library import
         * @property {*} restObj this
         */
        this.info = {client,guildID,db:this.db,Discord:require('discord.js'),restObj:this};
        /**
         * @type {Discord.Client}
         * 
         * Client
         */
        this.client = client;
        /**
         * @type {String}
         * 
         * The instanced guild's ID
         */
        this.guildID = guildID;
        /**
         * @type {EcoManager}
         * 
         * Eco Manager instance
         */
        this.ecoManager = new EcoManager(this.info);
        /**
         * @type {UserManager}
         * 
         * User Manager instance
         */
        this.userManager = new UserManager(this.info, this.ecoManager);
        /**
         * @type {BankManager}
         * 
         * Bank Manager instance
         */
        this.bankManager = new BankManager(this.info, this.ecoManager);
        /**
         * @type {InventoryManager}
         * 
         * Inventory Manager instance
         */
        this.inventoryManager = new InventoryManager(this.info, this.ecoManager);
        /**
         * @type {ItemManager}
         * 
         * Item Manager instance
         */
        this.itemManager = new ItemManager(this.info, this.ecoManager);
        /**
         * @type {ShopManager}
         * 
         * Shop Manager instance
         */
        this.shopManager = new ShopManager(this.info, this.ecoManager);
        /**
         * @type {TransactionManager}
         * 
         * Transaction Manager instance
         */
        this.transactionManager = new TransactionManager(this.info, this.ecoManager);
    }
}
module.exports = RestInstance;