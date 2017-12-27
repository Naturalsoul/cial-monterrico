angular.module("ProductsCtrl", []).controller("ProductsController", ["$scope", "ProductsService", function ($scope, ProductsService) {
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
    
    ProductsService.find(function (res) {
        $scope.products = res
    })
    
    $scope.calculateMoney = function () {
        $scope.formData.iva = Math.round($scope.formData.neto * 0.19)
        $scope.formData.ivaNeto = $scope.formData.iva + $scope.formData.neto
        $scope.formData.minimumTotal = Math.round($scope.formData.ivaNeto / 0.5093)
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
    
}])