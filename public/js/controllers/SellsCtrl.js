angular.module("SellsCtrl", ["cp.ngConfirm"]).controller("SellsController", ["$scope", "SellsService", "$ngConfirm", "$route", function ($scope, SellsService, $ngConfirm, $route) {
    $scope.loadInsertData = function () {
        $scope.formData = {
            internalCode: "",
            products: [],
            totalPrice: 0,
            creationDate: Date.now()
        }
        
        $scope.product = {
            internalCode: "",
            name: "",
            stock: 0,
            quantitySold: 1,
            minimumTotal: 0,
            originalMinimumTotal: 0,
            price: 0,
            originalPrice: 0
        }
        
        $scope.productsInternalCode = []
        $scope.productsName = []
        
        SellsService.findInternalCodeAndName(function (data) {
            data.forEach(function (e) {
                $scope.productsInternalCode.push(e.internalCode)
                $scope.productsName.push(e.name)
            })
        })
        
        $scope.findProductInfoByCode = function () {
            if ($scope.productsInternalCode.indexOf($scope.product.internalCode) != -1) {
                SellsService.findProductInfoByCode($scope.product.internalCode, function (res) {
                    $scope.product.name = res.name
                    $scope.product.stock = res.stock
                    $scope.product.minimumTotal = res.minimumTotal
                    $scope.product.originalMinimumTotal = res.minimumTotal
                    $scope.product.price = (res.offerPrice != 0) ? res.offerPrice : res.sellPrice
                    $scope.product.originalPrice = (res.offerPrice != 0) ? res.offerPrice : res.sellPrice
                })
            }
        }
        
        $scope.findProductInfoByName = function () {
            if ($scope.productsName.indexOf($scope.product.name) != -1) {
                SellsService.findProductInfoByName($scope.product.name, function (res) {
                    $scope.product.internalCode = res.internalCode
                    $scope.product.stock = res.stock
                    $scope.product.minimumTotal = res.minimumTotal
                    $scope.product.originalMinimumTotal = res.minimumTotal
                    $scope.product.price = (res.offerPrice != 0) ? res.offerPrice : res.sellPrice
                    $scope.product.originalPrice = (res.offerPrice != 0) ? res.offerPrice : res.sellPrice
                })
            }
        }
        
        $scope.multiplySellPrice = function () {
            if ($scope.product.quantitySold >= 1) {
                $scope.product.price = $scope.product.originalPrice
                $scope.product.price *= $scope.product.quantitySold
                $scope.product.minimumTotal = $scope.product.originalMinimumTotal
                $scope.product.minimumTotal *= $scope.product.quantitySold
            }
        }
        
        $scope.addProduct = function () {
            let ok = $scope.productsInternalCode.indexOf($scope.product.internalCode) != -1 &&
                     $scope.productsName.indexOf($scope.product.name) != -1 &&
                     $scope.product.stock >= 1 &&
                     $scope.product.quantitySold >= 1 &&
                     $scope.product.price >= 1
                     
            for (let i = 0; i < $scope.formData.products.length; i++) {
                if ($scope.formData.products[i].internalCode == $scope.product.internalCode) {
                    ok = false
                    break
                }
            }
                     
            if (ok) {
                $scope.formData.products.push({
                    internalCode: $scope.product.internalCode,
                    quantitySold: $scope.product.quantitySold,
                    sellPrice: $scope.product.price
                })
                
                $scope.formData.totalPrice += $scope.product.price
                
                $scope.product = {
                    internalCode: "",
                    name: "",
                    stock: 0,
                    quantitySold: 1,
                    minimumTotal: 0,
                    originalMinimumTotal: 0,
                    price: 0,
                    originalPrice: 0
                }
                
                $ngConfirm("Producto registrado en la Venta. Recuerde registrar la Venta antes de cambiar o cerrar esta página para que los datos se actualizen correctamente.", "Exito!")
            } else {
                $ngConfirm("Los datos ingresados para el Producto son incorrectos o ya se encuentra registrado en esta Venta.", "Que mal :(")
            }
        }
        
        $scope.removeProduct = function (internalCode) {
            for (let i = 0; i < $scope.formData.products.length; i++) {
                if ($scope.formData.products[i].internalCode == internalCode) {
                    $scope.formData.totalPrice -= $scope.formData.products[i].sellPrice
                    $scope.formData.products.splice(i, 1)
                }
            }
        }
        
        $scope.insert = function () {
            if ($scope.formData.products.length >= 1) {
                SellsService.insert($scope.formData, function (res) {
                    if (res.registered) {
                        $ngConfirm("Venta Registrada!", "Exito!")
                        $scope.formData = {
                            internalCode: "",
                            products: [],
                            totalPrice: 0
                        }
                    } else {
                        $ngConfirm("Ha ocurrido un error en la operación. Asegurese que el Código Interno de la Venta no esté ocupado.", "Que mal :(")
                    }
                })
            } else {
                $ngConfirm("Debe agregar productos a la Venta.", "Que mal :(")
            }
        }
    }
    
    $scope.loadTableData = function () {
        $scope.products = []
        
        SellsService.find(function (res) {
            $scope.sells = res
        })
        
        $scope.showProducts = function (products) {
            $scope.products = products
            
            $("#productsModal").modal()
        }
        
        $scope.removeSell = function (internalCode, products) {
            $ngConfirm({
                theme: "bootstrap",
                animation: "Rotate",
                closeAnimation: "zoom",
                title: "Eliminar la Venta Nº " + internalCode,
                content: "¿Está seguro de eliminar la Venta?",
                scope: $scope,
                buttons: {
                    aceptar: {
                        text: "Aceptar",
                        btnClass: "btn-green",
                        action: function (scope, button) {
                            SellsService.remove(internalCode, products, function (res) {
                                if (res.removed) {
                                    $ngConfirm("La venta ha sido eliminada.", "Éxito!")
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