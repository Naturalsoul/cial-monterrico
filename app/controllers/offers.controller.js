let Offers = require("../models/offers.model")
let Products = require("../models/products.model")

module.exports = {
    exists: function (internalCode, next) {
        Offers.count({internalCode: internalCode}, function (err, count) {
            if (err) throw err
            
            (count > 0) ? next(true) : next(false)
        })
    },
    
    insert: function (offer, next) {
        this.exists(offer.internalCode, function (res) {
            if (res) {
                next({registered: false})
            } else {
                let newOffer = new Offers({
                    internalCode: offer.internalCode,
                    internalCodeProduct: offer.internalCodeProduct,
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
        Products.findOne({internalCode: internalCode}, "name sellPrice", function (err, data) {
            if (err) throw err
            
            if (data != null) {
                next(data)
            } else {
                next([])
            }
        })
    },
    
    findProductInfoPriceByName: function (name, next) {
        Products.findOne({name: name}, "internalCode sellPrice", function (err, data) {
            if (err) throw err
            
            if (data != null) {
                next(data)
            } else {
                next([])
            }
        })
    }
}