angular.module('UserService', []).factory('User', ['$http', function($http) {

    return {
        // call to get all nerds
        get : function() {
            return $http.get('/api/login');
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