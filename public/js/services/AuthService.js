angular.module('AuthService', []).factory('Auth', ['$http', "$location", function($http, $location) {
    return {
        // call to get all nerds
        find : function(userName, pass) {
            $http.post("/api/login", {
                userName: userName,
                password: pass
            }).then(function (data) {
                if (data.data.logged) {
                    $location.path("/")
                } else {
                    alert("Datos invalidos.")
                }
            }, function (err) {
                console.log(err)
                alert(err.toString())
            })
        },
        
        isLoggedIn: function (next) {
            $http.get("/api/login/check")
                .then(function (data) {
                    next(data.data.logged)
                }, function (err) {
                    console.log(err)
                    alert(err.toString())
                })
        },
        
        logout: function (next) {
            $http.get("/api/logout")
                .then(function (data) {
                    next(data.data.logged)
                }, function (err) {
                    console.log(err)
                    alert(err.toString())
                })
        }
        
        /*
        // these will work when more API routes are defined on the Node side of things
        // call to POST and create a new nerd
        create : function(nerdData) {
            return $http.post('/api/login', nerdData);
        },

        // call to DELETE a nerd
        delete : function(id) {
            return $http.delete('/api/login/' + id);
        }
        */
    }       

}]);