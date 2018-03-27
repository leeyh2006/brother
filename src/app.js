var app = angular.module('app',['ngRoute']);


app.config(function ($routeProvider) {
    $routeProvider
        .when('/login',{templateUrl:'views/user/login.html'})
        .when('/join',{templateUrl:'views/user/join.html'})
})