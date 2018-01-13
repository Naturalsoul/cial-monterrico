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
    },
    
    findAllProductsInSellsBetweenDates: function (firstDate, lastDate, next) {
        Sells.find({
            creationDate: {
                $gte: firstDate,
                $lte: lastDate
            }
        }, "products", function (err, data) {
            if (err) throw err
            
            if (data != null) {
                next(data)
            } else {
                next([])
            }
        })
    },
    
    findAllSellsBetweenDates: function (firstDate, lastDate, next) {
        Sells.find({
            creationDate: {
                $gte: firstDate,
                $lte: lastDate
            }
        }, "internalCode products totalPrice creationDate", function (err, data) {
            if (err) throw err
            
            if (data != null) {
                next(data)
            } else {
                next([])
            }
        })
    }
}