let Offers = require("../models/offers.model")
let Products = require("../models/products.model")

module.exports = {
    exists: function (internalCode, internalCodeProduct, next) {
        Offers.count({internalCode: internalCode}, function (err, count) {
            if (err) throw err
            
            if (count > 0) {
                next(true)
            } else {
                Offers.count({internalCodeProduct: internalCodeProduct}, function (err, count) {
                    if (err) throw err
                    
                    if (count > 0) {
                        next(true)
                    } else {
                        next(false)
                    }
                })
            }
        })
    },
    
    insert: function (offer, next) {
        this.exists(offer.internalCode, offer.internalCodeProduct, function (res) {
            if (res) {
                next({registered: false})
            } else {
                let newOffer = new Offers({
                    internalCode: offer.internalCode,
                    internalCodeProduct: offer.internalCodeProduct,
                    nameProduct: offer.nameProduct,
                    percentage: offer.percentage,
                    originalPrice: offer.originalPrice,
                    creationDate: offer.creationDate
                })
                
                newOffer.save()
                
                Products.update({internalCode: offer.internalCodeProduct}, {
                    offerPrice: offer.offerPrice
                }, function (err, data) {
                    if (err) throw err
                })
                
                next({registered: true})
            }
        })
    },
    
    findProductInfoPriceByCode: function (internalCode, next) {
        Products.findOne({internalCode: internalCode}, "name minimumTotal sellPrice", function (err, data) {
            if (err) throw err
            
            if (data != null) {
                next(data)
            } else {
                next([])
            }
        })
    },
    
    findProductInfoPriceByName: function (name, next) {
        Products.findOne({name: name}, "internalCode minimumTotal sellPrice", function (err, data) {
            if (err) throw err
            
            if (data != null) {
                next(data)
            } else {
                next([])
            }
        })
    },
    
    find: function (next) {
        Offers.find({}, function (err, data) {
            if (err) throw err
            
            if (data != null) {
                next(data)
            } else {
                next([])
            }
        })
    },
    
    remove: function (internalCode, internalCodeProduct, originalPrice, next) {
        Offers.remove({internalCode: internalCode}, function (err, data) {
            if (err) throw err
            
            Products.update({internalCode: internalCodeProduct}, {
                sellPrice: originalPrice,
                offerPrice: 0
            }, function (err, data) {
                if (err) throw err
            })
            
            next({removed: true})
        })
    }
}