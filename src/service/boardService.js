/*
    [회원가입 서비스]
    최초 등록일자 : 2018.04.11
    최종 수정일자 : 2018.04.12
    수정자 : 이용희
    이메일 : yhlee@openit.co.kr
    service :  boardService
    js : boardService.js
 */

app.factory('boardService',function ($http) {
    return {
        Insert:
            function(sendData){
                return $http({
                    method:'POST',
                    url:'/board/Insert',
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
            },
        
        //게시판 리스트 
        selectList:
            function(sendData){
                return $http({
                    method :'POST',
                    url:'/board/selectList'
                }).then(function(data,status){
                    console.log('[BOARD SERVICE] selectList', data);
                    return data;
                }).catch(
                    function(data,status,headers,config){
                        console.log('[BOARD SERVICE] selectList DATA GET ERROR');
                    })
            },
        //페이징
        pageNavigation:
            function(sendData){
            console.log('[BOARD SERVICE] sendData ',sendData);
                return $http({
                    method:'POST',
                    url:'/board/selectList',
                    data:sendData
                }).then(function(data,status){
                    console.log('[BOARD SERVICE] pageNavigation ',data);
                    return data;

                }).catch(
                    function(data,status,headers,config){
                        console.log('[BOARD SERVICE] pageNavigation DATA GET ERROR' );
                    }
                )
            }

    }
});