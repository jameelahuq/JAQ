var jaqApp = angular.module('jaqApp', ['ui.router']);

jaqApp.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

        .state('home', {
            url: '/home',
            templateUrl : 'pages/home.html',
            controller  : 'homeCtrl'
        })

        .state('profile', {
            url: '/profile',
            templateUrl : 'pages/profile.html',
            controller  : 'profileCtrl'
        })

        .state('login', {
            url: '/login',
            templateUrl : 'pages/login.html',
            controller  : 'loginCtrl'
        })
    
        .state('post', {
            url: '/post', 
            templateUrl : 'pages/post.html',
            controller  : 'postCtrl'
        });
  
  $urlRouterProvider.otherwise('/home')
});
