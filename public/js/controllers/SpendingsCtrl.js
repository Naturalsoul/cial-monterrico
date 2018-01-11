angular.module("SpendingsCtrl", ["cp.ngConfirm"]).controller("SpendingsController", ["$scope", "$ngConfirm", "$route", "SpendingsService", function ($scope, $ngConfirm, $route, SpendingsService) {
    $scope.loadInsertData = function () {
        $scope.formData = {
            internalCode: "",
            title: "",
            totalSpending: 0,
            details: [],
            creationDate: null
        }
        
        $scope.detail = {
            name: "",
            price: 0
        }
        
        $scope.addDetail = function () {
            let ok = $scope.detail.name.length > 0 && $scope.detail.price > 0
            
            if (ok) {
                $scope.formData.details.push($scope.detail)
                $scope.formData.totalSpending += $scope.detail.price
                
                $scope.detail = {
                    name: "",
                    price: 0
                }
                
                $ngConfirm("Detalle ingresado al gasto. Recuerde registrar el Gasto antes de cambiar o cerrar esta página para que los datos se actualizen correctamente.", "Éxito!")
            } else {
                $ngConfirm("Debe ingresar un Nombre del Detalle y la Cantidad Gastada debe ser mayor a cero.", "Que mal :(")
            }
        }
        
        $scope.removeDetail = function (name) {
            for (let i = 0; i < $scope.formData.details.length; i++) {
                if ($scope.formData.details[i].name == name) {
                    $scope.formData.totalSpending -= $scope.formData.details[i].price
                    $scope.formData.details.splice(i, 1)
                }
            }
        }
        
        $scope.insert = function () {
            if ($scope.formData.details.length >= 1) {
                $scope.formData.creationDate = Date.now()
                
                SpendingsService.insert($scope.formData, function (res) {
                    if (res.registered) {
                        $ngConfirm("Gasto Registrado!", "Éxito!")
                        
                        $scope.formData = {
                            internalCode: "",
                            title: "",
                            totalSpending: 0,
                            details: [],
                            creationDate: null
                        }
                        
                    } else {
                        $ngConfirm("Hubo un error en la operación. Asegurese que el Código Interno del Gasto no esté ocupado.", "Que mal :(")
                    }
                })
                
            } else {
                $ngConfirm("Debe agregar detalles al Gasto.", "Que mal :(")
            }
        }
    }
    
    $scope.loadTableData = function () {
        SpendingsService.find(function (res) {
            $scope.spendings = res
        })
        
        $scope.showDetails = function (details) {
            $scope.details = details
            
            $("#detailsModal").modal()
        }
        
        $scope.removeSpending = function (internalCode) {
            $ngConfirm({
                theme: "bootstrap",
                animation: "Rotate",
                closeAnimation: "zoom",
                title: "Eliminar el Gasto Nº " + internalCode,
                content: "¿Está seguro de eliminar el Gasto?",
                scope: $scope,
                buttons: {
                    aceptar: {
                        text: "Aceptar",
                        btnClass: "btn-green",
                        action: function (scope, button) {
                            SpendingsService.remove(internalCode, function (res) {
                                if (res.removed) {
                                    $ngConfirm("El gasto ha sido eliminada.", "Éxito!")
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
}])