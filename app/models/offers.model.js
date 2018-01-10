var db = require("./../../config/db")

module.exports = db.model("Offers", {
    internalCode: String,
    internalCodeProduct: String,
    percentage: Number,
    creationDate: {type: Date, default: Date.now}
})