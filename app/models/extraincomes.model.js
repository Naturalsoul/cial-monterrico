var db = require("./../../config/db")

module.exports = db.model("ExtraIncomes", {
    internalCode: String,
    title: String,
    totalExtraIncome: Number,
    details: {type: Array, default: []},
    creationDate: {type: Date, default: Date.now}
})