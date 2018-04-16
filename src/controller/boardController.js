/*
    [게시판 컨트롤러]
    최초 등록일자 : 2018.04.11
    최종 수정일자 : 2018.04.12
    수정자 : 이용희
    이메일 : yhlee@openit.co.kr
    controller :  boardController
    js : boardController.js

    수정 내용 (2018.04.12) : 페이징 추가
 */

app.controller('boardController',['$scope','$ngConfirm','boardService',function($scope,$ngConfirm,boardService){

    //글쓰기
    $scope.Insert= function () {
        // 게시글 등록
        $scope.board = {
            boardNum: $scope.boardNum,
            userName:$scope.userName,
            title : $scope.title,
            content: $scope.content
        };
        $ngConfirm({
            title:false,
            content:'등록하시겠습니까? ',
            buttons: {
                ok: {
                    text: '예',
                    action: function(){
                        boardService.Insert($scope.board).then(function(resultData){
                            console.log('[boardController] 글 등록 ' );
                        });
                        location.href='#!board';
                    }
                },
                cancel: {
                    text: '아니오'
                }
            }
        })
    };

    //게시판 리스트 불러오기
    boardService.selectList().then(function (resultData) {

        $scope.pageSize = 10;
        $scope.totalCount = Math.ceil((resultData.data[0].TOTAL_COUNT)/$scope.pageSize) ;
        $scope.count= Array; // pagenavigation 을 위한 Array 설정
        $scope.boardList= resultData.data;

        console.log('select List ',resultData.data);
    });

    //게시글 삭제
    $scope.deleteBoard= function(boardNum){
        var sendData = {
            boardNum : boardNum
        };
        console.log(boardNum);
        $ngConfirm({
            title:false,
            content:'삭제하시겠습니까? ',
            buttons: {
                ok: {
                    text: '예',
                    action: function(){
                        boardService.deleteBoard(sendData).then(function(resultData){
                            if(resultData.data.isSuccess =='true'){
                                alert('삭제 성공');
                                location.href='#!board';
                                return true;

                            }
                            else{
                                alert('삭제 실패');
                                location.href='#!board';
                            }
                        });
                    }
                },
                cancel: {
                    text: '아니오'
                }
            }
        })
    };
    //상세보기
    $scope.selectBoardDetail = function(boardNum){
        var sendData = {
            boardNum : boardNum
        };

        boardService.selectBoardDetail(sendData).then(function(resultData){
            console.log('[BOARD CONTROLLER] resultDATA' , resultData.data[0]);
            $scope.boardNum = resultData.data[0].num;
            $scope.detailTitle= resultData.data[0].title;
            $scope.detailName = resultData.data[0].name;
            $scope.detailContent= resultData.data[0].content;


        });
    };
    //페이징 처리
    $scope.pageNavigation=function(currentPage){
        console.log('currentPage' , currentPage);
        var sendData = {
            currentPage : currentPage
        };
        boardService.pageNavigation(sendData).then(function (resultData) {
            $scope.pageSize = 10;
            $scope.totalCount = Math.ceil((resultData.data[0].TOTAL_COUNT)/$scope.pageSize) ;
            $scope.count= Array; // pagenavigation 을 위한 Array 설정
            $scope.boardList= resultData.data;
        })
    };



    $scope.cancel= function(){
        $ngConfirm({
            title:false,
            content:'취소 하시겠습니까? ',
            buttons: {
                ok: {
                    text: '예',
                    action : function(){
                        location.href='#!board';
                    }
                },
                cancel: {
                    text: '아니오'
                }
            }
        })
    };
}]);
