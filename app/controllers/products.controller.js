let Products = require("../models/products.model")

module.exports = {
    insert: function (product, next) {
        let newProduct = new Products({
            providerCode: product.providerCode,
            name: product.name.toUpperCase(),
            category: product.category.toUpperCase(),
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
        Products.findOne({internalCode: parseInt(internalCode)}, function (err, data) {
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
    
    findCategories: function (next) {
        Products.find({}, "category", function (err, data) {
            if (err) throw err
            
            if (data != null) {
                next(data)
            } else {
                next({})
            }
        })
    },
    
    findByCategory: function (category, next ) {
        Products.find({category: category}, function (err, data) {
            if (err) throw err
            
            if (data != null) {
                next(data)
            } else {
                next({})
            }
        })
    },
    
    update: function (product, next) {
        Products.update({internalCode: parseInt(product.internalCode)}, {
            $set: {
                providerCode: product.providerCode,
                name: product.name.toUpperCase(),
                category: product.category.toUpperCase(),
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
        Products.update({internalCode: parseInt(internalCode)}, {
            $set: {state: false}
        }, function (err, data) {
            if (err) throw err
            
            next({disabled: true})
        })
    },
    
    remove: function (internalCode, next) {
        Products.remove({internalCode: parseInt(internalCode)}, function (err, data) {
            if (err) throw err
            
            if (data != null) {
                next({removed: true})
            } else {
                next({removed: false})
            }
        })
    }
}