angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider
    
        // home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })
    
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginController'
        })
        
        .when("/inproducts", {
            templateUrl: "views/inproducts.html",
            controller: "ProductsController"
        })
        
        .when("/products", {
            templateUrl: "views/products.html",
            controller: "ProductsController"
        })
        
        .when("/editproducts/:productCode", {
            templateUrl: "views/editproducts.html",
            controller: "ProductsController"
        })
    
    $locationProvider.html5Mode(true);

}]);