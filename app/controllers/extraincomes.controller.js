let ExtraIncomes = require("./../models/extraincomes.model")

module.exports = {
    insert: function (extraIncome, next) {
        let newExtraIncome = new ExtraIncomes({
            title: extraIncome.title,
            totalExtraIncome: extraIncome.totalExtraIncome,
            details: extraIncome.details,
            creationDate: extraIncome.creationDate
        })
        
        newExtraIncome.save()
        
        next({registered: true})
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