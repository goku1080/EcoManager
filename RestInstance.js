const megadb = require('megadb');
const EcoManager = require('./EcoManager.js');
const UserManager = require('./UserManager.js');
const ItemManager = require('./ItemManager.js');
const BankManager = require('./BankManager.js');
const TransactionManager = require('./TransactionManager.js');
const InventoryManager = require('./InventoryManager.js');
const ShopManager = require('./ShopManager.js');
const Discord = require('discord.js');
class RestInstance {
    constructor(client, guildID){
        this.db = {
            accs: new megadb.crearDB(guildID, "bankAccounts"),
            users: new megadb.crearDB(guildID, "users_eco"),
            trs: new megadb.crearDB(guildID, "transactions"),
            items: new megadb.crearDB(guildID, "items"),
            inventories: new megadb.crearDB(guildID, "inventories")
        };
        this.info = {client,guildID,db:this.db,Discord,restObj:this};
        this.client = client;
        this.guildID = guildID;
        this.ecoManager = new EcoManager(this.info);
        this.userManager = new UserManager(this.info, this.ecoManager);
        this.bankManager = new BankManager(this.info, this.ecoManager);
        this.inventoryManager = new InventoryManager(this.info, this.ecoManager);
        this.itemManager = new ItemManager(this.info, this.ecoManager);
        this.shopManager = new ShopManager(this.info, this.ecoManager);
        this.transactionManager = new TransactionManager(this.info, this.ecoManager);
    }
}
module.exports = RestInstance;