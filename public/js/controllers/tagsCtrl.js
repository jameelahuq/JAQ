"use strict";

jaqApp.controller('tagsCtrl', function($scope, $http) {

  let api = constants.siteUrl;

  $http({
    method: 'GET',
    url: api + '/users/posts'
      //change the userID depending on signed in user
      }).then(function successCallback(response) {
      console.log("yourpostctrl", response)
      $scope.posts = response.data
    }, function errorCallback(response) {
    });
});
