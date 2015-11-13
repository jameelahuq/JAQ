'use strict';

jaqApp.controller('viewFollowersCtrl', function ($scope, $http, $window, md5, $location, $state) {
  console.log("hello");
  var currentProfile = $location.path();
  $state.go('viewProfile.followers')
  
  
      $http({
    method: 'GET',
    url: '/users/' + currentProfile,
      //change the userID depending on signed in user
  }).then(function successCallback(response) {
    $scope.author = response.data.google.name || "Guest" ;
//    $scope.firstName = response.data.google.name.substr(0,response.data.google.name.indexOf(' '))
  

  }, function errorCallback(response) {
//    swal("Oops...", "Please Sign in to view your profile", "error");
//    $window.location.href = "#/home";

  });

      $http({
    method: 'GET',
    url: '/users/followers' + currentProfile,
      //change the userID depending on signed in user
  }).then(function successCallback(response) {
//    $scope.author = response.data.google.name || "Guest" ;
//    $scope.mailHash = md5.createHash(response.data.google.email || "");
//    $scope.firstName = response.data.google.name.substr(0,response.data.google.name.indexOf(' '))
//    $scope.posts = response.data.posts;
        console.log(response.data.followers[0].google.email)
    $scope.hashEmailed = []
        if (response.data.followers.length>0 ){
          
           for (var i=0; i < response.data.followers.length; i++){
            $scope.hashEmailed.push(md5.createHash(response.data.followers[i].google.email));
           }
        }
          console.log($scope.hashEmailed)
    console.log("people that follow account viewd", response)
    $scope.peopleThatFollow = response.data.followers;
          
  }, function errorCallback(response) {
//    swal("Oops...", "Please Sign in to view your profile", "error");
//    $window.location.href = "#/home";

  });
    


//  $scope.follow = function(viewProfile){
//    $http({
//    method: 'POST',
//    url: '/users/follow' + currentProfile,
//      //change the userID depending on signed in user
//  }).then(function successCallback(response) {
////    $scope.author = response.data.google.name || "Guest" ;
////    $scope.mailHash = md5.createHash(response.data.google.email || "");
////    $scope.firstName = response.data.google.name.substr(0,response.data.google.name.indexOf(' '))
////    $scope.posts = response.data.posts;
//    console.log("follow", response)
//  }, function errorCallback(response) {
//      console.log("error", response)
////    swal("Oops...", "Please Sign in to view your profile", "error");
////    $window.location.href = "#/home";
//
//  });
//  }  
});
