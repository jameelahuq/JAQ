"use strict";

jaqApp.controller('profileCtrl', function($scope, $http, constants) {

  let api = constants.siteUrl;

  $http({
  method: 'GET',
  url: api + '/user/id'
    //change the userID depending on signed in user
    }).then(function successCallback(response) {
    $scope.author=response.data.google.name

    console.log("youtrl", response)
  }, function errorCallback(response) {
  });

  
});
