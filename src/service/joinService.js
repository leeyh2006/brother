app.factory('joinService',function ($http) {
    return {
        join:
            function(sendData){
                return $http({
                    method:'POST',
                    url:'/join/join.json',
                    data: sendData
                }).then(function(data,status,headers,config)
                {
                    console.log('join Service is succes');
                    console.log('status', status);
                    return data;
                }).catch(
                    function(data,status,headers,config){
                        console.log('error');
                    }
                )
            }
    }
});