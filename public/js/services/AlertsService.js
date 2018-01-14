angular.module("AlertsService", []).factory("AlertsService", ["$http", function ($http) {
    return {
        findStockInfo: function (next) {
            $http.get("/api/findlowstockproducts")
                .then(function (data) {
                    next(data.data)
                }, function (err) {
                    console.log(err)
                    next({
                        extraIncomes: [],
                        sells: [],
                        spendings: []
                    })
                })
        },
        
        findSummaryData: function (next) {
            let d = new Date(Date.now())
            let firstDate = new Date(d.getFullYear(), d.getMonth(), 1)
            let lastDate = new Date(d.getFullYear(), d.getMonth() + 1, 1)
            
            $http.post("/api/getsummarydata", {
                firstDate: firstDate,
                lastDate: lastDate
            })
                .then(function (data) {
                    next(data.data)
                }, function (err) {
                    console.log(err)
                    next([])
                })
        }
    }
}])