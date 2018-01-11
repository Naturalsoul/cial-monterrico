var db = require("./../../config/db")

module.exports = db.model("Offers", {
    internalCode: String,
    internalCodeProduct: String,
    nameProduct: String,
    percentage: Number,
    originalPrice: Number,
    creationDate: {type: Date, default: Date.now}
})