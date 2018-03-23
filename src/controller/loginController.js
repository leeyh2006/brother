

app.controller('loginController',['$scope' ,'loginService', function($scope,loginService){
    $scope.testText = 'hello World';
    $scope.loginCheck=function(){
        loginService.loginCheck('data').then(function(resultData){
            console.log('come in');
            $scope.dataStr=resultData;
        });
    }
}]);
