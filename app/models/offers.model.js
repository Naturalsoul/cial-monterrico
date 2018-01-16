var db = require("./../../config/db")
let Schema = require("mongoose").Schema
let autoIncrement = require("mongoose-auto-increment")

autoIncrement.initialize(db)

let OffersSchema = new Schema({
    internalCode: Number,
    internalCodeProduct: String,
    nameProduct: String,
    percentage: Number,
    originalPrice: Number,
    creationDate: {type: Date, default: Date.now}
})

OffersSchema.plugin(autoIncrement.plugin, {
    model: "Offers",
    field: "internalCode",
    startAt: 60000,
    incrementBy: 1
})

module.exports = db.model("Offers", OffersSchema)