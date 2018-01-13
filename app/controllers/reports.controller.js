let Sells = require("./../models/sells.model")

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
    },
    
    getSummaryData: function (firstDate, lastDate, next) {
        let ExtraIncomes = require("./../models/extraincomes.model")
        let Spendings = require("./../models/spendings.model")
        let response = {}
        
        Sells.find({
            creationDate: {
                $gte: firstDate,
                $lte: lastDate
            }
        }, "totalPrice", function (err, data) {
            if (err) throw err
            
            response.sells = data
            
            ExtraIncomes.find({
                creationDate: {
                    $gte: firstDate,
                    $lte: lastDate
                }
            }, "totalExtraIncome", function (err, data) {
                if (err) throw err
                
                response.extraIncomes = data
                
                Spendings.find({
                    creationDate: {
                        $gte: firstDate,
                        $lte: lastDate
                    }
                }, "totalSpending", function (err, data) {
                    if (err) throw err
                    
                    response.spendings = data
                    
                    next(response)
                })
            })
        })
    }
}