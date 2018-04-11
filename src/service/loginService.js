app.factory('loginService',function ($http) {
    return {
        loginCheck:
            function(sendData){
                console.log(sendData);
                return $http({
                    method:'POST',
                    url:'/login/login',
                    data: sendData
                }).then(function(data,status,headers,config)
                {
                    console.log('service',data);
                    console.log('login Service is succes');
                    location.href='/'
                }).catch(
                    function(data,status,headers,config){
                        console.log('login Service error');
                    }
                )
            }
    }
});