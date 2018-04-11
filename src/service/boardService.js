/*
    [회원가입 서비스]
    최초 등록일자 : 2018.04.11
    최종 수정일자 : 2018.04.11
    수정자 : 이용희
    이메일 : yhlee@openit.co.kr
    controller :  joinController
    js : joinController.js
 */

app.factory('boardService',function ($http) {
    return {
        Insert:
            function(sendData){
                return $http({
                    method:'POST',
                    url:'/board/insert',
                    data: sendData
                }).then(function(data,status,headers,config)
                {
                    console.log('[boardService]' , data);
                    return data;
                }).catch(
                    function(data,status,headers,config){
                        console.log('error');
                    }
                )
            }
    }
});