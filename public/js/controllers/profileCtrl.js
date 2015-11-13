'use strict';

jaqApp.controller('profileCtrl', function ($scope, $http, $window, md5, $state) {
$state.go('profile.yourposts')
  $http({
    method: 'GET',
    url: '/users/id'
      //change the userID depending on signed in user
  }).then(function successCallback(response) {
    $scope.author = response.data.google.name || "Guest" ;
    $scope.mailHash = md5.createHash(response.data.google.email || "");
    console.log("youtrl", response)
  }, function errorCallback(response) {
    swal("Oops...", "Please Sign in to view your profile", "error");
    $window.location.href = "#/home";

  });
});
