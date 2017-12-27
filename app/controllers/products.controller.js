let Products = require("../models/products.model")

module.exports = {
    exists: function (internalCode, next) {
        Products.count({internalCode: internalCode}, function (err, count) {
            if (err) throw err
            
            if (count > 0) {
                next(true)
            } else {
                next(false)
            }
        })
    },
    
    insert: function (product, next) {
        this.exists(product.internalCode, function (res) {
            if (res) {
                next({registered: false})
            } else {
                let newProduct = new Products({
                    internalCode: product.internalCode,
                    providerCode: product.providerCode,
                    name: product.name,
                    provider: product.provider,
                    stock: product.stock,
                    minimumStock: product.minimumStock,
                    neto: product.neto,
                    iva: product.iva,
                    ivaNeto: product.ivaNeto,
                    minimumTotal: product.minimumTotal,
                    sellPrice: product.sellPrice
                })
                
                newProduct.save()
                
                next({registered: true})
            }
        })
    },
    
    find: function (next) {
        Products.find({}, function (err, data) {
            if (err) throw err
            
            if (data != null) {
                next(data)
            } else {
                next({})
            }
        })
    },
    
    findProviders: function (next) {
        Products.find({}, "provider", function (err, data) {
            if (err) throw err
            
            if (data != null) {
                next(data)
            } else {
                next({})
            }
        })
    }
}