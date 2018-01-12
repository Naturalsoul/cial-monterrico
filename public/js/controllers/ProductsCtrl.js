angular.module("ProductsCtrl", ["cp.ngConfirm"]).controller("ProductsController", ["$scope", "ProductsService", "$routeParams", "$location", "$ngConfirm", "$route", function ($scope, ProductsService, $routeParams, $location, $ngConfirm, $route) {
    $scope.loadInsertData = function () {
        $scope.formData = {
            internalCode: "",
            providerCode: "",
            name: "",
            provider: "",
            stock: 0,
            minimumStock: 0,
            neto: 0,
            iva: 0,
            ivaNeto: 0,
            minimumTotal: 0,
            sellPrice: 0
        }
        
        ProductsService.findProviders(function (res) {
            $scope.providers = res
        })
        
        $scope.calculateMoney = function () {
            $scope.formData.iva = Math.round($scope.formData.neto * 0.19)
            $scope.formData.ivaNeto = $scope.formData.iva + $scope.formData.neto
            $scope.formData.minimumTotal = Math.round($scope.formData.ivaNeto / 0.4)
        }
        
        $scope.insertProduct = function () {
            ProductsService.insert($scope.formData, function (res) {
                
                if (res.registered) {
                    $("#alerts").html("<div class='alert alert-success' role='alert'>El Producto ha sido registrado con éxito.</div>")
                    
                    $scope.formData = {
                        internalCode: "",
                        providerCode: "",
                        name: "",
                        provider: "",
                        stock: 0,
                        minimumStock: 0,
                        neto: 0,
                        iva: 0,
                        ivaNeto: 0,
                        minimumTotal: 0,
                        sellPrice: 0
                    }
                    
                } else {
                    $("#alerts").html("<div class='alert alert-danger' role='alert'>Hubo un error en el registro del Producto. Verifique si ya está registrado o si los datos son correctos.</div>")
                }
                
                $("#alerts").animateCss("bounceIn")
            })
        }
    }
    
    $scope.loadTableData = function () {
        ProductsService.find(function (res) {
            $scope.products = res
            
            $scope.products.forEach(function (e) {
                e.sellPrice = (e.offerPrice != 0 || (typeof e.offerPrice != "undefined" && e.offerPrice != 0)) ? e.offerPrice : e.sellPrice
            })
        })
        
        $scope.disableProduct = function (internalCode) {
            $ngConfirm({
                theme: "bootstrap",
                animation: "Rotate",
                closeAnimation: "zoom",
                title: "Deshabilitar Producto Nº " + internalCode,
                content: "¿Está seguro de deshabilitar el producto?",
                scope: $scope,
                buttons: {
                    aceptar: {
                        text: "Aceptar",
                        btnClass: "btn-green",
                        action: function (scope, button) {
                            ProductsService.disable(internalCode, function (res) {
                                if (res.disabled) {
                                    $ngConfirm("El Producto ha sido deshabilitado.", "Éxito!")
                                    $route.reload()
                                } else {
                                    $ngConfirm("Ha habido un error en la operación.", "Que mal :(")
                                }
                                
                                return false
                            })
                        }
                    },
                    close: function (scope, button) {
                        // nothing
                    }
                }
            })
        }
    }
    
    $scope.loadEditData = function () {
        ProductsService.findOne($routeParams.productCode, function (res) {
            $scope.formData = {
                internalCode: res.internalCode,
                providerCode: res.providerCode,
                name: res.name,
                provider: res.provider,
                stock: res.stock,
                minimumStock: res.minimumStock,
                neto: res.neto,
                iva: res.iva,
                ivaNeto: res.ivaNeto,
                minimumTotal: res.minimumTotal,
                sellPrice: (res.offerPrice != 0 || (typeof res.offerPrice != "undefined" && res.offerPrice != 0)) ? res.offerPrice : res.sellPrice,
                state: res.state.toString(),
                offerPrice: res.offerPrice,
                originalPrice: res.sellPrice
            }
            
            if (res.offerPrice != 0 || (typeof res.offerPrice != "undefined" && res.offerPrice != 0)) {
                $("#product-venta").prop("readOnly", true)
                $("#product-neto").prop("readOnly", true)
            }
        })
        
        ProductsService.findProviders(function (res) {
            $scope.providers = res
        })
        
        $scope.calculateMoney = function () {
            $scope.formData.iva = Math.round($scope.formData.neto * 0.19)
            $scope.formData.ivaNeto = $scope.formData.iva + $scope.formData.neto
            $scope.formData.minimumTotal = Math.round($scope.formData.ivaNeto / 0.4)
        }
        
        $scope.updateProduct = function () {
            if ($scope.formData.offerPrice) {
                $scope.formData.sellPrice = $scope.formData.originalPrice
            }
            
            ProductsService.update($scope.formData, function (res) {
                
                $location.path("/products")
                
                if (res.updated) {
                    $ngConfirm("El Producto fué correctamente actualizado.", "Éxito!")
                } else {
                    $ngConfirm("Ocurrió un error en la operación. Verifique que los datos sean correctos.", "Que mal :(")
                }
            })
        }
    }
}])