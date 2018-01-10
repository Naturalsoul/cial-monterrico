var db = require("./../../config/db")

module.exports = db.model("Products", {
    internalCode: String,
    providerCode: {type: String, default: ""},
    name: String,
    provider: String,
    neto: {type: Number, min: 1},
    iva: {type: Number, min: 1},
    ivaNeto: {type: Number, min: 1},
    minimumTotal: {type: Number, min: 1},
    sellPrice: {type: Number, min: 1},
    offerPrice: {type: Number, default: 0},
    stock: {type: Number, min: 1},
    minimumStock: {type: Number, min: 1},
    state: {type: Boolean, default: true},
    creationDate: {type: Date, default: Date.now}
})