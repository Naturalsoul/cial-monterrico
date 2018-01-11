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
        },
        
        insert: function (offer, next) {
            $http.post("/api/inoffer", offer)
                .then(function (data) {
                    next(data.data)
                }, function (err) {
                    console.log(err)
                    next([])
                })
        },
        
        find: function (next) {
            $http.get("/api/getoffers")
                .then(function (data) {
                    next(data.data)
                }, function (err) {
                    console.log(err)
                    next([])
                })
        },
        
        remove: function (internalCode, internalCodeProduct, originalPrice, next) {
            $http.put("/api/deloffer", {
                internalCode: internalCode,
                internalCodeProduct: internalCodeProduct,
                originalPrice: originalPrice
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