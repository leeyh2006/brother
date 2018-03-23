app.factory('loginService',function ($http) {
    return {
        loginCheck:
            function(sendData){
                return $http({
                    method:'POST',
                    url:'http://192.168.6.122:8080/login'+'/loginCheck.json',
                }).then(function(data,status,headers,config)
                {
                    console.log('succes');
                }).error(
                    function(data,status,headers,config){
                        console.log('error');
                    }
                )
            }
    }
})