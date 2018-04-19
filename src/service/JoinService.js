/*
    [회원가입 서비스]
    최초 등록일자 : 2018.04.11
    최종 수정일자 : 2018.04.12
    수정자 : 이용희
    이메일 : yhlee@openit.co.kr
    service :  JoinService
    js : JoinService.js
 */

app.factory('joinService',function ($http) {
    return {
        join:
            function(sendData){
                return $http({
                    method:'POST',
                    url:'/join/join.json',
                    data: sendData
                }).then(function(data,status,headers,config)
                {
                    console.log('join Service is succes');
                    console.log('status', status);
                    return data;
                }).catch(
                    function(data,status,headers,config){
                        console.log('error');
                    }
                )
            }
    }
});