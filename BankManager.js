class BankManager {
    constructor(rest){
        this.rest = rest;
    }
    async create(user, initBalance = 0){
        if(await this.rest.db.accs.get(user.id)) return false;
        this.rest.ecoManager.proccessUser()
    }
}