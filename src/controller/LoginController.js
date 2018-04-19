/*
    [게시판 컨트롤러]
    최초 등록일자 : 2018.04.11
    최종 수정일자 : 2018.04.11
    수정자 : 이용희
    이메일 : yhlee@openit.co.kr
    controller :  loginController
    js : loginController.js
 */

app.controller('LoginController',['$scope' ,'$ngConfirm','loginService', function($scope,$ngConfirm,loginService){
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

    $scope.logOut = function(){
        $ngConfirm({
            title:false,
            content:'로그아웃 하시겠습니까? ',
            buttons: {
                ok: {
                    text: '예',
                    action: function(){
                        loginService.logOut().then(function(resultData){
                            console.log('[CONTROLLER] logOUT' );
                            location.href='/'
                        })
                    }
                },
                cancel: {
                    text: '아니오'
                }
            }
        })

    }
}]);


