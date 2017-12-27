angular.module('MainCtrl', []).controller('MainController', ["$scope", "Auth", "$location", function ($scope, Auth, $location) {
    
    $scope.logout = function () {
        Auth.logout(function (logged) {
            $location.path("/login")
        })
    }
}]);