"use strict";

jaqApp.controller('tagsCtrl', function($scope, $http) {

  $http({
    method: 'GET',
    url: '/users/posts'
      //change the userID depending on signed in user
      }).then(function successCallback(response) {
      console.log("yourpostctrl", response)
      $scope.posts = response.data
    }, function errorCallback(err) {
    console.log(err);
    });
});

