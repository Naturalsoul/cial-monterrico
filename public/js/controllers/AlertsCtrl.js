angular.module("AlertsCtrl", []).controller("AlertsController", ["$scope", "AlertsService", function ($scope, AlertsService) {
    AlertsService.findStockInfo(function (res) {
        $scope.lowStockProducts = res
        $scope.lowStockProductsQuantity = $scope.lowStockProducts.length
    })
    
    AlertsService.findSummaryData(function (res) {
        $scope.incomes = 0
        $scope.spendings = 0
        
        if (res.length < 1) {
            res = {
                extraIncomes: [],
                sells: [],
                spendings: []
            }
        }
        
        res.extraIncomes.forEach(function (e) {
            $scope.incomes += e.totalExtraIncome
        })
        
        res.sells.forEach(function (e) {
            $scope.incomes += e.totalPrice
        })
        
        res.spendings.forEach(function (e) {
            $scope.spendings += e.totalSpending
        })
        
        $scope.actualSituation = ($scope.incomes >= $scope.spendings) ? "true" : "false"
    })
}])