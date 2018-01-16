angular.module("ExtraIncomesCtrl", ["cp.ngConfirm"]).controller("ExtraIncomesController", ["$scope", "$ngConfirm", "$route", "ExtraIncomesService", "ExcelService", function ($scope, $ngConfirm, $route, ExtraIncomesService, ExcelService) {
    $scope.loadInsertData = function () {
        $scope.formData = {
            title: "",
            totalExtraIncome: 0,
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
                $scope.formData.totalExtraIncome += $scope.detail.price
                
                $scope.detail = {
                    name: "",
                    price: 0
                }
                
                $ngConfirm("Detalle ingresado al Ingreso Extra. Recuerde registrar el Ingreso Extra antes de cambiar o cerrar esta página para que los datos se actualizen correctamente.", "Éxito!")
            } else {
                $ngConfirm("Debe ingresar un Nombre del Detalle y la Cantidad del Ingreso Extra debe ser mayor a cero.", "Que mal :(")
            }
        }
        
        $scope.removeDetail = function (name) {
            for (let i = 0; i < $scope.formData.details.length; i++) {
                if ($scope.formData.details[i].name == name) {
                    $scope.formData.totalExtraIncome -= $scope.formData.details[i].price
                    $scope.formData.details.splice(i, 1)
                }
            }
        }
        
        $scope.insert = function () {
            if ($scope.formData.details.length >= 1) {
                $scope.formData.creationDate = Date.now()
                
                ExtraIncomesService.insert($scope.formData, function (res) {
                    if (res.registered) {
                        $ngConfirm("Ingreso Extra Registrado!", "Éxito!")
                        
                        $scope.formData = {
                            title: "",
                            totalExtraIncome: 0,
                            details: [],
                            creationDate: null
                        }
                        
                    } else {
                        $ngConfirm("Hubo un error en la operación. Asegurese que el Código Interno del Ingreso Extra no esté ocupado.", "Que mal :(")
                    }
                })
                
            } else {
                $ngConfirm("Debe agregar detalles al Ingreso Extra.", "Que mal :(")
            }
        }
    }
    
    $scope.loadTableData = function () {
        ExtraIncomesService.find(function (res) {
            $scope.extraIncomes = res
        })
        
        $scope.showDetails = function (details) {
            $scope.details = details
            
            $("#detailsModal").modal()
        }
        
        $scope.exportToExcel = function () {
            ExcelService.tableToExcel(new Date(), "extraIncomesTable", "Reporte de Ingresos Extras")
        }
        
        $scope.removeExtraIncome = function (internalCode) {
            $ngConfirm({
                theme: "bootstrap",
                animation: "Rotate",
                closeAnimation: "zoom",
                title: "Eliminar el Ingreso Extra Nº " + internalCode,
                content: "¿Está seguro de eliminar el Ingreso Extra?",
                scope: $scope,
                buttons: {
                    aceptar: {
                        text: "Aceptar",
                        btnClass: "btn-green",
                        action: function (scope, button) {
                            ExtraIncomesService.remove(internalCode, function (res) {
                                if (res.removed) {
                                    $ngConfirm("El Ingreso Extra ha sido eliminada.", "Éxito!")
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