
app.controller('joinController',['$scope' ,'$ngConfirm','joinService', function($scope,$ngConfirm,joinService){

    $scope.user = {
        userId: $scope.userId,
        userPw : $scope.userPw,
        userPwCheck: $scope.userPwCheck,
        userTel : $scope.userTel,
        userAd : $scope.userAd
    };

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
                                $scope.dataStr=resultData;
                            });
                        }
                    },
                    cancel:{
                        text:'아니오',
                    }
                }

            }
        );
        console.log('join Service start');
    }
}]);
