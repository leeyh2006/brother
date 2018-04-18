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
                controller:'boardController',
                resolve:
                    {
                        "data":
                            ['$http',function($http){
                                return $http({
                                    method: 'POST',
                                    url :'/auth/check'
                                }).then(
                                    function (resp){
                                        return resp.data
                                    })
                            }]
                    }

            })
        .when('/boardInsert',
            {
                templateUrl:'views/board/form.ejs'
            })
        .otherwise(
            {
                templateUrl:'views/home.ejs'
            })
});