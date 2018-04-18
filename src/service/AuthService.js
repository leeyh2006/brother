
/*
    [메뉴별 권한 서비스]
    최초 등록일자 : 2018.04.16
    최종 수정일자 : 2018.04.16
    수정자 : 이용희
    이메일 : yhlee@openit.co.kr
    service :  authService
    js : AuthService.js

    수정 내용 :
 */
app.factory('authService',function($http){
    return{
        authCheck :function(sendData){
            return $http({
                method:'POST',
                url:'/auth/authCheck',
                data: sendData
            }).then(function(data,status){
                console.log(data);
                return data;
            }).catch(function (data,status,config) {
                console.log('error');
            })
        }

    }
})