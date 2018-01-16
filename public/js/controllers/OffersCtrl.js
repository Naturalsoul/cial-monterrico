angular.module("OffersCtrl", []).controller("OffersController", ["$scope", "$ngConfirm", "$route", "OffersService", "ExcelService", function ($scope, $ngConfirm, $route, OffersService, ExcelService) {
    $scope.loadInsertData = function () {
        $scope.formData = {
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
                    
                    $scope.calculatePercentagePrice()
                })
            }
        }
        
        $scope.findProductInfoPriceByName = function () {
            if ($scope.productsNames.indexOf($scope.product.name) != -1) {
                OffersService.findProductInfoPriceByName($scope.product.name, function (res) {
                    $scope.product.internalCode = res.internalCode
                    $scope.product.originalPrice = res.sellPrice
                    $scope.product.minimumTotal = res.minimumTotal
                    
                    $scope.calculatePercentagePrice()
                })
            }
        }
        
        $scope.calculatePercentagePrice = function () {
            $scope.product.offerPrice = Math.round($scope.product.originalPrice - ($scope.product.originalPrice * ($scope.formData.percentage / 100)))
        }
        
        $scope.insert = function () {
            if ($scope.product.offerPrice >= $scope.product.minimumTotal) {
                $scope.formData.internalCodeProduct = $scope.product.internalCode
                $scope.formData.nameProduct = $scope.product.name
                $scope.formData.originalPrice = $scope.product.originalPrice
                $scope.formData.offerPrice = $scope.product.offerPrice
                $scope.formData.creationDate = Date.now()
                
                OffersService.insert($scope.formData, function (res) {
                    if (res.registered) {
                        $ngConfirm("Oferta registrada con éxito!", "Exito!")
                        
                        $scope.formData = {
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
                        
                    } else {
                        $ngConfirm("Ha habido un error en la operación. Verifique que todos los campos sean correctos. Recuerde que no puede ingresar más de una Oferta por Producto.", "Que mal :(")
                    }
                })
            } else {
                $ngConfirm("El precio de Oferta debe ser mayor o igual al Precio Mínimo", "Que mal :(")
            }
        }
    }
    
    $scope.loadTableData = function () {
        OffersService.find(function (res) {
            $scope.offers = res
            
            $scope.offers.forEach(function (e) {
                e.offerPrice = e.originalPrice - (e.originalPrice * (e.percentage / 100))
            })
        })
        
        $scope.exportToExcel = function () {
            ExcelService.tableToExcel(new Date(), "offersTable", "Reporte de Ofertas")
        }
        
        $scope.removeOffer = function (internalCode, internalCodeProduct, originalPrice) {
            $ngConfirm({
                theme: "bootstrap",
                animation: "Rotate",
                closeAnimation: "zoom",
                title: "Eliminar la Oferta Nº " + internalCode,
                content: "¿Está seguro de eliminar la Oferta?",
                scope: $scope,
                buttons: {
                    aceptar: {
                        text: "Aceptar",
                        btnClass: "btn-green",
                        action: function (scope, button) {
                            OffersService.remove(internalCode, internalCodeProduct, originalPrice, function (res) {
                                if (res.removed) {
                                    $ngConfirm("La Oferta ha sido eliminada.", "Éxito!")
                                    $route.reload()
                                } else {
                                    $ngConfirm("Ha habido un error en la operación.", "Que mal :(")
                                }
                                
                                return false
                            })
                        }
                    },
                    close: function (scope, button) {
                        text: "Cerrar"
                    }
                }
            })
        }
    }
}])