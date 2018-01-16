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
    
    findOne: function (internalCode, next) {
        Products.findOne({internalCode: internalCode}, function (err, data) {
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
    },
    
    update: function (product, next) {
        Products.update({internalCode: product.internalCode}, {
            $set: {
                providerCode: product.providerCode,
                name: product.name,
                provider: product.provider,
                stock: product.stock,
                minimumStock: product.minimumStock,
                neto: product.neto,
                iva: product.iva,
                ivaNeto: product.ivaNeto,
                minimumTotal: product.minimumTotal,
                sellPrice: product.sellPrice,
                state: product.state
            }
        }, function (err, data) {
            if (err) throw err
            
            next({updated: true})
        })
    },
    
    disable: function (internalCode, next) {
        Products.update({internalCode: internalCode}, {
            $set: {state: false}
        }, function (err, data) {
            if (err) throw err
            
            next({disabled: true})
        })
    },
    
    remove: function (internalCode, next) {
        Products.remove({internalCode: internalCode}, function (err, data) {
            if (err) throw err
            
            if (data != null) {
                next({removed: true})
            } else {
                next({removed: false})
            }
        })
    }
}