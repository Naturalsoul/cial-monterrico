let Sells = require("./../models/sells.model")
let Products = require("./../models/products.model")

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
                    totalPrice: sell.totalPrice,
                    creationDate: sell.creationDate
                })
                
                newSell.save()
                
                sell.products.forEach(function (e) {
                    Products.update({internalCode: e.internalCode},
                                    {$inc: {stock: (e.quantitySold * -1)}},
                                    function (err, data) {
                                        if (err) throw err
                                    })
                })
                
                next({registered: true})
            }
        })
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
        Products.findOne({internalCode: internalCode}, "name stock minimumTotal sellPrice offerPrice" , function (err, data) {
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
                Products.update({internalCode: e.internalCode},
                                {$inc: {stock: e.quantitySold}},
                                function (err, data) {
                                    if (err) throw err
                                })
            })
            
            next({removed: true})
        })
    }
}