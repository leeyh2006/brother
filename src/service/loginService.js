app.factory('loginService',function ($http) {
    return {
        loginCheck:
            function(sendData){
                return $http({
                    method:'POST',
                    url:'http://localhost:8080/login'+'/loginCheck.json',
                    data: sendData
                }).then(function(data,status,headers,config)
                {
                    console.dir(data);
                    console.log('login Service is succes');
                }).error(
                    function(data,status,headers,config){
                        console.log('error');
                    }
                )
            }
    }
})