
/*
    [메뉴별 권한 컨트롤러]
    최초 등록일자 : 2018.04.16
    최종 수정일자 : 2018.04.16
    수정자 : 이용희
    이메일 : yhlee@openit.co.kr
    controller :  authController
    js : AuthController.js

    수정 내용 :
 */
app.controller('AuthController',['$scope','authService',function($scope,authService){
    authService.authCheck().then(function (resultData) {
        if(resultData.data.isSuccess=='error'){
            location.href='/';
        }
    });

}])