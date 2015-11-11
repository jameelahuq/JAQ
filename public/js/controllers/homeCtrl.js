"use strict";

jaqApp.controller('homeCtrl', function($scope, $http, constants) {

  let api = constants.siteUrl;

  $http({

    method: 'GET',
  url: api + '/everything'
  //change the userID depending on signed in user
  }).then(function successCallback(response) {
  console.log("here", response.data);
  $scope.data = response.data;
  
}, function errorCallback(response) {
});

  
});
      
