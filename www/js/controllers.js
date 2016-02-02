angular.module('app', [
    'ngSanitize'
]);
angular.module('augc-app.controllers', ['augc-app.services'])

        .controller('AppCtrl', function ($scope, $ionicModal, Auth) {

            // With the new view caching in Ionic, Controllers are only called
            // when they are recreated or on app start, instead of every page change.
            // To listen for when this page is active (for example, to refresh data),
            // listen for the $ionicView.enter event:
            //$scope.$on('$ionicView.enter', function(e) {
            //});

            // Form data for the login modal
            $scope.loginData = {};

            // Create the login modal that we will use later
            $ionicModal.fromTemplateUrl('templates/login.html', {
                scope: $scope
            }).then(function (modal) {
                $scope.modal = modal;
            });

            // Triggered in the login modal to close it
            $scope.closeLogin = function () {
                $scope.modal.hide();
            };

            // Open the login modal
            $scope.login = function () {
                $scope.modal.show();
            };

            // Perform the login action when the user submits the login form
            $scope.doLogin = function () {
                var formData = {username: $scope.loginData.username, password: $scope.loginData.password};
                var $thatScope = $scope;
                Auth.signin(formData, function (callBackResponse) {
                    if (callBackResponse.success) {
                        $thatScope.closeLogin();
                        console.log("successfully log in");
                    } else {
                        console.error("Login error", callBackResponse.msg);
                    }
                });
            };

        })

        .controller('PostsCtrl', function ($scope, Post, $ionicLoading) {
            $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });
            $scope.posts = Post.query(function () {
                $ionicLoading.hide();
            });

        })

        .controller('PostCtrl', function ($scope, $stateParams, Post, $ionicLoading, $cordovaSocialSharing, AUGC_CONFIG) {
            $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });
            $scope.post = Post.get({postId: $stateParams.postId}, function () {
                $ionicLoading.hide();
            });

            $scope.shareAnywhere = function () {
                var message = AUGC_CONFIG.shareComunicadoMsg;
                var subject = AUGC_CONFIG.shareComunicadoSubject;
                var link = AUGC_CONFIG.portalNewsBaseUrl + encodeURI($scope.post.permalink);   
                //console.log("link", link);
                $cordovaSocialSharing.share(message, subject, null, link);
            };

            $scope.shareViaTwitter = function (message, image, link) {
                $cordovaSocialSharing.canShareVia("twitter", message, image, link).then(function (result) {
                    $cordovaSocialSharing.shareViaTwitter(message, image, link);
                }, function (error) {
                    alert("Cannot share on Twitter");
                });
            };

        })

        .controller('DelegacionsCtrl', function ($scope, Delegacion, $ionicLoading) {
            $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });
            $scope.delegacions = Delegacion.query(function () {
                $ionicLoading.hide();
            });

        })

        .controller('DelegacionCtrl', function ($scope, $stateParams, Delegacion, $ionicLoading) {
            $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });
            $scope.delegacion = Delegacion.get({delegacionId: $stateParams.delegacionId}, function () {
                $ionicLoading.hide();
            });
        })
        
;

        