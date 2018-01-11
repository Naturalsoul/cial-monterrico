angular.module("OffersService", []).factory("OffersService", ["$http", function ($http) {
    return {
        findInternalCodeAndName: function (next) {
            $http.get("/api/findinternalcodeandname")
                .then(function (data) {
                    next(data.data)
                }, function (err) {
                    console.log(err)
                    next([])
                })
        },
        
        findProductInfoPriceByCode: function (internalCode, next) {
            $http.post("/api/findproductinfopricebycode", {internalCode: internalCode})
                .then(function (data) {
                    next(data.data)
                }, function (err) {
                    console.log(err)
                    next([])
                })
        },
        
        findProductInfoPriceByName: function (name, next) {
            $http.post("/api/findproductinfopricebyname", {name: name})
                .then(function (data) {
                    next(data.data)
                }, function (err) {
                    console.log(err)
                    next([])
                })
        }
    }
}])