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

app.controller('boardController',['$scope','$ngConfirm','boardService','data',function($scope,$ngConfirm,boardService,data){
    console.log('data' ,data);
    if(data.isSuccess =='fail'){
        alert('로그인 하세요');
        location.href='#!login';
    }
    else{
        //게시판 리스트 불러오기
        boardService.selectList().then(function (resultData) {
            $scope.pageSize = 10;
            $scope.totalCount = Math.ceil((resultData.data[0].TOTAL_COUNT)/$scope.pageSize) ;
            $scope.count= Array; // pagenavigation 을 위한 Array 설정
            $scope.boardList= resultData.data;

            console.log('$scope.totalCount' , $scope.totalCount);
            console.log('select List ',resultData.data);
        });
    }

    // 게시글 등록
    $scope.board = {
        boardNum: $scope.boardNum,
        userName:$scope.userName,
        title : $scope.title,
        content: $scope.content
    };

    //글쓰기
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



    $scope.updateBoard = function(boardNum){
        var sendData = {
            boardNum : boardNum,
            detailTitle : $scope.board.title,
            detailContent : $scope.board.content
        };
        $ngConfirm({
            title:false,
            content:'수정 하시겠습니까?',
            buttons: {
                ok: {
                    text: '예',
                    action: function(){
                        boardService.updateBoard(sendData).then(function(resultData){
                            if(resultData.data.isSuccess =='true'){
                                // $('.modal-backdrop').hide();
                                location.href='#!board';
                            }
                            else{
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
                                // $('.modal-backdrop').hide();
                                location.href='#!board';
                            }
                            else{
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
            $scope.board.boardNum = resultData.data[0].num;
            $scope.board.title= resultData.data[0].title;
            $scope.board.userName = resultData.data[0].name;
            $scope.board.content= resultData.data[0].content;


        });
    };
    //페이징 처리
    $scope.pageNavigation=function(currentPage,nextPage){

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
