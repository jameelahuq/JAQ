'use strict';

jaqApp.controller('viewFollowCtrl', function ($scope, $http, $window, md5, $location, $state) {
  console.log("hello");
  var currentProfile = $location.path();
// $state.go('viewProfile.following')
  
    $http({
    method: 'GET',
    url: '/users/' + currentProfile,
      //change the userID depending on signed in user
  }).then(function successCallback(response) {
    $scope.author = response.data.google.name || "Guest" ;
    $scope.firstName = response.data.google.name.substr(0,response.data.google.name.indexOf(' '))

  }, function errorCallback(response) {
//    swal("Oops...", "Please Sign in to view your profile", "error");
//    $window.location.href = "#/home";

  });
  
      $http({
    method: 'GET',
    url: '/users/following' + currentProfile,
      //change the userID depending on signed in user
  }).then(function successCallback(response) {
             console.log(response.data.following[0].google.email)
    $scope.hashEmailed = []
        if (response.data.following.length>0 ){
          
           for (var i=0; i < response.data.following.length; i++){
            $scope.hashEmailed.push(md5.createHash(response.data.following[i].google.email));
           }
        }
          console.log($scope.hashEmailed)
    
    $scope.peopleThatFollow = response.data.following;
        console.log( $scope.peopleThatFollow)
  }, function errorCallback(response) {
//    swal("Oops...", "Please Sign in to view your profile", "error");
//    $window.location.href = "#/home";

  });
    
})