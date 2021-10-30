class BankAccount {
    constructor(rest, raw){
        this.rest = rest;
        this.raw = raw;
        this.user = raw.userID;
        this.balance = raw.balance;
        /* Cards raw: {
        id: $id,
        balance: $amount,
        valid: $validStatus (true/false)
        }
        $id = in order of cards; 1, 2, 3
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
        this.rest.db.accs.add(`${this.user}.balance`, parseInt(amount));
        return true;
    }
    async removeBalance(amount = 1){
        if(!await this.rest.db.accs.get(this.user)) return false;
        this.rest.db.accs.substract(`${this.user}.balance`, parseInt(amount));
        return true;
    }
    async setBalance(amount){
        if(!await this.rest.db.accs.get(this.user)) return false;
        this.rest.db.accs.set(`${this.user}.balance`, parseInt(amount));
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
        var newCardsArr = this.raw.cards.filter(c => c.id != id);
        this.raw.cards = newCardsArr;
        this.rest.db.accs.set(`${id}.cards`, newCardsArr);
        return true;
    }
}