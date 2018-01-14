let Products = require("./../models/products.model")

module.exports = {
    findStockInfo: function (next) {
        Products.find({state: true}, "internalCode stock minimumStock", function (err, data) {
            if (err) throw err
            
            let lowStockProducts = []
            
            data.forEach(function (e) {
                if (e.minimumStock >= e.stock) {
                    lowStockProducts.push({
                        internalCode: e.internalCode,
                        stock: e.stock
                    })
                }
            })
            
            next(lowStockProducts)
        })
    }
}