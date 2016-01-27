// Ionic AUGC App App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'augc-app' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'augc-app.controllers' is found in controllers.js
angular.module('augc-app', ['ionic', 'augc-app.controllers', 'augc-app.filters'])

        .run(function ($ionicPlatform) {
            $ionicPlatform.ready(function () {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                if (window.cordova && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                    cordova.plugins.Keyboard.disableScroll(true);

                }
                if (window.StatusBar) {
                    // org.apache.cordova.statusbar required
                    StatusBar.styleDefault();
                }
            });
        })

        .config(function ($stateProvider, $urlRouterProvider) {
            $stateProvider

                    .state('app', {
                        url: '/app',
                        abstract: true,
                        templateUrl: 'templates/menu.html',
                        controller: 'AppCtrl'
                    })

                    .state('app.search', {
                        url: '/search',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/search.html'
                            }
                        }
                    })

                    .state('app.home', {
                        url: '/home',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/home.html'
                            }
                        }
                    })
                    .state('app.posts', {
                        url: "/posts",
                        views: {
                            'menuContent': {
                                templateUrl: "templates/posts.html",
                                controller: 'PostsCtrl'
                            }
                        }
                    })
                    .state('app.post', {
                        url: "/posts/:postId",
                        views: {
                            'menuContent': {
                                templateUrl: "templates/post.html",
                                controller: 'PostCtrl'
                            }
                        }
                    });
            // if none of the above states are matched, use this as the fallback
            $urlRouterProvider.otherwise('/app/home');
        });
