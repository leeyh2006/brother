

app.controller('joinController',['$scope' ,'joinService', function($scope,joinService){

    $scope.join=function(){
        joinService.join().then(function(resultData){
            $scope.dataStr=resultData;
        });
        console.log('join Service start');
    }
}]);
