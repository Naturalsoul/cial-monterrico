let Sells = require("./../models/sells.model")

module.exports = {
    exists: function (internalCode, next) {
        Sells.count({internalCode: internalCode}, function (err, count) {
            if (err) throw err
            
            if (count > 0) {
                next(true)
            } else {
                next(false)
            }
        })
    },
    
    insert: function (sell, next) {
        this.exists(sell.internalCode, function (res) {
            if (res) {
                next({registered: false})
            } else {
                let newSell = new Sells({
                    internalCode: sell.internalCode,
                    products: sell.products,
                    totalPrice: sell.totalPrice
                })
                
                newSell.save()
                
                next({registered: true})
            }
        })
    },
    
    findProductsInfo: function (next) {
        Sells.find({state: true}, "internalCode name provider stock minimumStock minimumTotal sellPrice", function (err, data) {
            if (err) throw err
            
            if (data != null) {
                next(data)
            } else {
                next({})
            }
        })
    }
}