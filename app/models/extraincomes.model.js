var db = require("./../../config/db")
let Schema = require("mongoose").Schema
let autoIncrement = require("mongoose-auto-increment")

autoIncrement.initialize(db)

let ExtraIncomesSchema = new Schema ({
    internalCode: Number,
    title: String,
    totalExtraIncome: Number,
    details: {type: Array, default: []},
    creationDate: {type: Date, default: Date.now}
})

ExtraIncomesSchema.plugin(autoIncrement.plugin, {
    model: "ExtraIncomes",
    field: "internalCode",
    startAt: 80000,
    incrementBy: 1
})

module.exports = db.model("ExtraIncomes", ExtraIncomesSchema)