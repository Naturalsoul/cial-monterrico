var db = require("./../../config/db")

Date.prototype.addHours = function(h) {    
   this.setTime(this.getTime() + (h*60*60*1000)); 
   return this;   
}

let date = new Date()

module.exports = db.model("Sells", {
    internalCode: String,
    creationDate: {type: Date, default: date.addHours(-3)},
    products: {type: Array, default: []},
    totalPrice: Number
})