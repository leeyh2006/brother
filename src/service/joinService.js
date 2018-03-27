app.factory('joinService',function ($http) {
    return {
        join:
            function(sendData){
                return $http({
                    method:'POST',
                    url:'http://localhost:8080/join'+'/join.json',
                    data: sendData
                }).then(function(data,status,headers,config)
                {
                    console.log('join Service is succes');
                }).catch(
                    function(data,status,headers,config){
                        console.log('error');
                    }
                )
            }
    }
});