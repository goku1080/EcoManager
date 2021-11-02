class BankAccount {
    /**
     * 
     * @param {Object} rest Rest Info object
     * @param {Object} raw Raw Bank Account
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
         * Raw Bank Account object
         */
        this.raw = raw;
        /**
         * @type {String}
         * 
         * User ID
         */
        this.user = raw.userID;
        /**
         * @type {Number}
         * 
         * Bank Account balance
         */
        this.balance = raw.balance;
        /* Cards raw: {
        id: $id,
        balance: $amount,
        valid: $validStatus (true/false)
        }
        $id = in order of cards; 1, 2, 3
        */
       /**
        * @type {Array}
        * 
        * Cards in Bank Account
        */
        this.cards;
    }
    async delete(){
        if(!await this.rest.db.accs.get(this.user)) return false;
        this.rest.db.accs.delete(this.user);
        return true;
    }
    async addBalance(amount = 1){
        if(!await this.rest.db.accs.get(this.user)) return false;
        var total = this.balance + amount;
        this.rest.db.accs.add(`${this.user}.balance`, parseInt(amount));
        this.balance = total;
        return true;
    }
    async removeBalance(amount = 1){
        if(!await this.rest.db.accs.get(this.user)) return false;
        var total = this.balance - amount;
        this.rest.db.accs.substract(`${this.user}.balance`, parseInt(amount));
        this.balance = total;
        return true;
    }
    async setBalance(amount){
        if(!await this.rest.db.accs.get(this.user)) return false;
        this.rest.db.accs.set(`${this.user}.balance`, parseInt(amount));
        this.balance = amount;
        return true;
    }
    async fetchCards(){
        if(!await this.rest.db.accs.get(this.user)) return false;
        var cC = new this.rest.Discord.Collection();
        this.raw.cards.forEach(card => {
          var cL = new BankCard(this.rest, card, this);
          cC.set(card.id, cL);
        });
        this.cards = cC;
        return cC;
    }
    async getCard(id){
        if(!await this.rest.db.accs.get(this.user)) return false;
        var card = this.raw.cards.find(c => c.id == id);
        if(!card) return false;
        var cL = new BankCard(this.rest, card, this);
        return cL;
    }
    async addCard(initBalance = 0){
       if(!await this.rest.db.accs.get(this.user)) return false;
       let id = this.raw.cards.length+1;
       var cardRaw = {
           id,
           balance: initBalance,
           valid: true
       };
       var newCardsArr = this.raw.cards.push(cardRaw);
       this.raw.cards = newCardsArr;
       this.rest.db.accs.set(`${id}.cards`, newCardsArr);
       var cL = new BankCard(this.rest, cardRaw, this);
       return cL;
    }
    async removeCard(id){
        if(!await this.rest.db.accs.get(this.user)) return false;
        var card = this.raw.cards.find(c => c.id == id);
        if(!card) return false;
        card.valid = false;
        var newCardsArr = this.raw.cards.filter(c => c.id != id).push(card);
        this.raw.cards = newCardsArr;
        this.rest.db.accs.set(`${this.user}.cards`, newCardsArr);
        return true;
    }
}
module.exports = BankAccount;