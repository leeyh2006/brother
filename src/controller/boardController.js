/*
    [게시판 컨트롤러]
    최초 등록일자 : 2018.04.11
    최종 수정일자 : 2018.04.11
    수정자 : 이용희
    이메일 : yhlee@openit.co.kr
    controller :  boardController
    js : boardController.js
 */

app.controller('boardController',['$scope','$ngConfirm','boardService',function($scope,$ngConfirm,boardService){
    $scope.board = {
        boardNum: $scope.boardNum,
        userName:$scope.userName,
        title : $scope.title,
        content: $scope.content
    };

    $scope.Insert= function () {
        $ngConfirm({
            title:false,
            content:'등록하시겠습니까? ',
            buttons: {
                ok: {
                    text: '예',
                    action: function(){
                        boardService.Insert($scope.board).then(function(resultData){
                            console.log('[boardController] 글 등록 ' );
                            console.log('result Data ' , resultData);
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
