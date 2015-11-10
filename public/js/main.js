/**
 * Created by HUQ on 10/26/15.
 */
'use strict';

//require('./ctrls/LoginCtrl.js');


var app = angular.module('peepiq', ['ui.router']); //ui.calendar if we cdn it earlier??
console.log("angular-app is running");


app.constant('constant', {
  apiUrl: 'http://localhost:8080'
});


app.config(function($stateProvider, $urlRouterProvider) { //$controllerProvider

  $urlRouterProvider.otherwise('/login');

  $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      //.state('signup', {
      //  url: '/signup',
      //  templateUrl: 'views/signup.html',
      //  controller: 'SignupCtrl'
      //})


});


