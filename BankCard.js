class BankCard {
    constructor(rest, raw, bankAccount){
        this.rest = rest;
        this.raw = raw;
        this.account = bankAccount;
        this.user = this.account.user;
        this.id = raw.id;
        this.balance = raw.balance;
        this.valid = raw.valid;
    }
    async remove(){
        if(!await this.rest.db.accs.get(this.user)) return false;
        var id = this.id;
        var card = this.bankAccount.raw.cards.find(c => c.id == id);
        if(!card) return false;
        card.valid = false;
        var newCardsArr = this.bankAccount.raw.cards.filter(c => c.id != id).push(card);
        this.bankAccount.raw.cards = newCardsArr;
        this.rest.db.accs.set(`${this.user}.cards`, newCardsArr);
        return true;
    }
    async addBalance(amount = 1){
        if(!await this.rest.db.accs.get(this.user)) return false;
        var total = this.balance + parseInt(amount);
        var id = this.id;
        var card = this.bankAccount.raw.cards.find(c => c.id == id);
        if(!card) return false;
        card.balance = total;
        var newCardsArr = this.bankAccount.raw.cards.filter(c => c.id != id).push(card);
        this.rest.db.accs.add(`${this.user}.cards`, newCardsArr);
        this.balance = total;
        return true;
    }
    async removeBalance(amount = 1){
        if(!await this.rest.db.accs.get(this.user)) return false;
        var total = this.balance - parseInt(amount);
        var id = this.id;
        var card = this.bankAccount.raw.cards.find(c => c.id == id);
        if(!card) return false;
        card.balance = total;
        var newCardsArr = this.bankAccount.raw.cards.filter(c => c.id != id).push(card);
        this.rest.db.accs.add(`${this.user}.cards`, newCardsArr);
        this.balance = total;
        return true;
    }
    async setBalance(amount){
        if(!await this.rest.db.accs.get(this.user)) return false;
        var id = this.id;
        var card = this.bankAccount.raw.cards.find(c => c.id == id);
        if(!card) return false;
        card.balance = amount;
        var newCardsArr = this.bankAccount.raw.cards.filter(c => c.id != id).push(card);
        this.rest.db.accs.add(`${this.user}.cards`, newCardsArr);
        this.balance = amount;
        return true;
    }
}