angular.module("SellsService", []).factory("SellsService", ["$http", function ($http) {
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
        
        findProductInfoByCode: function (internalCode, next) {
            $http.post("/api/findproductinfobycode", {internalCode: internalCode})
                .then(function (data) {
                    next(data.data)
                }, function (err) {
                    console.log(err)
                    next([])
                })
        },
        
        findProductInfoByName: function (name, next) {
            $http.post("/api/findproductinfobyname", {name: name})
                .then(function (data) {
                    next(data.data)
                }, function (err) {
                    console.log(err)
                    next([])
                })
        },
        
        insert: function (sell, next) {
            $http.post("/api/insell", sell)
                .then(function (data) {
                    next(data.data)
                }, function (err) {
                    console.log(err)
                    next([])
                })
        },
        
        find: function (next) {
            $http.get("/api/getsells")
                .then(function (data) {
                    next(data.data)
                }, function (err) {
                    console.log(err)
                    next([])
                })
        }
    }
}])