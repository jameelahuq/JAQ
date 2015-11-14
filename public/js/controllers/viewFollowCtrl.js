'use strict';

jaqApp.controller('viewFollowCtrl', function ($scope, $http, $window, md5, $location, $state) {

  var currentProfile = $location.path();

  $http({
    method: 'GET',
    url: '/users/' + currentProfile
      //change the userID depending on signed in user
  }).then(function successCallback(response) {
    $scope.author = response.data.google.name || "Guest" ;
    $scope.firstName = response.data.google.name.substr(0,response.data.google.name.indexOf(' '))

  }, function errorCallback(err) {
      console.log(err)
  });

  $http({
    method: 'GET',
    url: '/users/following' + currentProfile
      //change the userID depending on signed in user
  }).then(function successCallback(response) {

        $scope.hashEmailed = [];
          if (response.data.following.length>0 ) {
             for (var i=0; i < response.data.following.length; i++){
              $scope.hashEmailed.push(md5.createHash(response.data.following[i].google.email));
             }
          }

        $scope.peopleThatFollow = response.data.following;

  }, function errorCallback(err) {
        console.log(err)

  });
    
});