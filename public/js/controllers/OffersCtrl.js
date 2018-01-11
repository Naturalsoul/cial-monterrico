angular.module("OffersCtrl", []).controller("OffersController", ["$scope", "$ngConfirm", "$route", "OffersService", function ($scope, $ngConfirm, $route, OffersService) {
    $scope.loadInsertData = function () {
        $scope.product = {
            internalCode: "",
            name: "",
            originalPrice: 0,
            offerPrice: 0
        }
        
        $scope.productsInternalCodes = []
        $scope.productsNames = []
        
        OffersService.findInternalCodeAndName(function (res) {
            res.forEach(function (e) {
                $scope.productsInternalCodes.push(e.internalCode)
                $scope.productsNames.push(e.name)
            })
        })
        
        $scope.findProductInfoPriceByCode = function () {
            if ($scope.productsInternalCodes.indexOf($scope.product.internalCode) != -1) {
                OffersService.findProductInfoByCode($scope.product.internalCode, function (res) {
                    $scope.product.name = res.name
                    $scope.product.originalPrice = res.sellPrice
                })
            }
        }
        
        $scope.findProductInfoPriceByName = function () {
            if ($scope.productsNames.indexOf($scope.product.name) != -1) {
                OffersService.findProductInfoByName($scope.product.name, function (res) {
                    $scope.product.internalCode = res.internalCode
                    $scope.product.originalPrice = res.originalPrice
                })
            }
        }
    }
}])