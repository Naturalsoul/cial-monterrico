var db = require("./../../config/db")
let Schema = require("mongoose").Schema
let autoIncrement = require("mongoose-auto-increment")

autoIncrement.initialize(db)

let ProductsSchema = new Schema ({
    internalCode: Number,
    providerCode: {type: String, default: ""},
    name: String,
    category: String,
    provider: String,
    neto: {type: Number, min: 1},
    iva: {type: Number, min: 1},
    ivaNeto: {type: Number, min: 1},
    minimumTotal: {type: Number, min: 1},
    sellPrice: {type: Number, min: 1},
    offerPrice: {type: Number, default: 0},
    stock: {type: Number, min: 1, default: 0},
    minimumStock: {type: Number, min: 1, default: 0},
    state: {type: Boolean, default: true},
    creationDate: {type: Date, default: Date.now}
})

ProductsSchema.plugin(autoIncrement.plugin, {
    model: "Products",
    field: "internalCode",
    startAt: 11742,
    incrementBy: 1
})

module.exports = db.model("Products", ProductsSchema)