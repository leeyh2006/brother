/*
    [특허등록 컨트롤러]
    최초 등록일자 : 2018.04.18
    최종 수정일자 : 2018.04.18
    수정자 : 이용희
    이메일 : yhlee@openit.co.kr
    controller :   PatentController
    js : PatentController.js
 */

app.controller('PatentController',['$scope','Upload','PatentService','$timeout','Upload' ,function($scope,Upload,PatentService,$timeout,Upload){


    console.log('PATENT CONTROLLER START');

    //특허 등록
    $scope.insertPatent = function (file) {
        var sendData = {picFile : file}

        $scope.patent = {
            title : $scope.title,
            userName : $scope.userName,
            picFile : file,
            type :$scope.type
        };

        console.log('$scope patent ', $scope.patent);

        PatentService.insertPatent(file).then(function(resultData){
            $timeout(function () {
                file.result = resultData.data;
            });
        })
    };

    $scope.uploadPic = function(file) {
        console.log('FILE ' ,file);
        file.upload = Upload.upload({
            url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
            data: {username: $scope.username, file: file},
        });

        file.upload.then(function (response) {
            $timeout(function () {
                file.result = response.data;
            });
        }, function (response) {
            if (response.status > 0)
                $scope.errorMsg = response.status + ': ' + response.data;
        }, function (evt) {
            // Math.min is to fix IE which reports 200% sometimes
            file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        });
    }


  /*  PatentService.selectList(sendData).then(function(resultData){
        console.log(resultData);
    });*/

}]);

