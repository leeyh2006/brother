var app = angular.module('app',['ngRoute','cp.ngConfirm']);

app.config(function ($routeProvider,$locationProvider) {
    $routeProvider
        .when('/login',
            {
                templateUrl:'views/user/login.ejs'
            })
        .when('/join',
            {
                templateUrl: 'views/user/join.ejs'
            })
        .otherwise(
            {
                templateUrl:'views/home.ejs',
            })
});