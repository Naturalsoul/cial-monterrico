angular.module("ReportsCtrl", ["cp.ngConfirm", 'chart.js']).controller("ReportsController", ["$scope", "$ngConfirm", "ReportsService", function ($scope, $ngConfirm, ReportsService) {
    $scope.loadProductsReports = function () {
      $scope.allTimesLabels = ['Desde Siempre']
      $scope.allTimesSeries = []
      $scope.options = {
        legend: { display: true },
        scales: {
          xAxes: [{id: 'x-axis-1', type: 'linear', position: 'left', ticks: {min: 0}}]
        }
      }
      
      $scope.allTimesData = []
      
      ReportsService.findAllProductsInSells(function (res) {
        res.forEach(function (e) {
          e.products.forEach(function (p) {
            if ($scope.allTimesSeries.indexOf(p.internalCode) == -1) {
              $scope.allTimesSeries.push(p.internalCode)
              $scope.allTimesData[$scope.allTimesSeries.indexOf(p.internalCode)] = [p.quantitySold]
            } else {
              $scope.allTimesData[$scope.allTimesSeries.indexOf(p.internalCode)][0] += p.quantitySold
            }
          })
        })
      })
      
      $scope.formData = {
        firstDate: "",
        lastDate: ""
      }
      
      $scope.searchBetweenDates = function () {
        if ($scope.formData.firstDate != "" && $scope.formData.lastDate != "") {
          ReportsService.findAllProductsInSellsBetweenDates($scope.formData.firstDate, $scope.formData.lastDate, function (res) {
            $scope.betweenDatesSeries = []
            $scope.betweenDatesData = []
            
            if (res.length > 0) {
              res.forEach(function (e) {
                e.products.forEach(function (p) {
                  if ($scope.betweenDatesSeries.indexOf(p.internalCode) == -1) {
                    $scope.betweenDatesSeries.push(p.internalCode)
                    $scope.betweenDatesData[$scope.betweenDatesSeries.indexOf(p.internalCode)] = [p.quantitySold]
                  } else {
                    $scope.betweenDatesData[$scope.betweenDatesSeries.indexOf(p.internalCode)][0] += p.quantitySold
                  }
                })
              })
            } else {
              $ngConfirm("No hay ventas en el periodo de tiempo seleccionado.", "Que mal :(")
            }
          })
        }
      }
    }
    
    $scope.loadSellsReports = function () {
      $scope.formData = {
        firstDateSells: "",
        lastDateSells: ""
      }
      
      $scope.options = {
        legend: { display: true },
        scales: {
          xAxes: [{id: 'x-axis-1', type: 'linear', position: 'left', ticks: {min: 0}}]
        }
      }
      
      $scope.searchBetweenDatesSells = function () {
        if ($scope.formData.firstDateSells != "" && $scope.formData.lastDateSells != "") {
          ReportsService.findAllSellsBetweenDates($scope.formData.firstDateSells, $scope.formData.lastDateSells, function (res) {
            $scope.betweenDatesSellsData = [[], []]
            $scope.betweenDatesSellsSeries = ["Cantidad de Productos Vendidos", "Venta Total $ en Miles de Pesos"]
            $scope.betweenDatesSellsLabels = []
            
            if (res.length > 0) {
              res.forEach(function (e, i) {
                let d = new Date(e.creationDate)
                let time = ""
                time = (d.getDate().toString().length < 2) ? "0" + d.getDate() : d.getDate()
                time += "-"
                time += ((d.getMonth() + 1).toString().length < 2) ? "0" + (d.getMonth() + 1) : (d.getMonth() + 1)
                time += "-"
                time += d.getFullYear() + " "
                time += (d.getHours().toString().length < 2) ? "0" + d.getHours() : d.getHours()
                time += ":"
                time += (d.getMinutes().toString().length < 2) ? "0" + d.getMinutes() : d.getMinutes()
                time += ":"
                time += (d.getSeconds().toString().length < 2) ? "0" + d.getSeconds() : d.getSeconds()
                
                $scope.betweenDatesSellsLabels.push(e.internalCode + " | " + time)
                $scope.betweenDatesSellsData[0].push(e.products.length)
                $scope.betweenDatesSellsData[1].push(e.totalPrice / 1000)
              })
              
            } else {
              $ngConfirm("No hay ventas en el periodo de tiempo seleccionado.", "Que mal :(")
            }
          })
        }
      }
      
    }
    
    $scope.loadSummaryReports = function () {
        $scope.formData = {
            firstDate: "",
            lastDate: ""
        }
        
        $scope.options = {
            legend: { display: true },
            scales: {
                xAxes: [{id: 'x-axis-1', type: 'linear', position: 'left', ticks: {min: 0}}]
            }
        }
        
        $scope.summaryColors = ["#46BFBD", "#DCDCDC"]
        $scope.quantities = {
            sells: 0,
            sellsTotal: 0,
            extraIncomes: 0,
            extraIncomesTotal: 0,
            spendings: 0
        }
        
        $scope.searchBetweenDatesSummary = function () {
            if ($scope.formData.firstDate != "" && $scope.formData.lastDate) {
                ReportsService.getSummaryData($scope.formData.firstDate, $scope.formData.lastDate, function (res) {
                    $scope.quantities = {
                        sells: 0,
                        sellsTotal: 0,
                        extraIncomes: 0,
                        extraIncomesTotal: 0,
                        spendings: 0
                    }
                    
                    $scope.betweenDatesSummaryData = [[], []]
                    $scope.betweenDatesSummarySeries = ["Ingresos Totales", "Gastos Totales"]
                    let incomes = 0
                    let spendings = 0
                    
                    res.extraIncomes.forEach(function (e) {
                        incomes += e.totalExtraIncome
                        $scope.quantities.extraIncomesTotal += e.totalExtraIncome
                    })
                    
                    res.sells.forEach(function (e) {
                        incomes += e.totalPrice
                        $scope.quantities.sellsTotal += e.totalPrice
                    })
                    
                    res.spendings.forEach(function (e) {
                        spendings += e.totalSpending
                    })
                    
                    $scope.betweenDatesSummaryData[0].push(incomes)
                    $scope.betweenDatesSummaryData[1].push(spendings)
                    
                    $scope.quantities.sells = res.sells.length
                    $scope.quantities.extraIncomes = res.extraIncomes.length
                    $scope.quantities.spendings = res.spendings.length
                })
            }
        }
    }
}])