var app = angular.module('app',['ngRoute','cp.ngConfirm']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/login',{templateUrl:'views/user/login.html'})
        .when('/join',{templateUrl:'views/user/join.html'})
        .otherwise({templateUrl:'views/home.html'})
})