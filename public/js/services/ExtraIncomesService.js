angular.module("ExtraIncomesService", []).factory("ExtraIncomesService", ["$http", function ($http) {
    return {
        insert: function (spending, next) {
            $http.post("/api/inextraincome", spending)
                .then(function (data) {
                    next(data.data)
                }, function (err) {
                    console.log(err)
                    next([])
                })
        },
        
        find: function (next) {
            $http.get("/api/getextraincomes")
                .then(function (data) {
                    next(data.data)
                }, function (err) {
                    console.log(err)
                    next([])
                })
        },
        
        remove: function (internalCode, next) {
            $http.put("/api/delextraincome", {internalCode: internalCode})
                .then(function (data) {
                    next(data.data)
                }, function (err) {
                    console.log(err)
                    next([])
                })
        }
    }
}])