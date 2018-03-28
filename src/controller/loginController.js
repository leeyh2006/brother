

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
            if(resultData.data[0].COUNT ==1){
                alert('로그인 성공');
                console.log('[CONTROLLER] LOGIN CONTROLLER RESULT =  '+resultData.data );
            }
            else {
                alert('로그인 실패');
                console.log('[CONTROLLER] LOGIN CONTROLLER RESULT =  '+resultData.data );
            }
        });

    }

    $scope.kakaoLogin=function () {
        var data = loginService.kakaoLogin();
        console.log('kakao data = ' + data);

    }
}]);
