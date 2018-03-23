var app = angular.module('app',['ngRoute']);


app.config(function ($routeProvider) {
    $routeProvider
        .when('/login',{templateUrl:'views/login/login.html'})
})