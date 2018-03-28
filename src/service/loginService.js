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
                    console.log('login Service is succes');
                    return data;
                }).catch(
                    function(data,status,headers,config){
                        console.log('login Service error');
                    }
                )
            },
        kakaoLogin:
            function(){
                Kakao.init('a81ba60b242cd4896844c5fb30077271');
                function loginWithKakao() {
                    // 로그인 창을 띄웁니다.
                    Kakao.Auth.login({
                        success: function(authObj) {
                            alert(JSON.stringify(authObj));
                            return JSON.stringify(authObj);
                        },
                        fail: function(err) {
                            alert(JSON.stringify(err));
                        }
                    });
                };
            }
    }
});