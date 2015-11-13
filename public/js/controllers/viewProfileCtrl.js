'use strict';

jaqApp.controller('viewProfileCtrl', function ($scope, $http, $window, md5, $location, $state) {
  console.log("hello");
  var currentProfile = $location.path();
  $state.go('viewProfile.posts')
  
  $http({
    method: 'GET',
    url: '/users/' + currentProfile,
      //change the userID depending on signed in user
  }).then(function successCallback(response) {
    $scope.author = response.data.google.name || "Guest" ;
    $scope.mailHash = md5.createHash(response.data.google.email || "");
    $scope.firstName = response.data.google.name.substr(0,response.data.google.name.indexOf(' '))
    $scope.posts = response.data.posts;
    console.log("youtrl", response)
  }, function errorCallback(response) {
//    swal("Oops...", "Please Sign in to view your profile", "error");
//    $window.location.href = "#/home";

  });
  $scope.follow = function(viewProfile){
    $http({
    method: 'POST',
    url: '/users/follow' + currentProfile,
      //change the userID depending on signed in user
  }).then(function successCallback(response) {
//    $scope.author = response.data.google.name || "Guest" ;
//    $scope.mailHash = md5.createHash(response.data.google.email || "");
//    $scope.firstName = response.data.google.name.substr(0,response.data.google.name.indexOf(' '))
//    $scope.posts = response.data.posts;
    console.log("follow", response)
  }, function errorCallback(response) {
      console.log("error", response)
//    swal("Oops...", "Please Sign in to view your profile", "error");
//    $window.location.href = "#/home";

  });
  }  
});
