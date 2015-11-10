var jaqApp = angular.module('jaqApp', ['ui.router']);

jaqApp.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl : 'pages/home.html',
            controller  : 'postCtrl'
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
        })
      .state('profile.follow', {
            
            templateUrl : 'pages/profile.follow.html',
            controller  : 'followCtrl'
        })
      .state('profile.tags', {
             
            templateUrl : 'pages/profile.tags.html',
            controller  : 'tagsCtrl'
        })
      .state('profile.yourposts', {
             
            templateUrl : 'pages/profile.yourposts.html',
            controller  : 'yourpostsCtrl'
        })
      .state('profile.followers', {
            
            templateUrl : 'pages/profile.followers.html',
            controller  : 'followersCtrl'
        })
  
    $urlRouterProvider.otherwise('home')
});

$(document).ready(function(){
    $(document).foundation();
});
    