'use strict';

jaqApp.controller('viewProfileCtrl', function ($scope, $http, $window, md5, $location, $state) {
  var currentProfile = $location.path();
  $state.go('viewProfile.posts');
  $http({

    method: 'GET',
    url: '/users/' + currentProfile

  }).then(function successCallback(response) {
    $scope.author = response.data.google.name || "Guest" ;
    console.log(response.data.google.picUrl);
    $scope.picUrl = response.data.google.picUrl;
    $scope.firstName = response.data.google.name.substr(0,response.data.google.name.indexOf(' '))
    $scope.posts = response.data.posts;
  }, function errorCallback(err) {
    console.log(err);
  });

  $scope.follow = function(){
    $http({

    method: 'POST',
    url: '/users/follow' + currentProfile

  }).then(function successCallback(response) {
      swal("Woo!", "You are now following "+ response.data.google.name, "success");
  }, function errorCallback(response) {
    swal("Oops...", "Please Sign in to follow a user", "error");

  });
  }  
});
