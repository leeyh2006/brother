
app.controller('loginController',['$scope' ,'loginService', function($scope,loginService){
    $scope.user = {
        userId :$scope.username,
        userPw: $scope.password
    };
    $scope.joinPage =function(){
      location.href='#!join';
    };
    $scope.loginCheck=function(){
        loginService.loginCheck($scope.user).then(function(resultData){
            if(resultData){
                alert('로그인 성공');
                console.log('[CONTROLLER] LOGIN CONTROLLER RESULT =  ',resultData.data );
                location.href='/';
            }
            else {
                alert('로그인 실패');
                console.log('[CONTROLLER] LOGIN CONTROLLER RESULT =  ',resultData.data );
            }
        });

    };
}]);


