var app = angular.module('app',['ngRoute','cp.ngConfirm']);

app.config(function ($routeProvider,$locationProvider) {
    $routeProvider
        .when('/login',
            {
                templateUrl:'views/user/login.html'
            })
        .when('/join',
            {
                templateUrl: 'views/user/join.html'
            })
        .when('/kakaoLogin/:code',
            {
                templateUrl:'views/index.html',
            })
        .otherwise(
            {
                templateUrl:'views/home.html'
            })
});