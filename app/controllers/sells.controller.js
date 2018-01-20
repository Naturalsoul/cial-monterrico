let Sells = require("./../models/sells.model")
let Products = require("./../models/products.model")

module.exports = {
    insert: function (sell, next) {
        let newSell = new Sells({
            products: sell.products,
            totalPrice: sell.totalPrice,
            creationDate: sell.creationDate
        })
        
        newSell.save()
        
        sell.products.forEach(function (e) {
            Products.update({internalCode: parseInt(e.internalCode)},
                            {$inc: {stock: (e.quantitySold * -1)}},
                            function (err, data) {
                                if (err) throw err
                            })
        })
        
        next({registered: true})
    },
    
    findInternalCodeAndName: function (next) {
        Products
            .find({state: true})
            .select("internalCode name")
            .exec(function (err, data) {
                if (err) throw err
                
                if (data != null) {
                    next(data)
                } else {
                    next([])
                }
            })
    },
    
    findProductInfoByCode: function (internalCode, next) {
        Products.findOne({internalCode: parseInt(internalCode)}, "name stock minimumTotal sellPrice offerPrice" , function (err, data) {
            if (err) throw err
            
            if (data != null) {
                next(data)
            } else {
                next([])
            }
        })
    },
    
    findProductInfoByName: function (name, next) {
        Products.findOne({name: name}, "internalCode stock minimumTotal sellPrice offerPrice", function (err, data) {
            if (err) throw err
            
            if (data != null) {
                next(data)
            } else {
                next([])
            }
        })
    },
    
    find: function (next) {
        Sells.find({}, function (err, data) {
            if (err) throw err
            
            if (data != null) {
                next(data)
            } else {
                next([])
            }
        })
    },
    
    remove: function (internalCode, products, next) {
        Sells.remove({internalCode: internalCode}, function (err, data) {
            if (err) throw err
            
            products.forEach(function (e) {
                Products.update({internalCode: parseInt(e.internalCode)},
                                {$inc: {stock: e.quantitySold}},
                                function (err, data) {
                                    if (err) throw err
                                })
            })
            
            next({removed: true})
        })
    }
}