var db = require("./../../config/db")

var now = new Date()

var options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
}

module.exports = db.model("Users", {
    name: String,
    pass: String,
    creationDate: {type: Date, default: now.toLocaleDateString("es-cl", options)}
})