/*
    [회원가입 컨트롤러]
    최초 등록일자 : 2018.04.11
    최종 수정일자 : 2018.04.11
    수정자 : 이용희
    이메일 : yhlee@openit.co.kr
    controller :  joinController
    js : joinController.js
 */

app.controller('JoinController',['$scope' ,'$ngConfirm','joinService', function($scope,$ngConfirm,joinService){

    $scope.user = {
        userId: $scope.userId,
        userPw : $scope.userPw,
        userPwCheck: $scope.userPwCheck,
        userTel : $scope.userTel,
        userAd : $scope.userAd,
        userName :$scope.userName
    };


    $scope.join=function(){
        $ngConfirm(
            {
                title:false,
                content: '회원 가입 하시겠습니까?',
                buttons: {
                    ok: {
                        text:'예',
                        action:function () {
                            joinService.join($scope.user).then(function(resultData){
                                if(resultData.data.isSuccess == 'fail'){
                                    alert('아이디 중복');
                                }
                                else {
                                    alert('회원가입 성공');
                                    location.href='/';
                                }
                        });
                        }
                    },
                    cancel:{
                        text:'아니오',
                    }
                }
            }
        );

        $scope.cancel =function(){
            $ngConfirm({
                title:false,
                content:'회원가입을 취소하시겠습니까? ',
                buttons: {
                    ok: {
                        text: '아니오 계속 진행합니다.',
                        // here the key 'something' will be used as the text.
                    },
                    cancel: {
                        text: '취소 하겠습니다.', // Some Non-Alphanumeric characters
                        action: function(){
                            location.href='#!login';
                        }
                    }
                }
            });
        };

        console.log('join Service start');
    }
}]);
