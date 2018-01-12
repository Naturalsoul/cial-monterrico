angular.module("ReportsCtrl", ["cp.ngConfirm", 'chart.js']).controller("ReportsController", ["$scope", "$ngConfirm", "ReportsService", function ($scope, $ngConfirm, ReportsService) {
    $scope.loadProductsReports = function () {
      $scope.monthSalesLabels = ['Desde Siempre']
      $scope.series = []
      $scope.options = { legend: { display: true } }
      $scope.monthSalesData = []
      
      ReportsService.findAllProductsInSells(function (res) {
        res.forEach(function (e) {
          e.products.forEach(function (p) {
            if ($scope.series.indexOf(p.internalCode) == -1) {
              $scope.series.push(p.internalCode)
              $scope.monthSalesData[$scope.series.indexOf(p.internalCode)] = [p.quantitySold]
            } else {
              $scope.monthSalesData[$scope.series.indexOf(p.internalCode)] += p.quantitySold
            }
          })
        })
      })
    }
}])