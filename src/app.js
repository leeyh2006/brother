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
        .when('/board',
            {
                templateUrl:'views/board/list.ejs',
                controller: 'boardController'

            })
        .when('/boardInsert',
            {
                templateUrl:'views/board/form.ejs',
                controller:'boardController'
            })
        .otherwise(
            {
                templateUrl:'views/home.ejs',
            })
});