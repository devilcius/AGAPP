angular.module('augc-app.services', ['ngResource'])

        .factory('Auth', ['$http', '$httpParamSerializer', function ($http, $httpParamSerializer) {

                return {
                    signin: function (credentials) {
                        return $http({
                            url: 'https://aga.com/app_dev.php/app/user/login_check',
                            method: 'POST',
                            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                            data: $httpParamSerializer(credentials)

                        }).success(function (loginData) {
                            console.log("login data", loginData);
                        }).error(function (errorData) {
                            console.error("error data", errorData);
                        })
                                ;

                    }
                };
            }])
        .factory('Post', function ($resource) {
            return $resource(
                    'http://aga.com/app_dev.php/api/news/posts/:postId' + '.json',
                    {page: 1, enabled: 1},
                    {'query': {method: 'GET', isArray: false}}
            );
        })
        ;

