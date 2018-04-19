/*
    [특허등록 서비스]
    최초 등록일자 : 2018.04.18
    최종 수정일자 : 2018.04.18
    수정자 : 이용희
    이메일 : yhlee@openit.co.kr
    service :  PatentService
    js : PatentService.js
 */

app.factory('PatentService',function($http,Upload){
    return{
        insertPatent :
            function(sendData){
            console.log(sendData);
                return Upload.upload({
                    method:'POST',
                    url: '/patent/insertPatent',
                    data: {file:sendData}
                }).then(function (resp) {
                    console.log(resp);
                });
        },
        selectList :
            function (sendData) {
                return $http({
                    method : 'POST',
                    url : '/patent/selectList',
                    data: sendData
                }).then(function (data,status) {
                    console.log('[PATENT SERVICE] data' ,data);
                }).catch(function (data,status) {
                    console.log('[PATENT SERVICE] error', status);
                })

            }
    }
});