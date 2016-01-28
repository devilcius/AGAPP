angular.module('augc-app.services', ['ngResource'])

        .factory('Auth', ['$http', '$httpParamSerializer', function ($http, $httpParamSerializer) {
                var callBackObject = {success: false, msg: null};
                return {
                    signin: function (credentials, callback) {
                        return $http({
                            url: 'https://aga.com/app_dev.php/app/user/login_check',
                            method: 'POST',
                            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                            data: $httpParamSerializer(credentials)

                        }).success(function (result, status, headers, config) {
                            if (status === 202) { //successful login                                
                                callBackObject.success = true;                                
                            } else {
                                callBackObject.success = false;
                                callBackObject.msg = result;
                            }
                            callback(callBackObject);
                        }).error(function (err, status, headers, config) {
                            console.error("error data", err);
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
        .service('sessionService', ['$cookieStore', function ($cookieStore) {
                var localStoreAvailable = typeof (Storage) !== "undefined";
                this.store = function (name, details) {
                    if (localStoreAvailable) {
                        if (angular.isUndefined(details)) {
                            details = null;
                        } else if (angular.isObject(details) || angular.isArray(details) || angular.isNumber(+details || details)) {
                            details = angular.toJson(details);
                        }
                        ;
                        sessionStorage.setItem(name, details);
                    } else {
                        $cookieStore.put(name, details);
                    }
                    ;
                };

                this.persist = function (name, details) {
                    if (localStoreAvailable) {
                        if (angular.isUndefined(details)) {
                            details = null;
                        } else if (angular.isObject(details) || angular.isArray(details) || angular.isNumber(+details || details)) {
                            details = angular.toJson(details);
                        }
                        ;
                        localStorage.setItem(name, details);
                    } else {
                        $cookieStore.put(name, details);
                    }
                };

                this.get = function (name) {
                    if (localStoreAvailable) {
                        return getItem(name);
                    } else {
                        return $cookieStore.get(name);
                    }
                };

                this.destroy = function (name) {
                    if (localStoreAvailable) {
                        localStorage.removeItem(name);
                        sessionStorage.removeItem(name);
                    } else {
                        $cookieStore.remove(name);
                    }
                    ;
                };

                var getItem = function (name) {
                    var data;
                    var localData = localStorage.getItem(name);
                    var sessionData = sessionStorage.getItem(name);

                    if (sessionData) {
                        data = sessionData;
                    } else if (localData) {
                        data = localData;
                    } else {
                        return null;
                    }

                    if (data === '[object Object]') {
                        return null;
                    }
                    ;
                    if (!data.length || data === 'null') {
                        return null;
                    }
                    ;

                    if (data.charAt(0) === "{" || data.charAt(0) === "[" || angular.isNumber(data)) {
                        return angular.fromJson(data);
                    }
                    ;

                    return data;
                };

                return this;
            }])
        ;

