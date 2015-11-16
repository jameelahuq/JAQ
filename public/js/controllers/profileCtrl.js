'use strict';

jaqApp.controller('profileCtrl', function ($scope, $http, $window, md5, $state) {
$state.go('profile.yourposts')
  $http({
    method: 'GET',
    url: '/users/id'
      //change the userID depending on signed in user
  }).then(function successCallback(response) {
    $scope.picUrl = response.data.google.picUrl;
    $scope.author = response.data.google.name || "Guest" ;
    mixpanel.track("user's profile viewed", {"Page Name": $scope.author})
    $scope.mailHash = md5.createHash(response.data.google.email || "");
    console.log("youtrl", response)
  }, function errorCallback(response) {
    swal("Oops...", "Please Sign in to view your profile", "error");
    $window.location.href = "#/home";

  });
});
