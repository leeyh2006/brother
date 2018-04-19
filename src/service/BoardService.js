/*
    [게시판 서비스]
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
            function(){
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
            },

        //상세보기
        selectBoardDetail:
            function (sendData) {
                console.log('[BOARD SERIVCE ]', sendData);
                return $http({
                    method:'POST',
                    url:'/board/selectDetail',
                    data: sendData
                }).then(function (data,status) {
                    console.log('[BOARD SERVICE] selectDetail',data);
                    return data;
                }).catch(
                    function (data,status) {
                        console.log('[BOARD SERVICE] select detail ');
                    }
                )
            },

        //게시글 삭제
        deleteBoard :
            function(sendData){
                return $http({
                    method:'POST',
                    url:'/board/deleteBoard',
                    data:sendData
                }).then(function(data,status){
                    console.log('[BOARD SERVICE] delete board' ,data);
                    return data;
                }).catch(function(data,status){
                    if(status ==200){
                        console.log('success');
                    }
                })
            },
        updateBoard:
            function (sendData) {
                return $http({
                    method:'POST',
                    url:'/board/updateBoard',
                    data:sendData

                }).then(function(data,status){
                    console.log('[BOARD SERVICE] update board',data);
                    return data;

                }).catch(function(data,status){
                    if(status==200){
                        console.log('success');
                    }
                })
            }

    }
});