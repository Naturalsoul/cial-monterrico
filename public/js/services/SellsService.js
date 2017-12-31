angular.module("SellsService", []).factory("SellsService", ["$http", function ($http) {
    return {
        findProductsInfo: function (next) {
            $http.get("/api/getproductsinfo")
                .then(function (data) {
                    next(data.data)
                }, function (err) {
                    console.log(err)
                    next(false)
                })
        }
    }
}])