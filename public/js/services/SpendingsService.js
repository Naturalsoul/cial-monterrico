angular.module("SpendingsService", []).factory("SpendingsService", ["$http", function ($http) {
    return {
        insert: function (spending, next) {
            $http.post("/api/inspending", spending)
                .then(function (data) {
                    next(data.data)
                }, function (err) {
                    console.log(err)
                    next([])
                })
        },
        
        find: function (next) {
            $http.get("/api/getspendings")
                .then(function (data) {
                    next(data.data)
                }, function (err) {
                    console.log(err)
                    next([])
                })
        },
        
        remove: function (internalCode, next) {
            $http.put("/api/delspending", {internalCode: internalCode})
                .then(function (data) {
                    next(data.data)
                }, function (err) {
                    console.log(err)
                    next([])
                })
        }
    }
}])