angular.module("OffersCtrl", []).controller("OffersController", ["$scope", "$ngConfirm", "$route", "OffersService", function ($scope, $ngConfirm, $route, OffersService) {
    $scope.loadInsertData = function () {
        $scope.formData = {
            internalCode: "",
            internalCodeProduct: "",
            nameProduct: "",
            percentage: 0,
            originalPrice: 0,
            creationDate: null
        }
        
        $scope.product = {
            internalCode: "",
            name: "",
            originalPrice: 0,
            offerPrice: 0,
            minimumTotal: 0
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
                OffersService.findProductInfoPriceByCode($scope.product.internalCode, function (res) {
                    $scope.product.name = res.name
                    $scope.product.originalPrice = res.sellPrice
                    $scope.product.minimumTotal = res.minimumTotal
                })
            }
        }
        
        $scope.findProductInfoPriceByName = function () {
            if ($scope.productsNames.indexOf($scope.product.name) != -1) {
                OffersService.findProductInfoPriceByName($scope.product.name, function (res) {
                    $scope.product.internalCode = res.internalCode
                    $scope.product.originalPrice = res.sellPrice
                    $scope.product.minimumTotal = res.minimumTotal
                })
            }
        }
        
        $scope.calculatePercentagePrice = function () {
            $scope.product.offerPrice = Math.round($scope.product.originalPrice - ($scope.product.originalPrice * ($scope.formData.percentage / 100)))
        }
        
        $scope.insert = function () {
            $scope.formData.internalCodeProduct = $scope.product.internalCode
            $scope.formData.nameProduct = $scope.product.name
            $scope.formData.originalPrice = $scope.product.originalPrice
            $scope.formData.offerPrice = $scope.product.offerPrice
            $scope.formData.creationDate = Date.now()
            
            OffersService.insert($scope.formData, function (res) {
                if (res.registered) {
                    $ngConfirm("Oferta registrada con éxito!", "Exito!")
                } else {
                    $ngConfirm("Ha habido un error en la operación. Verifique que todos los campos sean correctos.", "Que mal :(")
                }
            })
        }
    }
}])