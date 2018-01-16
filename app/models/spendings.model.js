var db = require("./../../config/db")
let Schema = require("mongoose").Schema
let autoIncrement = require("mongoose-auto-increment")

autoIncrement.initialize(db)

let SpendingsSchema = new Schema ({
    internalCode: Number,
    title: String,
    totalSpending: Number,
    details: {type: Array, default: []},
    creationDate: {type: Date, default: Date.now}
})

SpendingsSchema.plugin(autoIncrement.plugin, {
    model: "Spendings",
    field: "internalCode",
    startAt: 70000,
    incrementBy: 1
})

module.exports = db.model("Spendings", SpendingsSchema)