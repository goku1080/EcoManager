class PaymentRequestRecord {
    constructor(rest, raw){
        this.rest = rest;
        this.raw = raw;
        this.amount = raw.amount;
        this.status = raw.status;
    }
    async updateStatus(status){
        var transaction = await this.rest.db.trs.get(this.raw.id);
        if(!transaction) return false;
        if(typeof status != "boolean") return false;
        this.rest.db.trs.set(`${this.raw.id}.status`, status);
        this.status = status;
    }
}