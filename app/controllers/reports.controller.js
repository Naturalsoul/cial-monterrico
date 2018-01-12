let Sells = require("./../models/sells.model")
let Products = require("./../models/products.model")

module.exports = {
    findAllProductsInSells: function (next) {
        Sells.find({}, "products", function (err, data) {
            if (err) throw err
            
            if (data != null) {
                next(data)
            } else {
                next([])
            }
        })
    }
}