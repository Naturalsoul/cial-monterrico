let Spendings = require("./../models/spendings.model")

module.exports = {
    exists: function (internalCode, next) {
        Spendings.count({internalCode: internalCode}, function (err, count) {
            if (err) throw err
            
            if (count > 0) {
                next(true)
            } else {
                next(false)
            }
        })
    },
    
    insert: function (spending, next) {
        this.exists(spending.internalCode, function (res) {
            if (res) {
                next({registered: false})
            } else {
                let newSpending = new Spendings({
                    internalCode: spending.internalCode,
                    title: spending.title,
                    totalSpending: spending.totalSpending,
                    details: spending.details,
                    creationDate: spending.creationDate
                })
                
                newSpending.save()
                
                next({registered: true})
            }
        })
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