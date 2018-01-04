var db = require("./../../config/db")

module.exports = db.model("Offers", {
    internalCode: String
})