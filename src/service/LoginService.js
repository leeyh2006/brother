app.factory('loginService',function ($http) {
    return {
        loginCheck:
            function(sendData){
                return $http({
                    method:'POST',
                    url:'/login/login',
                    data: sendData
                }).then(function(data,status,headers,config)
                {
                    console.log(data);
                    console.log('login Service is succes');
                    return data;
                }).catch(
                    function(data,status,headers,config){
                        console.log('login Service error');
                    }
                )
            },
        logOut:
            function () {
                return $http({
                    method:'POST',
                    url:'/login/logout'
                }).then(function(data,status){
                    console.log('[log out Service]' ,data.isSuccess);
                    return data;
                }).catch(
                    function (data,status) {
                        console.log('log Out');

                    }
                )
            }
    }
});