angular.module("SellsCtrl", []).controller("SellsController", ["$scope", "SellsService", function ($scope, SellsService) {
    $scope.loadInsertData = function () {
        $scope.formData = {
            internalCode: "",
            products: [{
                internalCode: ""
            }],
            totalPrice: 0
        }
        
        $scope.addProduct = function () {
            $scope.formData.products.push({})
        }
    }
}])