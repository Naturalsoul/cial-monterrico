var db = require("./../../config/db")

module.exports = db.model("Spendings", {
    internalCode: String,
    title: String,
    totalSpending: Number,
    details: {type: Array, default: []},
    creationDate: {type: Date, default: Date.now}
})