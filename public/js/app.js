angular.module('cial-monterrico', ['ngRoute',
                                   'appRoutes',
                                   'MainCtrl',
                                   'UserCtrl',
                                   "LoginCtrl",
                                   "ProductsCtrl",
                                   "SellsCtrl",
                                   "OffersCtrl",
                                   "SpendingsCtrl",
                                   "ExtraIncomesCtrl",
                                   "ReportsCtrl",
                                   "AlertsCtrl",
                                   'UserService',
                                   "AuthService",
                                   "ProductsService",
                                   "SellsService",
                                   "OffersService",
                                   "SpendingsService",
                                   "ExtraIncomesService",
                                   "ReportsService",
                                   "AlertsService",
                                   "ExcelService"
                                   ])

.run(["$rootScope", "$location", "Auth", function ($rootScope, $location, Auth) {
    $rootScope.$on("$routeChangeStart", function (e) {
        if ($location.path() == "/login") {
            $("#navbar-top").hide()
        } else {
            $("#navbar-top").show()
        }
        
        Auth.isLoggedIn(function (logged) {
            if (!logged) {
                $location.path("/login")
            }
        })
    })
}])