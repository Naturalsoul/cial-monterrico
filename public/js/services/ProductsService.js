angular.module('ProductsService', []).factory('ProductsService', ['$http', "$location", function($http, $location) {
    return {
        insert: function (data, next) {
            $http.post("/api/inproducts", data)
                .then(function (data) {
                    next(data.data)
                }, function (err) {
                    console.log(err)
                    next({registered: false})
                })
        },
        
        findProviders: function (next) {
            $http.get("/api/getproviders")
                .then(function (data) {
                    let arr = []
                    
                    data.data.forEach(function (e) {
                        if (arr.indexOf(e.provider) == -1) {
                            arr.push(e.provider)
                        }
                    })
                    
                    next(arr)
                }, function (err) {
                    console.log(err)
                    next(false)
                })
        },
        
        find: function (next) {
            $http.get("/api/getproducts")
                .then(function (data) {
                    next(data.data)
                }, function (err) {
                    console.log(err)
                    next(false)
                })
        }
    }
}])