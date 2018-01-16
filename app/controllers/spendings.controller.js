let Spendings = require("./../models/spendings.model")

module.exports = {
    insert: function (spending, next) {
        let newSpending = new Spendings({
            title: spending.title,
            totalSpending: spending.totalSpending,
            details: spending.details,
            creationDate: spending.creationDate
        })
        
        newSpending.save()
        
        next({registered: true})
    },
    
    find: function (next) {
        Spendings.find({}, function (err, data) {
            if (err) throw err
            
            if (data != null) {
                next(data)
            } else {
                next([])
            }
        })
    },
    
    remove: function (internalCode, next) {
        Spendings.remove({internalCode: internalCode}, function (err, data) {
            if (err) throw err
            
            if (data != null) {
                next({removed: true})
            } else {
                next([])
            }
        })
    }
}