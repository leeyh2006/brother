

app.controller('loginController',['$scope' ,'loginService', function($scope,loginService){

    $scope.user = {
        userId :$scope.userId,
        userPw: $scope.userPw
    };

    $scope.joinPage =function(){
      location.href='#!join';
    };
    $scope.loginCheck=function(){
        loginService.loginCheck($scope.user).then(function(resultData){
            $scope.dataStr=resultData;
        });
        console.log('user Id Check');
    }
}]);
