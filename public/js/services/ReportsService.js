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
        }
    }
}])