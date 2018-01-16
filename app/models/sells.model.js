var db = require("./../../config/db")
let Schema = require("mongoose").Schema
let autoIncrement = require("mongoose-auto-increment")

autoIncrement.initialize(db)

let SellsSchema = new Schema({
    internalCode: Number,
    creationDate: {type: Date, default: Date.now},
    products: {type: Array, default: []},
    totalPrice: Number
})

SellsSchema.plugin(autoIncrement.plugin, {
    model: "Sells",
    field: "internalCode",
    startAt: 50000,
    incrementBy: 1
})

module.exports = db.model("Sells", SellsSchema)