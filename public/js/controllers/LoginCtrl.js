angular.module('LoginCtrl', []).controller('LoginController', ["$scope", "Auth", "$location", function($scope, Auth, $location) {
    $scope.userName = ""
    $scope.password = ""
    
    Auth.isLoggedIn(function (logged) {
        if (logged) {
            $location.path("/")
        }
    })

    $scope.login = function () {
        Auth.find($scope.userName, $scope.password)
    }
    
}]);
