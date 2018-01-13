angular.module("ReportsService", []).factory("ReportsService", ["$http", function ($http) {
    return {
        findAllProductsInSells: function (next) {
            $http.get("/api/findallproductsinsells")
                .then(function (data) {
                    next(data.data)
                }, function (err) {
                    console.log(err)
                    next([])
                })
        },
        
        findAllProductsInSellsBetweenDates: function (firstDate, lastDate, next) {
            $http.post("/api/findallproductsinsellsbetweendates", {firstDate: firstDate, lastDate: lastDate})
                .then(function (data) {
                    next(data.data)
                }, function (err) {
                    console.log(err)
                    next([])
                })
        },
        
        findAllSellsBetweenDates: function (firstDate, lastDate, next) {
            $http.post("/api/findallsellsbetweendates", {firstDate: firstDate, lastDate: lastDate})
                .then(function (data) {
                    next(data.data)
                }, function (err) {
                    console.log(err)
                    next([])
                })
        }
    }
}])