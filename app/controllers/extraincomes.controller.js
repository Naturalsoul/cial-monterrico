let ExtraIncomes = require("./../models/extraincomes.model")

module.exports = {
    exists: function (internalCode, next) {
        ExtraIncomes.count({internalCode: internalCode}, function (err, count) {
            if (err) throw err
            
            if (count > 0) {
                next(true)
            } else {
                next(false)
            }
        })
    },
    
    insert: function (extraIncome, next) {
        this.exists(extraIncome.internalCode, function (res) {
            if (res) {
                next({registered: false})
            } else {
                let newExtraIncome = new ExtraIncomes({
                    internalCode: extraIncome.internalCode,
                    title: extraIncome.title,
                    totalExtraIncome: extraIncome.totalExtraIncome,
                    details: extraIncome.details,
                    creationDate: extraIncome.creationDate
                })
                
                newExtraIncome.save()
                
                next({registered: true})
            }
        })
    },
    
    find: function (next) {
        ExtraIncomes.find({}, function (err, data) {
            if (err) throw err
            
            if (data != null) {
                next(data)
            } else {
                next([])
            }
        })
    },
    
    remove: function (internalCode, next) {
        ExtraIncomes.remove({internalCode: internalCode}, function (err, data) {
            if (err) throw err
            
            if (data != null) {
                next({removed: true})
            } else {
                next([])
            }
        })
    }
}